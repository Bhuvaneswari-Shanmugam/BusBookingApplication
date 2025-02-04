import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from '../redux/services/UserApi';
import { ToastContainer, toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../utils/entity/PageEntity';

const Profile = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string | null>(null);

    // Setting the userId from JWT token
    useEffect(() => {
        const token = sessionStorage.getItem('Token');
        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                setUserId(decodedToken.UserId);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    // Fetch user details using the userId
    const { data: userDetails, error, isLoading } = useGetUserByIdQuery(userId);

    // Handle errors if any
    useEffect(() => {
        if (error) {
            toast.error('Error fetching user details');
        }
    }, [error]);

    // If data is loading, show loading message
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // If there is no user data, display message
    if (!userDetails) {
        return <p>No user data found</p>;
    }

    // Handle redirect to edit profile
    const handleEditProfile = () => {
        navigate(`/edit-profile/${userDetails.id}`);
    };

    // Render the user profile with the fetched data
    return (
        <div className="container mt-5">
            <h2>{userDetails.firstName}'s Profile</h2>
            <div className="card profile-details mt-3">
                <div className="card-body">
                    <h3 className="card-title">User Details</h3>
                    <p className="card-text"><strong>First Name:</strong> {userDetails.firstName || 'N/A'}</p>
                    <p className="card-text"><strong>Last Name:</strong> {userDetails.lastName || 'N/A'}</p>
                    <p className="card-text"><strong>Email:</strong> {userDetails.email || 'N/A'}</p>
                    <p className="card-text"><strong>Role:</strong> {userDetails.role || 'N/A'}</p>
                    <p className="card-text"><strong>Username:</strong> {userDetails.username || 'N/A'}</p>
                    <p className="card-text"><strong>Account Enabled:</strong> {userDetails.enabled ? 'Yes' : 'No'}</p>
                    <p className="card-text"><strong>Account Locked:</strong> {userDetails.accountNonLocked ? 'No' : 'Yes'}</p>
                    <button onClick={handleEditProfile} className="btn mt-3" style={{ color: 'white', backgroundColor: '#0066b8' }}>
                        Edit Profile
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;

