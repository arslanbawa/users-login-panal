import React from 'react'
import {useState } from 'react'
import styles from './Register.module.css'
import { useHistory } from "react-router-dom";
import {useSelector} from 'react-redux'

 const Register = () => {
    const history = useHistory();
    const currentUser = useSelector(state => state.currentUser)
    // console.log(currentUser.token)
     const [userInput , setUserInput] = useState (
         {
             "firstName" : "",
             "lastName" : "",
             "email" : "",
             "password" : "",
             "password_confirmation" : ""
         } 
     )
     const handleChange = (evt) =>{
        const value = evt.target.value;
        setUserInput({
            ...userInput,
            [evt.target.name]: value
          });
          
    }

    async  function onSubmit (e){
             e.preventDefault();

            await fetch('http://34.210.129.167/api/register',{
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(userInput)
            } )
            .then(r=>r.json()).then(res=>{
                if(res.message==="User created successfully!"){
                    
                    if(currentUser.role==="admin"){
                        alert(res.message)
                        history.push("/users");
                    }else{
                        alert(res.message)
                        history.push("/");
                    }
                    
                 }
                 else{
                    return(
                        alert(res)
                    )
                 }
            })
    
}
    return (
        <div className={styles.form_wrapper}>
            <form onSubmit={onSubmit} className={styles.form}>
                <label className={styles.lable}>First Name</label>
                <input className={styles.input} type="text" placeholder="First Name" name="firstName" value={userInput.firstName} onChange={handleChange} /><br/>
                <label className={styles.lable}>Last Name</label>
                <input className={styles.input} type="text" placeholder="Last Name" name="lastName" value={userInput.lastName} onChange={handleChange} /><br/>
                <label className={styles.lable}>Email</label>
                <input className={styles.input} type="text" placeholder="Email" name="email" value={userInput.email} onChange={handleChange} /><br/>
                <label className={styles.lable}> Password</label>
                <input className={styles.input} type="text" placeholder="Password" name="password" value={userInput.password} onChange={handleChange} /><br/>
                <label  className={styles.lable}>Confirm Password</label>
                <input  className={styles.input}type="text" placeholder="Confirm Password" name="password_confirmation" value={userInput.password_confirmation} onChange={handleChange} /><br/>
                <button className={styles.button} type="submit">submint</button>
            </form>
        </div>
    )
}
export default Register;
