"use client"
import React from 'react'
import stles from './login.module.css'
import configuration from './configuration.json'
import { Input } from '@/components/reusable/Input'
import  {fnValidate,fnValidateForm} from '@/common/validations'
import Link from 'next/link'
import { ServerCall } from '@/common/api'
import { ctx } from '@/context/appContext'
import { toast } from 'react-toastify'
import { redirect, useRouter} from 'next/navigation'

const Login = () => {
  const [inputControls,setInputControls] = React.useState(configuration)
  const router = useRouter()
  const ctxData = React.useContext(ctx)
  const fnLogin=async()=>{
    try{
    const inputControlsClonedArr=JSON.parse(JSON.stringify(inputControls));
    const [isFormValid,dataObj] = fnValidateForm(inputControlsClonedArr)
    if(!isFormValid){
      setInputControls(inputControlsClonedArr)
      return;
    }
    ctxData.dispatch({
      type:"LOADER",
      payload:true
    })
    const res = await ServerCall.sendPostReq("http://localhost:2020/auth/login",{data:dataObj})
    console.log(res);
    const {uid,id} = res.data
    if(uid){
      sessionStorage.uid=uid;
      sessionStorage.id=id;
      ctxData.dispatch({
        type:"AUTH",
        payload:{
          isLoggedIn:true,
          userInfo:res.data
        }
      })
      router.push("/home")
    }else{
      toast.error("Invalid Credentials")
    }
  } catch(e){
    toast.error(e.message)
  } finally{
    ctxData.dispatch({
      type:"LOADER",
      payload:false
    })
  }
  }
  
  const handleChange=(eve)=>{
    const inputControlsClonedArr=JSON.parse(JSON.stringify(inputControls));
    fnValidate(inputControlsClonedArr,eve )
    setInputControls(inputControlsClonedArr)
  }
  return (
    <div className='container-fluid'>
        <h3 className='text-center my-3 '>Login</h3>
        {
          inputControls.map((obj,ind)=>{
            return <Input  key={"Input_"+ind} {...obj} fnChange={handleChange} />
          })
        }
        <div className='row'>
          <div className='offset-sm-5 col-sm-7'>
          <button onClick={fnLogin} className='btn btn-primary me-3'>Login</button>
          <Link href="/register">Register</Link>
          </div>
        </div>
        
    </div> 
  ) 
}

export default Login 