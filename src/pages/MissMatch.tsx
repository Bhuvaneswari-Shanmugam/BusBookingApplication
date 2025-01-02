import React from 'react';
import { colors } from '../constants/Palette';  
// import imageFile from '../assests/images/notFound.jpg';


const MissMatch: React.FC = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: '100vh',
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        color: '#343a40',
        flexDirection: 'column',
      }}
    >
      <div>
         <img
          // src={imageFile}  
          alt="404"
          style={{ width: '150px', marginBottom: '20px' }}
        />
        <p
          className="mt-3"
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#e74c3c',
            marginBottom: '20px',
          }}
        >
          404 - Page Not Found
        </p>
        
        <p
          style={{
            fontSize: '1.2rem',
            color: '#7f8c8d', 
            marginBottom: '20px',
          }}
        >
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          style={{
            padding: '10px 20px',
            fontSize: '1.1rem',
            backgroundColor: colors.primary, 
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.secondary; 
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary;
          }}
        >
          Go Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default MissMatch;
