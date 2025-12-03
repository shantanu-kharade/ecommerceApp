import { Link } from "react-router-dom"
import NavbarDropdown from "./NavbarDropdown.jsx"

const NavBar = () => {
    const token = localStorage.getItem('token');

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 transition-all">
                    EcomApp
                </h1>
            </Link>

            {/* Center Navigation Links */}
            <div className="hidden md:flex items-center gap-12 flex-1 justify-center">
                <Link
                    to="/"
                    className="text-gray-700 font-semibold hover:text-teal-600 transition-colors duration-200 relative group"
                >
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                    to="/productlist"
                    className="text-gray-700 font-semibold hover:text-teal-600 transition-colors duration-200 relative group"
                >
                    Products
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                    to="/cart"
                    className="text-gray-700 font-semibold hover:text-teal-600 transition-colors duration-200 relative group"
                >
                    Cart
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
            </div>

            {/* Auth Section */}
            <div className="flex-shrink-0">
                {token ? (
                    <NavbarDropdown />
                ) : (
                    <Link
                        to="/login"
                        className="px-6 py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default NavBar
