import axios from "axios"
import useAuth from ".//useAuth"
import { useNavigate } from "react-router-dom"
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
export default function useAxiosSecure() {
    const { signOutUser } = useAuth()
    const navigate=useNavigate()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log('tttttttttt', token)
        config.headers.Authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error);
    });
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        const status=error.response.status
        if(status==401){
        signOutUser()
        navigate('/login')
        }
        return Promise.reject(error);
    })

    return axiosSecure;
}

