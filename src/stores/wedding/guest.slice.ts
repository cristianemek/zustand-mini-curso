import { StateCreator } from "zustand";



export interface GuestSlice {
    guestCount: number;

    setGuesCount: (guestCount:number) => void
}

export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({

    guestCount: 0,


    setGuesCount: (guestCount:number) => set({
        guestCount: guestCount > 0 ? guestCount : 0
    })
})
