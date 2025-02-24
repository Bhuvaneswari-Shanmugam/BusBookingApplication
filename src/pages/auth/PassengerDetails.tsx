import React, { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { getPassengerDetailsValidationSchema } from "../../utils/schema/PassengerValidationSchema";
import { genderOptions } from "../../constants/index";
import Form from "../../components/Form";
import { useCreatePassengerDetailsMutation } from "../../redux/services/PassengerDetailsApi";
import { DecodedToken } from '../../utils/entity/PageEntity';
import { PassengerDetailsFormProps } from '../../utils/entity/PassengerInterface';
import { useCreateBookingMutation } from "../../redux/services/BookingApi";
import { useNavigate, useLocation } from "react-router-dom";
import { usePassenger } from "../../context/PassengerProvider";
import { SubmitHandler } from "react-hook-form";
import Toast from "../../components/Toast";
import Card from "../../components/Card";
import { Bus } from "../../utils/entity/PageEntity";
import { CreateBookingRequest } from "../../utils/entity/BookingInterface";

const stripePromise = loadStripe("pk_test_51NDi2uSIeHGLmxdBXJaV2FhWJkT3MOwkff67QkcgQnjZCzZGnY6egJQ0jY7m9cRFMZXsAOT40U8JNVFAi4xyTClo00iZfLzxR9");

const PassengerDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state;

  const bookingDetails = location.state?.bookingDetails || {};
  const bus = location.state?.bus || {}; // fallback to an empty object or a default bus object
  const currentSelectedSeats = location.state?.currentSelectedSeats || []; // fallback to an empty array
  const date = location.state?.date || "";

  console.log("Location State:", locationState);
  console.log("booking details:", bookingDetails);
  console.log("bus:", bus);
  console.log("selected seats:", currentSelectedSeats);

  const [loggedInEmail, setLoggedInEmail] = useState("");
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [createBooking] = useCreateBookingMutation();
  const tokens = sessionStorage.getItem("Token");
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'info' | 'success' | 'error'>('info');
  const [showToast, setShowToast] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getPassengerDetailsValidationSchema),
    defaultValues: {
      passengers: bookingDetails.currentSelectedSeats.map((seat: number, index: number) => ({
        firstName: "",
        lastName: "",
        age: 0,
        gender: "",
        seatNumber: seat, // ensure seat is correctly set
      })),
      email: "",
      phoneNumber: "",
    },
  });


  useEffect(() => {
    if (bookingDetails && currentSelectedSeats) {
      currentSelectedSeats.forEach((seat: number, index: number) => {
        setValue(`passengers.${index}.seatNumber`, seat);
      });
    }
  }, [bookingDetails, currentSelectedSeats, setValue]);



  console.log("currentSelectedSeats:", currentSelectedSeats);

  const { fields: passengerFields } = useFieldArray({
    control,
    name: "passengers",
  });

  useEffect(() => {
    const token = sessionStorage.getItem("Token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const email = decoded.userEmail as string;
        setLoggedInEmail(email);
        setValue("email", email); // Ensure the email value is set
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [setValue]);

  const toggleEmailEdit = () => {
    setIsEmailEditable(!isEmailEditable);
  };

  const [createPassengerDetails, { isLoading }] = useCreatePassengerDetailsMutation();

  const onSubmit: SubmitHandler<{
    passengers?: { firstName: string; lastName: string; age: number; gender: string; seatNumber: number }[];
    email: string;
    phoneNumber: string;
  }> = async (data) => {
    try {
      await createPassengerDetails({
        passengers: data.passengers,
        email: data.email,
        phoneNumber: data.phoneNumber,
      }).unwrap();
  
      setToastMessage("Passenger saved successfully!");
      setToastType("success");
      setShowToast(true);
  
      const bookingData: CreateBookingRequest = {
        pickupPoint: bookingDetails.bus.pickupPoint,
        destinationPoint: bookingDetails.bus.droppingPoint,
        pickupTime: bookingDetails.date,
        busNumber: bookingDetails.bus.number,
        busType: bookingDetails.bus.type,
        bookedSeats: bookingDetails.currentSelectedSeats,
        perSeatAmount: bookingDetails.bus.expense,
        totalAmount: bookingDetails.totalAmount,
      };
  
      const response = await createBooking(bookingData).unwrap();
  
      setToastMessage(response.message || "Booked Seat Successfully!"); 
      setToastType("success");
      setShowToast(true);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "An error occurred while booking."; 
      setToastMessage(errorMessage);
      setToastType("error");
      setShowToast(true);
    }
  };
  


  if (!bookingDetails || !currentSelectedSeats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{width:'800px'}}>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Card
        header={<div className="d-flex align-items-center mb-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5464/5464651.png"
            alt="Passenger Icon"
            style={{ height: "45px", width: "44px", marginRight: "10px" }}
          />
          <h3>Passenger Information</h3>
        </div>}
        description={<div className="row">
          {passengerFields.map((passenger, index) => (
            <div className="" key={passenger.id}>
              <div>
                <h5 className="mb-4">
                  Passenger {bookingDetails.currentSelectedSeats[index]} | Seat
                </h5>
                <div className="row">
                  <div className="col-md-6">
                    <Controller
                      control={control}
                      name={`passengers.${index}.firstName`}
                      render={({ field }) => <Input {...field} className="form-control" placeholder="First Name" />}
                    />
                    {errors.passengers?.[index]?.firstName && (
                      <small className="text-danger">{errors.passengers[index].firstName?.message}</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <Controller
                      control={control}
                      name={`passengers.${index}.lastName`}
                      render={({ field }) => <Input {...field} className="form-control" placeholder="Last Name" />}
                    />
                    {errors.passengers?.[index]?.lastName && (
                      <small className="text-danger">{errors.passengers[index].lastName?.message}</small>
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <Controller
                      control={control}
                      name={`passengers.${index}.age`}
                      render={({ field }) => <Input {...field} className="form-control" type="number" placeholder="Age" />}
                    />
                    {errors.passengers?.[index]?.age && (
                      <small className="text-danger">{errors.passengers[index].age?.message}</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    {genderOptions.map(({ id, value, label }) => (
                      <div className="form-check form-check-inline" key={id}>
                        <Controller
                          control={control}
                          name={`passengers.${index}.gender`}
                          render={({ field }) => (
                            <Input {...field} type="radio" value={value} id={`${value}-${index}`} className="form-check-input" />
                          )}
                        />
                        <label htmlFor={`${value}-${index}`} className="form-check-label">
                          {label}
                        </label>
                      </div>
                    ))}
                    {errors.passengers?.[index]?.gender && (
                      <small className="text-danger">{errors.passengers[index].gender?.message}</small>
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <Controller
                      control={control}
                      name={`passengers.${index}.seatNumber`}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="form-control"
                          type="number"
                          placeholder="Seat Number"
                          disabled // Make the seatNumber field non-editable
                          value={bookingDetails.currentSelectedSeats[index]} // Ensure the seatNumber is displayed correctly
                        />
                      )}
                    />

                    {errors.passengers?.[index]?.seatNumber && (
                      <small className="text-danger">{errors.passengers[index].seatNumber?.message}</small>
                    )}

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>}
      />

      <Card
        header={<div className="d-flex align-items-center mb-1">
          <img
            src="https://cdn4.iconfinder.com/data/icons/green-shopper/1049/email.png"
            alt="Contact Icon"
            style={{ height: "45px", width: "44px", marginRight: "10px" }}
          />
          <h3>Contact Details</h3>
        </div>}
        description={
          <div>
            <div>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input {...field} className="form-control" placeholder="Email" disabled={!isEmailEditable} />
                )}
              />
            </div>
            <div className="mt-3">
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="form-control"
                    placeholder="Enter your phone number"
                  />
                )}
              />
              {errors.phoneNumber && (
                <small className="text-danger">{errors.phoneNumber.message}</small>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <div className="d-flex justify-content-end">
                <Button onClick={toggleEmailEdit} className="mt-3" type="button">
                  Change Email
                </Button>
              </div>
            </div>
          </div>
        }
      />

      <div className="mt-2">
        <p>
          <strong>Note:</strong> You will receive your ticket details on the provided email. Ensure
          accuracy. Once payment is confirmed, tickets will be available for download.
        </p>
      </div>

      <div className="d-flex justify-content-between">
        <div>
          <p>
            <strong>Total Amount:</strong> INR {bookingDetails.totalAmount}.00
          </p>
          <p>(*Exclusive of Taxes)</p>
        </div>

        <div className="d-flex justify-content-end align-items-center" style={{ marginRight: '27px' }}>
          <div className="mb-3">
            <Button type="submit" disabled={isLoading}>
              PROCEED TO PAY
            </Button>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </Form>
    </div>
  );
};

export default PassengerDetailsForm;
