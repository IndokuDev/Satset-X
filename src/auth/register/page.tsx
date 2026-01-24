"use client";
import { useState } from "react";
import { Link, useRouter } from "satset-react";

export async function getMetadata({ t }) {
  return {
    title: t("auth.register.title"),
    description: t("auth.register.description"),
  };
}

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const result = await res.json().catch(() => null);

      if (res.ok) {
        router.push("/auth/login");
      } else {
        const message = result?.message || "Register gagal";
        alert(message);
      }
    } catch {
      alert("Register gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Register</h1>
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"} Password</button>
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </button>
      <p>
        Sudah punya akun? <Link href="/auth/login">Login disini</Link>
      </p>
      </div>
    </form>
  );
}
