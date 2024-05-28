import React, { Fragment } from  'react'
import styles from './Input.module.css'

export const Input=({isReadOnly,label,value,type,model,errorMsg,fnChange,options,values})=>{
    const fnPrepareInputControls=()=>{
        switch (type){
            case "text":
            case "password":
              return <input disabled={isReadOnly}  type={type} value={value} className='form-control' name={model} onChange={fnChange}/>
            case "radio":
                return <Fragment>
                {
                    options.map((opt,ind)=>{
                        return <Fragment key={"frag_"+ind}>
                             <input checked={values[ind]== value}  value={values[ind]}  type={type} className='me-2' name={model} onChange={fnChange}/><span className='me-4'>{opt}</span>
                             </Fragment> 
                    })
                }
                </Fragment>
            case "checkbox":
                return <>
                {
                    options.map((opt,ind)=>{
                        return <Fragment key={"frag_"+ind}><input checked={value?.includes(values[ind])} value={values[ind]}  type={type} className='me-2' name={model} onChange={fnChange}/><span className='me-4'>{opt}</span></Fragment>
                    })
                }
                </>
        }
    }
    return <div className='row mb-3'>
        <div className='col-sm-5 text-end'>
            <b>{label} :</b>
        </div>
        <div className='col-sm-3'>
            {fnPrepareInputControls()}
        </div>
        <div className='col-sm-4'>
            <b className='text-danger'>{errorMsg}</b>
        </div>
    </div>
} 