import React from 'react'
import styles from './NavBar.module.css'
import {useDispatch, useSelector} from 'react-redux'
import allActions from '../../actions/LogOutAction'
import { useHistory } from "react-router-dom";
import {
    Link
  } from "react-router-dom";

export default function NavBar() {
  const history = useHistory();
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
const handleLogOut = () =>{
  dispatch(allActions.LogOutAction.logOut("LOG_OUT"))
}

    if(currentUser.loggedIn===true){
      if(currentUser.role==="admin"){
        return(
          <div className={styles.list_wrapper}>
            <Link  className={styles.link} to="/register" >Manage Managers</Link>
            <Link  className={styles.link} to="/users" >Manage Users</Link>
            <Link  className={styles.link} to="/" onClick={()=> handleLogOut} >Log Out</Link>
                   
          </div>
        )
      }
      else if(currentUser.role==="manager"){
        return(
          <div className={styles.list_wrapper}>
            <Link  className={styles.link} to="/users" >Manage Users</Link>
            <Link  className={styles.link} to="/" onClick={()=> handleLogOut} >Log Out</Link>
                   
          </div>
        )
      }
      else if(currentUser.role==="user"){
        return(
          <div className={styles.list_wrapper}>
            <Link  className={styles.link} to="/worklogs"  >Work Logs</Link>
            <Link  className={styles.link} to="/" onClick={()=> handleLogOut} >Log Out</Link>
                   
          </div>
        )
      }
    }else{
        alert("Plese LogIn first")
        history.push("/");
      
    }
}
