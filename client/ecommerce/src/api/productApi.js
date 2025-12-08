import axios from 'axios'

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
console.log(backendURL)
const token = localStorage.getItem('token')
console.log('Token at api', token)

const createProduct = async (formData) => {
    try {
        const response = await axios.post(`${backendURL}/api/order/`, {
            formData
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log("Error", error);
        throw new Error
    }
}


const updateProduct = async (productName, description, price, category, stock, imageUrl) => {
    try {
        const response = await axios.put(`${backendURL}/api/order/`, {
            productName,
            description,
            price,
            category,
            stock,
            imageUrl,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log("Error", error);
        throw new Error
    }
}

const deleteProduct = async (productId) => {
    try {
        const response = await axios.put(`${backendURL}/api/order/`, {
            productId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log("Error", error);
        throw new Error
    }
}


export {
    updateProduct,
    createProduct,
    deleteProduct
}