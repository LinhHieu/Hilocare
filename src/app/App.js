import classes from './App.module.css';
import Login from './components/Login/Login';
import Home from './components/Main/Home';
import UserProfile from'./components/profile/UserProfile';
import React, {useState, useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import AuthContext from './components/context/auth_context';
import Layout from './components/Layout/Layout';
import AccountList from './components/account/AccountList/AccountList';
import AccountInfo from './components/account/AccountInfo/AccountInfo';
import AccountInfoChange from './components/account/AccountList/AccountChangeForm/AccountInfoChange';
import MedicalInfo from './components/Medical/MedicalInfo';
import MedicalCreate from './components/Medical/MedicalCreate/MedicalCreate';
import Permission from './components/Permission/Permission';
import ScheduleList from './components/ExaminationSchedule/ScheduleList';
import CompanyCreate from './components/company/CompanyCreate/CompanyCreate';
import CompanyList from './components/company/CompanyList';


const App = () =>{
  const authen = useContext(AuthContext)
  const [sidebar, setSidebar] = useState('open');
  const showSidebar = () => setSidebar('open');
  const hideSidebar = () => setSidebar('close');

    return (
        
        <Switch>
          <Route path='/' exact>
          {authen.isLoggedIn && <Layout sidebar={sidebar} openclick={showSidebar} hideclick={hideSidebar}><Home sidebar={sidebar}/></Layout>}
          {!authen.isLoggedIn && <Redirect to='/Login' />}
          </Route>
          
          {!authen.isLoggedIn &&(
          <Route path='/Login'>
            <Login />
          </Route>
          )}
          
          <Route path='/Profile'>
          {authen.isLoggedIn && <Layout sidebar={sidebar} openclick={showSidebar} hideclick={hideSidebar}><UserProfile sidebar={sidebar}/></Layout>}
          {!authen.isLoggedIn && <Redirect to='/Login' />}
          </Route>
          
          <Route path='/AccountList'>
          {authen.isLoggedIn && <Layout sidebar={sidebar} openclick={showSidebar} hideclick={hideSidebar}><AccountList sidebar={sidebar}/></Layout>}
          {!authen.isLoggedIn && <Redirect to='/Login' />}
          </Route>
          <Route path='/AccountInfo'>
          {authen.isLoggedIn && <Layout sidebar={sidebar} openclick={showSidebar} hideclick={hideSidebar}><AccountInfo sidebar={sidebar}/></Layout>}
          {!authen.isLoggedIn && <Redirect to='/Login' />}
          </Route>
          <Route path='/AccountInfoChange'>
          {authen.isLoggedIn && <Layout sidebar={sidebar} openclick={showSidebar} hideclick={hideSidebar}><AccountInfoChange sidebar={sidebar}/></Layout>}
          {!authen.isLoggedIn && <Redirect to='/Login' />}
          </Route>

          <Route path='/MedicalInfo'>
          {authen.isLoggedIn && <Layout sidebar={sidebar} openclick={showSidebar} hideclick={hideSidebar}><MedicalInfo sidebar={sidebar}/></Layout>}
          {!authen.isLoggedIn && <Redirect to='/Login' />}
          </Route>

          <Route path='/MedicalCreate'>
          {authen.isLoggedIn && <Layout sidebar={sidebar} openclick={showSidebar} hideclick={hideSidebar}><MedicalCreate sidebar={sidebar}/></Layout>}
          {!authen.isLoggedIn && <Redirect to='/Login' />}
          </Route>

          <Route path='/GetRole'>
          {authen.isLoggedIn && <Layout sidebar={sidebar} openclick={showSidebar} hideclick={hideSidebar}><Permission sidebar={sidebar}/></Layout>}
          {!authen.isLoggedIn && <Redirect to='/Login' />}
          </Route>
          
          <Route path='/ScheduleList'>
          {authen.isLoggedIn && <Layout sidebar={sidebar} openclick={showSidebar} hideclick={hideSidebar}><ScheduleList sidebar={sidebar}/></Layout>}
          {!authen.isLoggedIn && <Redirect to='/Login' />}
          </Route>

          <Route path='/CompanyCreate'>
          {authen.isLoggedIn && <Layout sidebar={sidebar} openclick={showSidebar} hideclick={hideSidebar}><CompanyCreate sidebar={sidebar}/></Layout>}
          {!authen.isLoggedIn && <Redirect to='/Login' />}
          </Route>

          <Route path='/CompanyList'>
          {authen.isLoggedIn && <Layout sidebar={sidebar} openclick={showSidebar} hideclick={hideSidebar}><CompanyList sidebar={sidebar}/></Layout>}
          {!authen.isLoggedIn && <Redirect to='/Login' />}
          </Route>

          {!authen.isLoggedIn ? (
            <Redirect to='/Login'></Redirect>
          ) : <Redirect to='/'></Redirect>}


          <Route path='/*'>
            <Redirect to='/Login' />
          </Route>
        </Switch>
  );
  
}

export default App;
