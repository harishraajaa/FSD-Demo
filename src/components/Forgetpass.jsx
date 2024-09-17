import React,{useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../service/apiService'
import ApiRoutes from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {

  const navigate = useNavigate()

  const [Status,setStatus]=useState("Password reset link will be shared once you submit!!")

 
  const resetLink = async(e)=>{
    e.preventDefault()
   try {
      const formData = new FormData(e.currentTarget)
      const data = {}
      for (let [key, value] of formData.entries())
        data[key] = value

      console.log(data)

      let response = await api.post(ApiRoutes.GET_RESET_LINK.path,data,{
        authenticate:ApiRoutes.LOGIN.authenticate
      })

      toast.success("Password Reset link sent")
      setStatus("Password Reset link sent")
      console.log(response)
      sessionStorage.setItem("token",response.token)
      sessionStorage.setItem("id",response.id)
      
      //navigate('/recipes')

   } catch (error) {
      toast.error(error.response.data.message)
   } 
  }

  return (
    <div className='login-wrapper'>

      <h3 className='text-align-center'>Welcome to Harish Blogs Application!</h3>

      <p className='text-align-center'>Already an user? Login <Link to='/login'>Here</Link></p>

      <Form onSubmit={resetLink}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email'/>
        <Form.Text className="text-muted">
          {Status}
        </Form.Text>
      </Form.Group>

      <div className='text-align-center'>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </div>
    </Form>
    </div>
  )
}

export default Login