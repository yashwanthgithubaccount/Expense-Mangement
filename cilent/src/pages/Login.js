import React,{useState,useEffect} from 'react'
import {Form,Input,message} from "antd"
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Password from 'antd/es/input/Password'
import { set } from 'mongoose'
import "../styles/LoginPage.css"
const Login = () => {
    const img =
    "https://juntrax.com/blog/wp-content/uploads/2020/10/Expenses-Management-System-Featured-Juntrax.jpg";
    const [Loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const submitHandler = async(values)=>{
        try{
            setLoading(true)
            const {data} = await axios.post('/users/login',values)
            setLoading(false)
            message.success('login success')
            localStorage.setItem("user",
            JSON.stringify({...data.user,password:""}))
            navigate('/')
        }
        catch(error){
            setLoading(false)
            message.error('Something went wrong')
        }
    };
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/")
        }
    },[navigate])
  return (
    <>
        
        {/* <div className="register-page">
        {Loading && <spinner/>}
        <Form layout='vertical' onFinish={submitHandler}>
        <h1>Login Form</h1>
            <Form.Item label="Email" name="email">
                <Input type="email"/> 
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type="password"/> 
            </Form.Item>
            <div className='d-flex justify-content-between'>
                <Link to = '/register' >Not a user ? Click Here to register</Link>
                <button className='btn btn-primary'>Login</button>
            </div>
        </Form>
        </div> */}
        <div className="login-page ">
        {Loading && <spinner />}
        <div className="row container">
          <h1 className='text-exp'>Expense Managment System</h1>
          <div className="col-md-6">
            <img src={img} alt="login-img" width={"100%"} height="100%" />
          </div>
          <div className="col-md-4 login-form">
            <Form layout="vertical" onFinish={submitHandler}>
              <h1>Login Form</h1>

              <Form.Item label="Email" name="email">
                <Input type="email" required />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" required />
              </Form.Item>
              <div className="d-flex justify-content-between">
                <Link to="/register">
                  Not a user ? Click Here to regsiter !
                </Link>
                <button className="btn">Login</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login