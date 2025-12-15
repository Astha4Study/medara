import { create } from 'zustand';

type ObatItem = {
    obat_id: number;
    nama_obat: string;
    jumlah: number;
    penggunaan_obat: string;
};

type ResepStore = {
    obat_list: ObatItem[];
    tambahObat: (item: ObatItem) => void;
    updateObat: (index: number, key: keyof ObatItem, value: any) => void;
    hapusObat: (index: number) => void;
    reset: () => void;
};

const initial: ObatItem[] = [];

export const useResepStore = create<ResepStore>((set) => ({
    obat_list: initial,
    tambahObat: (item) =>
        set((state) => ({ obat_list: [...state.obat_list, item] })),
    updateObat: (index, key, value) =>
        set((state) => ({
            obat_list: state.obat_list.map((o, i) =>
                i === index ? { ...o, [key]: value } : o,
            ),
        })),
    hapusObat: (index) =>
        set((state) => ({
            obat_list: state.obat_list.filter((_, i) => i !== index),
        })),
    reset: () => set({ obat_list: initial }),
}));
