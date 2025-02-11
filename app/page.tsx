"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make POST request to the login API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { role } = await response.json();

        // Set cookies for session management
        document.cookie = `authToken=mockToken; path=/; max-age=3600`; // Example token
        document.cookie = `userRole=${role}; path=/; max-age=3600`;

        // Redirect based on user role
        switch (role) {
          case "B2B":
            router.push("/dashboard/b2b");
            break;
          case "Concierge":
            router.push("/dashboard/concierge");
            break;
          case "Admin":
            router.push("/dashboard/admin");
            break;
          default:
            router.push("/dashboard");
        }
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-aquaBlue to-deepSeaGreen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-deepSeaGreen">
          Welcome to SAIL-E
        </h1>
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-aquaBlue focus:outline-none text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-aquaBlue focus:outline-none text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-aquaBlue text-white font-semibold rounded-md hover:bg-hoverBlue transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
