import classes from '../../App.module.css';

const Permission = (props) => {
  return (
    <main className={`${classes.App} ${props.sidebar=='open' && classes.active}`} sidebar={props.sidebar}>
      {props.children}
      <h1>Permission</h1>
    </main>
  );
};

export default Permission;