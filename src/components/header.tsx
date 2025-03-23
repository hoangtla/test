"use client"

import Link from "next/link"
import { Search } from "./search"
import { CartSheet } from "./cart/CartSheet"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Store</span>
        </Link>
        <div className="flex flex-1 items-center">
          <nav className="flex items-center space-x-6 mr-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary">
              Categories
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
          </nav>
          <div className="flex-1">
            <Search />
          </div>
        </div>
        <div className="flex items-center space-x-4 ml-6">
          <CartSheet />
          <Link
            href="/auth/signin"
            className="text-sm font-medium hover:text-primary"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  )
} 