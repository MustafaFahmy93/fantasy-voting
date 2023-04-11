import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'



export const appStore = create(
    persist(
        (set, get) => ({
            uid: false,
            updateUid: (uid) => {
                set(() => ({ uid: uid }))
            },
            isLoading: true,
            updateIsLoading: (val) => {
                set(() => ({ isLoading: val }))
            },

        }
        ), {
        name: 'xtend-app-storage', // unique name
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        // partialize: (state) => ({}),
        partialize: (state) => ({ isLoding: state.isLoading }),
    }
    )

)
