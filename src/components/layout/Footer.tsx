import 'bootstrap/dist/css/bootstrap.min.css';
import { countries } from '../../constants/index';
import { contactDetails } from '../../constants/index';
import { services } from '../../constants/index';
const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start mt-5">
            <div className='footer'>
                <div className="container-fluid px-3">
                    <div className="row justify-content-center text-center text-md-start">
                        <div className="col-md-3 col-sm-6 mb-3">
                            <h5 className="text-uppercase mb-3">About Us</h5>
                            <img src="" alt="logo" width="100px" height="70px" className="mb-3" />
                            <p className="mb-0" style={{ textAlign: 'justify' }}>
                                Bigtraze Travels Bus Booking makes travel easy with reliable bus ticket bookings at competitive prices.
                                Thank you for choosing us!
                            </p>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <h5 className="text-uppercase mb-3">Contact Us</h5>
                            {contactDetails.map((contact, index) => (
                                <p key={index} className={index === 2 ? 'mb-0' : 'mb-2'}>
                                    {contact.label}: {contact.value}
                                </p>
                            ))}
                        </div>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <h5 className="text-uppercase mb-3">Services</h5>
                            <ul className="list-unstyled mb-0">
                                {services.map((service, index) => (
                                    <li key={index} className={index === services.length - 1 ? 'mb-0' : 'mb-2'}>
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-md-3 col-sm-6 mb-3">
                            <h5 className="text-uppercase mb-3">Global Sites</h5>
                            <ul className="list-unstyled mb-0">
                                {countries.map((country, index) => (
                                    <li className={index === countries.length - 1 ? 'mb-0' : 'mb-2'} key={country}>
                                        {country}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="text-center p-2" style={{ backgroundColor: '#f1f1f1' }}>
                    © {new Date().getFullYear()} Bigtraze Travels. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
