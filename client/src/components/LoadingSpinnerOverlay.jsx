import { Spinner } from 'react-bootstrap';

const overrideStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 9999,
} 

function LoadingSpinnerOverlay() {
    return (
        <div style={overrideStyle}>
            <Spinner animation="border" size="sm" role="status" />
        </div>
    )
}

export default LoadingSpinnerOverlay;