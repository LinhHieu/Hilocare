import classes from './Login.module.css';
import React, { useState, useRef, useEffect, useContext} from 'react';
import classes2 from '../../App.module.css';
import AuthContext from '../context/auth_context';
import {useHistory} from 'react-router-dom';

const Login = (props) => {


    const history = useHistory();

    const authen = useContext(AuthContext);
    const userNameInput = useRef();
    const userPasswordInput = useRef();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
      setIsLogin((prevState) => !prevState);
    };

    const registerInfo = (event) => {
      event.preventDefault();
      const username = userNameInput.current.value;
      const password = userPasswordInput.current.value;
      setIsLoading(true);
      if(isLogin) {
        fetch('https://uathilocare.hilo.com.vn/api/Authentication/getToken',
        {
          method: 'POST',
          body: JSON.stringify({
            userName: username,
            userPassword: password,
            taxCode: "string",
            userType: 0
          }),
          headers :{
            'Content-Type': 'application/json',
            'Language' : 'vn'
          }
        }).then((res) =>{
          setIsLoading(false);
          if(res.ok) {
            return res.json()
          } else {
            return res.json().then((data)=>{
              let errorMessage = data.message;
              throw new Error(errorMessage)
            }); 
          }
        }).then((data) =>{
          if(data.code == "200") {
            const expirationTime = new Date((new Date().getTime() + (3600 * 1000)));
            authen.login(data.data.token, expirationTime.toISOString());
            history.replace('/');
          }
          else{
            alert(data.message);
          }
          //history.replace('/');
        }).catch((err) =>{
          alert(err.message);
        })
      } 
      else {
        fetch('https://uathilocare.hilo.com.vn/api/Authentication/register',
        {
          method: 'POST',
          body: JSON.stringify({
            userName: username,
            userPassword: password,
          }),
          headers :{
            'Content-Type': 'application/json',
            'Language' : 'vn'
          }
        }).then((res) =>{
          setIsLoading(false);
          if(res.ok) {
            return res.json()
          } else {
            return res.json().then((data)=>{
              let errorMessage = data.message;
              throw new Error(errorMessage)
            }); 
          }
        }).then((data) =>{
          if(data.code == "200") {
            const expirationTime = new Date((new Date().getTime() + (3600 * 1000)));
            authen.login(data.data.token, expirationTime.toISOString());
            history.replace('/');
          }
          else{
            alert(data.message);
          }
        }).catch((err) =>{
          alert(err.message);
        })
      }
    }
  
      return (
        <div className={classes.auth}>
          <form onSubmit={registerInfo}>
            <div className={classes.control}>
              <label htmlFor='text'>Tên đăng nhập</label>
              <input type='text' id='text' required ref={userNameInput}/>
            </div>
            <div className={classes.control}>
              <label htmlFor='password'>Mật khẩu</label>
              <input type='password' id='password' required ref={userPasswordInput}/>
            </div>
            <div className={classes.actions}>
              {!isLoading &&<button>{isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}</button>}
              {isLoading && <p>đang tải</p>}
              <button
                type='button'
                className={classes.toggle}
                onClick={switchAuthModeHandler}
              >
                {isLogin ? 'Tạo tài khoản mới' : 'Đăng nhập với tài khoản đã có'}
              </button>
            </div>
          </form>
        </div>
    );
  }
  


export default Login;