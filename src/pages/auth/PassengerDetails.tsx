import React, { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
import Button from "../../components/Button";
import Input from "../../components/Input";
import Form from "../../components/Form";
import Toast from "../../components/Toast";
import { getPassengerDetailsValidationSchema } from "../../utils/schema/PassengerValidationSchema";
import { genderOptions } from "../../constants/index";
import { useCreatePassengerDetailsMutation } from "../../redux/services/PassengerDetailsApi";
import { useCreateBookingMutation } from "../../redux/services/BookingApi";
import { DecodedToken, Bus, PassengerData } from '../../utils/entity/PageEntity';
import { Passenger } from "../../utils/entity/PassengerInterface";
import { CreateBookingRequest } from "../../utils/entity/BookingInterface";
import { useBooking } from "../../context/BookingProvider";
import { usePassenger } from "../../context/PassengerProvider";
import { colors } from '../../constants/Palette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51NDi2uSIeHGLmxdBXJaV2FhWJkT3MOwkff67QkcgQnjZCzZGnY6egJQ0jY7m9cRFMZXsAOT40U8JNVFAi4xyTClo00iZfLzxR9');

const PassengerDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const { bookingDetails } = useBooking();
  const { setPassengerDetails } = usePassenger();

  const bus: Bus = bookingDetails?.bus || ({} as Bus);
  const currentSelectedSeats = bookingDetails?.currentSelectedSeats || [];
  const date = bookingDetails?.date || "";
  const totalAmount = currentSelectedSeats.length * bus.expense;

  console.log("passenger page pickup stop : ", bookingDetails?.pickupStop);
  console.log("passenger page dropping stop :", bookingDetails?.droppingStop);

  const cleanPickupStop = bookingDetails?.pickupStop?.replace(/[\[\]"]+/g, "") || "";
  const cleanDroppingStop = bookingDetails?.droppingStop?.replace(/[\[\]"]+/g, "") || "";

  const [loggedInEmail, setLoggedInEmail] = useState("");
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [userId, setUserId] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [createBooking] = useCreateBookingMutation();
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"info" | "success" | "error">("info");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isSameDetails, setIsSameDetails] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getPassengerDetailsValidationSchema),
    defaultValues: {
      passengers: currentSelectedSeats.map((seat) => ({
        firstName: "",
        lastName: "",
        age: 0,
        gender: "",
        seatNumber: seat,
      })),
      email: "",
      phoneNumber: "",
      busNumber: bus?.number || 0,
    },
  });

  useEffect(() => {
    if (bookingDetails && currentSelectedSeats.length > 0) {
      currentSelectedSeats.forEach((seat, index) => {
        setValue(`passengers.${index}.seatNumber`, seat);
      });
      setValue("busNumber", bus?.number || 0);
      console.log("busNumber set to:", bus?.number);
    }
  }, [bookingDetails, currentSelectedSeats, setValue, bus?.number]);

  useEffect(() => {
    const token = sessionStorage.getItem("Token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        console.log("userId from passengerdetails:", decoded.userId);
        setLoggedInEmail(decoded.email);
        setValue("email", decoded.email);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [setValue]);

  useEffect(() => {
    if (isSameDetails) {
      const firstPassenger = getValues("passengers.0");
      currentSelectedSeats.forEach((_, index) => {
        if (index > 0) {
          setValue(`passengers.${index}.firstName`, firstPassenger.firstName);
          setValue(`passengers.${index}.lastName`, firstPassenger.lastName);
          setValue(`passengers.${index}.age`, firstPassenger.age);
          setValue(`passengers.${index}.gender`, firstPassenger.gender);
        }
      });
    }
  }, [isSameDetails, getValues, setValue, currentSelectedSeats]);

  const toggleEmailEdit = () => {
    setIsEmailEditable(!isEmailEditable);
  };

  const toggleShowEmail = () => {
    setShowEmail(!showEmail);
  };

  const [createPassengerDetails, { isLoading }] = useCreatePassengerDetailsMutation();

  const generateTicketId = () => {
    const randomSixDigit = Math.floor(100000 + Math.random() * 900000);
    return `BT-${randomSixDigit}`;
  };

  const handleOnClick = () => {
    navigate('/buses');
  }
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const ticketNumber = generateTicketId();
      const userEmail = data.email;
      
      // Ensure bus details exist before proceeding
      if (!bus || !bus.number) {
        throw new Error("Bus details are missing.");
      }
  
      // **Step 1: Prepare Booking Data**
      const bookingData: CreateBookingRequest = {
        pickupPoint: bus.pickupPoint,
        destinationPoint: bus.droppingPoint,
        pickupTime: date,
        busNumber: bus.number,
        busType: bus.type,
        bookedSeats: currentSelectedSeats,
        perSeatAmount: bus.expense,
        totalAmount: totalAmount,
        ticketId: ticketNumber,
        pickupStop: cleanPickupStop,
        droppingStop: cleanDroppingStop,
        userEmail: userEmail, // Ensure correct email assignment
      };
  
      sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
  
      await createBooking(bookingData).unwrap();
  
      // **Step 2: Prepare Passenger Details**
      const passengerContextData: PassengerData = {
        passengers: data.passengers.map((passenger: Passenger) => ({
          ...passenger,
        })),
        email: userEmail,
        phoneNumber: data.phoneNumber,
        ticketId: ticketNumber,
        busNumber: bus.number,
      };
  
      sessionStorage.setItem("passengerContextData", JSON.stringify(passengerContextData));
  
      await createPassengerDetails(passengerContextData).unwrap();
  
      // Show success message
      setToastMessage("Booking saved! Redirecting to payment...");
      setToastType("success");
      setShowToast(true);
  
      // **Step 3: Create Stripe Checkout Session**
      const response = await axios.post(
        "http://localhost:8082/stripe-payment/create-checkout-session",
        {
          amount: totalAmount * 100, // Convert to smallest currency unit
          currency: "inr",
          description: `Bus Ticket Booking for ${bus.number}`,
          email: userEmail,
          successUrl: "http://localhost:3000/ticket?session_id={CHECKOUT_SESSION_ID}",
          cancelUrl: "http://localhost:3000/home",
        }
      );
  
      console.log("Stripe Session Response:", response.data);
  
      const { sessionId } = response.data;
      if (!sessionId) throw new Error("Stripe session ID missing from response.");
  
      // Store Pending Booking Data
      localStorage.setItem(
        "pendingBooking",
        JSON.stringify({
          ticketId: ticketNumber,
          userId: userId, // Ensure `userId` is properly retrieved before usage
        })
      );
  
      // **Step 4: Redirect to Stripe Checkout**
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe initialization failed.");
  
      const { error } = await stripe.redirectToCheckout({ sessionId });
  
      if (error) {
        throw new Error("Payment failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Error:", error);
      setToastMessage(error?.response?.data?.message || "Payment failed. Try again.");
      setToastType("error");
      setShowToast(true);
    }
  };
  
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: "670px" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="d-flex align-items-center mt-0">
            <img src="https://cdn-icons-png.flaticon.com/512/5464/5464651.png" alt="Passenger Icon" style={{ height: "45px", width: "44px", marginRight: "10px" }} />
            <h3>Passenger Information</h3>
          </div>

          <div className="row">
            {currentSelectedSeats.map((seat, index) => (
              <div key={index}>
                <h5 className="mb-4">Passenger {index + 1}</h5>
                <div className="row">
                  <div className="col-md-6">
                    <Controller
                      control={control}
                      name={`passengers.${index}.firstName`}
                      render={({ field }) => (
                        <Input {...field} className="form-control" placeholder="First Name" />
                      )}
                    />
                    {errors.passengers?.[index]?.firstName && (
                      <small className="text-danger">{errors.passengers[index].firstName?.message}</small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <Controller
                      control={control}
                      name={`passengers.${index}.lastName`}
                      render={({ field }) => (
                        <Input {...field} className="form-control" placeholder="Last Name" />
                      )}
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
                      render={({ field }) => (
                        <Input {...field} className="form-control" type="number" placeholder="Age" />
                      )}
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
                            <Input {...field} type="radio" value={value} className="form-check-input" />
                          )}
                        />
                        <label className="form-check-label">{label}</label>
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
                          placeholder={`Seat Number: ${currentSelectedSeats[index]}`}
                          disabled
                          value={`Seat Number: ${currentSelectedSeats[index]}`}
                        />
                      )}
                    />
                    {errors.passengers?.[index]?.seatNumber && (
                      <small className="text-danger">{errors.passengers[index].seatNumber?.message}</small>
                    )}
                  </div>
                </div>

                {index === 0 && currentSelectedSeats.length > 1 && (
                  <div className=" d-flex justify-content-end align-items-center form-check mt-3 " style={{ marginLeft: '0px' }}>
                    <input
                      type="checkbox"
                      className="form-check-input " style={{ borderColor: colors.secondary }}
                      checked={isSameDetails}
                      onChange={() => setIsSameDetails(!isSameDetails)

                      }
                    />
                    <label className="form-check-label">
                      Same details for all passengers
                    </label>
                  </div>
                )}
              </div>
            ))}

            <hr />

            <div className="d-flex align-items-center mb-2">
              <img
                src="https://cdn4.iconfinder.com/data/icons/green-shopper/1049/email.png"
                alt="Contact Icon"
                style={{ height: "45px", width: "44px", marginRight: "10px" }}
              />
              <h3>Contact Details</h3>
            </div>

            <div>
              <div className="text-start mt-2 mb-3">
                <p>
                  <strong>Note:</strong> You will receive your ticket details on the provided email. Ensure
                  accuracy. Once payment is confirmed, tickets will be available for download.
                </p>
              </div>
              <div className="position-relative w-100">
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="form-control pe-5"
                      type={showEmail ? "text" : "password"}
                      placeholder="Email"
                      readOnly={!isEmailEditable}
                    />
                  )}
                />
                <FontAwesomeIcon
                  icon={showEmail ? faEyeSlash : faEye}
                  onClick={toggleShowEmail}
                  className="position-absolute end-0 top-50 translate-middle-y me-3"
                  style={{ cursor: "pointer" }}
                />
                {errors.email && <small className="text-danger">{errors.email?.message}</small>}
              </div>

              <div className="mt-3 mb-4">
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

            </div>

            <div className="d-flex justify-content-between">
              <div>
                <p>
                  <strong>Total Amount:</strong> INR {totalAmount}.00
                </p>
                <p>(*Exclusive of Taxes)</p>
              </div>

              <div className="d-flex justify-conent end  mt-3 mb-2 " style={{ marginRight: '10px' }}>
                <div className=" me-3">
                  <Button type="submit" disabled={isLoading} style={{ color: 'white', backgroundColor: colors.pagecolor, border: colors.pagecolor }}>
                    PROCEED TO PAY
                  </Button>
                </div>
                <div>
                  <Button type="submit" onClick={handleOnClick} style={{ color: 'white', backgroundColor: colors.secondary, border: colors.secondary }}>
                    Cancel
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
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PassengerDetailsForm;
