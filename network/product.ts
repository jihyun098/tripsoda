import axios from 'axios'

const getProductList = async (data: {
  skip: number
  TAKE: number
  category: string
  orderBy: string
  contains: string
}) => {
  const { skip, TAKE, category, orderBy, contains } = data
  return axios.get(
    `/api/get-products?skip=${skip}&take=${TAKE}&category=${category}&orderBy=${orderBy}&contains=${contains}`
  )
}

const getItem = async (data: { id: number }) => {
  const { id } = data
  return axios.get(`/api/get-product?id=${id}`)
}

const productAPI = { getProductList, getItem }

export default productAPI
