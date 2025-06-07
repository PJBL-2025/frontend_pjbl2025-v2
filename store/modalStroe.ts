import { create } from "zustand";

type ModalState = {
    modal: boolean
    toggleModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
    modal: false,
    toggleModal: () => set((state) => ({modal: !state.modal}))
}))