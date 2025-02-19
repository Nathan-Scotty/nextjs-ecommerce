
import React, { useState } from "react";
import Popup from "./popup";
import CategoryTable from "./categoryTable";
import { useCategories } from "../hooks/useCategory"
import EditCategoryModal from "./editCategoryModal"
import styles from "../styles/categoryManagement.module.css"

const CategoryManagement = ({ title }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { categories, loading: categoriesLoading, errorMessage, deleteCategory, editCategory } = useCategories();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const openModal = (categoryId: string) => {
        const category = categories.find((cat) => cat.id === categoryId);

        if (category) {
            setSelectedCategory(category);
            setIsModalOpen(true);
        } else {
            console.error("Category not found for ID:", categoryId);
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedCategory(null)
    }

    const handlePopupToggle = () => setShowPopup((prev) => !prev);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            await deleteCategory(id);
        }
    }

    const handleEdit = async (id, formData) => {
        await editCategory(id, formData);
        closeModal();

    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewImage(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("image", image);

            const response = await fetch("http://localhost:5000/api/category", {
                method: "POST",
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
                body: formData,
            });

            if (response.ok) {
                setName("");
                setDescription("");
                setPreviewImage(null);
                window.location.reload();
            } else {
                throw new Error("Failed to add category");
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>{title}</h1>
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
                        Add Category
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
            <CategoryTable
                categories={categories}
                loading={categoriesLoading}
                errorMessage={errorMessage}
                onDelete={handleDelete}
                onEdit={openModal}
            />
            <Popup
                isVisible={showPopup}
                onClose={handlePopupToggle}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                handleImageChange={handleImageChange}
                handleSubmit={handleSubmit}
                previewImage={previewImage}
                loading={loading}
            />
            {isModalOpen && (
                <EditCategoryModal
                    category={selectedCategory}
                    onClose={closeModal}
                    onSubmit={handleEdit}
                />
            )}
        </div>
    );
};

export default CategoryManagement;
