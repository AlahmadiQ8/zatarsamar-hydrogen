import {
  Image,
  Link,
  ProductPrice,
  ProductProvider,
  ProductTitle,
} from '@shopify/hydrogen';

// import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
// import MoneyPrice from './MoneyPrice.client';

/**
 * A shared component that displays a single product to allow buyers to quickly identify a particular item of interest
 */
export function ProductCard({product}) {
  const firstVariant = product.variants.edges[0].node;

  const hasMoreThanOneVariant = product.variants.edges.length > 1;

  if (firstVariant == null) {
    return null;
  }

  return (
    <ProductProvider data={product} initialVariantId={firstVariant.id}>
      <Link
        to={`/products/${product.handle}`}
        className="group border rounded-lg"
      >
        <div className="flex w-full overflow-hidden space-x-2 rtl:space-x-reverse">
          {firstVariant.image && (
            <Image
              className="w-32 h-32 object-center object-cover group-hover:opacity-75 ltr:rounded-l-lg rtl:rounded-r-lg"
              data={firstVariant.image}
            />
          )}
          <div className="mb-2">
            <ProductTitle as="h3" className="mt-4 text-gray-700" />
            <div className="flex rtl:space-x-reverse space-x-1 mt-1 text-lg font-medium text-gray-900">
              <ProductPrice as="p" />
              {hasMoreThanOneVariant && <div>+</div>}
            </div>
          </div>
        </div>
      </Link>
    </ProductProvider>
  );
}
