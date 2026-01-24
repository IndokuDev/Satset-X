"use client";
import { useState } from "react";
import { Link, useRouter } from "satset-react";

export async function getMetadata({ t }) {
  return {
    title: t("auth.login.title"),
    description: t("auth.login.description"),
  };
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        router.push("/");
      } else {
        const message = data?.message || "Login gagal";
        alert(message);
      }
    } catch {
      alert("Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Login</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"} Password</button>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <p>Belum punya akun? <Link href="/auth/register">Register disini</Link></p>
      </div>
    </form>
  );
}
