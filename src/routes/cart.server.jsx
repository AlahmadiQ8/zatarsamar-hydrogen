import {Suspense} from 'react';

import {Layout} from '../components/Layout.server';
import {Cart2} from '../components/Cart2.client';

export default function Cart() {
  return (
    <Layout>
      <Suspense fallback={<BoxFallback />}>
        <Cart2 />
      </Suspense>
    </Layout>
  );
}

function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}
