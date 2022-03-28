import React, {useState, useEffect, useContext } from 'react';
import classes from '../../../App.module.css';
import AuthContext from '../../context/auth_context';
import style from '../AccountList/AccountList.module.css';

const AccountInfo = (props) => {
    const [accountInfo, setAccountInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttperror] = useState();

    const authen = useContext(AuthContext);
    const getToken = authen.token;

    useEffect(() => {
        const fetchList = async () => {
            const res = await fetch('https://uathilocare.hilo.com.vn/api/Account/getInfoSelf',
            {
              method: 'GET',
              headers :{
                'Language' : 'vn',
                'Authorization': 'Bearer '+ getToken
              }
            });
            if (!res.ok) {
                throw new Error('Đã có lỗi xảy ra')
            }

            const responseData = await res.json();
            const list = responseData.data;
            console.log(list);
            setAccountInfo(list);
            setIsLoading(false);
        }
            fetchList().catch(err => {
                setIsLoading(false);
                setHttperror(err.message);
            })
            
    }, [])

    if(isLoading){
        return(
            <section className={style.loading}>
                <p>Is loading...</p>
            </section>
        )
    }

    if(httpError){
        return(
            <section className={style.loading}>
                <p>{httpError}</p>
            </section>
        )
    }

    return (
        <main className={`${classes.App} ${props.sidebar ==='open' && classes.active}`} sidebar={props.sidebar}>
            {props.children}
            <h1>AccountInfo</h1>
            <p>{accountInfo.userName}</p>
            <p>{accountInfo.fullName}</p>
            <p>{accountInfo.email}</p>
            <p>{accountInfo.phone}</p>    
            <p>{accountInfo.gender.name}</p>
            <p>{accountInfo.maritalStatus.name}</p>
        </main>
    )
}

export default AccountInfo;