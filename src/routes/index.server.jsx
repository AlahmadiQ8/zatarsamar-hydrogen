import {
  useShop,
  useShopQuery,
  flattenConnection,
  Link,
  Seo,
  CacheDays,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import {Layout} from '../components/Layout.server';
import FeaturedCollection from '../components/FeaturedCollection';
import {ProductList} from '../components/ProductList';
import Welcome from '../components/Welcome.server';
import {Suspense} from 'react';

export default function Index({country = {isoCode: 'KW'}}) {
  return (
    <Layout hero={<Welcome />}>
      <Suspense fallback={null}>
        <SeoForHomepage />
      </Suspense>
      <div className="relative mb-12">
        <Suspense fallback={<BoxFallback />}>
          <FeaturedProductsBox country={country} />
        </Suspense>
        <Suspense fallback={<BoxFallback />}>
          <FeaturedCollectionBox country={country} />
        </Suspense>
      </div>
    </Layout>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {title, description},
    },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheDays(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title,
        description,
      }}
    />
  );
}

function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}

function FeaturedProductsBox({country}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      language: languageCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredProductsCollection = collections[0];
  const featuredProducts = featuredProductsCollection
    ? flattenConnection(featuredProductsCollection.products)
    : null;

  return (
    <div className="bg-white p-12 shadow-xl rounded-xl mb-10">
      {featuredProductsCollection ? (
        <>
          <div className="flex justify-between items-center mb-8 text-md font-medium">
            <span className="text-black uppercase">
              {featuredProductsCollection.title}
            </span>
            <span className="hidden md:inline-flex">
              <Link
                to={`/collections/${featuredProductsCollection.handle}`}
                className="text-blue-600 hover:underline"
              >
                Shop all
              </Link>
            </span>
          </div>
          <ProductList products={featuredProducts} />
          <div className="md:hidden text-center">
            <Link
              to={`/collections/${featuredProductsCollection.handle}`}
              className="text-blue-600"
            >
              Shop all
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

function FeaturedCollectionBox({country}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      language: languageCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredCollection =
    collections && collections.length > 1 ? collections[1] : collections[0];

  return <FeaturedCollection collection={featuredCollection} />;
}

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;

const QUERY = gql`
  query indexContent($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(first: 2) {
      edges {
        node {
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
          products(first: 3) {
            edges {
              node {
                compareAtPriceRange {
                  maxVariantPrice {
                    currencyCode
                    amount
                  }
                  minVariantPrice {
                    currencyCode
                    amount
                  }
                }
                description
                descriptionHtml
                featuredImage {
                  url
                  width
                  height
                  altText
                }
                handle
                id
                media(first: 1) {
                  edges {
                    node {
                      ... on MediaImage {
                        mediaContentType
                        image {
                          id
                          url
                          altText
                          width
                          height
                        }
                      }
                      ... on Video {
                        mediaContentType
                        id
                        previewImage {
                          url
                        }
                        sources {
                          mimeType
                          url
                        }
                      }
                      ... on ExternalVideo {
                        mediaContentType
                        id
                        embedUrl
                        host
                      }
                      ... on Model3d {
                        mediaContentType
                        id
                        alt
                        mediaContentType
                        previewImage {
                          url
                        }
                        sources {
                          url
                        }
                      }
                    }
                  }
                }
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
                priceRange {
                  maxVariantPrice {
                    currencyCode
                    amount
                  }
                  minVariantPrice {
                    currencyCode
                    amount
                  }
                }
                seo {
                  description
                  title
                }
                title
                variants(first: 2) {
                  edges {
                    node {
                      availableForSale
                      compareAtPriceV2 {
                        amount
                        currencyCode
                      }
                      id
                      image {
                        id
                        url
                        altText
                        width
                        height
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
                      priceV2 {
                        amount
                        currencyCode
                      }
                      selectedOptions {
                        name
                        value
                      }
                      sku
                      title
                      unitPrice {
                        amount
                        currencyCode
                      }
                      unitPriceMeasurement {
                        measuredType
                        quantityUnit
                        quantityValue
                        referenceUnit
                        referenceValue
                      }
                    }
                  }
                }
                vendor
              }
            }
          }
        }
      }
    }
  }
`;
