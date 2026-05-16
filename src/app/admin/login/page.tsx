"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Incorrect password. Try again.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-12">
          <Image src="/logo.svg" alt="BRANDD-AID" width={40} height={40} className="rounded-sm" />
          <div>
            <div className="font-black text-white text-base tracking-[0.06em]">
              BRANDD<span className="text-[#E63327]">-AID</span>
            </div>
            <div className="text-white/30 text-[9px] font-mono uppercase tracking-[0.22em]">CMS Admin</div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] border border-white/08 rounded-2xl p-8">
          <h1 className="text-white font-bold text-xl mb-1">Welcome back</h1>
          <p className="text-white/40 text-sm mb-8">Enter your admin password to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/50 text-xs font-mono uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#E63327]/60 focus:bg-white/[0.08] transition-all"
                placeholder="Enter password"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-[#E63327] text-xs font-mono">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#E63327] hover:bg-[#FF5349] disabled:opacity-40 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              {loading ? "Checking…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6 font-mono">
          Default password: branddaid2025
        </p>
      </div>
    </div>
  );
}
