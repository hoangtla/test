"use client"

import { useState, useEffect, Suspense, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Filter, Star } from "lucide-react"

import { Search } from "@/components/search"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { products } from "@/data/products"

const categories = [
  "All",
  "Smartphones",
  "Laptops",
  "Tablets",
  "Accessories",
  "Wearables",
]

/* eslint-disable @typescript-eslint/no-unused-vars */
const priceRanges = [
  "Under $100",
  "$100 - $500",
  "$500 - $1000",
  "$1000 - $2000",
  "Over $2000",
]

const ratings = ["4 & up", "3 & up", "2 & up", "1 & up"]
/* eslint-enable @typescript-eslint/no-unused-vars */

const sortOptions = [
  "Most Popular",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
  "Rating: High to Low",
]

interface Product {
  id: number
  name: string
  description: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  category: string
  relevanceScore?: number
}

function ProductList() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0])
  const [selectedSort, setSelectedSort] = useState("Most Popular")
  const [filteredProducts, setFilteredProducts] = useState(products)

  // Tính điểm phù hợp cho mỗi sản phẩm
  const calculateRelevanceScore = useCallback((product: Product) => {
    let score = 0

    // Điểm cho danh mục
    if (selectedCategory === "All" || product.category === selectedCategory.toLowerCase()) {
      score += 3
    }

    // Điểm cho khoảng giá
    if (product.price <= priceRange[0]) {
      score += 2
    }

    // Điểm cho số lượng đánh giá
    score += product.reviews / 1000

    return score
  }, [selectedCategory, priceRange])

  // Filter products based on search query and filters
  useEffect(() => {
    const query = searchParams.get("q")?.toLowerCase()
    let filtered = [...products]

    // Apply search filter
    if (query) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => 
        product.category === selectedCategory.toLowerCase()
      )
    }

    // Apply price filter
    if (priceRange[0] > 0) {
      filtered = filtered.filter(product => product.price <= priceRange[0])
    }

    // Calculate relevance score for each product
    const productsWithScore: (Product & { relevanceScore: number })[] = filtered.map(product => ({
      ...product,
      relevanceScore: calculateRelevanceScore(product)
    }))

    // Sort by relevance score
    productsWithScore.sort((a, b) => b.relevanceScore - a.relevanceScore)

    // Apply additional sorting if needed
    if (selectedSort !== "Most Relevant") {
      switch (selectedSort) {
        case "Price: Low to High":
          productsWithScore.sort((a, b) => a.price - b.price)
          break
        case "Price: High to Low":
          productsWithScore.sort((a, b) => b.price - a.price)
          break
        case "Rating: High to Low":
          productsWithScore.sort((a, b) => b.rating - a.rating)
          break
        case "Newest":
          productsWithScore.sort((a, b) => b.id - a.id)
          break
        case "Most Popular":
          productsWithScore.sort((a, b) => b.reviews - a.reviews)
          break
      }
    }

    setFilteredProducts(productsWithScore)
  }, [searchParams, selectedCategory, priceRange, selectedSort, calculateRelevanceScore])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Search className="mx-auto" />
      </div>

      <div className="flex items-center justify-between mb-8">
        <Sheet>
          <SheetTrigger className="inline-flex items-center gap-2 lg:hidden">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Narrow down your product search
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-medium mb-4">Category</h3>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[0]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between text-sm">
                    <span>$0</span>
                    <span>${priceRange[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Select value={selectedSort} onValueChange={setSelectedSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="hidden lg:block space-y-6">
          <div>
            <h3 className="font-medium mb-4">Category</h3>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <div className="space-y-4">
              <Slider
                defaultValue={[0]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-sm">
                <span>$0</span>
                <span>${priceRange[0]}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                Không tìm thấy sản phẩm nào phù hợp với tiêu chí tìm kiếm.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-xs font-semibold text-black">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2 group-hover:underline">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          ${product.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                        <span className="text-sm text-green-600">
                          {Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100
                          )}
                          % off
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <nav className="flex items-center gap-2">
          <button className="px-3 py-2 border rounded-md hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            1
          </button>
          <button className="px-3 py-2 border rounded-md hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 border rounded-md hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-2 border rounded-md hover:bg-gray-50">
            Next
          </button>
        </nav>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductList />
    </Suspense>
  )
} 