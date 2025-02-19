
import React, { useState } from 'react';
import Image from 'next/image';
import login from '@/public/ecommerce.webp'
import styles from './login.module.css'
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        setEmail(""),
            setPassword(""),
            setErrorMessage("")
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:5000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                // Décoder le token pour extraire l'ID utilisateur
                const payload = JSON.parse(atob(token.split(".")[1])); // Décodage du JWT
                const userId = payload.id;

                if (!userId) {
                    console.error("User ID is missing in token");
                    setErrorMessage("User ID not found in token");
                    return;
                }

                console.log("Extracted userId:", userId);

                // Stocker l'ID utilisateur dans localStorage
                localStorage.setItem('userId', userId);
                localStorage.setItem('authToken', token);
                localStorage.setItem('userRole', data.role);

                setLoading(false);
                // Redirect based on role
                if (data.role === 'admin') {
                    window.location.href = '/dashboard';
                } else {
                    window.location.href = '/';
                }
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
            <h2 className={styles.signupTitle}>Login</h2>
            <form onSubmit={handleSignup} className={styles.container}>
                <Image src={login} alt='signup' className={styles.right} width={400} height={500} />
                <div className={styles.left}>
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
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <div className={styles.clearfix}>
                        <button type="submit" disabled={loading} className={styles.signupbtn}>
                            {loading ? 'Signing up...' : 'Login'}
                        </button>
                        <button type='button' onClick={handleCancel} className={styles.cancelbtn}>Cancel</button>
                    </div>
                    <Link href="/signup" className={styles.signupLink}>Don't have an account? Sign up here</Link>
                </div>
            </form>
        </div>
    );
};

