import React from 'react'
import { useState, useEffect } from 'react';
import { getALlUsers } from '../../api/userApi'
const UserListing = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getALlUsers();
                console.log(response)
                setUsers(response.data)
            } catch (error) {
                confirm.log(error)
                throw new Error
            }
        }
        fetchUsers()
    }, [])


    return (
        <div >
           
            {users?.length === 0 ? (  
                <div>
                    <p>No user found</p>
                </div>
            ) : (                   
                <div> 
                    {users?.map((user) => (
                        
                        <div className='grid grid-cols-3 mx-60' key={user.id || user.userName}>
                            
                            <h1>{user.userName}</h1>
                            <h4>{user.email}</h4>
                            <h4>{user.role}</h4>
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}

export default UserListing