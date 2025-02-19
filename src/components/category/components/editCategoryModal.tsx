
import Image from "next/image";
import styles from '../styles/modal.module.css';
import { useEffect, useState } from "react";

const EditCategoryModal = ({ category, onClose, onSubmit }) => {
    const [name, setName] = useState(category?.name || "");
    const [description, setDescription] = useState(category?.description || "");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(category?.image || null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewImage(URL.createObjectURL(file))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Check if category and its ID exist
        if (!category || !category.id) {
            console.error("Category or category ID is missing.");
            return;
        }
    
        // Create and populate FormData
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        if (image) formData.append("image", image);
    
        onSubmit(category.id, formData);
    };    

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <span className={styles.close_button} onClick={onClose}>
                    &times;
                </span>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label htmlFor="categoryName">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="categoryDescription">Description:</label>
                    <textarea
                        id="categoryDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label htmlFor="categoryImage">Category Image:</label>
                    <input
                        type="file"
                        id="categoryImage"
                        accept="image/*"
                        onChange={handleImageChange}
                    />{/**
                                      {previewImage && (
                        <div>
                            <h4>Image Preview:</h4>
                            <Image src={previewImage} alt="Preview" width={200} height={200} style={{ height: 'auto'}} />
                        </div>
                    )}
                     */}
    
                    <button type="submit" className={styles.submit_button}>
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditCategoryModal