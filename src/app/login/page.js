import React from 'react'
import stles from './login.module.css'
import configuration from './configuration.json'
import { Input } from '@/components/reusable/Input'

const Login = () => {
  return (
    <div className='container-fluid'>
        <h3 className='text-center my-3 '>Login</h3>
        {
          configuration.map((obj,ind)=>{
            return <Input key={"Input_"+ind} {...obj}/>
          })
        }
        <div className='row'>
          <div className='offset-sm-5 col-sm-7'>
          <button className='btn btn-primary'>Login</button>
          </div>
        </div>
        
    </div>
  )
}

export default Login 