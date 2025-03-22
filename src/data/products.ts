export interface Product {
  id: number
  name: string
  description: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  category: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    description: "The most powerful iPhone ever with titanium design",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
    price: 1199,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 245,
    category: "smartphones"
  },
  {
    id: 2,
    name: "MacBook Pro 16",
    description: "Supercharged by M2 Pro and M2 Max",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    price: 2499,
    originalPrice: 2699,
    rating: 4.9,
    reviews: 189,
    category: "laptops"
  },
  {
    id: 3,
    name: "iPad Air",
    description: "Serious performance in a thin and light design",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    price: 599,
    originalPrice: 649,
    rating: 4.7,
    reviews: 156,
    category: "tablets"
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    description: "Advanced health features and powerful performance",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    price: 399,
    originalPrice: 429,
    rating: 4.6,
    reviews: 178,
    category: "wearables"
  },
  {
    id: 5,
    name: "AirPods Pro",
    description: "Active noise cancellation for immersive sound",
    image: "https://images.unsplash.com/photo-1588156979435-379b9d802b9a",
    price: 249,
    originalPrice: 279,
    rating: 4.7,
    reviews: 203,
    category: "accessories"
  },
  {
    id: 6,
    name: "Samsung Galaxy S24 Ultra",
    description: "Revolutionary AI features and powerful camera system",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
    price: 1299,
    originalPrice: 1399,
    rating: 4.8,
    reviews: 167,
    category: "smartphones"
  },
  {
    id: 7,
    name: "Dell XPS 15",
    description: "Premium laptop with stunning OLED display",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
    price: 1899,
    originalPrice: 2099,
    rating: 4.6,
    reviews: 145,
    category: "laptops"
  },
  {
    id: 8,
    name: "Samsung Galaxy Tab S9",
    description: "Premium Android tablet with S Pen support",
    image: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126",
    price: 799,
    originalPrice: 899,
    rating: 4.5,
    reviews: 112,
    category: "tablets"
  },
  {
    id: 9,
    name: "Samsung Galaxy Watch 6",
    description: "Advanced health tracking and smart features",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1",
    price: 299,
    originalPrice: 349,
    rating: 4.4,
    reviews: 98,
    category: "wearables"
  },
  {
    id: 10,
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancelling headphones",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb",
    price: 349,
    originalPrice: 399,
    rating: 4.8,
    reviews: 234,
    category: "accessories"
  },
  {
    id: 11,
    name: "Google Pixel 8 Pro",
    description: "Advanced AI photography and pure Android experience",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    price: 999,
    originalPrice: 1099,
    rating: 4.7,
    reviews: 156,
    category: "smartphones"
  },
  {
    id: 12,
    name: "ASUS ROG Zephyrus",
    description: "Ultimate gaming laptop with RTX 4090",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    price: 2999,
    originalPrice: 3299,
    rating: 4.9,
    reviews: 89,
    category: "laptops"
  }
] 