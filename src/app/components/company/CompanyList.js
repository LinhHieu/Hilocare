import React, {useState, useEffect, useContext, useRef, Fragment } from 'react';
import AuthContext from '../context/auth_context';
import style from './CompanyList.module.css';
import classes from '../../App.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BsPencilSquare } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';


const CompanyList = (props) => {

    const [companyList, setCompanyList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttperror] = useState();

    const MySwal = withReactContent(Swal)

    const authen = useContext(AuthContext);
    const getToken = authen.token;

    const [showEditScreen, setShowEditScreen] = useState(false);

    const showEditScreenHandler = () => {
        setShowEditScreen(true);
    }


    useEffect(() => {
        const fetchList = async () => {
            const res = await fetch('https://uathilocare.hilo.com.vn/api/Company/getInfo',
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
            
            setCompanyList(list);
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
            
    }, []);


    const deleteTask = async (id) => {
        console.log(id);
        MySwal.fire({
            title: 'Bạn có chắn chắn muốn xóa công ty này?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Xóa`,
          }).then( async (result) => {
            if (result.isConfirmed) {
                const res = await fetch('https://uathilocare.hilo.com.vn/api/Company/delete',
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
                    deleteResponseData.code === 200 ? MySwal.fire('Công ty đã được xóa!', '', 'success') : MySwal.fire('Đã có lỗi xảy ra khi xóa công ty', '', 'info');
                setCompanyList(companyList.filter((item) => item.userId !== id))
            } 
          })
      }

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
        <main className={`${classes.App} ${props.sidebar ==='open'&& classes.active}`} sidebar={props.sidebar}>
            <section>
                <h1>Danh sách Công ty</h1>
                    <table className={style.table}>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Tên công ty</th>
                        <th>Mã số thuế</th>
                        <th>Số điện thoại</th>
                        <th>Số điện thoại liên hệ</th>
                        <th>Email</th>
                        <th>Email liên hệ</th>
                        <th>Fax</th>
                        <th>Địa chỉ</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                        <th>Ghi chú</th>
                    </tr>
                    </thead>
                    <tbody>
                    {companyList.map((com, index) => (
                            <tr key={com.id}>
                                <th>{index + 1}</th>
                                <td>{com.name}</td>
                                <td>{com.taxCode}</td>
                                <td>{com.phone}</td>
                                <td>{com.contactPhone}</td>
                                <td>{com.email}</td>    
                                <td>{com.contactEmail}</td>
                                <td>{com.fax}</td>
                                <td>{com.address}</td>
                                <td>{com.description}</td>
                                <td><BsPencilSquare className={style.click} onClick={showEditScreenHandler}/></td>
                                <td><MdDelete className={style.click} onClick={() => deleteTask(com.userId)}/></td>
                            </tr>
                    ))}
                    </tbody>
                    </table>
            </section>
        </main>
    )
}

export default CompanyList;