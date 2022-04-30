import {useShop, useShopQuery, flattenConnection, Seo} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import LoadMoreProducts from '../../components/LoadMoreProducts.client';
import Layout from '../../components/Layout.server';
import {ProductList} from '../../components/ProductList';
import NotFound from '../../components/NotFound.server';

export default function Collection({
  country = {isoCode: 'US'},
  collectionProductCount = 25,
  params,
}) {
  const {languageCode} = useShop();

  const {handle} = params;
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      handle,
      country: country.isoCode,
      language: languageCode,
      numProducts: collectionProductCount,
    },
    preload: true,
  });

  if (data?.collection == null) {
    return <NotFound />;
  }

  const collection = data.collection;
  const products = flattenConnection(collection.products);
  const hasNextPage = data.collection.products.pageInfo.hasNextPage;

  return (
    <Layout>
      {/* the seo object will be expose in API version 2022-04 or later */}
      <Seo type="collection" data={collection} />
      <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
        {collection.title}
      </h1>
      <div
        dangerouslySetInnerHTML={{__html: collection.descriptionHtml}}
        className="text-lg"
      />
      <p className="text-sm text-gray-500 mt-5 mb-5">
        {products.length} {products.length > 1 ? 'products' : 'product'}
      </p>
      {/* <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul> */}
      <ProductList products={products} />
      {hasNextPage && (
        <LoadMoreProducts startingCount={collectionProductCount} />
      )}
    </Layout>
  );
}

const QUERY = gql`
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $numProducts: Int!
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      title
      descriptionHtml
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: $numProducts) {
        pageInfo {
          hasNextPage
        }
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
`;
