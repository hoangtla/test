"use client"

import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from "@/contexts/CartContext"
import { formatCurrency } from "@/lib/utils"

export function CartSheet() {
  const { cart, updateQuantity, removeFromCart } = useCart()

  return (
    <Sheet>
      <SheetTrigger className="relative">
        <ShoppingCart className="h-6 w-6" />
        {cart.items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.items.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Giỏ hàng của bạn</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col h-[calc(100vh-8rem)]">
          {cart.items.length === 0 ? (
            <div className="text-center text-gray-500 flex-1 flex flex-col items-center justify-center">
              <ShoppingCart className="h-12 w-12 mb-4 text-gray-400" />
              <p className="mb-4">Giỏ hàng trống</p>
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4 py-4 border-b"
                  >
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <div className="text-sm text-gray-500">
                        {formatCurrency(item.product.price)}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Tổng cộng:</span>
                  <span>{formatCurrency(cart.total)}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/cart"
                    className="w-full text-center py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Xem giỏ hàng
                  </Link>
                  <Link
                    href="/checkout"
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Thanh toán
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
} 