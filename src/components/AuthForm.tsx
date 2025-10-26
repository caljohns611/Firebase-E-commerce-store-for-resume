import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {
    const { signIn, signUp, logout, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const [mode, setMode] = useState<"login" | "signup">("login");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (mode === "login") {
                await signIn(email, password);
            } else {
                await signUp(email, password);
            }
            setEmail("");
            setPasword("");
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (user)
        return (
            <div className="flex items-center gap-4">
                <span>Signed in as: {user.email}</span>
                <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Logout</button>
            </div>
        );

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mx-w-sm">
            <input 
                type="email"
                placeholder="Email"
                className="border px-3 py-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Password"
                className="border px-3 py-2 rounded"
                value={password}
                onChange={(e) => setPasword(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-whte py-2 rounded hover:bg-blue-700">{mode === "login" ? "Login" : "Sign Up"}</button>
            <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-sm tex-blue-600 underline">{mode === "login" ? "Need an account? Sign up" : "Already have one? Log in"}</button>
        </form>
    );
}