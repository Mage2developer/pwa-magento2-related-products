<h2><b>Related Products Add-on for Magento 2 PWA Studio</b></h2>

<p>For Magento 2 PWA Studio, on the product detail page, there is no related products feature available for now. <b>Related Products Add-on</b> is very helpful for customers to view related products to what they are looking at. This add-on is fully responsive, which ultimately makes it compatible with most mobile devices.</p>

<h3><b>Pre-requirements</b></h3>
<ul>
<li>Magento 2.3.* or 2.4.*</li>
</ul>

<h3><b>Installation Instruction</b></h3>
<ol>
<li>Copy <b>@mage2</b> directory files and folders inside the <b>src</b> directory, for example:<br/> <pre>{pwa-root-dir}/packages/{custom-package}/@mage2</pre></li>
<li>Add the Related Products add-on dependency in the <b>package.json</b> file of your custom package or venia-concept package:<br/>
<b>File Path:</b> {pwa-root-dir}/packages/{custom-package}/package.json
<pre>
"dependencies": {
    ...
    "@mage2": "link:src/@mage2",
    "related-products": "link:src/@mage2/related-products"
},
</pre>
</li>
<li>Run the following command inside your custom package or venia-concept directory:
<pre>yarn install</pre>
</li>
<li><b>ProductFullDetail React component</b> is responsible to handle product page layout in Magento 2 PWA Storefront. To add Related Products add-on on product page, you need to add following code inside the <b>local-intercept.js</b> file of your custom package or venia-concept package:<br/>
<b>File Path:</b> {pwa-root-dir}/packages/{custom-package}/src/targets/local-intercept.js
<pre>
const ProductDetails = targetables.reactComponent(
    '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
);

const RelatedProducts = ProductDetails.addImport(
    "Related from '@mage2/related-products'"
);

ProductDetails.insertAfterJSX('`<Form />`', \`<${RelatedProducts} productSku={productDetails.sku} />\`);
</pre>
</li>
<li>Run the PWA storefront using following command:<br/>
<pre>yarn {custom-package} run build && yarn {custom-package} run watch</pre>
<b>Note:</b> Replace {custom-package} with your custom package name or venia package i.e.
<pre>yarn example-concept run build && yarn example-concept run watch</pre> or
<pre>yarn venia run build && yarn venia run watch</pre>
</li>
</ol>

<h3><b>Features</b></h3>
<ul>
<li>Easy to install</li>
<li>Related products are shown in the slider</li>
<li>Fully responsive</li>
</ul>

<p>In case of any other queries regarding this add-on:<br />
Contact us at <b>mage2developer@gmail.com</b>. We would be really happy to help :)</p>

<h3><b>Screen Shots</b></h3>

<img src="https://user-images.githubusercontent.com/26230770/141314407-3e62a7ef-c638-4e31-bfd2-1f4ef60c155f.png" alt="desktop-size" />

<img src="https://user-images.githubusercontent.com/26230770/141314427-a3268370-7914-4ef8-821c-4c07d47a63c1.png" alt="tablet-size" />

<img src="https://user-images.githubusercontent.com/26230770/141314435-934477fe-c76a-48cf-b178-8bfdefd2c0d1.png" alt="mobile-size" />
