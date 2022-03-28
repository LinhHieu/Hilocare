import React from 'react';
import classes from '../../App.module.css';


const MedicalInfo = (props) => {
    return (
        <main className={`${classes.App} ${props.sidebar ==='open' && classes.active}`} sidebar={props.sidebar}>
            {props.children}
            <h1>MedicalInfo</h1>
        </main>
    )
}

export default MedicalInfo;