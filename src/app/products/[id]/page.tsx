"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, CreditCard } from "lucide-react"
import { products } from "@/data/products"
import { ReviewForm } from "@/components/reviews/ReviewForm"
import { ReviewList } from "@/components/reviews/ReviewList"
import { RelatedProducts } from "@/components/products/RelatedProducts"
import { Review } from "@/types"

interface ProductPageProps {
  params: {
    id: string
  }
}

// Giả lập dữ liệu đánh giá
const mockReviews: Review[] = [
  {
    id: 1,
    user: {
      name: "Nguyễn Văn A",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    },
    rating: 5,
    comment: "Sản phẩm rất tốt, đóng gói cẩn thận, giao hàng nhanh!",
    date: "2024-03-20",
    productId: 1,
    media: [
      {
        type: "image",
        url: "/reviews/review-1-1.jpg"
      },
      {
        type: "image",
        url: "/reviews/review-1-2.jpg"
      }
    ]
  },
  {
    id: 2,
    user: {
      name: "Trần Thị B",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    },
    rating: 4,
    comment: "Chất lượng sản phẩm tốt, giá cả hợp lý.",
    date: "2024-03-19",
    productId: 1,
    media: [
      {
        type: "video",
        url: "/reviews/review-2.mp4"
      }
    ]
  },
]

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === parseInt(params.id))
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [reviews, setReviews] = useState<Review[]>(mockReviews)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h1>
          <p className="text-gray-600">
            Xin lỗi, chúng tôi không tìm thấy sản phẩm bạn yêu cầu.
          </p>
        </div>
      </div>
    )
  }

  // Giả lập nhiều hình ảnh cho sản phẩm
  const images = [
    product.image,
    "/products/product-2.jpg",
    "/products/product-3.jpg",
    "/products/product-4.jpg",
  ]

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    const newReview: Review = {
      id: reviews.length + 1,
      user: {
        name: "Người dùng",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
      },
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split("T")[0],
      productId: product.id,
    }
    setReviews((prev) => [newReview, ...prev])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Gallery Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg group">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              quality={100}
            />
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-lg ${
                  selectedImage === index
                    ? "ring-2 ring-blue-500"
                    : "hover:ring-2 hover:ring-gray-300"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-baseline gap-4">
              <span className="text-2xl font-bold">${product.price}</span>
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice}
              </span>
              <span className="text-green-600 font-semibold">
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                % off
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">Mô tả sản phẩm</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">Tình trạng</h2>
            <p className="text-green-600 font-medium">Còn hàng</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Số lượng:</span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={decreaseQuantity}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Thêm vào giỏ hàng
              </button>
              <button className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t pt-12 space-y-8">
        <h2 className="text-2xl font-bold">Đánh giá từ khách hàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ReviewForm onSubmit={handleReviewSubmit} />
          </div>
          <div>
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="border-t pt-12">
        <RelatedProducts
          products={products}
          currentProductId={product.id}
        />
      </div>
    </div>
  )
} 