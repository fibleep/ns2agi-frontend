export type Money = {
    amount: string;
    currencyCode: string;
};

export type Image = {
    url: string;
    altText: string | null;
    width: number;
    height: number;
};

export type ProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    price: Money;
    compareAtPrice: Money | null;
};

export type Product = {
    id: string;
    handle: string;
    title: string;
    description: string;
    availableForSale: boolean;
    priceRange: {
        minVariantPrice: Money;
        maxVariantPrice: Money;
    };
    featuredImage: Image | null;
    images: Image[];
    variants: ProductVariant[];
    vendor: string;
    tags: string[];
};

export type ShopifyProductsResponse = {
    data: {
        products: {
            edges: Array<{
                node: {
                    id: string;
                    handle: string;
                    title: string;
                    description: string;
                    availableForSale: boolean;
                    priceRange: {
                        minVariantPrice: Money;
                        maxVariantPrice: Money;
                    };
                    featuredImage: Image | null;
                    images: {
                        edges: Array<{ node: Image }>;
                    };
                    variants: {
                        edges: Array<{ node: ProductVariant }>;
                    };
                    vendor: string;
                    tags: string[];
                };
            }>;
        };
    };
};

export type ShopifyCollectionResponse = {
    collection: {
        id: string;
        title: string;
        products: {
            edges: Array<{
                node: {
                    id: string;
                    handle: string;
                    title: string;
                    description: string;
                    availableForSale: boolean;
                    priceRange: {
                        minVariantPrice: Money;
                        maxVariantPrice: Money;
                    };
                    featuredImage: Image | null;
                    images: {
                        edges: Array<{ node: Image }>;
                    };
                    variants: {
                        edges: Array<{ node: ProductVariant }>;
                    };
                    vendor: string;
                    tags: string[];
                };
            }>;
        };
    } | null;
};

export type ShopifyError = {
    message: string;
    locations?: Array<{ line: number; column: number }>;
};

export type ShopifyResponse<T> = {
    data?: T;
    errors?: ShopifyError[];
};
