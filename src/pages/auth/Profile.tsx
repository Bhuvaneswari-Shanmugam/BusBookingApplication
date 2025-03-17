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
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
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
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastType, setToastType] = useState<'info' | 'success' | 'error'>('info');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState(false);
    const [updateUser] = useUpdateUserMutation();

    useEffect(() => {
        const token = sessionStorage.getItem('Token');
        if (token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                setUserData(decodedToken);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

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
        if (!userData?.userId) return;

        try {
            const response = await updateUser({ userId: userData.userId, data: formData }).unwrap();
            setToastMessage(response?.data?.message || 'Profile updated successfully');
            setToastType('success');
            setShowToast(true);
            setIsEditing(false);
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'Profile cannot be updated, please try again.';
            setToastMessage(errorMessage);
            setToastType('error');
            setShowToast(true);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (!userData) return <p>Loading...</p>;

    return (
        <div className="d-flex flex-column mt-5" style={{ height: '90vh', width: '1100px' }}>
            <Header aboutCardRef={aboutCardRef} />
            <div className="d-flex justify-content-center align-items-center">
                <Card
                    className="profile-details shadow-lg"
                    style={{ width: '1000px' }}
                    description={
                        !isEditing ? (
                            <div>
                                <div className=" d-flex justify-content-between position-relative text-center mb-3">
                                    <div className="sidebar mb-4">
                                        <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: 'black', fontSize: '24px' }} />
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        onClick={() => setIsEditing(true)}
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '24px',
                                            color: colors.pagecolor,
                                            position: 'absolute',
                                            right: '0',
                                            transform: 'translateY(-50%)'
                                        }}
                                    />
                                </div>

                                {/* Personal Details Section */}
                                <div className=" text-center mb-4">
                                    <h4 className="mb-3" style={{ color: colors.pagecolor }}>Personal Details</h4>
                                    <div className="row p-4 ">
                                        {["firstName", "lastName", "age", "gender"].map((field, index) => (
                                            <div className="col-md-6 d-flex mb-4" key={field}>
                                                <strong className="me-2 ">{userProfilefields.find(f => f.name === field)?.label}:</strong>
                                                <span>{userData[field as keyof CustomJwtPayload]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Contact Details Section */}
                                <div>
                                    <h4 className="mb-3" style={{ color: colors.pagecolor }}>Contact Details</h4>
                                    <div className="row p-4">
                                        {["email", "phoneNumber", "address"].map((field, index) => (
                                            <div className="col-md-6 d-flex mb-4" key={field}>
                                                <strong className="me-2" >{userProfilefields.find(f => f.name === field)?.label}:</strong>
                                                <span>{userData[field as keyof CustomJwtPayload]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row mb-4">
                                    <h3 className="card-title text-center mb-4">Edit Profile</h3>
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
                                                    <Input type={type} className={`form-control ${errors[name as keyof UserProfile] ? 'is-invalid' : ''}`} {...register(name as keyof UserProfile)} />
                                                    {errors[name as keyof UserProfile]?.message && <span className="error text-danger">{errors[name as keyof UserProfile]?.message}</span>}
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
                        )
                    }
                />
            </div>
            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    duration={3000}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default Profile;
