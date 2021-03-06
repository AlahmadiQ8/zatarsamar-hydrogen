import {
  useShop,
  useShopQuery,
  flattenConnection,
  Link,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Layout} from './Layout.server';
import {ProductCard} from './ProductCard';

/**
 * A server component that defines the content to display when a page isn't found (404 error)
 */
function NotFoundHero() {
  return (
    <div className="py-10 border-b border-gray-200">
      <div className="max-w-3xl text-center mx-4 md:mx-auto">
        <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
          We&#39;ve lost this page
        </h1>
        <p className="text-lg m-8 text-gray-500">
          We couldn’t find the page you’re looking for. Try checking the URL or
          heading back to the home page.
        </p>
        <Link
          to="/"
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Take me to the home page
        </Link>
      </div>
    </div>
  );
}

export function NotFound({country = {isoCode: 'US'}, response}) {
  if (response) {
    response.doNotStream();
    response.writeHead({status: 404, statusText: 'Not found'});
  }

  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      language: languageCode,
    },
  });
  const products = data ? flattenConnection(data.products) : [];

  return (
    <Layout>
      <NotFoundHero />
      <div className="my-8">
        <p className="mb-8 text-lg text-black font-medium uppercase">
          Products you might like
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const QUERY = gql`
  query NotFoundProductDetails($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 3) {
      edges {
        node {
          handle
          id
          title
          metafields(first: 20) {
            edges {
              node {
                id
                type
                namespace
                key
                value
                createdAt
                updatedAt
                description
                reference {
                  __typename
                  ... on MediaImage {
                    id
                    mediaContentType
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
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                image {
                  id
                  url
                  altText
                  width
                  height
                }
                priceV2 {
                  currencyCode
                  amount
                }
                compareAtPriceV2 {
                  currencyCode
                  amount
                }
                selectedOptions {
                  name
                  value
                }
                metafields(first: 10) {
                  edges {
                    node {
                      id
                      type
                      namespace
                      key
                      value
                      createdAt
                      updatedAt
                      description
                      reference {
                        __typename
                        ... on MediaImage {
                          id
                          mediaContentType
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
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
