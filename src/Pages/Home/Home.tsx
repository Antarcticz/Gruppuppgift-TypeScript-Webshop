import React, { useEffect, useState } from 'react'
import './Home.css'
import productsService from '../../store/products/productService'
import Card from '../../components/Card'

const Home = () => {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await productsService.getProduct()
        console.log(productsData)
        setProductList(productsData)

      } catch (error) {

      }
    }
    fetchProducts()
  }, [])
  return (
    <div>
      <h1>Home</h1>
      {
        productList.length > 0
          ? productList.map(product => <Card key={product.id} product={product} />)
          : <h2>No products to show</h2>
      }
    </div>
  )
}

export default Home