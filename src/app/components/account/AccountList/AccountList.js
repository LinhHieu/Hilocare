import React, {useState, useEffect, useContext, useRef } from 'react';
import style from './AccountList.module.css';
import classes from '../../../App.module.css';
import AuthContext from '../../context/auth_context';
import AccountTable from './AccountTable';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const AccountList = (props) => {
    const [accountList, setAccountList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttperror] = useState();

    const [currentPage, setCurrentPage] = useState(1);
    const [linesPerPage, setLinesPerPage] = useState(10);

    const MySwal = withReactContent(Swal)

    const authen = useContext(AuthContext);
    const getToken = authen.token;

    useEffect(() => {
        const fetchList = async () => {
            const res = await fetch('https://uathilocare.hilo.com.vn/api/Account/getAccount',
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
            
            setAccountList(list);
            // const userNameList = list.map(item => {
            //     return {
            //         id: item.userName
            //     }
            // });
            // console.log(userNameList);
            setIsLoading(false);
        }
            fetchList().catch(err => {
                setIsLoading(false);
                setHttperror(err.message);
            })
            
    }, [])


    const deleteTask = async (id) => {
        console.log(id);
        MySwal.fire({
            title: 'Bạn có chắn chắn muốn xóa tài khoản này?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Xóa`,
          }).then( async (result) => {
            if (result.isConfirmed) {
                const res = await fetch('https://uathilocare.hilo.com.vn/api/Account/delete',
                    {
                    method: 'DELETE',
                    body: JSON.stringify({
                        id: id
                    }),
                    headers :{
                        'Content-Type': 'application/json',
                        'Language' : 'vn',
                        'Authorization': 'Bearer '+ getToken
                    }
                    })
                    const deleteResponseData = await res.json();
                    deleteResponseData.code === 200 ? MySwal.fire('Tài khoản đã được xóa!', '', 'success') : MySwal.fire('Đã có lỗi xảy ra khi xóa tài khoản', '', 'info');
                setAccountList(accountList.filter((item) => item.userId !== id))
            } 
          })
      }
    const userNameRef = useRef();

    const ChangeFilter = (event) => {
        
        event.preventDefault();
        
        const enteredUserName = userNameRef.current.value;
        console.log(enteredUserName);
        setAccountList(accountList.filter((item => {
            return item.userName === enteredUserName;
        })))
    }
    
    return (
        <main className={`${classes.App} ${props.sidebar ==='open'&& classes.active}`} sidebar={props.sidebar}>
            
            <form className={style.search} onSubmit={ChangeFilter}>
                <div className={style.searchform}>
                    <div className={style.searchcontrol}> 
                        <label>Ten tài khoản</label>
                        <input type='text' name="username" ref={userNameRef}/>
                    </div>
                    <div className={style.searchcontrol}>
                        <label>Tên người dùng</label>
                        <input type='text' name="fullname"/>
                    </div>
                    <div className={style.searchcontrol}>
                        <label>Email</label>
                        <input type='text' name="email" />
                    </div>
                    <div className={style.searchcontrol}> 
                        <label>Số điện thoại</label>
                        <input type='text' name="phone" />
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
                <div className={style.searchbutton}>
                    <button type="submit">Tìm tài khoản</button>
                </div>
            </form>
            <AccountTable accountList={accountList} isLoading={isLoading} httpError={httpError} deleteTask={deleteTask}/>
        </main>
    )
}

export default AccountList;

// index={index}
// key={acc.userId}
// username={acc.username}
// phone={acc.phone}
// email={acc.email} 