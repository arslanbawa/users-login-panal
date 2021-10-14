import React from 'react'
import {useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useSelector} from 'react-redux'
import styles from './CreateWorkLogs.module.css'


 const CreateWorkLogs = (props) => {
    const history = useHistory();
    const currentUser = useSelector(state => state.currentUser)
    const [update, setUpdate] = useState(false)
     const [userInput , setUserInput] = useState (
         {
             "logDate" : "",
             "hours" : "",
             "description" : "",
         } 
     )
     const[updateHours, setUpdateHours] = useState({
        "workingHours":""
    })
   
     
     const handleChange = (evt) =>{
        const value = evt.target.value;
        
            setUserInput({
                ...userInput,
                [evt.target.name]: value
                
              });
    }
    const handleUpdateHours = (evt) =>{
        const value = evt.target.value;
        setUpdateHours({
            ...updateHours,
            [evt.target.hours]: value
            
          });
    }
    console.log(updateHours)
    useEffect(() => {
        if(props.data){
            if(props.workinHour===false){
                setUserInput({
                    ...props.data,
                    logDate:props.data.log_date
                })
                setUpdate(true)
            }else if(props.workinHour===true){
                setUpdateHours({
                    ...props.data,
                    workingHours:props.data.hours
                })
            }
         }
         // eslint-disable-next-line
     }, [])

const onSubmit = (e) =>{
             e.preventDefault();
             //Creating new work logs
             if(update===false && props.workinHour===false){
            fetch('http://34.210.129.167/api/work-logs',{
                method: 'POST',
                headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
                body: JSON.stringify(userInput)
            } )
            .then(r=>r.json()).then(res=>{
                 if(res.success===false){
                    return(
                        alert(res.message)
                    )
                 }else{
                    alert(res.message)
                    history.push("/worklogs");
                 }
            })
            .catch(err => {
                alert(err)
              })
}
//Updating work logs
else if(update===true){
         fetch(`http://34.210.129.167/api/user/${currentUser.id}/work-logs/${props.data.id}`,{
        method: 'PUT',
        headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
        body: JSON.stringify(userInput)
    } )
    .then(r=>r.json()).then(res=>{
        history.push("/dashbord");
    })
    .catch(err => {
        alert(err)
      })
 }
 //Updating working hours
 else if(props.workinHour){
    fetch(`http://34.210.129.167/api/users/${currentUser.id}/preferred-working-hours`,{
        method: 'PATCH',
        headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
        body:JSON.stringify({workingHours: updateHours.workingHours})
        
    } )
    .then(r=>r.json()).then(res=>{
            alert(res.message)
            history.push("/dashbord");
        

    })
    .catch(err => {
        alert(err)
      })
 }

}

    return (
        <div className={styles.main_wrapper} >
            <form onSubmit={onSubmit} >
                {
                    props.workinHour?
                    <>
                    <label >Pereferd working hours</label>
                <input   type="text" placeholder="workingHours" workingHours="workingHours" value={userInput.workingHours} onChange={handleUpdateHours} /><br/>
                <button  type="submit">Submit</button>
                </>
                :
                <>
                <label >Log Date</label>
                <input  type="text" placeholder="logDate" name="logDate" value={userInput.logDate} onChange={handleChange} /><br/>
                <label >Hours</label>
                <input   type="text" placeholder="hours" name="hours" value={userInput.hours} onChange={handleChange} /><br/>
                <label >Description</label>
                <input   type="text" placeholder="description" name="description" value={userInput.description} onChange={handleChange} /><br/>
                <button  type="submit">Submit</button>
                </>
                }
                
            </form>
            
        </div>
    )
}
export default CreateWorkLogs;
