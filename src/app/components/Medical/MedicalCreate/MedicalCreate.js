import React, {useRef} from 'react';
import classes from '../../../App.module.css';
import style from './MedicalCreate.module.css';



const MedicalCreate = (props) => {
    const CompanyNameRef = useRef();
    const ScheduleIdRef = useRef();
    const MedicalNumRef = useRef();
    const EmailRef = useRef();
    const NoteRef = useRef();

    const AddMedical = (event) => {
        event.preventDefault();

        const enteredCompanyName = CompanyNameRef.current.value;
        const enteredScheduleId = ScheduleIdRef.current.value;
        const enteredMedicalNum= MedicalNumRef.current.value;
        const enteredEmail = EmailRef.current.value;
        const enteredNote = NoteRef.current.value;

        const NewMedicalRecord = 
        {
            company : enteredCompanyName,
            scheduleid : enteredScheduleId,
            medicalnum : enteredMedicalNum,
            email : enteredEmail,
            note : enteredNote
        }

        console.log(NewMedicalRecord);
        fetch('https://uathilocare.hilo.com.vn/api/Medical/create',
        {
            method : 'POST',
            body: JSON.stringify(NewMedicalRecord),
            headers : {
                'Content-Type': 'application/json',
                'Language' : 'vn'
            }
        }).then((res) =>{
              return res.json()
          })
    }

    return(
        <div className={`${classes.App} ${props.sidebar ==='open'&& classes.active}`} sidebar={props.sidebar}>
        <h1>Tạo kết quả khám</h1>
            <div className={style.wrap}>
            <form className={style.form} onSubmit={AddMedical}>
                <div className={style.control}>
                    <label htmlFor='CompanyName'>Tên tài khoản người dùng </label>
                    <input type='text' id='userId' ref={CompanyNameRef} />
                </div>
                <div className={style.control}>
                    <label htmlFor='ScheduleId'>Số lịch</label>
                    <input type='text' id='scheduleId' ref={ScheduleIdRef} />
                </div>
                <div className={style.control}>
                    <label htmlFor='MedicalNum'>Số y tế</label>
                    <input type='text' id='medicalNum' ref={MedicalNumRef}/>
                </div>
                <div className={style.control}>
                    <label htmlFor='Email'>Kết quả</label>
                    <input type='text' id='resultTypeId' ref={EmailRef}/>
                </div>
                <div className={style.control}>
                    <label htmlFor='Note'>Ghi chú</label>
                    <textarea type='text' id='description' rows="4" cols="50" ref={NoteRef}/>
                </div>
                <div className={style.action}>
                    <button>Tạo</button>
                </div>
            </form>  
            </div>

        </div>
    )
}

export default MedicalCreate;