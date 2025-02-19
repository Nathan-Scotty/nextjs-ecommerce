import { useCart } from "../hooks/useCart";
import Image from "next/image";
import styles from "../styles/cartPage.module.css"
import Link from "next/link";

export default function CartPage() {
    const { cart, loading, errorMessage, updateCartItemQuantity, removeFromCart, getCartTotal } = useCart();

    return (
        <div className={styles.cartContainer}>
            <h1 className={styles.cartTitle}>🛒 Mon Panier</h1>

            {loading && <p className={styles.cartLoading}>Chargement...</p>}
            {errorMessage && <p className={styles.cartError}>{errorMessage}</p>}

            {cart?.items?.length > 0 ? (
                <ul className={styles.cartList}>
                    {cart.items.map((item) => (
                        <li key={item.id} className={styles.cartItem}>
                            <Image
                                src={`http://localhost:5000/uploads/${item.product.image}`}
                                alt={item.product.name}
                                width={80}
                                height={80}
                                className={styles.cartImage}
                            />
                            <div className={styles.cartDetails}>
                                <p className={styles.cartProductName}>{item.product.name}</p>
                                <p className={styles.cartProductDescription}>{item.product.description}</p>
                                <p className={styles.cartProductPrice}>💰 ${item.product.price}</p>
                                <p className={styles.cartProductQuantity}>Quantité: {item.quantity}</p>
                            </div>
                            <button onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}>➕</button>
                            <button onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}>➖</button>
                            <button
                                onClick={() => { console.log("Removing item:", item); removeFromCart(item.product.id) }}
                                className={styles.cartRemoveBtn}
                            >
                                ❌ Supprimer
                            </button>

                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.cartEmpty}>Votre panier est vide.</p>
            )}

            <div className={styles.cartFooter}>
                <h2 className={styles.cartTotal}>Total : ${getCartTotal()}</h2>
                <Link href="/" className={styles.cartAddBtn}>
                    ➕ Ajouter un article
                </Link>

            </div>
        </div>
    );
}
