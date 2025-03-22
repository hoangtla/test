import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

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

const products = [
  {
    id: 1,
    name: "Basic T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    href: "/products/basic-t-shirt",
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    href: "/products/denim-jeans",
  },
  {
    id: 3,
    name: "Leather Jacket",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    href: "/products/leather-jacket",
  },
  {
    id: 4,
    name: "Sneakers",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    href: "/products/sneakers",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Banner Carousel */}
      <div className="relative">
        <div className="relative h-[400px] w-full overflow-hidden">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="absolute inset-0 h-full w-full"
              style={{ display: banner.id === 1 ? "block" : "none" }}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={banner.id === 1}
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
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
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
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group relative overflow-hidden rounded-lg border bg-background"
            >
              <div className="aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
} 