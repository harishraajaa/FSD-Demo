import React,{useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../service/apiService'
import ApiRoutes from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
function Login() {

  const navigate = useNavigate()

  const handleLogin = async(e)=>{
    e.preventDefault()
   try {
      const formData = new FormData(e.currentTarget)
      const data = {}
      for (let [key, value] of formData.entries())
        data[key] = value

      let response = await api.post(ApiRoutes.LOGIN.path,data,{
        authenticate:ApiRoutes.LOGIN.authenticate
      })

      toast.success(response.message)

      sessionStorage.setItem("token",response.token)
      sessionStorage.setItem("role",response.role)
      sessionStorage.setItem('id',response.id)

      navigate('/home')

   } catch (error) {
      toast.error(error.response.data.message)
   } 
  }

  return (
    <div className='login-wrapper'>

      <h3 className='text-align-center'>Welcome to Harish Blogs Application!</h3>

      <p className='text-align-center'>Don't have an accout? SignUp <Link to='/signup'>Here</Link></p>

      <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email'/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password'/>
        <Form.Text className="text-muted">
          Forget Password? Click <Link to='/forgetpassword'>Here</Link>
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