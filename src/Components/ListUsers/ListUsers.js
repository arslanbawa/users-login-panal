import React from 'react'
import {useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import CreateUsers from '../CreateUsers/CreateUsers';
import styles from './ListUsers.module.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function ListUsers() {
    const [flage, setFlage] = useState(true)
    const [userIndex , setUserIndex] =useState("")
    const currentUser = useSelector(state => state.currentUser)
    const [userList, setUsersList] = useState([]);
   useEffect(() => {
     fetch('http://34.210.129.167/api/users',{
        method: 'GET',
        headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
        
    } )
    .then(r=>r.json()).then(res=>{
        setUsersList(res )
    })
   }, [])
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
        userList.users.data.splice(index,1)
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
                                    <th>created at</th>

                                </tr>
                            </thead>
                            <tbody>
                           {
                                userList.users?.data?.map((element, index) =>{
                                    return(
                                        <tr>
                                        <td>{element.firstName }</td>
                                        <td>{element.lastName }</td>
                                        <td>{element.working_hours }</td>
                                        <td>{element.created_at }</td>  
                                        <td><Link to="#" onClick={()=> handleUpdate(index)} >Update Users</Link></td>
                                        <td><Link to="#" onClick={()=> HandleDelete(element.id,index)} >Delate     Users</Link></td> 
                                    </tr>
                                    )
                                })
                           }
                               
                            </tbody>
                        </table>
                </>
                :
                <CreateUsers data={userList.users.data[userIndex]} />

            }
            
                        
        </div>
    )
}
