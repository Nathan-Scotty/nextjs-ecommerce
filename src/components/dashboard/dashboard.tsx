import Link from "next/link"
import styles from './dashboard.module.css'

export default function Dashboard() {

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
                        <li><Link href="/admin/logout" className={styles.logout_btn}>Logout</Link></li>
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