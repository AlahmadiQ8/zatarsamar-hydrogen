import {
  useProduct,
  AddToCartButton,
  BuyNowButton,
} from '@shopify/hydrogen/client';
import { translations } from '../translations';
import {
  BUTTON_PRIMARY_CLASSES,
  BUTTON_SECONDARY_CLASSES,
} from './Button.client';

export function AddToCartMarkup() {
  const {selectedVariant} = useProduct();
  const isOutOfStock = !selectedVariant.availableForSale;

  return (
    <div className="md:mt-10 mt-5">
      <AddToCartButton
        className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
        disabled={isOutOfStock}
      >
        {isOutOfStock ? 'Out of stock' : translations.addToCart.ar}
      </AddToCartButton>
    </div>
  );
}
