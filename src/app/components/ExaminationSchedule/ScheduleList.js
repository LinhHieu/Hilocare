import classes from '../../App.module.css';

const ScheduleList = (props) => {
  return (
    <main className={`${classes.App} ${props.sidebar == 'open' && classes.active}`} sidebar={props.sidebar}>
      {props.children}
      <h1>ScheduleList</h1>
    </main>
  );
};

export default ScheduleList;