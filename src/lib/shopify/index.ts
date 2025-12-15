import type { Product, ShopifyProductsResponse, ShopifyCollectionResponse, ShopifyResponse } from "./types";

const SHOPIFY_STORE_DOMAIN = "nsrobotics.myshopify.com";
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = "d7cf4bcbd805981cceb6920a4f7023e6";
const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2023-01/graphql.json";

const endpoint = `https://${SHOPIFY_STORE_DOMAIN}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;

type FetchResult<T> =
    | { ok: true; data: T }
    | { ok: false; error: string };

const shopifyFetch = async <T>(query: string, variables?: Record<string, unknown>): Promise<FetchResult<T>> => {
    if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
        return { ok: false, error: "Missing Shopify Storefront Access Token" };
    }

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
        return { ok: false, error: `HTTP error: ${response.status}` };
    }

    const json = await response.json() as ShopifyResponse<T>;

    if (json.errors && json.errors.length > 0) {
        return { ok: false, error: json.errors[0].message };
    }

    if (!json.data) {
        return { ok: false, error: "No data returned from Shopify" };
    }

    return { ok: true, data: json.data };
};

const getProductsQuery = `
    query getProducts($first: Int!) {
        products(first: $first, sortKey: CREATED_AT, reverse: true) {
            edges {
                node {
                    id
                    handle
                    title
                    description
                    availableForSale
                    priceRange {
                        minVariantPrice {
                            amount
                            currencyCode
                        }
                        maxVariantPrice {
                            amount
                            currencyCode
                        }
                    }
                    featuredImage {
                        url
                        altText
                        width
                        height
                    }
                    images(first: 5) {
                        edges {
                            node {
                                url
                                altText
                                width
                                height
                            }
                        }
                    }
                    variants(first: 10) {
                        edges {
                            node {
                                id
                                title
                                availableForSale
                                price {
                                    amount
                                    currencyCode
                                }
                                compareAtPrice {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                    vendor
                    tags
                }
            }
        }
    }
`;

const getCollectionProductsQuery = `
    query getCollectionProducts($handle: String!, $first: Int!) {
        collection(handle: $handle) {
            id
            title
            products(first: $first, sortKey: CREATED, reverse: true) {
                edges {
                    node {
                        id
                        handle
                        title
                        description
                        availableForSale
                        priceRange {
                            minVariantPrice {
                                amount
                                currencyCode
                            }
                            maxVariantPrice {
                                amount
                                currencyCode
                            }
                        }
                        featuredImage {
                            url
                            altText
                            width
                            height
                        }
                        images(first: 5) {
                            edges {
                                node {
                                    url
                                    altText
                                    width
                                    height
                                }
                            }
                        }
                        variants(first: 10) {
                            edges {
                                node {
                                    id
                                    title
                                    availableForSale
                                    price {
                                        amount
                                        currencyCode
                                    }
                                    compareAtPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                        }
                        vendor
                        tags
                    }
                }
            }
        }
    }
`;

const reshapeProducts = (response: ShopifyProductsResponse["data"]): Product[] => {
    return response.products.edges.map(({ node }) => ({
        id: node.id,
        handle: node.handle,
        title: node.title,
        description: node.description,
        availableForSale: node.availableForSale,
        priceRange: node.priceRange,
        featuredImage: node.featuredImage,
        images: node.images.edges.map((e) => e.node),
        variants: node.variants.edges.map((e) => e.node),
        vendor: node.vendor,
        tags: node.tags,
    }));
};

export const getProducts = async (count: number = 20): Promise<FetchResult<Product[]>> => {
    const result = await shopifyFetch<ShopifyProductsResponse["data"]>(getProductsQuery, { first: count });

    if (!result.ok) {
        return result;
    }

    return { ok: true, data: reshapeProducts(result.data) };
};

const reshapeCollectionProducts = (response: ShopifyCollectionResponse): Product[] => {
    if (!response.collection) {
        return [];
    }
    return response.collection.products.edges.map(({ node }) => ({
        id: node.id,
        handle: node.handle,
        title: node.title,
        description: node.description,
        availableForSale: node.availableForSale,
        priceRange: node.priceRange,
        featuredImage: node.featuredImage,
        images: node.images.edges.map((e) => e.node),
        variants: node.variants.edges.map((e) => e.node),
        vendor: node.vendor,
        tags: node.tags,
    }));
};

export const getCollectionProducts = async (handle: string, count: number = 20): Promise<FetchResult<Product[]>> => {
    const result = await shopifyFetch<ShopifyCollectionResponse>(getCollectionProductsQuery, { handle, first: count });

    if (!result.ok) {
        return result;
    }

    if (!result.data.collection) {
        return { ok: false, error: `Collection "${handle}" not found` };
    }

    return { ok: true, data: reshapeCollectionProducts(result.data) };
};

export const formatPrice = (amount: string, currencyCode: string): string => {
    const num = parseFloat(amount);
    return new Intl.NumberFormat("en-EU", {
        style: "currency",
        currency: currencyCode,
    }).format(num);
};

export const getProductUrl = (handle: string): string => {
    return `https://${SHOPIFY_STORE_DOMAIN}/products/${handle}`;
};

export const getCheckoutUrl = (variantId: string): string => {
    const numericId = variantId.split('/').pop();
    return `https://${SHOPIFY_STORE_DOMAIN}/cart/${numericId}:1`;
};
