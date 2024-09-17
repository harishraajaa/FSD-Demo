import React,{useState,useEffect} from 'react'
import TopBar from '../common/TopBar'
import apiService from '../../service/apiService'
import useLogout from '../../hooks/UseLogout'
import ApiRoutes from '../../utils/ApiRoutes'
import BlogCard from '../common/BlogCard'

function Home() {
  let [data,setData] = useState([])
  let logout = useLogout()

  const getData = async ()=>{
    let {GET_ALL_APPROVED_BLOGS} = ApiRoutes
    try {
      let response = await apiService.get(GET_ALL_APPROVED_BLOGS.path,{
        authenticate:GET_ALL_APPROVED_BLOGS.authenticate
      })
      setData(response.data)
    } catch (error) {
      if(error.status === 401)
        logout()
    }
  }

  const handleLike = async(id)=>{
    let {UPDATE_LIKES} = ApiRoutes
    try {

      let response = await apiService.put(`${UPDATE_LIKES.path}/${id}`,{},{
        authenticate:UPDATE_LIKES.authenticate
      })
      getData()
    } catch (error) {
      if(error.status === 401)
        logout()
    }
  }

  useEffect(()=>{
    getData()
  },[])
  return <>
  <TopBar/>
  <div className='blogs-wrapper'>
      {
        data.map((e)=>{
          return <BlogCard data = {e} handleLike={handleLike} key={e.id}/>
        })
      }
  </div>
  </>
}

export default Home