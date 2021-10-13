import React from 'react'
import {useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
// import styles from './Register.module.css'
import { useHistory } from "react-router-dom";

 const CreateUsers = (props) => {

    const history = useHistory();
    const [update, setUpdate] = useState(false)
    const currentUser = useSelector(state => state.currentUser)
     const [userInput , setUserInput] = useState (
         {
             "firstName" : "",
             "lastName" : "",
             "email" : "",
             "password" : "",
             "password_confirmation" : "",
             "userType": "user"
         } 
     )
     useEffect(() => {
        if(props.data){
            setUserInput({
                ...props.data
            })
            setUpdate(true)
         }
         
     }, [])
     const handleChange = (evt) =>{
        const value = evt.target.value;
        setUserInput({
            ...userInput,
            [evt.target.name]: value
          });
          
    }

    async  function onSubmit (e){
             e.preventDefault();
             if(update===false){
                await fetch('http://34.210.129.167/api/users',{
                    method: 'POST',
                    headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
                    body: JSON.stringify(userInput)
                } )
                .then(r=>r.json()).then(res=>{
                    if(res.message==="User created successfully!"){
                    
                        alert(res.message)
                        history.push("/dashbord");
                    
                 }
                 else{
                    return(
                        alert(res)
                    )
                 }
                   
                })
             }
             else if(update===true){
                await fetch(`http://34.210.129.167/api/users/${props.data.id}`,{
                    method: 'PUT',
                    headers:{'Content-Type':'application/json',"Authorization" : `Bearer ${currentUser.token}`},
                    body: JSON.stringify(userInput)
                } )
                .then(r=>r.json()).then(res=>{
                   
                    history.push("/dashbord");
                })
             }
    
}
    return (
        <div >
            <form onSubmit={onSubmit} >
                <label >First Name</label>
                <input  type="text" placeholder="First Name" name="firstName" value={userInput.firstName} onChange={handleChange} /><br/>
                <label >Last Name</label>
                <input  type="text" placeholder="Last Name" name="lastName" value={userInput.lastName} onChange={handleChange} /><br/>
                <label >Email</label>
                <input  type="text" placeholder="Email" name="email" value={userInput.email} onChange={handleChange} /><br/>
                <label > Password</label>
                <input  type="text" placeholder="Password" name="password" value={userInput.password} onChange={handleChange} /><br/>
                <label  >Confirm Password</label>
                <input  type="text" placeholder="Confirm Password" name="password_confirmation" value={userInput.password_confirmation} onChange={handleChange} /><br/>
                <button  type="submit">submint</button>
            </form>
        </div>
    )
}
export default CreateUsers;
