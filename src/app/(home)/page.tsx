"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { products } from "@/data/products"

const banners = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Discover our latest summer collection with up to 50% off",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
    href: "/products",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our newest products for this season",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    href: "/new-arrivals",
  },
]

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const latestProducts = products.slice(0, 4) // Chỉ hiển thị 4 sản phẩm mới nhất

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prevSlide = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const nextSlide = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Banner Carousel */}
      <div className="relative">
        <div className="relative h-[400px] w-full overflow-hidden">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 h-full w-full transform transition-transform duration-500 ease-in-out ${
                index === currentBanner ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-4xl font-bold">{banner.title}</h1>
                <p className="mt-4 max-w-md text-lg">{banner.description}</p>
                <Button asChild className="mt-8">
                  <Link href={banner.href}>Shop Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentBanner ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>

      {/* Latest Products */}
      <section className="container">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Latest Products</h2>
          <Button variant="link" asChild>
            <Link href="/products">View All</Link>
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latestProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg border bg-background transition-all duration-300 hover:shadow-lg"
            >
              <Link href={`/products/${product.id}`} className="relative block">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-xs font-semibold text-black">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button variant="secondary">View Details</Button>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <div className="mb-2 flex items-center gap-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : i < product.rating
                            ? "fill-yellow-400/50 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                <Link href={`/products/${product.id}`} className="block hover:underline">
                  <h3 className="font-medium">{product.name}</h3>
                </Link>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 