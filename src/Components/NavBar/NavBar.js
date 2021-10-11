import React from 'react'
import styles from './NavBar.module.css'
import {useDispatch} from 'react-redux'
import allActions from '../../actions/LogOutAction'
import {
    Link
  } from "react-router-dom";

export default function NavBar() {
  const dispatch = useDispatch()
const handleLogOut = () =>{
  dispatch(allActions.LogOutAction.logOut("LOG_OUT"))
}

    return (
        <div className={styles.list_wrapper}>
          <Link  className={styles.link} to="/users" >Manage Users</Link>
          <Link  className={styles.link} to="/" onClick={()=> handleLogOut} >Log Out</Link>
                 
        </div>
    )
}
