"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("nama", data.data.nama);
      localStorage.setItem("email", data.data.email);

      router.push("/dashboard");
    } catch {
      setError("Terjadi kesalahan jaringan.");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "#205781" }}
    >
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="flex justify-center">
          <Image src="/logo.png" alt="SmartDrain Logo" width={150} height={150} />
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block mb-1 text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p style={{ color: "red", fontSize: "0.875rem" }}>{error}</p>}

            <div className="pt-2 mt-8">
              <Button
                type="submit"
                className="w-full bg-white border-3 border-[#205781] text-[#205781] hover:bg-[#205781] hover:text-white"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
