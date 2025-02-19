import { useEffect, useState } from "react"


export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fecthProducts = async () => {
            setLoading(true);

            try {
                const response = await fetch("http://localhost:5000/api/product", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.data);
                } else {
                    setErrorMessage("Failed to load products");
                }
            } catch (error) {
                setErrorMessage("An error occured while fetching products.")
            } finally {
                setLoading(false)
            }
        };

        fecthProducts();
    }, []);

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/product/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            if (response.ok) {
                setProducts((prev) => prev.filter((Product) => Product.id !== id))
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.error("An error occured while deleting the category.", error);
        } finally {
            setLoading(false);
        }
    }

    const editProduct = async (id, updatedData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/product/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: updatedData
            });

            if (response.ok) {
                const updatedProduct = await response.json();
                setProducts((prev) =>
                    prev.map((product) =>
                        product.id === id ? { ...product, ...updatedProduct } : product)
                );
                window.location.reload();
            }else {
                console.error("Failed to edit product")
            }
        } catch (error) {
            console.error("An error occured while editing the product.", error)
        }
    }

    return { products, loading, errorMessage, deleteProduct, editProduct }
}