"use client";

import { useState, useEffect } from "react";
import ChartAir from "./ChartAir";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChartKelembaban from "./ChartKelembaban";
import '../globals.css';
import { Switch } from "@/components/ui/switch";
import ModalPopup from "./ModalPopup";
import { Input } from "@/components/ui/input";
import Navbar from "../../components/Navbar";

export default function Page() {
  const [open, setOpen] = useState(false);
    const [ketinggianTerbaru, setKetinggianTerbaru] = useState(null);
    const [kelembabanTerbaru, setKelembabanTerbaru] = useState(null);
    const [statusDrainase, setStatusDrainase] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/ketinggian-air")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          // Ambil data terakhir (paling baru)
          const latest = data[0];
          setKetinggianTerbaru(latest.nilai);
        }
      })
      .catch(err => {
        console.error("Gagal fetch data ketinggian air:", err);
      });

      fetch("http://localhost:3001/api/kelembaban-tanah")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setKelembabanTerbaru(data[0].nilai);
        }
      })
      .catch(err => {
        console.error("Gagal fetch data kelembaban tanah:", err);
      });

      fetch("http://localhost:3001/api/status-drainase")
  .then(res => res.json())
  .then(data => {
    if (data && typeof data.status_drainase !== "undefined") {
      setStatusDrainase(data.status_drainase);
    }
  })
  .catch(err => {
    console.error("Gagal fetch data status drainase:", err);
  });

  }, []);

  return (
    <div className="min-h-screen bg-slate-200 px-4">
      <Navbar />
      <div>
        {/* card buat data realtime */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-5">
            <Card>
              <CardHeader>
                <CardTitle>Ketinggian Air</CardTitle>
              </CardHeader>
              <CardContent className="font-bold">
                {/* Tampilkan data terbaru, atau default kalau belum load */}
                {ketinggianTerbaru !== null ? `${ketinggianTerbaru}%` : 'Loading...'}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kelembaban Tanah</CardTitle>
              </CardHeader>
              <CardContent className="font-bold">
                {kelembabanTerbaru !== null ? `${kelembabanTerbaru}%` : 'Loading...'}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Drainase</CardTitle>
              </CardHeader>
              <CardContent className="font-bold">
                {statusDrainase === null ? "Loading..." : (statusDrainase ? "On" : "Off")}
              </CardContent>
            </Card>

            <Button className="bg-slate-900 w-36 h-12 font-bold" onClick={() => setOpen(true)}>Setting</Button>
            <ModalPopup open={open} onClose={() => setOpen(false)}>
                        <div className="text-center w-96">
                            <h3 className="font-bold">Setting</h3>
                            <br></br>
                            <div className="flex items-center justify-between gap-2 text-left">
                                <h5 className="w-40">Batas Ketinggian Air</h5>
                                <Input className="flex-1" />
                            </div>
                            <br></br>
                            <div className="flex items-center justify-between gap-2 text-left">
                                <h5 className="w-40">Batas Kelembaban Tanah</h5>
                                <Input className="flex-1" />
                            </div>
                            <br></br>
                            <div className="flex items-center gap-2 text-left">
                                <h5 className="w-40">Drainase</h5>
                                <Switch checked={statusDrainase ?? false} onCheckedChange={(value) => setStatusDrainase(value)}/>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="flex items-center gap-2 text-left justify-end">
                                <Button onClick={() => setOpen(false)}>Batal</Button>
                                <Button>Simpan</Button>
                            </div>
                        </div>
                    </ModalPopup>
          </div>
        </div>

        {/* bagian chart */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-1 pt-5">
            <Card>
              <CardHeader>
                <CardTitle>Chart Ketinggian Air</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartAir />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 pt-5 pb-10">
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
        {/* bagian chart */}
      </div>
    </div>
  )
}
