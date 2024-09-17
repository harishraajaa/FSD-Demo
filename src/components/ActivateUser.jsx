import React from 'react'
import api from '../service/apiService'
import ApiRoutes from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
function ActivateUser() {

  const navigate = useNavigate()

  const handleActivate = async(e)=>{
    e.preventDefault()
   try {
      //const formData = new FormData(e.currentTarget)
    console.log("Calling Activate API")
    let id=e.view.location.pathname.split('/')[2]
      let response = await api.post(`${ApiRoutes.ACTIVATE_USER.path}/${id}`,{
        authenticate:ApiRoutes.ACTIVATE_USER.authenticate
      })

      toast.success(response.message)

    //   sessionStorage.setItem("token",response.token)
    //   sessionStorage.setItem("role",response.role)

    navigate('/login')

   } catch (error) {
      toast.error(error.response.data.message)
   } 
  }

  return (
    <div className='login-wrapper'>

      <h3 className='text-align-center'>Welcome to Harish Blogs Application!</h3>
      <p className='text-align-center'>Click <Link onClick={handleActivate}>here</Link> to Activate your Account!! </p>

    </div>
  )
}

export default ActivateUser