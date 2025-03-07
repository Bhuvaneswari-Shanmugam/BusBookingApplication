import Header from "./layout/Header";
import ProfileSideBar from '../components/ProfileSideBar'

const ProfileLayout: React.FC = () => {
   return(
        <div className="container mt-5">
        <Header  />
         <ProfileSideBar /> 
        </div>
    )

}
export default ProfileLayout;
