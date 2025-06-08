import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "../../components/Navbar";
import '../globals.css';

export default function Page() {
    return (
        <div className="bg-[#205781] min-h-screen">
            <Navbar />
            <div className="flex justify-center min-h-screen">
                <Card className="my-20 w-[600px]">
                    <CardHeader className="text-center text-3xl font-bold">
                        Panduan
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Apa fungsi utama dari sistem ini?</AccordionTrigger>
                                <AccordionContent>
                                    Sistem ini berfungsi untuk memantau kelembaban tanah dan ketinggian air secara real-time, serta mengotomatisasi proses drainase air berdasarkan batasan (limit) yang ditentukan pengguna.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger>Bagaimana cara melihat data kelembaban tanah dan ketinggian air?</AccordionTrigger>
                                <AccordionContent>
                                    Kamu bisa melihat data sensor pada halaman Dashboard. Nilai kelembaban dan ketinggian air akan tampil secara langsung dan diperbarui secara berkala oleh sistem.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger>Apa arti dari nilai kelembaban tanah yang ditampilkan?</AccordionTrigger>
                                <AccordionContent>
                                    Nilai 0-30%: Tanah sangat kering, Nilai 31-60%: Tanah cukup lembab, Nilai 61-100%: Tanah terlalu basah, Nilai ini membantu menentukan kebutuhan air atau apakah perlu dilakukan drainase.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger>Bagaimana cara mengatur batas ketinggian air?</AccordionTrigger>
                                <AccordionContent>
                                    Tekan tombol setting pada dashboard, lalu masukkan nilai tinggi air maksimum (dalam %). Bila sensor mendeteksi air melebihi batas tersebut, sistem akan mengaktifkan drainase secara otomatis (jika mode otomatis aktif).
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5">
                                <AccordionTrigger>Bagaimana cara menyalakan atau mematikan drainase secara manual?</AccordionTrigger>
                                <AccordionContent>
                                    Masuk ke halaman Dashboard, lalu gunakan tombol ON atau OFF di bagian setting. Tombol ini hanya aktif jika mode manual sedang digunakan.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-6">
                                <AccordionTrigger>Bagaimana jika data sensor tidak muncul atau tidak akurat?</AccordionTrigger>
                                <AccordionContent>
                                    Pastikan perangkat IoT terhubung ke internet dan sensor dalam kondisi baik. Jika masih bermasalah: Cek daya listrik/baterai perangkat, Periksa kabel sensor, Restart perangkat atau refresh halaman web
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-7">
                                <AccordionTrigger>Apakah sistem ini bisa digunakan secara offline?</AccordionTrigger>
                                <AccordionContent>
                                    Tidak sepenuhnya. Sistem memerlukan koneksi internet untuk mengirim data dari perangkat IoT ke web. Namun, logika otomatisasi (jika menggunakan mikrokontroler seperti ESP32) bisa tetap berjalan secara lokal jika sudah terprogram.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
