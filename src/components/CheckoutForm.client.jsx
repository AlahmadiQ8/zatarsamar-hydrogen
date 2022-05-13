import {useState} from 'react';
import {RadioGroup} from '@headlessui/react';
import {
  CheckCircleIcon,
  TrashIcon,
  LocationMarkerIcon,
} from '@heroicons/react/solid';
import {translations} from '../translations';
import {Link} from '@shopify/hydrogen/client';
import {MoneyLocalized} from './MoneyLocalized';

const paymentMethods = [
  {id: 'online', title: translations.online.ar},
  {id: 'cash', title: translations.cash.ar},
];

const products = [
  {
    id: 1,
    title: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    size: 'Large',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
];
const deliveryMethods = [
  {
    id: 1,
    title: translations.pickup.ar,
    turnaround: translations.pickupYourSelf.ar,
    price: 0,
  },
  {
    id: 2,
    title: translations.delivery.ar,
    turnaround: '',
    price: translations.deliveryPriceBasedOnCity.ar,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const customerInfo = {
  recipient: '',
  shippingMethod: deliveryMethods[0].title,
  deliveryAddress: '',
  paymentMethod: paymentMethods[0],
};

export function CheckoutForm() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0],
  );

  const [currentCustomerInfo, setCurrrentCustomerInfo] = useState(customerInfo);

  const recipientOnChange = (e) => {
    setCurrrentCustomerInfo({
      ...currentCustomerInfo,
      recipient: e.target.value,
    });
  };

  const setSelectedDeliveryMethodWrapper = (value) => {
    setCurrrentCustomerInfo({
      ...currentCustomerInfo,
      shippingMethod: value.title,
    });

    setSelectedDeliveryMethod(value);
  };

  const deliveryAddressOnChange = (e) => {
    setCurrrentCustomerInfo({
      ...currentCustomerInfo,
      deliveryAddress: e.target.value,
    });
  };

  const setPaymentMethod = (e) => {
    setCurrrentCustomerInfo({
      ...currentCustomerInfo,
      paymentMethod: e.target.value,
    });
  };

  console.log(currentCustomerInfo);

  return (
    <form className="mt-12 lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
      <div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            {translations.contactInformation.ar}
          </h2>

          <div className="mt-4">
            <label
              htmlFor="receipt-for-who"
              className="block text-sm font-medium text-gray-700"
            >
              {translations.receiptByWho.ar}
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="receipt-for-who"
                name="receipt-for-who"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                onChange={recipientOnChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-10">
          <RadioGroup
            value={selectedDeliveryMethod}
            onChange={setSelectedDeliveryMethodWrapper}
          >
            <RadioGroup.Label className="text-lg font-medium text-gray-900">
              {translations.deliveryMethod.ar}
            </RadioGroup.Label>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              {deliveryMethods.map((deliveryMethod) => (
                <RadioGroup.Option
                  key={deliveryMethod.id}
                  value={deliveryMethod}
                  className={({checked, active}) =>
                    classNames(
                      checked ? 'border-transparent' : 'border-gray-300',
                      active ? 'ring-2 ring-indigo-500' : '',
                      'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none',
                    )
                  }
                >
                  {({checked, active}) => (
                    <>
                      <div className="flex-1 flex">
                        <div className="flex flex-col">
                          <RadioGroup.Label
                            as="span"
                            className="block text-sm font-medium text-gray-900"
                          >
                            {deliveryMethod.title}
                          </RadioGroup.Label>
                          {/* <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            {deliveryMethod.turnaround}
                          </RadioGroup.Description> */}
                          <RadioGroup.Description
                            as="span"
                            className="mt-6 text-sm font-medium text-gray-900"
                          >
                            {typeof deliveryMethod.price == 'number' ? (
                              <MoneyLocalized amount={deliveryMethod.price} />
                            ) : (
                              deliveryMethod.price
                            )}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked ? (
                        <CheckCircleIcon
                          className="h-5 w-5 text-indigo-600"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div
                        className={classNames(
                          active ? 'border' : 'border-2',
                          checked ? 'border-indigo-500' : 'border-transparent',
                          'absolute -inset-px rounded-lg pointer-events-none',
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-medium text-gray-900">
            {selectedDeliveryMethod.id == 1
              ? translations.pickupInformation.ar
              : translations.shippingInformation.ar}
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {/* <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  autoComplete="given-name"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  autoComplete="family-name"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div> */}

            {selectedDeliveryMethod.id == 1 ? (
              <PickupInformation />
            ) : (
              <DeliveryInformation onChangeHandler={deliveryAddressOnChange} />
            )}
          </div>
        </div>

        {/* Payment */}
        <div className="mt-10 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-medium text-gray-900">Payment</h2>

          <fieldset className="mt-4">
            <legend className="sr-only">Payment type</legend>
            <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10 sm:space-x-reverse ">
              {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                <div
                  key={paymentMethod.id}
                  className="flex items-center"
                  onChange={setPaymentMethod}
                >
                  {paymentMethodIdx === 0 ? (
                    <input
                      id={paymentMethod.id}
                      name="payment-type"
                      type="radio"
                      defaultChecked
                      value={paymentMethod.title}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                  ) : (
                    <input
                      id={paymentMethod.id}
                      name="payment-type"
                      type="radio"
                      value={paymentMethod.title}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                  )}

                  <label
                    htmlFor={paymentMethod.id}
                    className="rtl:mr-3 ltr:ml-3 block text-sm font-medium text-gray-700"
                  >
                    {paymentMethod.title}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      {/* Order summary */}
      <div className="mt-10 lg:mt-0">
        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="sr-only">Items in your cart</h3>
          <ul className="divide-y divide-gray-200">
            {products.map((product) => (
              <li key={product.id} className="flex py-6 px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-20 rounded-md"
                  />
                </div>

                <div className="rtl:mr-6 ltr:ml-6 flex-1 flex flex-col">
                  <div className="flex">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm">
                        <a
                          href={product.href}
                          className="font-medium text-gray-700 hover:text-gray-800"
                        >
                          {product.title}
                        </a>
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.size}
                      </p>
                    </div>

                    <div className="rtl:mr-4 ltr:ml-4 flex-shrink-0 flow-root">
                      <button
                        type="button"
                        className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Remove</span>
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 pt-2 flex items-end justify-between">
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {product.price}
                    </p>

                    <div className="rtl:mr-4 ltr:ml-4">
                      <label htmlFor="quantity" className="sr-only">
                        Quantity
                      </label>
                      <select
                        id="quantity"
                        name="quantity"
                        className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                      </select>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
            <div className="flex items-center justify-between">
              <dt className="text-sm">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">$64.00</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Shipping</dt>
              <dd className="text-sm font-medium text-gray-900">$5.00</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Taxes</dt>
              <dd className="text-sm font-medium text-gray-900">$5.52</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <dt className="text-base font-medium">Total</dt>
              <dd className="text-base font-medium text-gray-900">$75.52</dd>
            </div>
          </dl>

          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              Confirm order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function DeliveryInformation({onChangeHandler}) {
  return (
    <div className="sm:col-span-2">
      <label
        htmlFor="address"
        className="block text-sm font-medium text-gray-700"
      >
        {translations.address.ar}
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="address"
          id="address"
          autoComplete="street-address"
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={translations.addressPlaceHolder.ar}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
}

function PickupInformation() {
  return (
    <div className="sm:col-span-2">
      <div className="block text-sm font-medium text-gray-700">
        {translations.address.ar}
      </div>
      <div className="mt-2 block text-sm font-normal text-gray-700">
        {translations.fullAddress.ar}
      </div>
      <div className="mt-2 block text-sm font-medium text-gray-700">
        {translations.googleMapsAddress.ar}
      </div>
      <div className="mt-1">
        <Link
          to="https://goo.gl/maps/H887haRhckgJNgep9"
          // className="inline-flex rtl:flex-row-reverse items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          className="inline-flex rtl:flex-row-reverse items-center text-sm text-blue-500 hover:text-blue-700"
          target="_blank"
          rel="noopener"
        >
          https://goo.gl/maps/H887haRhckgJNgep9
          <LocationMarkerIcon
            className="ml-3 ltr:-mr-1 h-5 w-5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  );
}
