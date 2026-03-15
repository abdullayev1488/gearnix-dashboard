import { createContext, useContext, useState, useEffect } from "react";
import api from "@/axios/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("admin_token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await api.get("/auth/me");
                if (data.success && data.data.role === "admin") {
                    setUser(data.data);
                } else {
                    // Not an admin — clear token
                    logout();
                }
            } catch {
                logout();
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post("/auth/admin-login", { email, password });

        if (data.success) {
            const { user: userData, token: newToken } = data.data;
            setUser(userData);
            setToken(newToken);
            localStorage.setItem("admin_token", newToken);
        }

        return data;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("admin_token");
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
