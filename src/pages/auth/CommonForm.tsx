// import React from 'react';
// import Input from '../../components/Input';
// import Button from '../../components/Button';
// import Form from '../../components/Form';
// import { FieldConfig, CommonFormProps } from '../../utils/entity/PageEntity';

// const CommonForm: React.FC<CommonFormProps> = ({
//     title,
//     fields,
//     errors,
//     register,
//     onSubmit,
//     isLoading = false,
//     submitButtonText,
//     forgotPasswordButton,
//     signUpLink
// }) => {
//     return (
//         <div
//             className="card border-0 shadow"
//             style={{ margin: '0 auto', width: 'auto', height: 'auto' }}
//         >
//             <div className="card-body d-flex flex-column justify-content-between">
//                 <Form onSubmit={onSubmit} className="d-flex flex-column align-items-center ">
//                     <h3>{title}</h3> 
//                     {fields.map((field) => (
//                         <div key={field.id} className="mb-3 w-100">
//                             {!field.isCheckbox ? (
//                                 <>
//                                     <Input
//                                         {...register(field.name)}
//                                         type={field.type}
//                                         placeholder={field.placeholder}
//                                         className="form-control"
//                                         id={field.id}
//                                     />
//                                     <span className="error text-danger">
//                                         {errors[field.name]?.message ? String(errors[field.name]?.message) : ''}
//                                     </span>
//                                 </>
//                             ) : (
//                                 <div className="form-check">
//                                     <Input
//                                         type="checkbox"
//                                         {...register(field.name)}
//                                         className={field.className}
//                                         id={field.id}
//                                     />
//                                     <label className="form-check-label" htmlFor={field.id}>
//                                         {field.label}
//                                     </label>
//                                     <span className="error text-danger">
//                                         {errors[field.name]?.message ? String(errors[field.name]?.message) : ''}
//                                     </span>
//                                 </div>
//                             )}
//                         </div>
//                     ))}

//                     {forgotPasswordButton}

//                     <div className="justify-content-center mt-3 w-100">
//                         <Button
//                             type="submit"
//                             className="btn w-100"
//                             disabled={isLoading}
//                         >
//                             {isLoading ? 'Loading...' : submitButtonText}
//                         </Button>
//                     </div>
                    
//                     {signUpLink}
//                 </Form>
//             </div>
//         </div>
//     );
// };

// export default CommonForm;
