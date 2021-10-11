import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import styles from './Dashbord.module.css'
 const DashBord = () => {
    return (
        <div className={styles.dashbord_wrapper}>
            
            <NavBar />
            <div>
            <h1>Dashbord</h1>
            </div>

        </div>
    )
}
export default DashBord;
