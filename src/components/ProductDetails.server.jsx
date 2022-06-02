import {
  flattenConnection,
  useParsedMetafields,
  ProductProvider,
  ProductTitle,
  ProductDescription,
} from '@shopify/hydrogen';
import ProductOptions from './ProductOptions.client';
import Gallery from './Gallery.client';
import {AddToCartMarkup} from './ProductDetailsAddToCartMarkup.client';
import {
  ProductPrices,
  ProductDetailsProductPrice,
  SelectedVariantImage,
} from './ProductDetailsPrices.client';

export function ProductDetails({product}) {
  const initialVariant = flattenConnection(product.variants)[0];

  return (
    <>
      <ProductProvider data={product} initialVariantId={initialVariant.id}>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="mt-4">
              <ProductTitle
                as="h1"
                className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
              >
                {product.name}
              </ProductTitle>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <ProductDetailsProductPrice
                as="p"
                className="text-lg text-gray-900 sm:text-xl"
              />

              <div className="mt-4 space-y-6">
                <ProductDescription
                  as="p"
                  className="text-base text-gray-500"
                />
              </div>
            </section>
          </div>

          <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <SelectedVariantImage className="rounded-lg lg:h-full lg:max-h-full lg:w-full lg:max-w-full h-60 w-60 max-w-60 object-center object-cover" />
            </div>
          </div>

          <div>
            <div className="mt-8">
              <ProductOptions />
              <AddToCartMarkup />
            </div>
          </div>
        </div>
      </ProductProvider>
    </>
  );
}
