// Product components
import React from 'react'
import { Card, CardContent } from '@/components/ui'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils/format'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-3 aspect-h-4 bg-gray-200">
        <div className="w-full h-80 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          <span className="text-gray-600 font-medium">{product.name}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
