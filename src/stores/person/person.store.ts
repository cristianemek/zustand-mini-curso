import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../../storages/session.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirtsName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState& Actions, [["zustand/devtools", never]]> =
(set) =>({
    firstName: '',
    lastName: '',

    setFirtsName: (value:string) => set( ({firstName: value}),false,'setFirstName'),
    setLastName: (value:string) => set(({lastName: value}),false,'setLastName'),
});




export const usePersonStore = create<PersonState&Actions>()(
  devtools(
    persist(
        storeApi
    ,{ name:'person-storage',
        // storage: customSessionStorage
        // storage:firebaseStorage
    })
  )
);
