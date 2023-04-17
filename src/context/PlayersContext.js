import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { getAllPlayers } from '../db/db';


export const playersStore = create(
    persist(
        (set, get) => ({
            playersData: [],
            updatePlayersData: (uid) => {
                getAllPlayers(uid).then((players) => {
                    set(() => ({ playersData: players }))
                }).catch((error) => console.error(error));
            },

        }
        ), {
        name: 'xtend-players-store', // unique name
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        // partialize: (state) => ({}),
        // partialize: (state) => ({ playersData: state.playersData }),
    }
    )

)
