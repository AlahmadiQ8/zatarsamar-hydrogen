import {Suspense} from 'react';
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

  if (firstVariant == null) {
    return null;
  }

  return (
    <ProductProvider data={product} initialVariantId={firstVariant.id}>
      <div className="mb-6">
        <Link to={`/products/${product.handle}`}>
          {firstVariant.image && (
            <Image className="mb-3" data={firstVariant.image} />
          )}
          <ProductTitle className="py-2 font-medium" />
          <ProductPrice className="text-gray-600" />
        </Link>
      </div>
    </ProductProvider>
  );
}
