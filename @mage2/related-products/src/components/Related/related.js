import React from "react";
import { useQuery } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { GET_RELATED_PRODUCTS } from "../../queries/relatedProducts.gql";
import {fullPageLoadingIndicator} from "@magento/venia-ui/lib/components/LoadingIndicator";
import { Link, resourceUrl } from '@magento/venia-drivers';
import ErrorView from "@magento/venia-ui/lib/components/ErrorView";
import Image from "@magento/venia-ui/lib/components/Image";
import Price from "@magento/venia-ui/lib/components/Price";
import {UNCONSTRAINED_SIZE_KEY} from "@magento/peregrine/lib/talons/Image/useImage";

import Mage2Slider from '../Slider/mage2Slider';
import defaultClasses from './related.css';

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 375;

// Gallery switches from two columns to three at 640px.
const IMAGE_WIDTHS = new Map()
    .set(640, IMAGE_WIDTH)
    .set(UNCONSTRAINED_SIZE_KEY, 840);

const Related = props => {

    const { productSku } = props;
    const classes = defaultClasses;

    const { loading, error, data } = useQuery(GET_RELATED_PRODUCTS, {
        variables: { sku: productSku },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    if (!data) {
        if (loading) {
            return fullPageLoadingIndicator;
        }

        if (error) {
            return <ErrorView message={error.message} />;
        }
    }

    const product = data.products.items.length > 0 ? data.products.items[0] : null;

    const productsData = product ? product.related_products : null;
    const relatedProducts = productsData.length > 0 ? productsData : null;

    const relatedItems = relatedProducts ? relatedProducts.map((item) => {

        const productLink = resourceUrl(`/${item.url_key}${item.url_suffix || ''}`);

        return (
            <div className={classes.root}>
                <Link
                    to={productLink}
                    className={classes.images}
                >
                    <Image
                        alt={item.small_image.label}
                        classes={{
                            image: classes.image,
                            root: classes.imageContainer
                        }}
                        height={IMAGE_HEIGHT}
                        resource={item.small_image.url}
                        widths={IMAGE_WIDTHS}
                    />
                </Link>
                <Link
                    to={productLink}
                    className={classes.name}
                >
                    <span>{item.name}</span>
                </Link>
                <div className={classes.price}>
                    <Price
                        value={item.price_range.minimum_price.regular_price.value}
                        currencyCode={item.price_range.minimum_price.regular_price.currency}
                    />
                </div>
            </div>
        );
    }) : null;

    const relatedProductsContent = relatedProducts ? (
        <div className={classes.productsContainer}>
            <h3 className={classes.heading}>
                <FormattedMessage
                    id={'relatedProducts.related'}
                    defaultMessage={'Related Products'}
                />
            </h3>
            <div>
                <Mage2Slider items={relatedItems} slidesToShow={4} />
            </div>
        </div>
    ) : null;

    return (
        relatedProductsContent
    );
}

export default Related;
