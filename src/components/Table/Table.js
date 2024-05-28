import React from "react"
import styles from './Table.module.css'

export const Table=(props)=>{
    const {headers,data,columns}=props
    return  <div className="table-responsive">
    <table className="table table-bordered table-hover" border='2px'>
    <thead>
     <tr>
         {
             headers.map((val,index)=>{
                 return <th key={'th'+index}>{val}</th>
             })
         }
        
     </tr>
    </thead>
    <tbody> 
    
    {
     data.map((obj,index)=>{
         return <tr key={"tr"+index}>
                 {
                     columns.map((val,index)=>{
                         return <td key={"td"+index}>{obj[val]}</td>
                     })
                 }
             </tr>
     })
    }
    </tbody>
    </table>
    </div>
    }