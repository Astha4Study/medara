import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CatatanForm = {
    antrian_id: number;
    pemeriksaan_fisik_id: number;
    pasien_id: number;
    klinik_id: number;
    keluhan_utama: string;
    detail_keluhan: string;
    diagnosa: string;
    tindakan: string;
    catatan_lain: string;
};

type PersistedSlice = { data: CatatanForm };
type TransientSlice = {
    processing: boolean;
    errors: Record<string, string>;
    setProcessing: (v: boolean) => void;
    setErrors: (e: Record<string, string>) => void;
};
type Actions = {
    setData: <K extends keyof CatatanForm>(
        key: K,
        value: CatatanForm[K],
    ) => void;
    reset: () => void;
};

type Store = PersistedSlice & TransientSlice & Actions;

const initial: CatatanForm = {
    antrian_id: 0,
    pemeriksaan_fisik_id: 0,
    pasien_id: 0,
    klinik_id: 0,
    keluhan_utama: '',
    detail_keluhan: '',
    diagnosa: '',
    tindakan: '',
    catatan_lain: '',
};

export const useCatatanLayananStore = create<Store>()(
    persist(
        (set) => ({
            data: { ...initial },
            processing: false,
            errors: {},
            setData: (key, value) =>
                set((state) => ({ data: { ...state.data, [key]: value } })),
            setProcessing: (val) => set({ processing: val }),
            setErrors: (errs) => set({ errors: errs }),
            reset: () =>
                set({ data: { ...initial }, processing: false, errors: {} }),
        }),
        {
            name: 'catatan-layanan',
            partialize: (state) => ({ data: state.data }),
        },
    ),
);
