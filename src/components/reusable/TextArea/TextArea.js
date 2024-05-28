import React from 'react';
import styles from './TextArea.module.css';
export const TextArea=({label,model,value,errorMsg,fnChange})=>{
  return <div className="row mb-3">
      <div className="col-sm-5 text-end">
        <b>{label}:</b>
      </div>
      <div className="col-sm-3">
       <textarea className="form-control" value={value}  onChange={fnChange} name={model}></textarea>
      </div>
      <div className="col-sm-4">
       <b className="text-danger">{errorMsg}</b>
      </div>
  </div>
}
