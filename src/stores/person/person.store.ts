import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { firebaseStorage } from "../../storages/session.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirtsName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState& Actions> =
(set) =>({
    firstName: '',
    lastName: '',

    setFirtsName: (value:string) => set(state => ({firstName: value})),
    setLastName: (value:string) => set(state => ({lastName: value})),
});




export const usePersonStore = create<PersonState&Actions>()(
    persist(
        storeApi
    ,{ name:'person-storage',
        // storage: customSessionStorage
        storage:firebaseStorage
    })


);
