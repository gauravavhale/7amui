"use client"
import React, { useEffect } from 'react'
import styles from './users.module.css'
import { ServerCall } from '@/common/api';
import { ctx } from '@/context/appContext';
import { toast } from 'react-toastify';
import { Table } from '@/components/Table';

const Users = () => {
  const [data,setData]= React.useState([]);
  const ctxData = React.useContext(ctx)

  const fnGetUsers=async()=>{
    ctxData.dispatch({type:"LOADER",payload:true})
    try{
    const res = await ServerCall.sendGetReq("http://localhost:2020/student/get-std")
    setData(res.data)
    console.log(res.data)
    } catch(e){
      console.log(e.message)
      setData([])
      toast.error(e.message)
    } finally{
      ctxData.dispatch({type:"LOADER",payload:false})
    }
  }
  useEffect(()=>{
    fnGetUsers()
  },[])
  return (
    <div>
      <Table 
        headers={["UID","Gender","LOCATION"]}
        data={data}
        columns={["uid","gen","address"]}
      />
    </div>
  )
}

export default Users