"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Cart, CartItem, Product } from "@/types"

interface CartContextType {
  cart: Cart
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(() => {
    // Khôi phục giỏ hàng từ localStorage khi component được mount
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        return JSON.parse(savedCart)
      }
    }
    return { items: [], total: 0 }
  })

  // Lưu giỏ hàng vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.product.id === product.id)
      
      let newItems: CartItem[]
      if (existingItem) {
        // Cập nhật số lượng nếu sản phẩm đã có trong giỏ
        newItems = prevCart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Thêm sản phẩm mới vào giỏ
        newItems = [...prevCart.items, { product, quantity }]
      }

      return {
        items: newItems,
        total: calculateTotal(newItems)
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId)
      return {
        items: newItems,
        total: calculateTotal(newItems)
      }
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
      return {
        items: newItems,
        total: calculateTotal(newItems)
      }
    })
  }

  const clearCart = () => {
    setCart({ items: [], total: 0 })
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
} 