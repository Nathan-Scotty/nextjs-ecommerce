// Navbar.tsx - Dynamic cart link with cartUserId from localStorage
import { useEffect, useState } from 'react';
import styles from '../../styles/Navbar.module.css';
import { useCart } from './cart/hooks/useCart';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
    const [cartUserId, setCartUserId] = useState(null);
    const { getCartItemCount } = useCart()
    const router = useRouter();

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const token = localStorage.getItem('authToken');

        if (!token) {
            router.push('/login');
            return;
        }
        if (storedUserId) {
            setCartUserId(storedUserId);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        window.location.href = '/login';
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.logo}>
                    <Link href="/">ShopEasy</Link>
                </h1>
                <nav>
                    <ul className={styles.navList}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/shop">Shop</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li className={styles.cartContainer}>
                            <Link href={`/cart/${cartUserId}`} className={styles.cart}>
                                <FaShoppingCart className={styles.cartIcon} />
                                <span className={styles.cartCount}>{getCartItemCount()}</span>
                            </Link>
                        </li>
                        <li>
                            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
