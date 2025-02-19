import { useRouter } from "next/router";
import { useEffect, useState } from "react"


export const useCart = () => {
    const router = useRouter();
    const [cartUserId, setCartUserId] = useState(null);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setCartUserId(storedUserId);
        }
    }, []);

    // Charger le panier quand cartUserId est défini
    useEffect(() => {
        if (!cartUserId) return; // Évite un appel API avec un ID undefined

        const fetchCart = async () => {
            setLoading(true);
            setErrorMessage("");

            try {
                const response = await fetch(`http://localhost:5000/api/cart/${cartUserId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to load cart items");
                }

                const data = await response.json();
                setCart(data.data);
            } catch (error) {
                setErrorMessage(error.message || "An error occurred while fetching the cart.");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [cartUserId]);


    const addToCart = async (productId, quantity) => {
        setLoading(true);
        setErrorMessage("");

        try {
            const userId = localStorage.getItem("userId"); // Assurez-vous que l'ID utilisateur est stocké

            const response = await fetch("http://localhost:5000/api/cart", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, productId, quantity }),
            });

            const data = await response.json();

            // Mettre à jour le panier
            setCart((prevCart) => ({
                ...prevCart,
                items: prevCart?.items?.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                ) || [data.data], // Si c'est le premier ajout
            }));
        } catch (error) {
            setErrorMessage(error.message || "An error occurred while adding the item to the cart.");
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId) => {
        setLoading(true);

        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`http://localhost:5000/api/cart/${userId}/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
                setCart((prev) => (Array.isArray(prev) ? prev.filter((item) => item.productId !== productId) : []));
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || "Failed to delete item from cart.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while deleting the item from the cart.");
        } finally {
            setLoading(false);
        }
    };

    const updateCartItemQuantity = async (productId: string, newQuantity: number) => {
        const userId = localStorage.getItem("userId");
        console.log("Updating quantity for:", { userId, productId, newQuantity });

        if (newQuantity < 1) {
            console.warn("Quantity cannot be less than 1, setting to 1.");
            newQuantity = 1;
        }

        if (!userId) {
            setErrorMessage("User ID not found");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/cart/${userId}/${productId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update quantity");
            }

            const updatedItem = await response.json();
            console.log("Updated item:", updatedItem);

            setCart((prevCart) => {
                if (!prevCart || !prevCart.items) return prevCart;

                return {
                    ...prevCart,
                    items: prevCart.items.map((item) =>
                        item.product.id === productId
                            ? { ...item, quantity: updatedItem.quantity }
                            : item
                    ),
                };
            });
        } catch (error) {
            console.error("Error updating cart:", error);
            setErrorMessage("An error occurred while updating quantity.");
        }
    };

    const getCartTotal = () => {
        if (!cart || !cart.items) return 0;

        return cart.items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    };

    const getCartItemCount = () => {
        return cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
    };

    return { cart, loading, errorMessage, addToCart, updateCartItemQuantity, removeFromCart, getCartTotal, getCartItemCount };
}