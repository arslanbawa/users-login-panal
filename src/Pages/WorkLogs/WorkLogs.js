import React from 'react'
import {useState, useEffect } from 'react'
import { useSelector} from 'react-redux'
import CreateWorkLogs from '../../Components/CreateWorkLogs/CreateWorkLogs'
import {
    Link
  } from "react-router-dom";
export default function WorkLogs() {
    const currentUser = useSelector(state => state.currentUser)
    const [userLogs, setUsersLogs] = useState([]);
    const [flage, setFlage] = useState(true)
    const [userIndex , setUserIndex] =useState("")
    useEffect(() => {
        fetch(`http://34.210.129.167/api/user/${currentUser.id}/work-logs`,{
           method: 'GET',
           headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
           
       } )
       .then(r=>r.json()).then(res=>{
           setUsersLogs(res )
           console.log(res)
       })
      }, [])
      const handleUpdate = (ind) =>{
        setFlage(false)
        setUserIndex(ind)
        console.log(ind)
        }
      
    return (
        <div>
            <div>
            <Link  to="/createworklogs" >Create Work Log</Link>
            </div>
            
           {
               flage?
               <>
               <table>
               <thead>
                   <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                       <th>Log Date</th>
                       <th>Hours</th>
                       <th>Description</th>
                   </tr>
               </thead>
               <tbody>
               {
                userLogs?.workLogs?.data?.map((data,index)=>{
                    return(
                        <tr>
                            <td>{data.user.firstName}</td>
                            <td>{data.user.lastName}</td>
                            <td>{data.log_date}</td>
                            <td>{data.hours}</td>
                            <td>{data.description}</td>
                            <td><Link to="#" onClick={()=> handleUpdate(index)} >Update Logs</Link></td>
                        </tr>
                        
                    )
                })
            }
               </tbody>
           </table>
           </>
           :
           <CreateWorkLogs data={userLogs?.workLogs?.data[userIndex]} />
           }
        </div>
    )
}
