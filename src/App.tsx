import { useState } from 'react'
import { MainHeader } from './components/mainheader'
import { SidebarMenu } from './components/menupage/SidebarMenu'
import MainProduct from './components/menupage/mainproductpage'
import ProductPage from './pages/product.page'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ProductPage />
    </>
  )
}

export default App
