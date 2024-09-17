import React,{useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../service/apiService'
import ApiRoutes from '../utils/ApiRoutes';
import { createPath, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
function PasswordReset() {

  const navigate = useNavigate()

  const handleReset = async(e)=>{
    e.preventDefault()
   try {
      const path=e.target.action.split('/')[4]
      //console.log(path)
      const formData = new FormData(e.currentTarget)
      const data = {}
      for (let [key, value] of formData.entries())
        data[key] = value

      console.log(data)
      let response = await api.put(ApiRoutes.PASSWORD_RESET.path+`/${path}`,data,{
        authenticate:ApiRoutes.PASSWORD_RESET.authenticate
      })

      toast.success(response.message)
      console.log(response)
      sessionStorage.setItem("token",response.token)
      sessionStorage.setItem("role",response.role)

      navigate('/login')

   } catch (error) {
      toast.error(error.response.data.message)
   } 
  }

  return (
    <div className='login-wrapper'>

      <h3 className='text-align-center'>Welcome to Harish Blogs Application!</h3>

      <p className='text-align-center'>Reset your Password Here!!</p>

      <Form onSubmit={handleReset}>
      <Form.Group className="mb-3">
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder="Enter New Password" name='newpassword'/>
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" name='cpassword'/>
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <div className='text-align-center'>
      <Button variant="danger" type="submit">
        Reset
      </Button>
      </div>
    </Form>
    </div>
  )
}

export default PasswordReset