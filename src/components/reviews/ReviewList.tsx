"use client"

import Image from "next/image"
import { Star } from "lucide-react"

interface Media {
  type: 'image' | 'video'
  url: string
}

interface Review {
  id: number
  user: {
    name: string
    avatar: string
  }
  rating: number
  comment: string
  date: string
  media?: Media[]
}

interface ReviewListProps {
  reviews: Review[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6">
          <div className="flex items-start gap-4">
            <div className="relative w-10 h-10">
              <Image
                src={review.user.avatar}
                alt={review.user.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{review.user.name}</h3>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-2 text-gray-600">{review.comment}</p>
              
              {review.media && review.media.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {review.media.map((item, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      {item.type === 'image' ? (
                        <Image
                          src={item.url}
                          alt={`Review media ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <video
                          src={item.url}
                          className="w-full h-full object-cover"
                          controls
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 