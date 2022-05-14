import {Link} from '@shopify/hydrogen';
import {BUTTON_PRIMARY_CLASSES} from './Button.client';

export function CartEmpty() {
  return (
    <div className="p-7 pt-20 flex flex-col">
      <p className="mb-4 text-lg text-gray-500 text-center">
        Your cart is empty
      </p>
      <Link to="/" className={BUTTON_PRIMARY_CLASSES}>
        Continue Shopping
      </Link>
    </div>
  );
}
