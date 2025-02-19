import Image from "next/image";
import styles from "../styles/productDetail.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail() {
    const router = useRouter();
    const { productId } = router.query; // Accessing productId from the URL query
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!productId) {
            console.log("Waiting for ID...");
            return;
        } // Wait for the `productId` to be available from the query
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/product/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }
                const data = await response.json();
                setProduct(data.data);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]); // Dependency on productId to trigger the effect when it's available

    if (loading) return <p>Loading product...</p>;
    if (errorMessage) return <p>{errorMessage}</p>;
    if (!product) return <p>No product found.</p>;

    return (
        <div className={styles.productContainer}>
            <h1 className={styles.title}>{product?.name || "No Name"}</h1>
            <div className={styles.productDetails}>
                {product?.image ? (
                    <Image
                        src={`http://localhost:5000/uploads/${product.image}`}
                        alt={product.name}
                        width={400}
                        height={400}
                    />
                ) : (
                    <p>No image available</p>
                )}
                <div className={styles.detailsText}>
                    <p><strong>Description:</strong> {product?.description || "No Description"}</p>
                    <p><strong>Price:</strong> ${product?.price || "N/A"}</p>
                    <p><strong>Stock:</strong> {product?.stock || "Out of Stock"}</p>
                    <p><strong>Category:</strong> {product?.category?.name || "No Category"}</p>
                    <button className={styles.back_btn} onClick={() => router.back()}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}