"use client"
import React from 'react'
import styles from './register.module.css'
import configuration from './configuration.json'
import { Input } from '@/components/reusable/Input'
import { TextArea } from  '@/components/reusable/TextArea'
import Link from 'next/link'
import { Select } from '@/components/reusable/Select'
import  {fnValidate,fnValidateForm,fnFormReset} from '@/common/validations'
import { ServerCall } from '@/common/api'
import { toast } from 'react-toastify'
import { ctx } from '@/context/appContext'

const Register = () => {
  const [inputControls,setInputControls] = React.useState(configuration)
  const ctxData =React.useContext(ctx)

  const fnRegister=()=>{
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
    ServerCall.sendPostReq("http://localhost:2020/student/reg-std",{data:dataObj})
    .then((res)=>{
      const {acknowledged,insertedId} = res.data;
      if(acknowledged && insertedId ){
        toast.success("Successfully Registered")
        fnFormReset(inputControlsClonedArr)
        setInputControls(inputControlsClonedArr)
      }else{
        toast.error("Not Registered try again..")
      }
    })
    .catch((res)=>{
      toast.error("Something Went Wrong")
    })
    .finally(()=>{
      ctxData.dispatch({
        type:"LOADER",
        payload:false
      })
    }) 
  }

  const handleChange=(eve)=>{
    const inputControlsClonedArr=JSON.parse(JSON.stringify(inputControls));
    fnValidate(inputControlsClonedArr,eve )
    setInputControls(inputControlsClonedArr)
  }
  return (
    <div className='container-fluid mb-5'>
        <h3 className='text-center my-3 '>Register</h3>
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
          <button onClick={fnRegister} className='btn btn-primary me-3'>Register</button>
          <Link href="/login">To Login</Link>
          </div>
        </div>
        
    </div>
  )
}

export default Register