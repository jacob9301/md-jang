import React from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../api/api';

const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
}


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            email: email,
            password: password
        }

        const postLogin = async() => {
            try {
                const response = await login(user);
                if (response.success) {
                    navigate('/app');
                } else {
                    setAlertMsg(response.message);
                    setAlert(true);
                    setPassword('');
                }
            } catch(err) {
                console.error('login.jsx:', err);
            }
        }

        postLogin();

    }

    return (
    <div style={style}>
        <Card style={{width: '18rem'}}>
            <Card.Title className='text-center bg-primary text-white pt-3 pb-3 mb-0 rounded-top'>
                <h1>Log In</h1>
            </Card.Title>
            <Card.Body>
                {alert ? <Alert variant='danger'>{alertMsg}</Alert> : null}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email' className='mt-2 mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' required value={email} onChange={handleEmailChange} />
                    </Form.Group>
                    <Form.Group id='password' className='mt-2 mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='Password' required value={password} onChange={handlePasswordChange} />
                    </Form.Group>
                    <Button type='submit' className='w-100 mt-2'>Log In</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='text-center mt-2'>
            Don't have an account? <Link to='/signup'>Sign Up</Link>
        </div>
    </div>
    )
}