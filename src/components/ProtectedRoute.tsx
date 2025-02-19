import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent, requiredRole = null) => {
    return function ProtectedRoute(props) {
        const [isLoading, setIsLoading] = useState(true);
        const [isAuthorized, setIsAuthorized] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem("authToken");
            const userRole = localStorage.getItem("userRole");

            console.log("Checking authentication...");
            console.log("Stored Token:", token);
            console.log("Stored Role:", userRole);

            if (!token) {
                console.log("No token found. Redirecting to login...");
                router.push("/login");
                return;
            }

            // Check if role matches requiredRole (if requiredRole is provided)
            if (requiredRole && userRole !== requiredRole) {
                console.log(`Unauthorized: Required ${requiredRole}, found ${userRole}`);
                router.push("/403"); // Redirect to unauthorized page
                return;
            }

            setIsAuthorized(true);
            setIsLoading(false);
        }, [router]);

        if (isLoading) {
            return <p>Loading...</p>; // You can replace this with a spinner
        }

        return isAuthorized ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;
