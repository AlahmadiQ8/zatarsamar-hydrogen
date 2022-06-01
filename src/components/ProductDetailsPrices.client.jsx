import {useProduct, ProductPrice, Image} from '@shopify/hydrogen/client';

export function ProductPrices() {
  const product = useProduct();

  return (
    <>
      <ProductPrice
        className="text-gray-500 line-through text-lg font-semibold"
        priceType="compareAt"
        variantId={product.selectedVariant.id}
      />
      <ProductPrice
        className="text-gray-900 text-lg font-semibold"
        variantId={product.selectedVariant.id}
      />
    </>
  );
}

export function ProductDetailsProductPrice(props) {
  const product = useProduct();

  return <ProductPrice variantId={product.selectedVariant.id} {...props} />;
}

export function SelectedVariantImage(props) {
  const product = useProduct();

  return <Image data={product.selectedVariant.image} {...props} />;
}

// export function options() {
  
// }