import React from 'react'
import {useState} from 'react'
import styles from './LogIn.module.css'
import { useHistory } from "react-router-dom";
import { useDispatch} from 'react-redux'
import allActions from '../../actions'


 const LogIn = () => {
    const dispatch = useDispatch()
    //  const [role , setRole] = useState ("")
     const [userInput , setUserInput] = useState (
         {
             "email" : "",
             "password" : "",
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
    

const onSubmit = (e) =>{
             e.preventDefault();
             
            fetch('http://34.210.129.167/api/login',{
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(userInput)
            } )
            .then(r=>r.json()).then(res=>{
                 if(res.success===false){
                    return(
                        alert(res.message)
                    )
                 }else{
                    
                    dispatch(allActions.LogInAction.logIN(res))
                    // setRole(res.user.roles[0].name)
                    history.push("/dashbord");
                 }
            })
    
}

    return (
        <div className={styles.form_wrapper}>
            <form onSubmit={onSubmit} className={styles.form}>
                <label className={styles.lable}>Email</label>
                <input className={styles.input} type="text" placeholder="Email" name="email" value={userInput.email} onChange={handleChange} /><br/>
                <label className={styles.lable}>Password</label>
                <input className={styles.input}  type="text" placeholder="Password" name="password" value={userInput.password} onChange={handleChange} /><br/>
                <button className={styles.button} type="submit">LOG IN</button>
            </form>
        </div>
    )
}
export default LogIn;
