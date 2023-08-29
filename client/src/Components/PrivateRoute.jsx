import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const role = useSelector(state => state.auth.role)
    return (
        role === 'author' ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoute