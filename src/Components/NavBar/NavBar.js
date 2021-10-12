import React from 'react'
import styles from './NavBar.module.css'
import {useDispatch, useSelector} from 'react-redux'
import allActions from '../../actions/LogOutAction'
import {
    Link
  } from "react-router-dom";

export default function NavBar() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  console.log(currentUser.role)
const handleLogOut = () =>{
  dispatch(allActions.LogOutAction.logOut("LOG_OUT"))
}

    if(currentUser.role=="admin"){
      return(
        <div className={styles.list_wrapper}>
          <Link  className={styles.link} to="/register" >Manage Managers</Link>
          <Link  className={styles.link} to="/users" >Manage Users</Link>
          <Link  className={styles.link} to="/" onClick={()=> handleLogOut} >Log Out</Link>
                 
        </div>
      )
    }
    else if(currentUser.role=="manager"){
      return(
        <div className={styles.list_wrapper}>
          <Link  className={styles.link} to="/users" >Manage Users</Link>
          <Link  className={styles.link} to="/" onClick={()=> handleLogOut} >Log Out</Link>
                 
        </div>
      )
    }
    else if(currentUser.role=="user"){
      return(
        <div className={styles.list_wrapper}>
          <Link  className={styles.link} to="/worklogs"  >Work Logs</Link>
          <Link  className={styles.link} to="/" onClick={()=> handleLogOut} >Log Out</Link>
                 
        </div>
      )
    }
}
