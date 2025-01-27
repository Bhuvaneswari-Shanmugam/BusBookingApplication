import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import "react-toastify/dist/ReactToastify.css";
import { genderOptions } from "../../constants/Index";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { getPassengerDetailsValidationSchema } from "../../utils/schema/PassengerValidationSchema";
import { FormData } from "../../utils/entity/PageEntity";
import Form from "../../components/Form";
import { useCreatePassengerDetailsMutation } from '../../redux/services/PassengerDetailsApi';
import { passengers } from "../../constants/Index";
import { total } from "../../constants/Index";

const stripePromise = loadStripe("pk_test_51NDi2uSIeHGLmxdBXJaV2FhWJkT3MOwkff67QkcgQnjZCzZGnY6egJQ0jY7m9cRFMZXsAOT40U8JNVFAi4xyTClo00iZfLzxR9");

const PassengerDeatilsForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getPassengerDetailsValidationSchema),
    defaultValues: {
      passengers: passengers.map(() => ({
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

  const [createPassengerDetails, { isLoading, isError }] = useCreatePassengerDetailsMutation();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await createPassengerDetails({
        passengers: data.passengers,
        email: data.email,
        phoneNumber: data.phoneNumber,
      }).unwrap();

      toast.success("Form Submitted Successfully!");

      const stripeResponse = await fetch("http://localhost:8082/stripe-payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          description: "bus Booking Payment",
        }),
      });

      if (!stripeResponse.ok) {
        throw new Error("Failed to create Stripe Checkout session");
      }
      const { sessionId } = await stripeResponse.json();
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe.js failed to load.");
      }
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      toast.error("An error occurred while processing the payment.");
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="card shadow p-3 bg-body rounded d-flex justify-content-end mt-0"
      style={{ width: "1100px" }}
    >
      <div className="card-body">
        <h1 className="text-center">Passenger Form</h1>
        <div className="d-flex align-items-center mb-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5464/5464651.png"
            alt="Passenger Icon"
            style={{ height: "75px", width: "75px", marginRight: "10px" }}
          />
          <h2>Passenger Information</h2>
        </div>

        {passengerFields.map((passenger, index) => (
          <div className="card mb-4 shadow" key={passenger.id}>
            <div className="card-body">
              <h5 className="mb-4">
                Passenger {index + 1} | Seat {passengers[index].seatNumber}
              </h5>
              <div className="row">
                <div className="col-md-6">
                  <Controller
                    control={control}
                    name={`passengers.${index}.firstName`}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="form-control"
                        placeholder="Enter first name"
                      />
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
                      <Input
                        {...field}
                        className="form-control"
                        placeholder="Enter last name"
                      />
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
                      <Input
                        {...field}
                        type="number"
                        className="form-control"
                        placeholder="Enter age"
                      />
                    )}
                  />
                  {errors.passengers?.[index]?.age && (
                    <small className="text-danger">{errors.passengers[index].age?.message}</small>
                  )}
                </div>
                <div className="col-md-6">
                  <div>
                    {genderOptions.map(({ id, value, label }) => (
                      <div className="form-check form-check-inline" key={id}>
                        <Controller
                          control={control}
                          name={`passengers.${index}.gender`}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="radio"
                              value={value}
                              id={`${value}-${index}`}
                              className="form-check-input"
                            />
                          )}
                        />
                        <label htmlFor={`${value}-${index}`} className="form-check-label">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
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
            style={{ height: "75px", width: "75px", marginRight: "10px" }}
          />
          <h2>Contact Details</h2>
        </div>

        <div className="card shadow">
          <div className="card-body">
            <div className="mb-3">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    className="form-control"
                    placeholder="Enter your email"
                  />
                )}
              />
              {errors.email && <small className="text-danger">{errors.email?.message}</small>}
            </div>

            <div className="mb-3">
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

        <div className="d-flex justify-content-between mt-4">
          <div>
            <p>
              <strong>Total Amount:</strong> INR {total}.00
            </p>
            <p>(*Exclusive of Taxes)</p>
          </div>
          <Button type="submit" style={{ height: "50px" }}>
            PROCEED TO PAY
          </Button>
        </div>
      </div>
      <ToastContainer />
    </Form>
  );
};

export default PassengerDeatilsForm;
