import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { config } from './config.js'

function Login() {
    const navigate = useNavigate()
    const loginform = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            try {
                const user = await axios.post(`${config.api}/user/login`, values)
                if (user.data.message === "Success") {
                    localStorage.setItem("myreact",user.data.token)
                    navigate('/products')
                }
            } catch (error) {
                alert(error.response.data.message)
            }
        }
    })
    return (
        <div className='container'>
            <form onSubmit={loginform.handleSubmit}>
                <div className='row'>
                    <div className='col-lg-12'>
                        <label>Email</label>
                        <input name="email" onChange={loginform.handleChange} value={loginform.values.email} type={'email'} className='form-control'></input>
                    </div>
                    <div className='col-lg-12'>
                        <label>Password</label>
                        <input name="password" onChange={loginform.handleChange} value={loginform.values.password} type={'password'} className='form-control'></input>
                    </div>
                    <div className='col-lg-12'>
                        <input type={"submit"} value="Login" className='btn btn-primary mt-2'></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login