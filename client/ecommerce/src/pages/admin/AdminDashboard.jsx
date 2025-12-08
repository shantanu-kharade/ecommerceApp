import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import AdminNavBar from '../../components/AdminNavbar'

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavBar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
               
                <div className="mb-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 mb-2">
                        Welcome back, Admin
                    </h1>
                    <p className="text-lg text-gray-600">
                        Manage your Premium Store operations efficiently.
                    </p>
                </div>

                <div className="mt-8">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard