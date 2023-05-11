import { TAKE, FILTERS } from 'constants/products'
import { useEffect, useState } from 'react'
import productAPI from 'network/product'
import { IconSearch } from '@tabler/icons-react'
import { Input, Pagination, Select } from '@mantine/core'
import { SegmentedControl } from '@mantine/core'
import { useAppDispatch, useAppSelector } from 'redux/store/useAction'
import { getProducts } from 'redux/store/products'
import { getCategories, setCategory } from 'redux/store/category'
import useDebounced from 'hooks/useDebounce'
import axios from 'axios'
import ProductList from '@components/product-list'
import { setFilter } from 'redux/store/filter'
import { setTotal } from 'redux/store/total'
import Header from '@components/header'
export default function Home() {
  const [activePage, setPage] = useState(1)
  // const [selectedCategory, setCategory] = useState<string | string>('-1')
  const [keyword, setKeyword] = useState('')

  const debouncedKeyword = useDebounced<string>(keyword)

  const dispatch = useAppDispatch()
  const { categories } = useAppSelector((state) => state.category)
  const total = useAppSelector((state) => state.setTotal.total)
  const { products } = useAppSelector((state) => state.products)
  const { value } = useAppSelector((state) => state.filter)

  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory
  )
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    axios
      .get(
        `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`
      )
      .then((res) => res.data)
      .then((data) => dispatch(setTotal(data.items)))
  }, [selectedCategory, debouncedKeyword])

  useEffect(() => {
    const skip = TAKE * (activePage - 1)

    const getProductList = async () => {
      try {
        const result = await productAPI.getProductList({
          skip,
          TAKE,
          category: selectedCategory,
          orderBy: value as string,
          contains: debouncedKeyword,
        })
        dispatch(getProducts(result.data.items))
      } catch (err) {
        console.log(err)
      }
    }
    getProductList()
  }, [activePage, selectedCategory, value, debouncedKeyword])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  return (
    <div className="px-36 mt-36 mb-36">
      <div className="mb-4">
        {' '}
        <Input
          icon={<IconSearch />}
          placeholder="Search"
          value={keyword}
          onChange={handleChange}
        />{' '}
      </div>

      <div className="mb-4">
        {' '}
        <Select
          value={value}
          onChange={(value) => {
            dispatch(setFilter(value))
          }}
          data={FILTERS}
        ></Select>
      </div>

      {categories && (
        <div className="mb-4">
          <SegmentedControl
            value={selectedCategory}
            onChange={(value) => {
              dispatch(setCategory(value))
            }}
            data={[
              { label: 'All', value: '-1' },
              ...categories.map((category) => ({
                label: category.name,
                value: String(category.id),
              })),
            ]}
            color="dark"
          />
        </div>
      )}

      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductList key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="w-full flex mt-5">
        {total && (
          <Pagination
            className="m-auto"
            value={activePage}
            onChange={setPage}
            total={total}
          ></Pagination>
        )}
      </div>
    </div>
  )
}
