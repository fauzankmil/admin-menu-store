import { create } from 'zustand'

interface useStroreModalStore {
    isOpen: boolean;
    onOpen: () => void
    onClose: () => void
}

export const useStoreModal = create<useStroreModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}
))