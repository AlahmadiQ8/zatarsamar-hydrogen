import {Suspense} from 'react';

import {Layout} from '../components/Layout.server';
import {Cart2} from '../components/Cart2.client';

export default function Cart() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Cart2 />
      </Suspense>
    </Layout>
  );
}
