import React from 'react'; 
import notFound from '../assets/notFound.jpg';

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
      <img src={notFound} alt="Trulli" width="500" height="333"></img>
      <div>
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
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            backgroundColor: '#3498db', 
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2980b9'; 
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#3498db'; 
          }}
        >
          Go Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default MissMatch;
