import React, {useState, useEffect, useContext, Fragment } from 'react';
import reactDom from 'react-dom';
import classes from '../../../../App.module.css';
import AuthContext from '../../../context/auth_context';
import style from './AccountInfoChange.module.css';


const Backdrop = props => {
    return <div className={style.backdrop} />
}

const ModalOverlay = props => {
    return  <div className={style.modal}>
                <div className={style.content}>{props.children}</div>
            </div>
}
const portalElement = document.getElementById('overlay')

const AccountInfoChange = (props) => {


    

    return ( 
        <Fragment>
            {reactDom.createPortal(<Backdrop/>, portalElement)}
            {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default AccountInfoChange;