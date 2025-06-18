export interface BookDetail {
  title: string;
  link: string;
  author: string;
  pubDate: string;
  description: string;
  isbn: string;
  isbn13: string;
  itemId: number;
  priceSales: number;
  priceStandard: number;
  mallType: string;
  stockStatus: string;
  mileage: number;
  cover: string;
  categoryId: number;
  categoryName: string;
  publisher: string;
  salesPoint: number;
  adult: boolean;
  fixedPrice: boolean;
  customerReviewRank?: number;
  subInfo?: {
    subTitle: string;
    originalTitle: string;
    itemPage: number;
  };
}

export interface Review {
  id: string;
  review: string;
  date: string;
  rating: number;
  user_id: string;
  author: {
    name: string;
    image: string | null;
  };
}

export interface BookData {
  author: string | null;
  categoryId: number | null;
  categoryName: string | null;
  cover: string | null;
  created_at: string;
  description: string | null;
  id: string;
  title: string;
}
