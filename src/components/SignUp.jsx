
import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import api from '../service/apiService';
import ApiRoutes from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function SignUp() {

  const navigate = useNavigate()

  const handleSignUp = async(e)=>{
    
    try {
      e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {}
    for (let [key, value] of formData.entries())
      data[key] = value
    
    let response = await api.post(ApiRoutes.SIGNUP.path,data,{authenticate:ApiRoutes.SIGNUP.authenticate})

    toast.success(response.message)

    navigate('/login')
    } catch (error) {
      toast.error(error.response.data.message)
    }
    
  }

  return (
    <div className='login-wrapper'>
      <h3 className='text-align-center'>Welcome to Harish Blogs Application!</h3>
      <p className='text-align-center'>Already an user? Login <Link to='/login'>Here</Link></p>
      <Form onSubmit={handleSignUp}>
      
        <Form.Group className="mb-3" >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" name='name'/>
        </Form.Group>
        

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" name='email'/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile</Form.Label>
          <Form.Control type="text" placeholder="Enter Mobile" name='mobile'/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password'/>
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

export default SignUp
