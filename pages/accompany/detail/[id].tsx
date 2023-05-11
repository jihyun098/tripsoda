import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import productAPI from 'network/product'
import { products } from '@prisma/client'
import Image from 'next/image'
import { CATEGORY_MAP } from 'constants/products'
interface itemData {
  name: string
  image_url: string
  contents: string
  price: number
  category_id?: number
  createdAt: Date
}
export default function detail() {
  const router = useRouter()
  const { id: productId } = router.query
  const [item, setItem] = useState<itemData>({
    name: '',
    image_url: '',
    contents: '',
    price: 0,
    category_id: 0,
    createdAt: new Date(),
  })

  useEffect(() => {
    if (productId != null) {
      const getItem = async () => {
        try {
          const result = await productAPI.getItem({
            id: Number(productId),
          })
          console.log(result.data.items)
          setItem(result.data.items)
        } catch (err) {
          console.log(err)
        }
      }
      getItem()
    }
  }, [productId])

  return (
    <div>
      <Image
        alt="이미지"
        src={item?.image_url ?? ''}
        width={300}
        height={40}
      ></Image>
      <h2>{item.name}</h2>
      <div>{CATEGORY_MAP[item?.category_id ?? 0 - 1]}</div>
      <div>{item.contents}</div>
      <span>{item.price.toLocaleString('ko-KR')} 원</span>
    </div>
  )
}
