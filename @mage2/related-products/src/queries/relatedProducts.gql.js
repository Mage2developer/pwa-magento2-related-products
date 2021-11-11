import { gql } from '@apollo/client';

export const GET_RELATED_PRODUCTS = gql`
    query getRelatedProducts($sku: String!) {
        products(filter: { sku: { eq: $sku } }) {
            items {
                id
                name
                related_products {
                    id
                    name
                    small_image {
                        label
                        url
                    }
                    url_key
                    url_suffix
                    price_range {
                        minimum_price {
                            regular_price {
                                currency
                                value
                            }
                        }
                    }
                }
            }
        }
    }
`;
