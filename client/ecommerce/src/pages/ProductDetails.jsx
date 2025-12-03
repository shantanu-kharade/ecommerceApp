import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../components/NavBar.jsx'
import { fetchProductById } from '../api/api.js'
import { useParams } from 'react-router-dom'
import { addToCart } from '../api/cartApi.js'

const ProductDetails = () => {
    const { id } = useParams();
    const [productDetail, setProductDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await fetchProductById(id);
                setProductDetails(response.data);
                console.log("product details", response)
            } catch (error) {
                console.log(error)
            }
        }
        getProductById()
    }, [id])

    const handleAddToCart = async() =>{
        try{
            const response = await addToCart(productDetail._id, quantity);
            console.log("response",response)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
            <Navbar />
            
            {productDetail && (
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20'>
                        {/* Image Section */}
                        <div className='flex items-center justify-center bg-white rounded-2xl shadow-sm p-8 lg:p-12 h-fit'>
                            <div className='w-full aspect-square flex items-center justify-center'>
                                <img 
                                    src={productDetail.imageUrl || "/placeholder.svg"} 
                                    alt={productDetail.productName} 
                                    className='w-full h-full object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'
                                />
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className='flex flex-col justify-between py-4'>
                            {/* Product Info */}
                            <div className='space-y-6'>
                                <div>
                                    <h1 className='text-5xl font-bold text-slate-900 mb-3 leading-tight'>
                                        {productDetail.productName}
                                    </h1>
                                    <div className='flex items-center gap-3'>
                                        <span className='inline-block px-3 py-1 bg-teal-50 text-teal-700 text-sm font-semibold rounded-full'>
                                            {productDetail.category}
                                        </span>
                                    </div>
                                </div>

                                <div className='border-t border-slate-200 pt-6'>
                                    <p className='text-3xl font-bold text-slate-900'>
                                        ₹{productDetail.price.toLocaleString('en-IN')}
                                    </p>
                                    <p className='text-slate-500 text-sm mt-2'>Inclusive of all taxes</p>
                                </div>

                                <div className='bg-slate-50 rounded-xl p-6'>
                                    <p className='text-slate-700 text-lg leading-relaxed'>
                                        {productDetail.description}
                                    </p>
                                </div>
                            </div>

                            {/* Purchase Section */}
                            <div className='space-y-6 mt-8'>
                                <div className='flex items-center gap-4'>
                                    <label className='text-sm font-semibold text-slate-700'>Quantity:</label>
                                    <div className='flex items-center border border-slate-300 rounded-lg'>
                                        <button 
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className='px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors'
                                        >
                                            −
                                        </button>
                                        <input 
                                            type="number" 
                                            min="1" 
                                            value={quantity}
                                            className='w-16 text-center border-0 bg-white text-slate-900 font-semibold outline-none' 
                                            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                        />
                                        <button 
                                            onClick={() => setQuantity(quantity + 1)}
                                            className='px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors'
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button 
                                onClick={()=>handleAddToCart()}
                                className='w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-200transition-colors duration-200 shadow-md hover:shadow-lg'>
                                    Add to Cart
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetails