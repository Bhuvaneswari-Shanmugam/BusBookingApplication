import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../redux/services/UserApi';
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
import {jwtDecode} from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CustomJwtPayload {
    userId: string;
}

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const aboutCardRef = useRef<HTMLDivElement>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                setUserId(decodedToken.userId || null);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const { data, error, isLoading } = useGetUserByIdQuery(userId || '', { skip: !userId });
    console.log("profile page userId : ", userId);
    console.log("data : ", data);

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
        if (data?.data) {
            setValue("firstName", data.data.firstName || "");
            setValue("lastName", data.data.lastName || "");
            setValue("email", data.data.email || "");
            setValue("age", data.data.age || 0);
            setValue("gender", data.data.gender || "");
            setValue("phoneNumber", data.data.phoneNumber || "");
            setValue("address", data.data.address || "");
        }
    }, [data, setValue]);

    const onSubmit = async (formData: UserProfile) => {
        if (userId) {
            try {
                await updateUser({ id: userId, data: formData }).unwrap();
                setToastMessage({ message: "Profile updated successfully!", type: "success" });
            } catch (err) {
                setToastMessage({ message: "Failed to update profile.", type: "error" });
            }
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) {
        setToastMessage({ message: "Failed to load user details.", type: "error" });
        return <p>Error loading user details!</p>;
    }

    return (
        <div className="container mt-5">
            <Header aboutCardRef={aboutCardRef} />
            <Card
                className="profile-details shadow-lg"
                style={{ marginTop: '120px', width: '600px' }}
                description={
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mb-3">
                            <h3 className="card-title text-center">My Profile</h3>
                            {userProfilefields.map(({ name, type, label, options }) => (
                                <div className="row mb-3 align-items-center" key={name}>
                                    <div className="col-md-4 text-md-start">
                                        <Label htmlFor={name} className="form-label mb-0">
                                            <strong>{label}</strong>
                                        </Label>
                                    </div>

                                    <div className="col-md-6" style={{ width: '300px' }}>
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
                                            />
                                        )}
                                    </div>

                                    <div className="float-start">
                                        {errors[name as keyof UserProfile]?.message && (
                                            <span className="error text-danger">{errors[name as keyof UserProfile]?.message}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <Button type="submit" className="btn mt-3 border-0 me-2" style={{ color: 'white', backgroundColor: colors.pagecolor }}>
                                Save
                            </Button>
                            <Button type="button" onClick={handleCancel} className="btn mt-3 border-0" style={{ color: 'white', backgroundColor: 'gray' }}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                }
            />
            {toastMessage && (
                <Toast message={toastMessage.message} type={toastMessage.type} duration={3000} onClose={() => setToastMessage(null)} />
            )}
        </div>
    );
};

export default Profile;
