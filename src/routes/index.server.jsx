import {
  useShop,
  useShopQuery,
  flattenConnection,
  Seo,
  CacheDays,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import {Layout} from '../components/Layout.server';
import FeaturedCollection from '../components/FeaturedCollection';
import {ProductList} from '../components/ProductList';
import Welcome from '../components/Welcome.server';
import {Suspense} from 'react';
import {translations} from '../translations';

export default function Index({country = {isoCode: 'KW'}}) {
  return (
    <Layout hero={<Welcome />}>
      <Suspense fallback={null}>
        <SeoForHomepage />
      </Suspense>
      <div className="relative mb-12">
        <Suspense fallback={<BoxFallback />}>
          {/* <StoreDescription /> */}
          <FeaturedProductsBox country={country} />
        </Suspense>
        {/* <Suspense fallback={<BoxFallback />}>
          <FeaturedCollectionBox country={country} />
        </Suspense> */}
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
    <div className="p-5 md:p-12 shadow-xl rounded-xl mb-10">
      {featuredProductsCollection ? (
        <>
          <h1 className="text-black mb-8 text-2xl font-medium">
            {translations.ourProducts.ar}
          </h1>
          <ProductList products={featuredProducts} />
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

// function StoreDescription() {
//   return (
//     <div className="relative shadow-xl rounded-xl md:my-10 my-5">
//       {/* <div className="h-56 sm:h-72 md:absolute rtl:md:right-0 ltr:md:left-0 md:h-full md:w-1/2">
//         <Image
//           className="w-full h-full object-cover rtl:md:rounded-tr-xl rtl:md:rounded-br-xl ltr:md:rounded-tl-xl ltr:md:rounded-bl-xl rounded-t-xl rtl:md:rounded-tl-none ltr:md:rounded-tr-none"
//           src={ZatarImage}
//           width={739}
//           height={739}
//         />
//       </div> */}
//       <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
//         <div className="rtl:md:mr-auto ltr:md:ml-auto md:w-1/2 rtl:md:pr-10 ltr:md:pl-10">
//           <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
//             مشروع كويتي
//           </p>
//           <p className="mt-3 text-lg">
//           أجود أنواع الزعتر الفلسطيني
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

const QUERY = gql`
  query indexContent($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(first: 1) {
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
          products(first: 100) {
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
