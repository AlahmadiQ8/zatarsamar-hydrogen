import {Suspense} from 'react';
import {Layout} from '../components/Layout.server';
import {CheckoutForm} from '../components/CheckoutForm.client';
import {translations} from '../translations';

export default function Checkout() {
  return (
    <Layout displayCartButton={false}>
      <Suspense fallback={null}>
        <div className="max-w-2xl mx-auto pt-20 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {translations.checkout.ar}
          </h1>
          <CheckoutForm />
        </div>
      </Suspense>
    </Layout>
  );
}
