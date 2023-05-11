import Image from 'next/image'
import { TAKE, CATEGORY_MAP } from 'constants/products'

import { products } from '@prisma/client'

import { useRouter } from 'next/router'

type ProductType = {
  product: products
}

export default function ProductList({ product }: ProductType) {
  const router = useRouter()
  const onClickDetail = (productId: number) => {
    router.push(`/accompany/detail/${productId}`)
  }

  return (
    <div
      key={product.id}
      style={{ maxWidth: 300 }}
      onClick={() => onClickDetail(product.id)}
    >
      <Image
        className="rounded"
        alt={product.name}
        src={product.image_url ?? ''}
        width={300}
        height={300}
      ></Image>
      <div className="flex">
        <span>{product.name}</span>
        <span className="ml-auto">
          {product.price.toLocaleString('ko-KR')} 원
        </span>
      </div>
      <span className="text-zinc-400">
        {CATEGORY_MAP[product.category_id - 1]}
      </span>
    </div>
  )
}
