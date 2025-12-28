import illustration from '@/assets/image/for-clinic-illustration.jpg';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const ForClinicSection = () => {
    return (
        <section className="flex justify-center bg-white px-6 py-14 md:px-12 lg:px-20">
            <div className="mx-auto w-full max-w-7xl">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <div>
                            {/* Header */}
                            <span className="mb-3 inline-block rounded-full border border-emerald-600 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-700 shadow-sm">
                                Untuk Klinik
                            </span>

                            <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
                                Mengapa Klinik Memilih Kinara?
                            </h2>

                            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600">
                                Kinara membantu klinik mengelola antrean, jadwal
                                layanan, dan data pasien secara terpusat agar
                                operasional lebih efisien, rapi, dan
                                profesional.
                            </p>
                        </div>

                        {/* Accordion */}
                        <Accordion
                            type="single"
                            collapsible
                            className="mt-6 w-full"
                        >
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Manajemen Antrean Lebih Tertata
                                </AccordionTrigger>
                                <AccordionContent>
                                    Pasien datang sesuai jadwal booking sehingga
                                    antrean lebih rapi, waktu tunggu berkurang,
                                    dan alur layanan lebih terkendali.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    Jadwal Dokter & Layanan Terintegrasi
                                </AccordionTrigger>
                                <AccordionContent>
                                    Jadwal dokter, layanan, dan ketersediaan
                                    dikelola dalam satu sistem untuk menghindari
                                    bentrok dan kesalahan pencatatan.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    Data Layanan Tersimpan Aman
                                </AccordionTrigger>
                                <AccordionContent>
                                    Seluruh riwayat layanan pasien tersimpan
                                    secara digital dan dapat diakses sesuai
                                    peran tanpa risiko kehilangan data manual.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                    Pengalaman Pasien Lebih Baik
                                </AccordionTrigger>
                                <AccordionContent>
                                    Proses yang cepat dan transparan
                                    meningkatkan kepuasan pasien serta
                                    kepercayaan terhadap klinik.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Right: Illustration */}
                    <div className="flex items-center justify-center self-start">
                        <img
                            src={illustration}
                            alt="Ilustrasi sistem klinik Kinara"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForClinicSection;
