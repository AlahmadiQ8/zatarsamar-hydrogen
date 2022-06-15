import {
  useShop,
  useShopQuery,
  flattenConnection,
  LocalizationProvider,
  CacheHours,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import Header from './Header.client';
import Footer from './Footer.server';
import {Suspense} from 'react';
import {StickyCartButton} from './StickyCartButton.client';

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */
export function Layout({children, hero, displayCartButton = true}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      language: languageCode,
      numCollections: 3,
    },
    cache: CacheHours(),
    preload: '*',
  });
  const collections = data ? flattenConnection(data.collections) : null;
  const products = data ? flattenConnection(data.products) : null;
  const storeName = data ? data.shop.name : '';

  return (
    <LocalizationProvider preload="*">
      {displayCartButton && (
        <div className="flex sm:justify-center justify-end fixed bottom-1 inset-x-0 pb-2 sm:pb-5 z-50 mx-1">
          <StickyCartButton />
        </div>
      )}
      <div className="min-h-screen text-gray-700 font-sans relative">
        {/* TODO: Find out why Suspense needs to be here to prevent hydration errors. */}
        <Suspense fallback={null}>
          <Header collections={collections} storeName={storeName} />
        </Suspense>
        <main role="main" id="mainContent" className="relative ">
          {hero}
          <div className="mx-auto max-w-7xl p-4 md:py-5 md:px-8">
            <Suspense fallback={null}>{children}</Suspense>
          </div>
        </main>
        <Footer collection={collections[0]} product={products[0]} />
      </div>
    </LocalizationProvider>
  );
}

const QUERY = gql`
  query layoutContent($language: LanguageCode, $numCollections: Int!)
  @inContext(language: $language) {
    shop {
      name
    }
    collections(first: $numCollections) {
      edges {
        node {
          description
          handle
          id
          title
          image {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
    products(first: 1) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;
