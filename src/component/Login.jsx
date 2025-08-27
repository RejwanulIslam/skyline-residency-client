import { useForm } from "react-hook-form"
import useAuth from "../hooks/useAuth"
import { useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function Login() {
    const { emailLogin } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location?.state?.from?.pathname || '/'
    console.log(from)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        emailLogin(data.email, data.password)
            .then(res => {
                if (res?.user) {
                    Swal.fire({
                        title: "Login Successfull!",
                        icon: "success",
                        draggable: true
                    });
                    navigate(from, { replace: true })
                }

            })

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
