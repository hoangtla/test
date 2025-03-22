"use client"

import { useState } from "react"
import { Star, ImagePlus, VideoIcon, X } from "lucide-react"
import Image from "next/image"

interface Media {
  type: 'image' | 'video'
  url: string
  file: File
}

interface ReviewFormProps {
  onSubmit: (review: {
    rating: number
    comment: string
    media?: Media[]
  }) => void
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)
  const [media, setMedia] = useState<Media[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) return
    onSubmit({ rating, comment, media })
    setRating(0)
    setComment("")
    setMedia([])
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newMedia: Media[] = Array.from(files).map(file => ({
      type: file.type.startsWith('image/') ? 'image' : 'video',
      url: URL.createObjectURL(file),
      file
    }))

    setMedia([...media, ...newMedia])
  }

  const removeMedia = (index: number) => {
    const newMedia = [...media]
    URL.revokeObjectURL(newMedia[index].url)
    newMedia.splice(index, 1)
    setMedia(newMedia)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Đánh giá của bạn
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${
                  value <= (hoveredRating || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium mb-2"
        >
          Nhận xét
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thêm hình ảnh hoặc video
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 cursor-pointer">
              <ImagePlus className="h-5 w-5" />
              <span>Thêm ảnh</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            <label className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 cursor-pointer">
              <VideoIcon className="h-5 w-5" />
              <span>Thêm video</span>
              <input
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
        {media.length > 0 && (
          <div className="grid grid-cols-4 gap-4">
            {media.map((item, index) => (
              <div key={index} className="relative aspect-square">
                {item.type === 'image' ? (
                  <Image
                    src={item.url}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover rounded-lg"
                    controls
                  />
                )}
                <button
                  type="button"
                  onClick={() => removeMedia(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={rating === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Gửi đánh giá
      </button>
    </form>
  )
} 