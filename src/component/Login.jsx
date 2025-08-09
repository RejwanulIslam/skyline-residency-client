import { useForm } from "react-hook-form"
import useAuth from "../hooks/useAuth"

export default function Login() {
    const {emailLogin}=useAuth()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        emailLogin(data.email, data.password)
          
    }

    return (
        <div className=''>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" {...register('email')} className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password"  {...register('password')} className="input input-bordered" required />

                </div>

                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    )
}
