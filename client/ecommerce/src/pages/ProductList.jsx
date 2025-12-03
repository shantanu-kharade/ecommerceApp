"use client"
import ProductCard from "../components/ProductCard.jsx"
import { fetchProducts } from "../api/api.js"
import { useState, useEffect } from "react"
import NavBar from "../components/NavBar.jsx"

const ProductList = () => {
    const [allProdutcts, setAllProducts] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [activeCategory, setActiveCategory] = useState("all")

    const selectCategory = (category) => {
        const filterProducts = allProdutcts.filter((product) => product.category === category)
        console.log("Filtered Products", filterProducts)
        setAllProducts(filterProducts)
        setActiveCategory(category)
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true)
                const product = await fetchProducts()
                setAllProducts(product.data)
                setProducts(product.data)
                setActiveCategory("all")
                console.log("Products fetched in product listing", product)
            } catch (error) {
                setError(error.message)
                console.log("Error Fetch : ", error)
            } finally {
                setLoading(false)
            }
        }
        getProduct()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />

            <div className="px-4 md:px-8 lg:px-20 py-12">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Our Collections</h1>
                    <p className="text-lg text-gray-600">Browse through our curated selection of premium products</p>
                </div>

                {/* Category Filter Buttons */}
                <div className="max-w-7xl mx-auto mb-10">
                    <div className="flex flex-wrap gap-3 justify-start md:justify-start">
                        <button
                            onClick={() => {
                                setAllProducts(products)
                                setActiveCategory("all")
                            }}
                            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-200 ${activeCategory === "all"
                                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-200"
                                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-600 hover:text-teal-600"
                                }`}
                        >
                            All Products
                        </button>
                        <button
                            onClick={() => selectCategory("Electronics")}
                            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-200 ${activeCategory === "Electronics"
                                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-200"
                                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-600 hover:text-teal-600"
                                }`}
                        >
                            Electronics
                        </button>
                        <button
                            onClick={() => selectCategory("Clothing")}
                            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-200 ${activeCategory === "Clothing"
                                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-200"
                                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-600 hover:text-teal-600"
                                }`}
                        >
                            Clothing
                        </button>
                        <button
                            onClick={() => selectCategory("Home")}
                            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-200 ${activeCategory === "Home"
                                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-200"
                                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-600 hover:text-teal-600"
                                }`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => selectCategory("Books")}
                            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-200 ${activeCategory === "Books"
                                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-200"
                                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-600 hover:text-teal-600"
                                }`}
                        >
                            Books
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                                <p className="text-gray-600 font-medium">Loading products...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                            <p className="text-red-700 font-medium">Error loading products: {error}</p>
                        </div>
                    ) : allProdutcts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="text-6xl mb-4">📦</div>
                            <p className="text-gray-600 font-medium text-lg">No products found in this category</p>
                            <p className="text-gray-500 text-sm mt-2">Try selecting a different category</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-600 mb-6 font-medium">{allProdutcts.length} products found</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                {allProdutcts.map((product) => (
                                    <ProductCard key={product._id || product.id} product={product} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductList
