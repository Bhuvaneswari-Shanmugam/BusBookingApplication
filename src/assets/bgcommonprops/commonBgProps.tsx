import {CommonBackgroundProps} from '../../utils/entity/PageEntity'
export const CommonBackground: React.FC<CommonBackgroundProps> = ({ children }) => {
    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{
                backgroundImage: "url('./assets/bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                filter: 'blur(7px)',
            }} />
            <div style={{
                position: 'absolute',
                top: '90px',
                color: '#f5f5f5',
                width: '500px',
                height: 'auto',
                left: '300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '100px',
            }}>
                {children}
            </div>
        </div>
    );
};

