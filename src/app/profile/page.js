"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from './profile.module.css'
import { ServerCall } from '@/common/api'
import { ctx } from '@/context/appContext'
import configuration from './configuration.json'
import { Input } from '@/components/reusable/Input'
import { TextArea } from '@/components/reusable/TextArea'
import { Select } from '@/components/reusable/Select'
import { fnValidate } from '@/common/validations'

const Profile = () => {
  const [inputControls,setInputControls]=useState(configuration)
  const ctxData = useContext(ctx)
  const fnGetUserInfo=async()=>{
    ctxData.dispatch({type:"LOADER",payload:true})
    try{
    const res = await ServerCall.sendGetReq('http://localhost:2020/student/get-std-by-id?id='+sessionStorage.id)
    const userInfo = res.data;
    const inputControlsCloned =JSON.parse(JSON.stringify(inputControls))
    inputControlsCloned.forEach((obj)=>{
      obj.value=userInfo[obj.model]
    })
    setInputControls(inputControlsCloned)
    } catch(e){
      console.log(e)
    } finally{
      ctxData.dispatch({type:"LOADER",payload:false})
    } 
  }
  useEffect(()=>{
    fnGetUserInfo()
  },[])
  const handleChange=(eve)=>{
    const inputControlsClonedArr=JSON.parse(JSON.stringify(inputControls));
    fnValidate(inputControlsClonedArr,eve )
    setInputControls(inputControlsClonedArr)
  }
  return (
    <div className='container-fluid'>
        <h3 className='text-center my-3 '>Update</h3>
        {
          inputControls.map((obj,ind)=>{
            switch(obj.tag){
              case "input" :
                return <Input  key={"Input_"+ind} {...obj} fnChange={handleChange} />
              case "textarea" :
                return <TextArea key={"TextArea_"+ind} {...obj} fnChange={handleChange} />
                case "select" :
                  return <Select key={"Select_"+ind} {...obj} fnChange={handleChange} />
            }
          })
        }
        <div className='row'>
          <div className='offset-sm-5 col-sm-7'>
          <button className='btn btn-primary me-3'>Update</button>
          <button className='btn btn-primary me-3'>Terminate</button>
          </div>
        </div>
    </div>
  )
}

export default Profile