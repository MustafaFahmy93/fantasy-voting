import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'



export const appStore = create(
    persist(
        (set, get) => ({
            uid: false,
            updateUid: (uid) => {
                set(() => ({ uid: uid }))
            },

        }
        ), {
        name: 'xtend-players-storage', // unique name
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        // partialize: (state) => ({}),
        partialize: (state) => ({ playersData: state.playersData }),
    }
    )

)
