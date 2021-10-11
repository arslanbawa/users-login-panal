import React from 'react'

import styles from './Home.module.css'

import {
    Link
  } from "react-router-dom";

export default function Home() {
    return (
        <div className={styles.main_wrapper} >
                <Link className={styles.link} to="/login" >Log In</Link>
                <Link className={styles.link} to="/register" >Register</Link>
                
        </div>
    )
}
