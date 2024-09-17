
import React,{useState,useEffect} from 'react'
import TopBar from '../common/TopBar'
import useLogout from '../../hooks/UseLogout'
import ApiRoutes from '../../utils/ApiRoutes'
import apiService from '../../service/apiService'
import TableComponent from '../common/TableComponent'
import Button from 'react-bootstrap/esm/Button'

function MyBlogs() {
  let role = sessionStorage.getItem("role")

  let [data,setData] = useState([])
  let logout = useLogout()
  
  const getData = async()=>{
    try {
      let {GET_ALL_BLOGS,GET_BLOGS_BY_USER_ID} = ApiRoutes
      let API_ENDPOINT = role==="admin"?GET_ALL_BLOGS:GET_BLOGS_BY_USER_ID
      let response = await apiService.get(API_ENDPOINT.path,{
        authenticate:API_ENDPOINT.authenticate
      })
      setData(response.data)
    } catch (error) {
      if(error.status === 401)
        logout()
    }
  }

  let handleStatusChange = async(status,id)=>{
    try {
      let {UPDATE_STATUS} = ApiRoutes
      let response = await apiService.put(`${UPDATE_STATUS.path}/${id}`,{status},{
        authenticate:UPDATE_STATUS.authenticate
      })
      getData()
      console.log(data)
    } catch (error) {
      if(error.status === 401)
        logout()
    }
  }

  useEffect(()=>{
    getData()
  },[])

  let columns = [
    {
      title:"Date",
      role:["admin","user"],
      dataIndex:"createdAt",
      render: (e)=>new Date(e["createdAt"]).toLocaleDateString()
    },
    {
      title:"Author",
      role:["admin"],
      dataIndex:"authorName",
      render: (e)=>e["authorName"]
    },
    {
      title:"Title",
      role:["admin","user"],
      dataIndex:"title",
      render: (e)=>e["title"]
    },
    {
      title:"Description",
      role:["admin","user"],
      dataIndex:"description",
      render: (e)=>e["description"]
    },
    {
      title:"Image",
      role:["admin","user"],
      dataIndex:"image",
      render: (e)=>{
        return <img src={e["image"]} height="200px" width="200px"/>
      }
    },
    {
      title:"Status",
      role:["admin","user"],
      dataIndex:"status",
      render:(e)=>{
        return e["status"].charAt(0).toUpperCase() + e["status"].slice(1)
      }
    },
    {
      title:"Actions",
      role:["admin"],
      dataIndex:null,
      render:(e)=>{
        return <div>
          {
            ["Approved","Pending","Rejected"].filter(status=>e.status!=status).map((s,i)=>{ 
              return <>
                <Button onClick={()=>handleStatusChange(s.toUpperCase(),e.id)}>{s}</Button>
                &nbsp;
              </>
            })
          }
        </div>
      }
    }
  ]

  return <>
  <TopBar/>
  <div className='container-fluid'>
    <TableComponent
      col={columns.filter(e=>e.role.includes(role))}
      row={data}
    />
  </div>
  </>
}

export default MyBlogs
