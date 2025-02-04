
import React, { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { getPassengerDetailsValidationSchema } from "../../utils/schema/PassengerValidationSchema";
import { genderOptions, passengers } from "../../constants/index";
import Form from "../../components/Form";
import { useCreatePassengerDetailsMutation } from "../../redux/services/PassengerDetailsApi";
import { DecodedToken } from '../../utils/entity/PageEntity';
import {PassengerDetailsFormProps} from '../../utils/entity/PassengerInterface';
import { useCreateBookingMutation } from "../../redux/services/BookingApi";
import { useNavigate } from "react-router-dom";
import { usePassenger } from "../../context/PassengerProvider";
import { SubmitHandler } from "react-hook-form";
import Toast from "../../components/Toast";


const stripePromise = loadStripe("pk_test_51NDi2uSIeHGLmxdBXJaV2FhWJkT3MOwkff67QkcgQnjZCzZGnY6egJQ0jY7m9cRFMZXsAOT40U8JNVFAi4xyTClo00iZfLzxR9");


const PassengerDetailsForm: React.FC<PassengerDetailsFormProps> = ({ bookingDetails }) => {

  const { setPassengers ,setEmail, setPhoneNumber} = usePassenger();
  const navigate = useNavigate();
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
        passengers: bookingDetails.bookedNoOfSeats.map(() => ({
          firstName: "",
          lastName: "",
          age: undefined,
          gender: "",
        })),
        email: "",
        phoneNumber: "",
      },
      
  });

  const { fields: passengerFields } = useFieldArray({
    control,
    name: "passengers",
  });
  useEffect(() => {
    const token = sessionStorage.getItem("Token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const email = decoded.UserEmail as string;
        setLoggedInEmail(email);
        setValue("email", email);
        console.log("Decoded Email:", email); 

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
    passengers?: { firstName: string; lastName: string; age: number; gender: string }[];
    email: string;
    phoneNumber: string;
  }> = async (data) => {
    try {
      await createPassengerDetails({
        passengers: data.passengers,
        email: data.email,
        phoneNumber: data.phoneNumber,
      }).unwrap();
  
      setPassengers(data.passengers ?? []);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);

      setToastMessage("Form Submitted Successfully!");
      setToastType('success');
      setShowToast(true);
  
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe.js failed to load.");
  
      const response = await fetch("http://localhost:8082/stripe-payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens}`, 
        },
        body: JSON.stringify({
          amount: bookingDetails.totalAmount * 100, 
          currency: "INR",
          description: "Bus Booking Payment",
          email: data.email,
          token: tokens,
          bookingDetails: bookingDetails,
          successUrl: `http://localhost:3000/ticket`,
          cancelUrl: "http://localhost:3000/failure",
        }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        setToastMessage("Stripe session creation failed");
        setToastType('error');
        setShowToast(true);
      }
       const { sessionId } = await response.json();
       const { error } = await stripe.redirectToCheckout({ sessionId });
      //  const stripeCheckoutUrl = `https://checkout.stripe.com/c/pay/${sessionId}`;
      //  console.log("Stripe Checkout URL:", stripeCheckoutUrl);
      //  window.open(stripeCheckoutUrl, "_blank");
      //  toast.success("Redirecting to Stripe for payment.");
     } catch (error) {
      // toast.error("An error occurred while processing the payment.");
       setToastMessage("An error occurred while processing the payment.");
       setToastType('error');
       setShowToast(true);
    }
  };
  

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="card-body" style={{ width: '700px' }}>
        <div className="d-flex align-items-center mb-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5464/5464651.png"
            alt="Passenger Icon"
            style={{ height: "45px", width: "44px", marginRight: "10px" }}
          />
          <h3>Passenger Information</h3>
        </div>
        {passengerFields.map((passenger, index) => (
          <div className="card mb-4 shadow" key={passenger.id}>
            <div className="card-body">
              <h5 className="mb-4">
                Passenger {index + 1} | Seat {bookingDetails.bookedNoOfSeats[index]}</h5>
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
            </div>
          </div>
        ))}
        <div className="d-flex align-items-center mb-3">
          <img
            src="https://cdn4.iconfinder.com/data/icons/green-shopper/1049/email.png"
            alt="Contact Icon"
            style={{ height: "45px", width: "44px", marginRight: "10px" }}
          />
          <h3>Contact Details</h3>
        </div>
        <div className="card shadow">
          <div className="card-body">
            <div className=" ">
              <div className="mb-3"></div>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input {...field} className="form-control" placeholder="Email" disabled={!isEmailEditable} />
                )}
              />
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
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
                <small className="text-danger">{errors.phoneNumber?.message}</small>
              )}
            </div>

            <div className="d-flex justify-content-end align-items-center">
              <div className="mt-3 ">
                <Button type="button" onClick={toggleEmailEdit}>
                  {isEmailEditable ? "Save Email" : "Change Email"}
                </Button>
              </div>
            </div>
          </div>
        </div>


        <hr />
        <div className="mt-4">
          <p>
            <strong>Note:</strong> You will receive your ticket details on the provided email. Ensure
            accuracy.
          </p>
          <p>Once payment is confirmed, tickets will be available for download.</p>
        </div>


        <div className="d-flex justify-content-between">
          <div>
            <p>
              <strong>Total Amount:</strong> INR {bookingDetails.totalAmount}.00
            </p>
            <p>(*Exclusive of Taxes)</p>
          </div >
          <div className="d-flex justify-content-end align-items-center" style={{ marginRight: '35px' }}>
            <div className="mb-3 ">
              <Button type="submit" disabled={isLoading} >
                PROCEED TO PAY
              </Button>
            </div>
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
    </Form >
  );
};

PassengerDetailsForm.propTypes = {
  bookingDetails: PropTypes.shape({
    bookedNoOfSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
    totalAmount: PropTypes.number.isRequired,
    pickupPoint: PropTypes.string.isRequired,
    destinationPoint: PropTypes.string.isRequired,
    pickupTime: PropTypes.string.isRequired,
    busNumber: PropTypes.string.isRequired,
    busType: PropTypes.string.isRequired,
    perSeatAmount: PropTypes.number.isRequired,
  }).isRequired,
};

export default PassengerDetailsForm;