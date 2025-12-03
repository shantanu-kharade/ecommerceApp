import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { userLogin } from '../../api/authapi.js'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await userLogin(email, password)
            if (!response || !response.data || !response.data.token) {
                throw new Error("Invalid response from server")
            }
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        } catch (error) {
            console.log("Error login", error)
            alert('Login failed. Please check your credentials and try again.');
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token && token !== undefined) {
            window.location.href = "/"
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-4xl font-bold tracking-tight text-teal-600">EcomApp</h1>
                <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Login to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Welcome back! Please enter your details.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                {/* Card Container matching OrderHistory/Cart style */}
                <div className="bg-white py-8 px-4 shadow-xl shadow-gray-100 sm:rounded-2xl sm:px-10 border border-gray-100">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-gray-50 border"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-gray-50 border"
                                    placeholder="••••••••"
                                />
                            </div>
                           
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 hover:shadow-lg hover:shadow-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">New to EcomApp?</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="/register"
                                className="w-full flex justify-center py-3 px-4 border-2 border-teal-600 rounded-lg shadow-sm text-sm font-semibold text-teal-600 bg-white hover:bg-teal-50 transition-colors duration-200"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login