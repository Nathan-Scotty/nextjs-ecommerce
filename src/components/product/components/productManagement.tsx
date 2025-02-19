import { useState } from "react"
import styles from "../styles/productManagement.module.css"
import ProductTable from "./productTable";
import Popup from "./popup";
import { useProducts } from "../hook/useProduct";
import EditProductModal from "./editProductModal";
import { useRouter } from "next/router";

export default function ProductManagement() {
    const [showPopup, setShowPopup] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { products, loading: productsLoading, errorMessage, deleteProduct, editProduct } = useProducts();
    const router = useRouter();

    const openModal = (productId: string) => {
        const product = products.find((prod) => prod.id === productId);

        if(product){
            setSelectedProduct(product)
            setIsModalOpen(true);
        }else {
            console.error("Product not found for ID:", productId)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedProduct(null)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file)
        setPreviewImage(URL.createObjectURL(file))
    }

    const handlePopupToggle = () => setShowPopup((prev) => !prev)

    const handleDelete = async (id) => {
        if(confirm("Are you sure you want to delete this product?")){
            await deleteProduct(id)
        }
    }

    const handleEdit = async (id, formData) => {
        await editProduct(id, formData);
        closeModal();
    }

    const handleView = (productId) => {
        router.push(`http://localhost:3000/product/${productId}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("categoryId", categoryId);
        formData.append("image", image);

        try {
            const response = await fetch("http://localhost:5000/api/product", {
                method: "POST",
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
                body: formData,
            });

            if (response.ok) {
                setName("");
                setDescription("");
                setPrice("");
                setStock("");
                setCategoryId("");
                setPreviewImage(null);
                window.location.reload();
            } else {
                const errorData = await response.json(); // Get error details from backend
                console.error("Backend Error:", errorData);
                throw new Error(errorData.message || "Failed to add category");
            }
        } catch (error) {
            console.error("An error occurred while posting product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Product</h1>
            </header>
            <div className={styles.actions_bar}>
                <div className={styles.action_export}>
                    <button className={styles.action_button}>Export</button>
                    <button className={styles.action_button}>Import</button>
                </div>
                <div className={styles.action_import}>
                    <button className={styles.action_button}>Bulk Action</button>
                    <button className={styles.action_button}>Delete</button>
                    <button
                        className={`${styles.action_button} ${styles.primary}`}
                        onClick={handlePopupToggle}
                    >
                        Add Product
                    </button>
                </div>

            </div>
            <div className={styles.filters_bar}>
                <input
                    type="text"
                    className={styles.search_box}
                    placeholder="Search by Category name"
                />
                <div>
                    <button className={styles.filter_button}>Filter</button>
                    <button className={styles.reset_button}>Reset</button>
                </div>
            </div>
            <ProductTable
                products={products}
                loading={productsLoading}
                errorMessage={errorMessage}
                onDelete={handleDelete}
                onEdit={openModal}
                onView={handleView}
                onTogglePublished={1}
            />
            <Popup
                isVisible={showPopup}
                onClose={handlePopupToggle}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                price={price}
                setPrice={setPrice}
                stock={stock}
                setStock={setStock}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                handleSubmit={handleSubmit}
                handleImageChange={handleImageChange}
                previewImage={previewImage}
                loading={loading}
            />
            {isModalOpen && (
                <EditProductModal
                    product={selectedProduct}
                    onClose={closeModal}
                    onSubmit={handleEdit}
                    loading={loading}
                />
            )}
        </div>
    )
}