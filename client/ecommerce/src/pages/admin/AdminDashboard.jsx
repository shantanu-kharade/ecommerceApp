import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavBar from '../../components/AdminNavbar'
const AdminDashboard = () => {
  return (
    <div>   
        <AdminNavBar/>

        <Outlet />
    </div>
  )
}

export default AdminDashboard