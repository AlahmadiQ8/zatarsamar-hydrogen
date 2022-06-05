import {ShoppingBagIcon} from '@heroicons/react/outline';
import {Link, useCart, CartEstimatedCost} from '@shopify/hydrogen/client';
import {translations} from '../translations';

export function StickyCartButton() {
  const {totalQuantity} = useCart();
  const hasItemsInCart = totalQuantity > 0;
  if (!hasItemsInCart) return null;

  return (
    <Link
      to="/cart"
      type="button"
      className="w-full items-center justify-between max-w-md inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      <div className="flex items-center">
        {translations.reviewOrder.ar}
        <ShoppingBagIcon
          className="ltr:-mr-1 rtl:-ml-1 ltr:ml-3 rtl:mr-2 h-5 w-5"
          aria-hidden="true"
        />
      </div>
      <CartEstimatedCost amountType="subtotal" />
    </Link>
  );
}
