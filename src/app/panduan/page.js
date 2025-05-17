import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navbar from "../../components/Navbar";
import '../globals.css';

export default function Page() {
    return (
        <div className="bg-slate-200 min-h-screen">
            <Navbar />
            <div className="flex justify-center min-h-screen">
                <Card className="my-20 w-200">
                    <CardHeader className="text-center text-3xl font-bold">
                        Panduan
                    </CardHeader>
                    <CardContent>
                        Pertanyaan 1
                    </CardContent>
                    <CardContent>
                        Pertanyaan 2
                    </CardContent>
                    <CardContent>
                        Pertanyaan 3
                    </CardContent>
                    <CardContent>
                        Pertanyaan 4
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}