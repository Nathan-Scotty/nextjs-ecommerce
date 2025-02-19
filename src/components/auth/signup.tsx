// frontend/components/SignupForm.jsx
import React, { useState } from 'react';
import Image from 'next/image';
import signup from '@/public/ecommerce.webp'
import styles from './signup.module.css'
import Link from 'next/link';

export default function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        setEmail(""),
            setName(""),
            setPassword(""),
            setRole("");
        setErrorMessage("")
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password) {
            setErrorMessage('All fields are required');
            setLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage('Invalid email address');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, role })
            });

            if (response.ok) {
                const data = await response.json();
                // Save the token in localStorage
                localStorage.setItem('userId', data.id);
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userRole', data.role);
                setLoading(false);
                // Redirect to dashboard or login page
                window.location.href = '/login'; 
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Registration failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.form}>
            <h2 className={styles.signupTitle}>Sign Up</h2>
            <form onSubmit={handleSignup} className={styles.container}>
                <Image src={signup} alt='signup' className={styles.right} width={400} height={500} />
                <div className={styles.left}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            disabled={loading}
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="admin">Admin</option>
                            <option value="client">Client</option>
                        </select>
                    </div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <div className={styles.clearfix}>
                        <button type="submit" disabled={loading} className={styles.signupbtn}>
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                        <button type='button' onClick={handleCancel} className={styles.cancelbtn}>Cancel</button>
                    </div>
                    <Link href="/login" className={styles.signupLink}>Already have an account? Sign in here</Link>
                </div>
            </form>
        </div>
    );
};

