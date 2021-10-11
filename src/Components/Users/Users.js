import React from 'react'
import NavBar from '../NavBar/NavBar'
import ListUsers from '../ListUsers/ListUsers'
import styles from './Users.module.css'

import {
    Link
  } from "react-router-dom";

export default function Users() {
    return (
        <div className={styles.main_wrapper}>
            < NavBar />
            <ListUsers />
            <Link className={styles.link} to="/users/create">Create new</Link>
            

        </div>
    )
}
