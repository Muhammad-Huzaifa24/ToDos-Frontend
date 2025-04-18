import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token); // Decode the token
        const currentTime = Date.now() / 1000; // Get current time in seconds
        return decodedToken.exp > currentTime; // Check if token is expired
    } catch {
        return false; // Invalid token
    }
};

export { isAuthenticated }
