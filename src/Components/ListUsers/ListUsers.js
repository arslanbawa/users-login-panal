import React from 'react'
import {useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import CreateUsers from '../CreateUsers/CreateUsers';
import styles from './ListUsers.module.css'

import {
    Link
  } from "react-router-dom";

export default function ListUsers() {
    const [flage, setFlage] = useState(true)
    const [userIndex , setUserIndex] =useState("")
    const currentUser = useSelector(state => state.currentUser)
    const [userList, setUsersList] = useState([]);
    const [pageNo, setPageNo] = useState(1)
    
   useEffect(() => {
     fetch(`http://34.210.129.167/api/users?page=${pageNo}`,{
        method: 'GET',
        headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
        
    } )
    .then(r=>r.json()).then(res=>{
        setUsersList(res )
    })
    .catch(err => {
        alert(err)
      })
      // eslint-disable-next-line
   }, [pageNo])
const handleUpdate = (ind) =>{
setFlage(false)
setUserIndex(ind)
}
const HandleDelete = (id,index) =>{
        fetch(`http://34.210.129.167/api/users/${id}`,{
            method: 'DELETE',
            headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
            
        } )
        .then(r=>r.json()).then(res=>{
            
            setFlage(true)
        })
        .catch(err => {
            alert(err)
          })
        userList.users.data.splice(index,1)
}
const handleIncremet = () =>{
    if(pageNo>0){
        setPageNo(pageNo+1)
    }
}
const handleDecrement =() =>{
    if(pageNo>0){
        setPageNo(pageNo-1)
    }
}

    return (
        <div className={styles.main_warpper}>
            <h1> users list</h1>
            {
                flage?
                <>
                <table>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Working Hours</th>
                                    <th>user Type</th>
                                    <th>Update</th>
                                    <th>Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                            {
                               userList.users?.data?.map((element, index) =>{
                                 if(element.roles[0]?.name==="manager"){
                                    return(
                                        <>
                                                                
                                            <tr>
                                                <td>{element.firstName }</td>
                                                <td>{element.lastName }</td>
                                                <td>{element.working_hours }</td>
                                                <td>{element.roles[0]?.name}</td> 
                                                <td><Link to="#" onClick={()=> handleUpdate(index)} >Update </Link></td>
                                                <td><Link to="#" onClick={()=> HandleDelete(element.id,index)} >Delate     </Link></td> 
                                            </tr>
                                        </>
                                        )
                                    }
                                    return true
                                     })
                                     
                                    }
                                     {
                                        userList.users?.data?.map((element, index) =>{
                                             if(element.roles[0]?.name==="user"){
                                                return(<>
                                                            
                                                    <tr>
                                                        <td>{element.firstName }</td>
                                                        <td>{element.lastName }</td>
                                                        <td>{element.working_hours }</td>
                                                        <td>{element.roles[0]?.name}</td>  
                                                        <td><Link to="#" onClick={()=> handleUpdate(index)} >Update </Link></td>
                                                        <td><Link to="#" onClick={()=> HandleDelete(element.id,index)} >Delate     </Link></td> 
                                                    </tr>
                                                    </>
                                                    )
                                                }
                                                  return true
                                                }) 
                                           
                                            } 
                                           
                            </tbody>
                        </table>
                </>
                :
                <CreateUsers data={userList.users.data[userIndex]} />
            }    
            <div className={styles.pageno_wrapper}>
            <button className={styles.pg_btn} onClick={handleDecrement}>-</button>
            <p className={styles.pg_btn}>{pageNo}</p>
            <button className={styles.pg_btn}onClick={handleIncremet}>+</button>
                </div>         
        </div>
    )
}
