import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import Layout from '../Layout/Layout';

const UserProfile = () => {
  return (
    
    <section className={classes.profile}>
      <h3>Thay mật khẩu</h3>
      <ProfileForm />
      
    </section>

  );
};

export default UserProfile;
