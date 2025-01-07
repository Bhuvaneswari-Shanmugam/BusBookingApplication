import 'bootstrap/dist/css/bootstrap.min.css';


const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start mt-5">
            <div className='footer'>
                <div className="container-fluid px-3">
                    <div className="row justify-content-center text-center text-md-start">
                        <div className="col-md-2 mb-3" style={{ width: '450px', height: '100px', paddingLeft: '20px', paddingRight: '5px', marginLeft: '5px' }}>
                            <h5 className="text-uppercase mb-3">About Us</h5>
                            <img src="" alt="logo" width="100px" height="70px" className="mb-3" />
                            <p className="mb-0" style={{ textAlign: 'justify' }}>
                                Bigtraze Travels Bus Booking makes travel easy with reliable bus ticket bookings at competitive prices.
                                Thank you for choosing us!
                            </p>
                        </div>
                        <div className="col-md-2 mb-3">
                            <h5 className="text-uppercase mb-3">Contact Us</h5>
                            <p className="mb-2">Email: support@bigtrazetravels.com</p>
                            <p className="mb-2">Phone: +1 (234) 567-890</p>
                            <p className="mb-0">Address: 123 Bigtraze Travels Ave, City, State, ZIP</p>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5 className="text-uppercase mb-3">Services</h5>
                            <ul className="list-unstyled mb-0">
                                <li className="mb-2">Sleeping Bus Service</li>
                                <li className="mb-2">AC and Non-AC Service</li>
                                <li className="mb-0">Luxury Bus Services</li>
                            </ul>
                        </div>

                        <div className="col-md-2 mb-3">
                            <h5 className="text-uppercase mb-3">Global Sites</h5>
                            <ul className="list-unstyled mb-0">
                                <li className="mb-2">India</li>
                                <li className="mb-2">Singapore</li>
                                <li className="mb-2">Malaysia</li>
                                <li className="mb-2">Indonesia</li>
                                <li className="mb-2">Peru</li>
                                <li className="mb-2">Colombia</li>
                                <li className="mb-0">Vietnam</li>
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
