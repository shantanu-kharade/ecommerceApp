import React, { useState, useEffect } from 'react'
import { getAllOrders } from '../../api/orderApi'

const OrderListing = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await getAllOrders();
                console.log(response.data)
                setOrders(response.data)
            } catch (error) {
                console.error("Error fetching orders:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchOrder();
    }, [])

    
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                    <p className="text-gray-600 mt-1">Track and manage all customer orders</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                        
                        
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <div className="col-span-3">Order ID</div>
                            <div className="col-span-3">Customer ID</div>
                            <div className="col-span-2">Date</div>
                            <div className="col-span-2">Total</div>
                            <div className="col-span-2 text-right">Status</div>
                        </div>

                        {/* Order Rows */}
                        {orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="text-5xl mb-4">📦</div>
                                <h3 className="text-lg font-bold text-gray-900">No orders found</h3>
                                <p className="text-gray-500">New orders will appear here.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <div 
                                        key={order._id} 
                                        className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50 transition-colors items-center group"
                                    >
                                        {/* Order ID & Items Count */}
                                        <div className="col-span-1 md:col-span-3">
                                            <p className="font-mono text-sm font-semibold text-gray-900 truncate" title={order._id}>
                                                #{order._id.slice(-8).toUpperCase()}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {order.products?.length || 0} {order.products?.length === 1 ? 'Item' : 'Items'}
                                            </p>
                                        </div>

                                        {/* Customer ID */}
                                        <div className="col-span-1 md:col-span-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                                                    👤
                                                </div>
                                                <p className="font-mono text-xs text-gray-600 truncate max-w-[150px]" title={order.userId}>
                                                    {order.userId}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Date */}
                                        <div className="col-span-1 md:col-span-2 text-sm text-gray-600">
                                            {new Date(order.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>

                                        {/* Total Amount */}
                                        <div className="col-span-1 md:col-span-2">
                                            <span className="font-bold text-gray-900">
                                                ₹{order.totalAmount?.toLocaleString('en-IN')}
                                            </span>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="col-span-1 md:col-span-2 flex md:justify-end">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusStyle(order.orderStatus)}`}>
                                                {order.orderStatus}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Footer Count */}
                {orders.length > 0 && (
                    <div className="mt-4 text-right text-sm text-gray-500 font-medium">
                        Showing {orders.length} orders
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderListing