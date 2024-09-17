import React, { useEffect, useState } from 'react'
import TopBar from '../common/TopBar'
import Table from 'react-bootstrap/Table';
import useLogout from '../../hooks/UseLogout'
import api from '../../service/apiService';
import ApiRoutes from '../../utils/ApiRoutes';

function Users() {
  let [data,setData] =useState([])
  let logout = useLogout()
  let getData = async()=>{
    try {
      const {path,authenticate} = ApiRoutes.GET_ALL_USERS

      let response = await api.get(path,{authenticate})

      setData(response.data)

    } catch (error) {
      if(error.response.status===401)
        logout()
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
      <TopBar/>
      <div>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
       {
        data.map((e)=>{
          return <tr key={e.id}>
            <td>{e.name}</td>
            <td>{e.email}</td>
            <td>{e.mobile}</td>
            <td>{e.role}</td>
            <td>{e.status?"Active":"Inactive"}</td>
          </tr>
        })
       }
      </tbody>
    </Table>
      </div>
    </>
  )
}

export default Users