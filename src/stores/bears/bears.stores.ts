import { create } from 'zustand'

interface Bear {
    id:number;
    name: string;
}

interface BearState {
    blackBears: number;
    polarBears: number;
    pandaBears: number;

    bears: Bear[];

    increaseBlackBears: (by: number) => void;
    increasePandaBears: (by: number) => void;
    increasePolarBears: (by: number) => void;

    doNothing: () => void;

}



export const useBearStore = create<BearState>((set) => ({
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,

  bears: [{id:1, name: 'Oso #1'}],

 
  increaseBlackBears: (by: number) => set((state)=>({blackBears:state.blackBears + by})),
  increasePandaBears: (by: number) => set((state)=>({pandaBears:state.pandaBears + by})),
  increasePolarBears: (by: number) => set((state)=>({polarBears:state.polarBears + by})),


    doNothing: () => set(state => ({bears: [...state.bears]}))


}))
