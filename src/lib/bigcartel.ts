const BIGCARTEL_SUBDOMAIN = "ns2agi";
const STORE_URL = `https://${BIGCARTEL_SUBDOMAIN}.bigcartel.com`;
const API_BASE = `https://api.bigcartel.com/${BIGCARTEL_SUBDOMAIN}`;

export interface BigCartelImage {
  url: string;
  secure_url?: string;
  width?: number;
  height?: number;
}

export interface BigCartelProduct {
  id: number;
  name: string;
  permalink: string;
  description?: string | null;
  status: string;
  price: number;
  on_sale?: boolean;
  position?: number;
  url?: string;
  images?: BigCartelImage[];
}

type FetchResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const fetchJson = async <T>(url: string): Promise<FetchResult<T>> => {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    return { ok: false, error: `Big Cartel ${response.status} for ${url}` };
  }
  const data = (await response.json()) as T;
  return { ok: true, data };
};

export const getProducts = async (limit = 50): Promise<FetchResult<BigCartelProduct[]>> => {
  return fetchJson<BigCartelProduct[]>(`${API_BASE}/products.json?limit=${limit}`);
};

export const getProductUrl = (permalink: string): string =>
  `${STORE_URL}/product/${permalink}`;

export const getStoreUrl = (): string => STORE_URL;

export const getImageUrl = (image: BigCartelImage | undefined): string | null => {
  if (!image) return null;
  return image.secure_url ?? image.url ?? null;
};

export const formatPrice = (amount: number, currency = "EUR"): string => {
  const formatter = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  });
  return formatter.format(amount);
};
