import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import useAxiosSecure from '../hooks/useAxiosSecure'

export default function SignUp() {
    const { emailSignUp, UserUpdateProfile } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        emailSignUp(data.email, data.password)
            .then(res => {
                UserUpdateProfile(data.name, data.photo)
                    .then(async () => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: 'user'
                        }
                        const { data: resData } = await axiosSecure.post('/user', userInfo)
                        console.log(resData)
                    })
            })
    }
    return (
        <div className=''>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" {...register('name')} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" {...register('email')} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="text" placeholder="Photo"  {...register('photo')} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password"  {...register('password')} className="input input-bordered" required />

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Confarm Password</span>
                    </label>
                    <input type="password" placeholder="Canfarm Password"  {...register('password')} className="input input-bordered" required />

                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
        </div>
    )
}
