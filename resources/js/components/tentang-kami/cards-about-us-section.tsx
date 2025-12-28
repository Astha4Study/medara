const CardsAboutUsSection = () => {
    const cards = [
        {
            title: 'Dipercaya Sejak 2018',
            subtitle: 'Fokus pada digitalisasi layanan klinik',
        },
        {
            title: '500+ Klinik Terdaftar',
            subtitle: 'Jangkauan luas di seluruh Indonesia',
        },
        {
            title: 'Kepuasan Mitra 97%',
            subtitle: 'Layanan stabil, dukungan responsif',
        },
    ];

    return (
        <section className="w-full px-6 pt-6 pb-14 md:px-12 lg:px-20">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-2 rounded-2xl border p-3 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, index) => (
                    <div className="">
                        <div
                            key={index}
                            className="rounded-xl border border-gray-200 bg-white p-4"
                        >
                            <h3 className="text-xl font-semibold text-gray-900">
                                {card.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600">
                                {card.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CardsAboutUsSection;
