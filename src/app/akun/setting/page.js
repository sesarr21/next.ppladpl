"use client";

import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { SquarePen, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [user, setUser] = useState({ nama: "", email: "" });
  const [editMode, setEditMode] = useState({ nama: false, email: false });
  const [inputValue, setInputValue] = useState({ nama: "", email: "" });

  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    const nama = localStorage.getItem("nama");
    const email = localStorage.getItem("email");
    if (nama && email) {
      setUser({ nama, email });
      setInputValue({ nama, email });
    }
  }, []);

  async function saveField(field) {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3001/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: inputValue[field] }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Gagal menyimpan perubahan.");
        return;
      }

      setUser((prev) => ({ ...prev, [field]: inputValue[field] }));
      localStorage.setItem(field, inputValue[field]);
      setEditMode((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan perubahan.");
    }
  }

  function cancelEdit(field) {
    setInputValue((prev) => ({ ...prev, [field]: user[field] }));
    setEditMode((prev) => ({ ...prev, [field]: false }));
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword !== confirmPassword) {
      setPasswordError("Password baru dan konfirmasi tidak cocok.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3001/api/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.message || "Gagal mengganti password.");
      } else {
        setPasswordSuccess("Password berhasil diubah.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setChangePasswordVisible(false);
      }
    } catch {
      setPasswordError("Gagal mengganti password.");
    }
  }

  return (
    <div className="min-h-screen bg-[#205781]">
      <Navbar />
      <div className="flex justify-center py-10">
        <Card className="w-1/2 p-6 relative">
          <CardHeader className="text-center">
            <CardTitle>Profil Akun</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex justify-center mb-6">
              <Image
                src="/profilephoto.jpg"
                alt="Foto Profil"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>

            <div className="space-y-6 text-left">
              {/* Nama */}
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500">Nama</p>
                  {!editMode.nama ? (
                    <p className="text-lg font-medium">{user.nama || "-"}</p>
                  ) : (
                    <input
                      type="text"
                      value={inputValue.nama}
                      onChange={(e) =>
                        setInputValue((prev) => ({ ...prev, nama: e.target.value }))
                      }
                      className="text-lg font-medium border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  )}
                </div>
                <div>
                  {!editMode.nama ? (
                    <button
                      onClick={() => setEditMode((prev) => ({ ...prev, nama: true }))}
                      className="text-[#4F959D] hover:text-[#36747c]"
                    >
                      <SquarePen size={24} />
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveField("nama")}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Check size={24} />
                      </button>
                      <button
                        onClick={() => cancelEdit("nama")}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500">Email</p>
                  {!editMode.email ? (
                    <p className="text-lg font-medium">{user.email || "-"}</p>
                  ) : (
                    <input
                      type="email"
                      value={inputValue.email}
                      onChange={(e) =>
                        setInputValue((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="text-lg font-medium border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  )}
                </div>
                <div>
                  {!editMode.email ? (
                    <button
                      onClick={() => setEditMode((prev) => ({ ...prev, email: true }))}
                      className="text-[#4F959D] hover:text-[#36747c]"
                    >
                      <SquarePen size={24} />
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveField("email")}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Check size={24} />
                      </button>
                      <button
                        onClick={() => cancelEdit("email")}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ganti Password */}
            <div className="mt-10">
              {!changePasswordVisible ? (
                <button
                  onClick={() => setChangePasswordVisible(true)}
                  className="text-sm font-bold text-[#4F959D] hover:text-[#49757a]"
                >
                  Ganti Password
                </button>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Password Lama</label>
                    <Input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Password Baru</label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500">Konfirmasi Password Baru</label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                  {passwordSuccess && <p className="text-sm text-green-500">{passwordSuccess}</p>}

                  <div className="flex gap-3 mt-2">
                    <Button type="submit" className="bg-[#4F959D] hover:bg-[#49757a] text-white">
                      Simpan Password
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setChangePasswordVisible(false);
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
