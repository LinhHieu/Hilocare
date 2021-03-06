import React, {useState, useRef, useContext} from 'react';
import style from './CompanyCreate.module.css';
import classes from '../../../App.module.css';
import {useHistory} from 'react-router-dom';
import AuthContext from '../../context/auth_context';

const CompanyCreate = (props) => {
    //const [isLoading, setIsLoading] = useState(false);

    const authen = useContext(AuthContext);
    const getToken = authen.token;
    const history = useHistory();


    const [enteredTaxCode, setEnteredTaxCode] = useState('');
    const [enteredTaxCodeIsValid, setEnteredTaxCodeIsValid] = useState(false);
    const [enteredTaxCodeIsTouch, setEnteredTaxCodeIsTouch] = useState(false)


    const TaxCodeInputChange = (event) => {
        setEnteredTaxCode(event.target.value);
    }


    const AddCompany = (event) => {
        event.preventDefault();
        console.log("test");
        setEnteredTaxCodeIsTouch(true);
        if(enteredTaxCode.trim() === ''){
          setEnteredTaxCodeIsValid(false);
          return;
        }
        setEnteredTaxCodeIsValid(true);
        // fetch('https://uathilocare.hilo.com.vn/api/Company/create',
        // {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     name: "",
        //     taxCode: "443",
        //     phoneNumber:"4344",
        //     fax:"111",
        //     emailAddress:"sdsdds",
        //     cityName: "sdds",
        //     wardName: "sdds",
        //     districtName:"dssd" ,
        //     address: "sdsd",
        //     contactEmail: "rreer",
        //     contactPhone: "dsds",
        //     description: "dfgfg"
        //   }),
        //   headers :{
        //     'Content-Type': 'application/json',
        //     'Language' : 'vn',
        //     'Authorization': 'Bearer '+ getToken
        //   }
        // }).then((res) =>{
        //   //setIsLoading(false);
        //   if(res.ok) {
        //     return res.json()
        //   } else {
        //     return res.json().then((data)=>{
        //       let errorMessage = data.message;
        //       throw new Error(errorMessage)
        //     }); 
        //   }
        // }).then((data) =>{
        //   if(data.code == "200") {
        //     console.log(data)
        //     history.replace('/CompanyList');
        //   }
        //   else{
        //     alert(data.message);
        //   }
        //   //history.replace('/');
        // }).catch((err) =>{
        //   alert(err.message);
        // })

    }

    const TaxCodeValid = !enteredTaxCodeIsValid && enteredTaxCodeIsTouch;
    
    return (
        <div className={`${classes.App} ${props.sidebar ==='open'&& classes.active}`} sidebar={props.sidebar}>
            <h3>T???o c??ng ty</h3>
            <div className={style.wrap}>
            <form className={style.form} onSubmit={AddCompany}>
                <div className={style.control}>
                    <label htmlFor='CompanyName'>T??n c??ng ty </label>
                    <input type='text' id='company-name'  />
                </div>
                <div className={`${style.control} ${TaxCodeValid && style.invalid}`}>
                    <label htmlFor='TaxCode'>M?? s??? thu???</label>
                    <input type='taxcode' id='taxcode' onChange={TaxCodeInputChange} />
                    {TaxCodeValid && <p className={style.errortext}>TaxCode can not be empty</p>}
                </div>
                <div className={style.control}>
                    <label htmlFor='Fax'>Fax</label>
                    <input type='text' id='fax' />
                </div>
                <div className={style.control}>
                    <label htmlFor='Phone'>S??? ??i???n tho???i</label>
                    <input type='text' id='phone' />
                </div>
                <div className={style.control}>
                    <label htmlFor='Email'>Email</label>
                    <input type='email' id='email' />
                </div>
                <div className={style.control}>
                    <label htmlFor='City'>Th??nh ph???</label>
                    <input type='text' id='city' />
                </div>
                <div className={style.control}>
                    <label htmlFor='Ward'>Ph?????ng</label>
                    <input type='text' id='ward' />
                </div>
                <div className={style.control}>
                    <label htmlFor='District'>Qu???n</label>
                    <input type='text' id='district' />
                </div>
                <div className={style.control}>
                    <label htmlFor='Address'>?????a ch???</label>
                    <input type='text' id='address' />
                </div>
                <div className={style.control}>
                    <label htmlFor='ContactEmail'>Email li??n h???</label>
                    <input type='text' id='address' />
                </div>
                <div className={style.control}>
                    <label htmlFor='ContactPhone'>S??? ??i???n tho???i li??n h???</label>
                    <input type='text' id='address' />
                </div>
                <div className={style.control}>
                    <label htmlFor='Description'>Ghi ch??</label>
                    <input type='text' id='description' />
                </div>
                <div className={style.action}>
                    <button>T???o</button>
                </div>
            </form>  
            </div>
        </div>
      );
}

export default CompanyCreate;