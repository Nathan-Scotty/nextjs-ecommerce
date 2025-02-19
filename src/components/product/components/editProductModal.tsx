import { useState } from "react";
import Image from "next/image";
import styles from '../styles/modal.module.css'
import { useCategories } from "../../category/hooks/useCategory";

export default function EditProductModal({ product, onSubmit, onClose, loading }) {
    const [name, setName] = useState(product?.name || "");
    const [description, setDescription] = useState(product?.description || "");
    const [price, setPrice] = useState(product?.price || "");
    const [stock, setStock] = useState(product?.stock || "");
    const [categoryId, setCategoryId] = useState(product?.categoryId || "")
    const [image, setImage] = useState(product?.image || null);
    const [previewImage, setPreviewImage] = useState(product?.image || null);

    const { categories } = useCategories();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewImage(URL.createObjectURL(file))
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //Check if product and its ID exist
        if (!product || !product.id) {
            console.error("Category or category ID is missing.")
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("categoryId", categoryId);

        onSubmit(product.id, formData)
    }

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <span className={styles.close_button} onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        id="productName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                    <label htmlFor="productDescription">Description</label>
                    <textarea
                        name="description"
                        id="productDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                    <label htmlFor="productPrice">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="productPrice"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required />
                    <label htmlFor="productStock">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        id="productStock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required />
                    <label htmlFor="productImage">Product Image:</label>
                    <input
                        type="file"
                        id="productImage"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />{/*
                    {previewImage && (
                        <div>
                            <Image src={previewImage} alt="Preview" width={50} height={50} style={{ height: 'auto' }} />
                        </div>
                    )}*/}
                    <label htmlFor="categoryName">Category Name</label>
                    <select
                        name="name"
                        id="categoryName"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className={styles.submit_button} disabled={loading}>
                        {loading ? "Product changing..." : "Save changes"}
                    </button>
                </form>
            </div>
        </div>
    )
}