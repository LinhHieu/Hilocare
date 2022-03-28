import React, {useState, useEffect, Fragment} from 'react';
import AuthContext from '../../context/auth_context';
import style from './AccountList.module.css';
import { MdDelete } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import AccountChangeForm from './AccountChangeForm/AccountChangeForm';

const Account = (props) => {
    const [showEditScreen, setShowEditScreen] = useState(false);

    const showEditScreenHandler = () => {
        setShowEditScreen(true);
    }

    const hideEditScreenHandler = () => {
        setShowEditScreen(false);
    }

    if(props.isLoading){
        return(
            <section className={style.loading}>
                <p>Is loading...</p>
            </section>
        )
    }

    if(props.httpError){
        return(
            <section className={style.loading}>
                <p>{props.httpError}</p>
            </section>
        )
    }
    return (
        <Fragment>
            {showEditScreen && <AccountChangeForm CancelForm={hideEditScreenHandler}/>}
            <section>
                <h1>Danh sách tài khoản</h1>
                    <table className={style.table}>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Tên tài khoản</th>
                        <th>Tên người dùng</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Giới tính</th>
                        <th>Tình trạng hôn nhân</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.accountList.map((acc, index) => (
                            <tr key={acc.userId}>
                                <th>{index + 1}</th>
                                <td>{acc.userName}</td>
                                <td>{acc.fullName}</td>
                                <td>{acc.email}</td>
                                <td>{acc.phone}</td>    
                                <td>{acc.gender.name}</td>
                                <td>{acc.maritalStatus.name}</td>
                                <td><BsPencilSquare className={style.click} onClick={showEditScreenHandler}/></td>
                                <td><MdDelete className={style.click} onClick={() => props.deleteTask(acc.userId)}/></td>
                            </tr>
                    ))}
                    </tbody>
                    </table>
            </section>
        </Fragment>
      );
}

export default Account;