import React from 'react'
import NavBar from '../components/NavBar'
import HeroSection from '../components/HeroSection'
import ProductSection from '../components/ProductSection.jsx'
const Home = () => {
  return (

    <div>
        <NavBar />
        <div className='flex flex-wrap gap-2 '>
            <HeroSection />
            <ProductSection />
        </div>
    </div>
  )
}

export default Home