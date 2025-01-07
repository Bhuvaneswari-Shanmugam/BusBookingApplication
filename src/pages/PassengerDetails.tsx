import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { genderOptions ,} from "../constants/Index";
import { useNavigate, } from "react-router-dom";import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import {getPassengerDetailsValidationSchema} from '../utils/schema/PassengerValidationSchema';
import {FormData} from '../utils/entity/PageEntity';
import Form from "../components/Form";


const passengers = [
  { id: 1, seatNumber: "A1" },
 
];

const total = 1850.0;

const PassengerDetailsForm: React.FC = () => {

    const navigate = useNavigate();
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
        age: 0,
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

  const onSubmit = (data: FormData) => {
    alert("Form Submitted Successfully!");
    navigate("/ticket", { state: data });
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}

      className="card shadow p-3 bg-body rounded d-flex justify-content-end mt-0"
      style={{ width: "1100px" }}
    >
      <div className="card-body">
        <h1 className="text-center">Passenger Details</h1>

      
        <div className="profile-info d-flex align-items-center mb-3">
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
                  <Label htmlFor={`passengers.${index}.firstName`} className="form-label">
                    First Name
                  </Label>
                  <Controller
                    control={control}
                    name={`passengers.${index}.firstName`}
                    render={({ field }) => (
                      <Input {...field} className="form-control" placeholder="Enter first name" />
                    )}
                  />
                  {errors.passengers?.[index]?.firstName && (
                    <small className="text-danger">{errors.passengers[index].firstName?.message}</small>
                  )}
                </div>

        
                <div className="col-md-6">
                  <Label htmlFor={`passengers.${index}.lastName`} className="form-label">
                    Last Name
                  </Label>
                  <Controller
                    control={control}
                    name={`passengers.${index}.lastName`}
                    render={({ field }) => (
                      <Input {...field} className="form-control" placeholder="Enter last name" />
                    )}
                  />
                  {errors.passengers?.[index]?.lastName && (
                    <small className="text-danger">{errors.passengers[index].lastName?.message}</small>
                  )}
                </div>
              </div>

              <div className="row mt-3">
            
                <div className="col-md-6">
                  <Label htmlFor={`passengers.${index}.age`} className="form-label">
                    Age
                  </Label>
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
                  <Label className="form-label">Gender</Label>
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
                        <Label htmlFor={`${value}-${index}`} className="form-check-label">
                          {label}
                        </Label>
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

        <div className="contact-info d-flex align-items-center mb-3">
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
              <Label htmlFor="email" className="form-label">
                Email
              </Label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input {...field} className="form-control" placeholder="Enter your email" />
                )}
              />
              {errors.email && <small className="text-danger">{errors.email?.message}</small>}
            </div>

            <div className="mb-3">
              <Label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </Label>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <Input {...field} className="form-control" placeholder="Enter your phone number" />
                )}
              />
              {errors.phoneNumber && (
                <small className="text-danger">{errors.phoneNumber?.message}</small>
              )}
            </div>
          </div>
        </div>

        <hr />
        <div className="info-section mt-4">
          <p>
            <strong>Note:</strong> You will receive your ticket details on the provided email. Ensure
            accuracy.
          </p>
          <p>Once payment is confirmed, tickets will be available for download.</p>
        </div>

        {/* Total and Submit */}
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
    </Form>
  );
};

export default PassengerDetailsForm;
