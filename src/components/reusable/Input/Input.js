import React from  'react'
import styles from './Input.module.css'

export const Input=({label,tag,type,model})=>{
    return <div className='row mb-3'>
        <div className='col-sm-5 text-end'>
            <b>{label} :</b>
        </div>
        <div className='col-sm-3'>
            <input  type={type} className='form-control'/>
        </div>
        <div className='col-sm-4'>
            <b className='text-danger'>Invalid Credentials</b>
        </div>
    </div>
}