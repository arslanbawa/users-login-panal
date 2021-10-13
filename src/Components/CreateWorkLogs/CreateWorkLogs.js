import React from 'react'
import {useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useSelector} from 'react-redux'
import styles from './CreateWorkLogs.module.css'


 const CreateWorkLogs = (props) => {
    const currentUser = useSelector(state => state.currentUser)
    const [update, setUpdate] = useState(false)
     const [userInput , setUserInput] = useState (
         {
             "logDate" : "",
             "hours" : "",
             "description" : "",
         } 
     )
     const history = useHistory();
     const handleChange = (evt) =>{
        const value = evt.target.value;
        setUserInput({
            ...userInput,
            [evt.target.name]: value
          });
          
    }
    useEffect(() => {
        if(props.data){

            setUserInput({
                ...props.data,
                logDate:props.data.log_date
            })
            setUpdate(true)
         }
         
     }, [])
    console.log(userInput)

const onSubmit = (e) =>{
             e.preventDefault();
             if(update===false){
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
                    console.log("ars",res)
                    history.push("/worklogs");
                 }
            })
    
}
else if(update===true){
         fetch(`http://34.210.129.167/api/user/${currentUser.id}/work-logs/${props.data.id}`,{
        method: 'PUT',
        headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
        body: JSON.stringify(userInput)
    } )
    .then(r=>r.json()).then(res=>{
       console.log(res)
        history.push("/dashbord");
    })
 }
}

    return (
        <div className={styles.main_wrapper} >
            <form onSubmit={onSubmit} >
                <label >Log Date</label>
                <input  type="text" placeholder="logDate" name="logDate" value={userInput.logDate} onChange={handleChange} /><br/>
                <label >Hours</label>
                <input   type="text" placeholder="hours" name="hours" value={userInput.hours} onChange={handleChange} /><br/>
                <label >Description</label>
                <input   type="text" placeholder="description" name="description" value={userInput.description} onChange={handleChange} /><br/>
                <button  type="submit">Submit</button>
            </form>
        </div>
    )
}
export default CreateWorkLogs;
