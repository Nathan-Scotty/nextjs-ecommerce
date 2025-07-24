import Link from "next/link"
import styles from './dashboard.module.css'
import { useRouter } from "next/router"
import { useEffect } from "react";

export default function Dashboard() {

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/login')
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        window.location.href = '/login';
    };

    return (
        <div className={styles.container}>
            <header className={styles.admin_header}>
                <div className={styles.logo}>
                    <a href="/admin/dashboard">Admin Dashboard</a>
                </div>
                <nav className={styles.admin_nav}>
                    <ul>
                        <li><Link href="/admin/profile">Profile</Link></li>
                        <li><Link href="/admin/messages">Messages</Link></li>
                        <li><Link href="/admin/notifications">Notifications</Link></li>
                        <li><Link href="/admin/settings">Settings</Link></li>
                        <li><button onClick={handleLogout} className={styles.logout_btn}>Logout</button></li>
                    </ul>
                </nav>
            </header>

            <div className={styles.sidebar}>
                <ul>
                    <li><Link href="/">Dashboard</Link></li>
                    <li><Link href="/category">Category</Link></li>
                    <li><Link href="/product">Products</Link></li>
                    <li><Link href="/orders">Orders</Link></li>
                    <li><Link href="/users">Users</Link></li>
                    <li><Link href="/setting">Settings</Link></li>
                </ul>
            </div>
        </div>
    )
}