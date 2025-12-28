import FilterKlinikAside from './filter-klinik-aside';
import KlinikListAside from './klinik-list-aside';

const KlinikSection = () => {
    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-10">
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_1fr]">
                <FilterKlinikAside />
                <KlinikListAside />
            </div>
        </section>
    );
};

export default KlinikSection;
