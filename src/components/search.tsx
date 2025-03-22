"use client"

import { useRouter } from "next/navigation"
import { Search as SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

export function Search({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const searchQuery = formData.get("search")?.toString()

    if (searchQuery) {
      router.push(`/products?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`relative ${className}`}
      {...props}
    >
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        name="search"
        placeholder="Search products..."
        className="pl-8"
      />
    </form>
  )
} 