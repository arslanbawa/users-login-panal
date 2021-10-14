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
    // const [pageNo , setUPageNo] =useState("")
    const currentUser = useSelector(state => state.currentUser)
    const [userList, setUsersList] = useState([]);
   useEffect(() => {
     fetch('http://34.210.129.167/api/users',{
        method: 'GET',
        headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
        
    } )
    .then(r=>r.json()).then(res=>{
        setUsersList(res )
        // setUPageNo(res.users.current_page)
        // console.log(res)
    })
    .catch(err => {
        alert(err)
      })
   }, [])
//    console.log(userList.users?.data[0]?.roles[0]?.name)
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
                                    <th>user Type</th>
                                    <th>Update</th>
                                    <th>Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                            {
                                                userList.users?.data?.map((element, index) =>{
                                                    if(element.roles[0]?.name==="manager"){
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
                                                            {/* <td><Link to="/worklogs"  >Work Logs</Link></td> */}
                                                        </tr>
                                                        </>
                                                        )
                                                    }
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
