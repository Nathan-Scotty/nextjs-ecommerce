import Category from "@/src/pages/category";
import { useState, useEffect } from "react";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:5000/api/category", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.data);
                } else {
                    setErrorMessage("Failed to load categories.");
                }
            } catch (error) {
                setErrorMessage("An error occurred while fetching categories.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/category/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            if (response.ok) {
                setCategories((prev) => prev.filter((Category) => Category.id !== id))
            } else {
                console.error("Failed to delete category");
            }
        } catch (error) {
            console.error("An error occurred while deleting the category.", error);
        }
    }

    const editCategory = async (id, updatedData) => {
        try {  
            // Send the formData via PUT request
            const response = await fetch(`http://localhost:5000/api/category/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: updatedData,
            });
    
            if (response.ok) {
                const updatedCategory = await response.json();
                setCategories((prev) =>
                    prev.map((category) =>
                        category.id === id ? { ...category, ...updatedCategory } : category
                    )
                );
                window.location.reload()
            } else {
                console.error("Failed to edit category.");
            }
        } catch (error) {
            console.error("An error occurred while editing the category.", error);
        }
    };
    
    return { categories, loading, errorMessage, deleteCategory, editCategory };
};
