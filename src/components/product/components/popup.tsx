import styles from "../styles/popup.module.css"
import Image from "next/image"
import { useCategories } from "../../category/hooks/useCategory";

const Popup = ({
    isVisible,
    onClose,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    stock,
    setStock,
    categoryId,
    setCategoryId,
    handleSubmit,
    handleImageChange,
    previewImage,
    loading
}) => {
    const { categories } = useCategories();
    if (!isVisible) return null;

    return (
        <div className={styles.popup}>
            <div className={styles.popup_content}>
                <span className={styles.close_btn} onClick={onClose}>&times;</span>
                <h2>Add New Product</h2>
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
                    />
                    {previewImage && (
                        <div>
                            <Image src={previewImage} alt="Preview" width={50} height={50} style={{ height: 'auto' }} />
                        </div>
                    )}
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
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Popup;