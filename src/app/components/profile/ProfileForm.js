import classes from './ProfileForm.module.css';
import {useRef, useContext}  from 'react';
import {useHistory} from 'react-router-dom';
import AuthContext from '../context/auth_context';


const ProfileForm = () => {

    const history = useHistory();

    const authen = useContext(AuthContext);
    const oldPasswordInputRef = useRef();
    const newPasswordInputRef = useRef();
    const newConfirmPasswordInputRef = useRef();
    const submitHandler = (event) =>{
        event.preventDefault();
        const oldPassword = oldPasswordInputRef.current.value;
        const newPassword = newPasswordInputRef.current.value;
        const newConfirmPassword = newConfirmPasswordInputRef.current.value;
        fetch('https://uathilocare.hilo.com.vn/api/Account/updatePasswordSelf',{
            method: 'PUT',
            body: JSON.stringify({
                passwordOld: oldPassword,
                password: newPassword,
                passwordConfirm: newConfirmPassword,
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }),
            headers :{
              'Content-Type': 'application/json'
            }
        }).then((res) =>{
            //setIsLoading(false);
            if(res.ok) {
              return res.json()
            } else {
              return res.json().then((data)=>{
                console.log(data);
                let errorMessage = data.message;
                //alert(errorMessage);
                throw new Error(errorMessage)
              }); 
            }
          }).then((data) =>{
            console.log(data);
            authen.login(data.token);
            history.replace('/');
          }).catch((err) =>{
            alert(err.message);
          })
    }

    return (
        <form className={classes.form}>
            <div className={classes.control}>
                <label htmlFor='old-password'>Nhập mật khẩu cũ</label>
                <input type='password' id='old-password' ref={oldPasswordInputRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='new-password'>Mật khẩu mới</label>
                <input type='password' id='new-password' ref={newPasswordInputRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='new-password'>Nhập lại mật khẩu</label>
                <input type='password' id='new-password' ref={newConfirmPasswordInputRef} />
            </div>
            <div className={classes.action}>
                <button>Đổi mật khẩu</button>
            </div>
        </form>
    );
} 

export default ProfileForm;