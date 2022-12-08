import React from 'react'
import { useFormik } from 'formik';
import { config } from './config.js'
import { useEffect, useState } from 'react';
import axios from "axios";
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
function Product() {
    const navigate = useNavigate()
    const [productlist, setProductlist] = useState([])
    const [isEdit, setIsedit] = useState(false)
    const [productid, setProductid] = useState(null)
    useEffect(() => {
        const fetchdata = async () => {
            let products = await axios.get(`${config.api}/products`,{
                headers:{
                    "Authorization" : localStorage.getItem("myreact")
                }
            })
            setProductlist(products.data)
        }
        fetchdata()
    }, [])

    const formik = useFormik({
        initialValues: {
            name: "",
            price: ""
        },
        onSubmit: async (values) => {
            try {
                if (!isEdit) {
                    let product = await axios.post(`${config.api}/product`, values,
                    {
                        headers:{
                            "Authorization" : localStorage.getItem("myreact")
                        }
                    })
                    setProductlist([...productlist, { ...values, _id: product.data.id }])
                }
                else {
                    let product = await axios.put(`${config.api}/product/${productid}`, values,
                    {
                        headers:{
                            "Authorization" : localStorage.getItem("myreact")
                        }
                    })
                    let productindex = productlist.findIndex((prod) => prod._id == productid)
                    productlist[productindex] = values
                    setProductlist([...productlist])
                    setIsedit(false)
                }
                formik.resetForm()
            } catch (error) {
                alert(error.response.data.message)
            }
        }
    })

    // const getproducts = async () => {
    //   let products = await axios.get("http://localhost:3000/products")
    //   setProductlist(products.data)
    // }

    const deleteproduct = async (productid) => {
        await axios.delete(`${config.api}/product/${productid}`,{
            headers:{
                "Authorization" : localStorage.getItem("myreact")
            }
        })
        let productindex = productlist.findIndex((prod) => prod.id == productid)
        productlist.splice(productindex, 1)
        setProductlist([...productlist])
    }

    const editproduct = async (productid) => {
        setIsedit(true)
        let product = await axios.get(`${config.api}/product/${productid}`,{
            headers:{
                "Authorization" : localStorage.getItem("myreact")
            }
        })
        formik.setValues(product.data)
        setProductid(productid)
    }

    const logout =()=> {
        localStorage.removeItem("myreact")
        navigate("/login")
    }
    return (
        <div>
            <div className='container'>
            <button onClick={logout} className="btn btn-danger">Logout</button>
                <div className='row'>
                    <div className='col-lg-6 align-right'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <label>Name</label>
                                    <input type={"text"} value={formik.values.name} name='name' onChange={formik.handleChange} className='form-control'></input>
                                </div>
                                <div className='col-lg-6'>
                                    <label>Price</label><br />
                                    <input type={"text"} value={formik.values.price} name='price' onChange={formik.handleChange} className='form-control'></input>
                                </div>
                            </div>
                            <input type={'submit'} value={isEdit ? "Update product" : "Add product"} className='btn btn-primary' />
                        </form>
                    </div>
                    <div className='col-lg-6'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productlist.map((prod) => {
                                        return <tr><th scope="row">{prod._id}</th>
                                            <td>{prod.name}</td>
                                            <td>{prod.price}</td>
                                            <td>
                                                <button onClick={() => editproduct(prod._id)} className='btn btn-info'>Edit</button>
                                                <button onClick={() => deleteproduct(prod._id)} className='btn btn-danger'>Delete</button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product