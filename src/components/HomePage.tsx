import styles from '../../styles/HomePage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useProducts } from './product/hook/useProduct';
import ecommerce from '@/public/ecommerce.webp';
import { useCart } from './cart/hooks/useCart';

export default function HomePage() {
    const { products } = useProducts();
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        const userId = localStorage.getItem("userId");
        console.log('User: ', userId);

        addToCart(product.id, 1);
    };

    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Modern Furniture for Every Space</h1>
                    <p>Discover stylish and affordable furniture for your home.</p>
                    <Link href="/shop" className={styles.ctaButton}>
                        Shop Now
                    </Link>
                </div>
                <Image
                    src={ecommerce}
                    alt="Furniture display"
                    width={800}
                    height={500}
                    className={styles.heroImage}
                />
            </section>

            {/* Featured Products */}
            <section className={styles.products}>
                <h2>Featured Products</h2>
                <div className={styles.productGrid}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.productCard}>
                            <Image
                                src={`http://localhost:5000/uploads/${product.image}`}
                                alt={product.name}
                                width={300}
                                height={300}
                                className={styles.productImage}
                            />
                            <h3 className={styles.productTitle}>{product.name}</h3>
                            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className={styles.addToCartBtn}
                            >
                                Add to Cart 🛒
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
