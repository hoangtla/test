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

interface Media {
  type: 'image' | 'video'
  url: string
}

export interface Review {
  id: number
  user: {
    name: string
    avatar: string
  }
  rating: number
  comment: string
  date: string
  productId: number
  media?: Media[]
} 