import axios from "axios"
import useAuth from ".//useAuth"
import { useNavigate } from "react-router-dom"
const axiosSecure = axios.create({
    baseURL: 'https://skyline-residency-server.vercel.app'
})
export default function useAxiosSecure() {
    const { signOutUser, loading } = useAuth()
    const navigate = useNavigate()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log('tttttttttt', token)
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error);
    });
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        const status = error.response.status
        if (status == 401) {
            signOutUser()
            navigate('/login')
        }
        return Promise.reject(error);
    })

    return axiosSecure;
}

