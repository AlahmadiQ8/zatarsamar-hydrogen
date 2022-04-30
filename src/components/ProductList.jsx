import {ProductCard} from './ProductCard';

export function ProductList({products}) {
  // Return a list of products organized in a three-column grid.
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {products.map((product) => (
        // Each product card maps to a product in the storefront.
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
