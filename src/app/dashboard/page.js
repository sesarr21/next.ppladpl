"use client";

import { useState, useEffect } from "react";
import ChartAir from "./ChartAir";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChartKelembaban from "./ChartKelembaban";
import { Switch } from "@/components/ui/switch";
import ModalPopup from "./ModalPopup";
import { Input } from "@/components/ui/input";
import Navbar from "../../components/Navbar";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [ketinggianTerbaru, setKetinggianTerbaru] = useState(null);
  const [kelembabanTerbaru, setKelembabanTerbaru] = useState(null);
  const [statusDrainase, setStatusDrainase] = useState(null);
  const [airValue, setAirValue] = useState("");
  const [tanahValue, setTanahValue] = useState("");

  const fetchKetinggianAir = () => {
    fetch("http://localhost:3001/api/ketinggian-air")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setKetinggianTerbaru(data[0].nilai);
      });
  };

  const fetchKelembabanTanah = () => {
    fetch("http://localhost:3001/api/kelembaban-tanah")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setKelembabanTerbaru(data[0].nilai);
      });
  };

  const fetchStatusDrainase = () => {
    fetch("http://localhost:3001/api/status-drainase")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.status_drainase !== "undefined")
          setStatusDrainase(data.status_drainase);
      });
  };

  useEffect(() => {
    fetchKetinggianAir();
    fetchKelembabanTanah();
    fetchStatusDrainase();
  }, []);

  useEffect(() => {
    if (open) {
      fetch("http://localhost:3001/api/config")
        .then((res) => res.json())
        .then((data) => {
          const air = data.find((item) => item.nama_config === "air");
          const tanah = data.find((item) => item.nama_config === "tanah");
          setAirValue(air?.nilai?.toString() ?? "");
          setTanahValue(tanah?.nilai?.toString() ?? "");
        });
    }
  }, [open]);

  const handleSave = async () => {
    try {
      const resAir = await fetch("http://localhost:3001/api/config/air", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nilai: parseFloat(airValue) }),
      });

      if (!resAir.ok) throw new Error("Gagal update batas ketinggian air");

      const resTanah = await fetch("http://localhost:3001/api/config/tanah", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nilai: parseFloat(tanahValue) }),
      });

      if (!resTanah.ok) throw new Error("Gagal update batas kelembaban tanah");

      setOpen(false);
    } catch (error) {
      alert(error.message || "Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleToggleDrainase = async (value) => {
    try {
      const res = await fetch("http://localhost:3001/api/status-drainase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status_drainase: value }),
      });

      if (!res.ok) throw new Error("Gagal update status drainase");

      setStatusDrainase(value);
      fetchKetinggianAir();
      fetchKelembabanTanah();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#205781]">
      <Navbar />
      <div className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] gap-6 pt-5">
          <Card className="h-48 w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#205781] text-2xl font-bold">
                <img src="/air.png" alt="Logo" className="w-10 h-10" />
                Ketinggian Air
              </CardTitle>
            </CardHeader>
            <CardContent className="font-bold text-left text-[#4F959D]">
              {ketinggianTerbaru !== null ? (
                <>
                  <span className="text-6xl">{ketinggianTerbaru}</span>
                  <span className="text-2xl align-bottom ml-1">cm</span>
                </>
              ) : (
                "Loading..."
              )}
            </CardContent>
          </Card>

          <Card className="h-48 w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#205781] text-2xl font-bold">
                <img src="/tanah.png" alt="Logo" className="w-10 h-10" />
                Kelembaban Tanah
              </CardTitle>
            </CardHeader>
            <CardContent className="font-bold text-left text-[#4F959D]">
              {kelembabanTerbaru !== null ? (
                <>
                  <span className="text-6xl">{kelembabanTerbaru}</span>
                  <span className="text-2xl align-bottom ml-1">m³</span>
                </>
              ) : (
                "Loading..."
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col justify-between h-48 w-full">
            <Card className="h-36 w-full flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#205781]">Status Drainase</CardTitle>
              </CardHeader>
              <CardContent className="font-bold text-left">
                <div className="mb-6 text-3xl text-[#4F959D]">
                  {statusDrainase === null ? "Loading..." : statusDrainase ? "On" : "Off"}
                </div>
              </CardContent>
            </Card>
            <Button
              className="bg-[#4F959D] text-white border-3 border-white rounded-2xl w-full h-10 font-bold hover:bg-[#49757a]"
              onClick={() => setOpen(true)}
            >
              Setting
            </Button>
          </div>
        </div>

        {/* Chart Ketinggian Air */}
        <div className="grid grid-cols-1 pt-5">
          <Card>
            <CardHeader>
              <CardTitle>Chart Ketinggian Air</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartAir />
            </CardContent>
          </Card>
        </div>

        {/* Chart Kelembaban Tanah */}
        <div className="grid grid-cols-1 pt-5 pb-10">
          <Card>
            <CardHeader>
              <CardTitle>Chart Kelembaban Tanah</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartKelembaban />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal Popup Setting */}
      <ModalPopup open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-96">
          <h3 className="font-bold">Setting</h3>
          <br />
          <div className="flex items-center justify-between gap-2 text-left">
            <h5 className="w-40">Batas Ketinggian Air</h5>
            <Input
              className="flex-1"
              value={airValue}
              onChange={(e) => setAirValue(e.target.value)}
            />
          </div>
          <br />
          <div className="flex items-center justify-between gap-2 text-left">
            <h5 className="w-40">Batas Kelembaban Tanah</h5>
            <Input
              className="flex-1"
              value={tanahValue}
              onChange={(e) => setTanahValue(e.target.value)}
            />
          </div>
          <br />
          <div className="flex items-center gap-2 text-left">
            <h5 className="w-40">Drainase</h5>
            <Switch
              checked={statusDrainase ?? false}
              onCheckedChange={handleToggleDrainase}
            />
          </div>
          <br />
          <br />
          <div className="flex items-center gap-2 text-left justify-end">
            <Button onClick={() => setOpen(false)}>Batal</Button>
            <Button onClick={handleSave}>Simpan</Button>
          </div>
        </div>
      </ModalPopup>
    </div>
  );
}
