import React, {useState, useEffect, useContext, Fragment } from 'react';
import style from './AccountChangeForm.module.css';
import AccountInfoChange from './AccountInfoChange';

const AccountChangeForm = (props) => {
    // const [accountInfo, setAccountInfo] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [httpError, setHttperror] = useState();
    // const authen = useContext(AuthContext);
    // const getToken = authen.token;

    // useEffect(() => {
    //     const fetchList = async () => {
    //         const res = await fetch(`https://uathilocare.hilo.com.vn/api/Account/getInfo?Id=${props.userid}`,
    //         {
    //           method: 'GET',
    //           headers :{
    //             'Language' : 'vn',
    //             'Authorization': 'Bearer '+ getToken
    //           }
    //         });
    //         if (!res.ok) {
    //             throw new Error('Đã có lỗi xảy ra')
    //         }

    //         const responseData = await res.json();
    //         const list = responseData.data;
    //         console.log(list);
    //         setAccountInfo(list);
    //         setIsLoading(false);
    //     }
    //         fetchList().catch(err => {
    //             setIsLoading(false);
    //             setHttperror(err.message);
    //         })
            
    // }, [])


    return ( 
    <AccountInfoChange>
        <div>
        <div className={style.searchcontrol}>
            <label htmlFor='text'>Tên tài khoản</label>
            <input type='text' id='text'/>
            </div>
        <div className={style.searchcontrol}>
            <label htmlFor='text'>Tên người dùng</label>
            <input type='text' id='text'/>
        </div>
        <div className={style.searchcontrol}>
            <label htmlFor='text'>Email</label>
            <input type='text' id='text'/>
        </div>
        <div className={style.searchcontrol}>
            <label htmlFor='text'>Số điện thoại</label>
            <input type='text' id='text'/>
        </div>
        <div className={style.searchcontrol}> 
            <label>Giới tính</label>
                <select name="gender" id="gender">
                    <option value="men">Nam</option>
                    <option value="women">Nữ</option>
                </select>
            </div>
        <div className={style.searchcontrol}> 
            <label>Tình trạng hôn nhân</label>
                <select name="marriageStatus" id="marriageStatus">
                    <option value="married">Đã kết hôn</option>
                    <option value="single">Độc thân</option>
                </select>
            </div>
        </div>
        <div className={style.actions}>
            <button className={style['button--alt']}  onClick={props.CancelForm}>Close</button>
            <button className={style.button}>Save</button>
        </div>
    </AccountInfoChange>
    );
}

export default AccountChangeForm;