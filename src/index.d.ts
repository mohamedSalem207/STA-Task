declare module "*/css";

declare type Category = {
  id: string;
  display_name: string;
  image: string;
  opens_at: string | null;
};

declare type Restaurant = Category;

declare type Product = {
  id: number;
  image: string;
  price: number;
  name: string;
  display_name: string;
  description: string;
  is_category_off: boolean;
  in_cart: boolean;
  in_cart_count: number;
  extrasWithOptions: any[];
  restaurant: number;
};
