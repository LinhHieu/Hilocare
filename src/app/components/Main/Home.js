import classes from '../../App.module.css';

const Home = (props) => {
  return (
    <main className={`${classes.App} ${props.sidebar ==='open' && classes.active}`} sidebar={props.sidebar}>
      {props.children}
      <h1>Main Menu</h1>
    </main>
  );
};

export default Home;