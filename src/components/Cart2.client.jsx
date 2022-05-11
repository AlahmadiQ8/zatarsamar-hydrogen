import {
  Link,
  useCart,
  CartLineProvider,
  CartLineImage,
  CartLineProductTitle,
  CartLinePrice,
  CartLineQuantityAdjustButton,
  CartEstimatedCost,
} from '@shopify/hydrogen/client';
import {BUTTON_PRIMARY_CLASSES} from './Button.client';
import {LoadingFallback} from './LoadingFallback';
import {XIcon} from '@heroicons/react/solid';
import {translations} from '../translations';

export function Cart2() {
  const {totalQuantity, lines, linesUpdate, status} = useCart();

  if (status == 'fetching' || status == 'uninitialized') {
    return <LoadingFallback />;
  }

  if (totalQuantity == 0) {
    return <CartEmpty />;
  }

  return (
    <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
      <section aria-labelledby="cart-heading" className="lg:col-span-7">
        <h2 id="cart-heading" className="sr-only">
          Items in your shopping cart
        </h2>
        <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
          {lines.map((line) => {
            return (
              <CartLineProvider key={line.id} line={line}>
                <li className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <CartLineImage className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48" />
                  </div>

                  <div className="rtl:mr-4 ltr:ml-4 flex-1 flex flex-col justify-between ltr:sm:ml-6 rtl:sm:mr-6">
                    <div className="relative rtl:pl-9 ltr:pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 rtl:sm:pl-0 ltr:sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a
                              href={`/products/${line.merchandise.product.handle}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              <CartLineProductTitle />
                            </a>
                          </h3>
                        </div>
                        {line.attributes}
                        <ul className="mt-1 flex text-sm divide-x divide-gray-200 text-gray-500">
                          {line.merchandise.selectedOptions.map((option) => (
                            <li key={option.value}>{option.value}</li>
                          ))}

                          {/* <p className="text-gray-500">{product.color}</p>
                              {product.size ? (
                                <p className="rtl:mr-4 ltr:ml-4 rtl:pr-4 ltr:pl-4 rtl:border-r ltr:border-l border-gray-200 text-gray-500">
                                  {product.size}
                                </p>
                              ) : null} */}
                        </ul>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          <CartLinePrice />
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 rtl:sm:pl-9 ltr:sm:pr-9">
                        <label
                          htmlFor={`quantity-${line.id}`}
                          className="sr-only"
                        >
                          Quantity, {line.CartLineProductTitle}
                        </label>
                        <select
                          id={`quantity-${line.id}`}
                          name={`quantity-${line.id}`}
                          onChange={(e) =>
                            linesUpdate([
                              {
                                id: line.id,
                                quantity: parseInt(e.target.value),
                              },
                            ])
                          }
                          className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 rtl:text-right ltr:text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                            <option
                              key={quantity}
                              value={quantity}
                              selected={quantity === line.quantity}
                            >
                              {quantity}
                            </option>
                          ))}
                        </select>

                        <div className="absolute top-0 rtl:left-0 ltr:right-0">
                          <button
                            type="button"
                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                          >
                            <CartLineQuantityAdjustButton
                              adjust="remove"
                              aria-label="Remove from cart"
                              className="disabled:pointer-events-all disabled:cursor-wait"
                            >
                              <XIcon className="h-5 w-5" aria-hidden="true" />
                            </CartLineQuantityAdjustButton>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* TODO: IN STOCK VS NONE IN STOCK */}
                    {/* <p className="mt-4 flex text-sm text-gray-700 space-x-2 rtl:space-x-reverse">
                            {product.inStock ? (
                              <CheckIcon
                                className="flex-shrink-0 h-5 w-5 text-green-500"
                                aria-hidden="true" />
                            ) : (
                              <ClockIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-300"
                                aria-hidden="true" />
                            )}

                            <span>
                              {product.inStock
                                ? 'In stock'
                                : `Ships in ${product.leadTime}`}
                            </span>
                          </p> */}
                  </div>
                </li>
              </CartLineProvider>
            );
          })}
        </ul>
      </section>

      {/* Order summary */}
      <section
        aria-labelledby="summary-heading"
        className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
      >
        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
          {translations.orderSummary.ar}
        </h2>

        <dl className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-600">
              {translations.subtotal.ar}
            </dt>
            <dd className="text-sm font-medium text-gray-900">
              <CartEstimatedCost amountType="subtotal" />
            </dd>
          </div>
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <dt className="flex items-center text-sm text-gray-600">
              {translations.shipping.ar}
            </dt>
            <dd className="text-sm text-gray-500">
              {translations.calculatedAtNextStep.ar}
            </dd>
          </div>
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <dt className="text-base font-medium text-gray-900">
              {translations.orderTotal.ar}
            </dt>
            <dd className="text-base font-medium text-gray-900">
              <CartEstimatedCost amountType="total" />
            </dd>
          </div>
        </dl>

        <div className="mt-6">
          <Link
            to="/checkout"
            className="text-center inline-block w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
          >
            {translations.nextStep.ar}
          </Link>
        </div>
      </section>
    </form>
  );
}

function CartEmpty() {
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
