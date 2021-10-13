import React from 'react'
import {useState, useEffect } from 'react'
import { useSelector} from 'react-redux'
import CreateWorkLogs from '../../Components/CreateWorkLogs/CreateWorkLogs'
import styles from './WorkLogs.module.css'
import {
    Link
  } from "react-router-dom";
export default function WorkLogs() {
    const currentUser = useSelector(state => state.currentUser)
    const [userLogs, setUsersLogs] = useState([]);
    const [searchOnDate, setSearchOnDate] = useState(false);
    const [flage, setFlage] = useState(true)
    const [userIndex , setUserIndex] =useState("")
    
    useEffect(() => {
        fetch(`http://34.210.129.167/api/user/${currentUser.id}/work-logs`,{
           method: 'GET',
           headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
           
       } )
       .then(r=>r.json()).then(res=>{
           setUsersLogs(res )
       })
      }, [])
    
      const handleUpdate = (ind) =>{
        setFlage(false)
        setUserIndex(ind)
        console.log(ind)
        }
        const [userInput , setUserInput] = useState (
            {
                "from" : "",
                "to" : "",
            } 
        )
        const [workinHour , setWorkingHour] = useState (
            {
                "workingHours" : ""
            } 
        )
        const handleChange = (evt) =>{
            
           const value = evt.target.value;
           setUserInput({
               ...userInput,
               [evt.target.name]: value
             });
             
       }
      const onSubmit = (e) =>{
        e.preventDefault();
            fetch(`http://34.210.129.167/api/work-logs/${userInput.from}/${userInput.to}`,{
               method: 'GET',
               headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
               
           } )
           .then(r=>r.json()).then(res=>{
            setUsersLogs(res )
               console.log( "reponse",userLogs)
            setSearchOnDate(true)

           })
      }
    
    //    const handleHoursChange = (evt) =>{
    //     const value = evt.target.value;
    //     setWorkingHour({
    //            ...workinHour,
    //            [evt.target.name]: value
    //          });
    //    }
    //    const onSubmitHours = () =>{
    //     fetch(`http://34.210.129.167/api/users/${currentUser.id}/preferred-working-hours`,{
    //         method: 'PATCH',
    //         headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
            
    //     } )
    //     .then(r=>r.json()).then(res=>{
    //         console.log(res)
    //         if(res.success){
    //             alert(res.message)
    //         }

    //     })  
    //    }
      
    //   console.log(workinHour)
    return (
        <div >
            <div className={styles.link_wrapper}>
            <Link  to="/createworklogs" >Create Work Log</Link>
           
            
            </div>
            
            
           {
               flage?
               <>
               <div onSubmit={onSubmit} className={styles.date_form}>
           <form className={styles.form_flex}>
                <input className={styles.date_input} type="text" name="from"   placeholder="2020-06-05" value={userInput.from} onChange={handleChange} />
                <input className={styles.date_input} type="text" name="to"   placeholder="2020-06-08" value={userInput.to}  onChange={handleChange} />
                <button>show</button>
                <Link  className={styles.date_link} to="/dashbord" > X </Link>
                
            </form>
            </div>
               <table>
               <thead>
                   <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                       <th>Log Date</th>
                       <th>Hours</th>
                       <th>Description</th>
                       <th>Update</th>
                   </tr>
               </thead>
               <tbody>
               {
                   searchOnDate?
                   userLogs?.workLogs?.map((data,index) => {
                    if(data.hours=="8"){
                        return(
                            <tr>
                                <td>{data.user.firstName}</td>
                                <td>{data.user.lastName}</td>
                                <td>{data.log_date}</td>
                                <td className={styles.green_hours} >{data.hours}</td>
                                <td>{data.description}</td>
                                <td><Link to="#" onClick={()=> handleUpdate(index)} >Update Logs</Link></td>
                            </tr>
                            
                        )
                    }else{
                        return(
                            <tr>
                                <td>{data.user.firstName}</td>
                                <td>{data.user.lastName}</td>
                                <td>{data.log_date}</td>
                                <td  className={styles.red_hours}>{data.hours}</td>
                                <td>{data.description}</td>
                                <td><Link to="#" onClick={()=> handleUpdate(index)} >Update Logs</Link></td>
                            </tr>
                            
                        )
                    }
                   })
                   :
                userLogs?.workLogs?.data?.map((data,index)=>{
                    
                    if(data.hours=="8"){
                        return(
                            <tr>
                                <td>{data.user.firstName}</td>
                                <td>{data.user.lastName}</td>
                                <td>{data.log_date}</td>
                                <td  className={styles.green_hours}>{data.hours}</td>
                                <td>{data.description}</td>
                                <td><Link to="#" onClick={()=> handleUpdate(index)} >Update Logs</Link></td>
                            </tr>
                            
                        )
                    }else{
                        return(
                            <tr>
                                <td>{data.user.firstName}</td>
                                <td>{data.user.lastName}</td>
                                <td>{data.log_date}</td>
                                <td className={styles.red_hours} >{data.hours} </td>
                                <td>{data.description}</td>
                                <td><Link to="#" onClick={()=> handleUpdate(index)} >Update Logs</Link></td>
                            </tr>
                            
                        )
                    }
                })
            }
               </tbody>
           </table>
           {/* <div onSubmit={onSubmitHours}>
           <form>
           <input  name="workingHours" value={workinHour.workingHours} onChange={handleHoursChange}  />
           <button>ok</button>
           </form>
           </div> */}
           </>
           :
           <CreateWorkLogs data={userLogs?.workLogs?.data[userIndex]} />
           }
        </div>
    )
}
