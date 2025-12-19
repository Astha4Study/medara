import { create } from 'zustand';

type Obat = {
    obat_id: number;
    nama_obat: string;
    jumlah: number;
    satuan: string;
    harga: number;
    penggunaan_obat: string;
    subtotal?: number;
};

type ResepState = {
    obatList: Obat[];
    tambahObat: (obat: Obat) => void;
    reset: () => void;
    totalHarga: () => number;
};

export const useResepStore = create<ResepState>((set, get) => ({
    obatList: [],
    tambahObat: (obat) =>
        set((state) => ({
            obatList: [
                ...state.obatList,
                { ...obat, subtotal: obat.jumlah * obat.harga },
            ],
        })),
    reset: () => set({ obatList: [] }),
    totalHarga: () =>
        get().obatList.reduce((acc, curr) => acc + (curr.subtotal ?? 0), 0),
}));
