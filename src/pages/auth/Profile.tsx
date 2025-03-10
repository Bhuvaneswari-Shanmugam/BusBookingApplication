import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '../../redux/services/UserApi';
import { colors } from '../../constants/Palette';
import Header from '../../components/layout/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Label from '../../components/Label';
import { UserProfile } from '../../utils/entity/UserProfileInterface';
import { userProfilefields } from '../../constants';
import ProfileUpdateschema from '../../utils/schema/ProfileUpdateSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Toast from '../../components/Toast';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

type Gender = 'male' | 'female' | 'other';

interface CustomJwtPayload {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: Gender;
    phoneNumber: string;
    address: string;
    role: string;
}

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const aboutCardRef = useRef<HTMLDivElement>(null);
    const [userData, setUserData] = useState<CustomJwtPayload | null>(null);
    const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem('Token');
        if (token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                setUserData(decodedToken);
                console.log("User data from token:", decodedToken);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const [updateUser] = useUpdateUserMutation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserProfile>({
        resolver: yupResolver(ProfileUpdateschema),
    });

    useEffect(() => {
        if (userData) {
            setValue("firstName", userData.firstName || "");
            setValue("lastName", userData.lastName || "");
            setValue("email", userData.email || "");
            setValue("age", userData.age || 0);
            setValue("gender", userData.gender || "other");
            setValue("phoneNumber", userData.phoneNumber || "");
            setValue("address", userData.address || "");
        }
    }, [userData, setValue]);

    const onSubmit = async (formData: UserProfile) => {
        if (userData?.userId) {
            const id = userData?.userId;
            try {
                await updateUser({ userId: id, data: formData }).unwrap();
                setToastMessage({ message: "Profile updated successfully!", type: "success" });
            } catch (err) {
                setToastMessage({ message: "Failed to update profile.", type: "error" });
            }
        }
    };

    const handleCancel = () => {
        navigate('/home');
    };

    if (!userData) return <p>Loading...</p>;

    return (
        <div className="d-flex flex-column mt-5" style={{ height: '90vh', width: '1100px' }}>
            <div className="sidebar mb-4">
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: 'black', fontSize: '24px', marginTop: '0px', marginLeft: '0px' }} />
            </div>
            <Header aboutCardRef={aboutCardRef} />
            <div className="d-flex justify-content-center align-items-center">
                <Card
                    className="profile-details shadow-lg"
                    style={{ width: '1100px' }}
                    description={
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row mb-3">
                                <h3 className="card-title text-center mb-4">My Profile</h3>
                                <div className="col-md-6">
                                    {userProfilefields.slice(0, 4).map(({ name, type, label, options }) => (
                                        <div className="row mb-3 align-items-center" key={name}>
                                            <div className="col-md-4 text-md-start">
                                                <Label htmlFor={name} className="form-label mb-0">
                                                    <strong>{label}</strong>
                                                </Label>
                                            </div>

                                            <div className="col-md-8">
                                                {type === 'select' ? (
                                                    <select
                                                        className={`form-select ${errors[name as keyof UserProfile] ? 'is-invalid' : ''}`}
                                                        {...register(name as keyof UserProfile)}
                                                    >
                                                        {/* <option value="" disabled selected>Select {label}</option> */}
                                                        {options?.map((option) => (
                                                            <option key={option} value={option}>
                                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <Input
                                                        type={type}
                                                        className={`form-control ${errors[name as keyof UserProfile] ? 'is-invalid' : ''}`}
                                                        {...register(name as keyof UserProfile)}
                                                        disabled={name === 'email'} 
                                                    />
                                                )}
                                                {errors[name as keyof UserProfile]?.message && (
                                                    <span className="error text-danger">{errors[name as keyof UserProfile]?.message}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-md-6">
                                    {userProfilefields.slice(4).map(({ name, type, label, options }) => (
                                        <div className="row mb-3 align-items-center" key={name}>
                                            <div className="col-md-4 text-md-start">
                                                <Label htmlFor={name} className="form-label mb-0">
                                                    <strong>{label}</strong>
                                                </Label>
                                            </div>
                                            <div className="col-md-8">
                                                {type === 'select' ? (
                                                    <select
                                                        className={`form-select ${errors[name as keyof UserProfile] ? 'is-invalid' : ''}`}
                                                        {...register(name as keyof UserProfile)}
                                                    >
                                                        <option value="">Select {label}</option>
                                                        {options?.map((option) => (
                                                            <option key={option} value={option}>
                                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <Input
                                                        type={type}
                                                        className={`form-control ${errors[name as keyof UserProfile] ? 'is-invalid' : ''}`}
                                                        {...register(name as keyof UserProfile)}
                                                        disabled={name === 'email'} 
                                                    />
                                                )}
                                                {errors[name as keyof UserProfile]?.message && (
                                                    <span className="error text-danger">{errors[name as keyof UserProfile]?.message}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center">
                                <Button type="submit" className="btn mt-3 border-0 me-2" style={{ color: 'white', backgroundColor: colors.pagecolor, width: '150px' }}>
                                    Update
                                </Button>
                                <Button type="button" onClick={handleCancel} className="btn mt-3 border-0" style={{ color: 'white', backgroundColor: 'gray', width: '150px' }}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    }
                />
            </div>
            {toastMessage && (
                <Toast message={toastMessage.message} type={toastMessage.type} duration={3000} onClose={() => setToastMessage(null)} />
            )}
        </div>
    );
};

export default Profile;
