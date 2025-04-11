import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Button from "../Button";
import logo from "../../assets/logo.jpg";
import { DecodedToken } from "../../utils/entity/PageEntity";
import { colors } from "../../constants/Palette";

interface HeaderProps {
    aboutCardRef?: React.RefObject<HTMLDivElement | null>;
    contactCardRef?: React.RefObject<HTMLDivElement | null>;
    serviceCardRef?: React.RefObject<HTMLDivElement | null>;
    homeCardRef?:React.RefObject<HTMLDivElement | null>;
}
const Header: React.FC<HeaderProps> = ({ aboutCardRef, contactCardRef, serviceCardRef, homeCardRef}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [firstName, setFirstName] = useState("User");
    const [lastName, setLastName] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
    const [hover, setHover] = useState<{ [key: string]: boolean }>({});
    const [activeItem, setActiveItem] = useState<string | null>(null);
    useEffect(() => {
        const token = sessionStorage.getItem("Token");
        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                setFirstName(decodedToken.firstName || "User");
                setLastName(decodedToken.lastName || "");
                setUserId(decodedToken.userId || null);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);
    const getInitials = () => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };
    const handleSignOut = () => {
        sessionStorage.removeItem("Token");
        sessionStorage.removeItem("RefreshToken");
        sessionStorage.removeItem("FirstName");
        sessionStorage.removeItem("userId");
        navigate("/");
    };
    const handleProfileClick = () => {
        navigate(`/profile-layout`);
    };
    const handleNavClick = (item: string, ref?: React.RefObject<HTMLDivElement | null>) => {
        setActiveItem(item.toLowerCase());
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };
    const isBusesPage = location.pathname === "/buses";
    const isProfilePage = location.pathname.startsWith("/profile/");
    const isProfileLayout = location.pathname.startsWith("/profile-layout");
    const isAdminPage=location.pathname.startsWith("/admin");
    const isBusDetailPage=location.pathname.startsWith("/bus-details");
    const isBookingDetailsPage=location.pathname.startsWith("/all-booking-details");
    const isTripDetailsPage=location.pathname.startsWith("/trip-info");
    const isCustomerDetailsPage=location.pathname.startsWith("/customer-details");

    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid me-5">
                <img src={logo} alt="Logo" width="80" height="60" className="d-inline-block align-text-top ms-3" />
                {!isProfilePage && !isBusesPage && !isProfileLayout && !isBusDetailPage && !isTripDetailsPage && !isBookingDetailsPage &&  !isAdminPage && !isCustomerDetailsPage && (
                    <>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {["Home", "About", "Services", "Contact"].map((item) => (
                                    <li key={item} className="mx-3">
                                        {item === "Home" ? (
                                            <Button
                                                className="nav-link mx-3 btn"
                                                onMouseEnter={() => setHover((prev) => ({ ...prev, [item.toLocaleLowerCase()]: true }))}
                                                onMouseLeave={() => setHover((prev) => ({ ...prev, [item.toLocaleLowerCase()]: false }))}
                                                onClick={() => handleNavClick(item, item==="Home" ? homeCardRef : item === "home"? homeCardRef : homeCardRef)}
                                                style={{
                                                    background: "none",
                                                    color: hover[item.toLocaleLowerCase()]|| activeItem === item.toLowerCase() ? colors.darkPageColor : colors.secondary,
                                                    fontWeight: "400",
                                                    textDecoration: "none",
                                                }}
                                            >
                                                {item}
                                            </Button>
                                        ) : (
                                            <Button
                                                className="nav-link mx-3 btn"
                                                onMouseEnter={() => setHover((prev) => ({ ...prev, [item.toLowerCase()]: true }))}
                                                onMouseLeave={() => setHover((prev) => ({ ...prev, [item.toLowerCase()]: false }))}
                                                onClick={() => handleNavClick(item, item === "About" ? aboutCardRef : item === "Services" ? serviceCardRef : contactCardRef)}
                                                style={{
                                                    background: "none",
                                                    color: hover[item.toLowerCase()] || activeItem === item.toLowerCase() ? colors.darkPageColor : colors.secondary,
                                                    fontWeight: "400",
                                                    textDecoration: "none",
                                                }}
                                            >
                                                {item}
                                            </Button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
                <div className="d-flex align-items-center ms-auto">
                    <div
                        onClick={handleProfileClick}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "#9932CC",
                            color: "white",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1rem",
                            cursor: "pointer",
                            marginLeft: "10px",
                        }}
                    >
                        {getInitials()}
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Header;