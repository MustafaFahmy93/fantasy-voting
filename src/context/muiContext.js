import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'



const initialNotify = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    msg: "Hello, welcome to Xtend.",
    type: "success"
}
const initialDialog = {
    open: false,

    title: "",
    content: ""
}
export const muiStore = create(
    persist(
        (set, get) => ({

            notify: initialNotify,
            setNotify: (data) => { set(() => ({ notify: { ...data } })) },
            dialog: initialDialog,
            setDialog: (data) => { set(() => ({ dialog: { ...data } })) },

            // updateAuth: (val) => set(() => ({ isLogin: val })),
            // updateName: (fullname) => set(state => ({ fullname: fullname })),
            // updateUid: (uid) => set(state => ({ uid: uid })),
            // updateEmail: (email) => set(state => ({ email: email })),
            // updatePassword: (password) => set(state => ({ password: password })),
            // updateEmailStatus: (val) => set(() => ({ emailVerified: val })),
            // updatePhotoURL: (url) => set(() => ({ photoURL: url })),
            // updatePhoneNumber: (phoneNumber) => set(() => ({ phoneNumber: phoneNumber })),
            // updateLastLoginAt: (time) => set(() => ({ lastLoginAt: new Date(time * 1000) })),


        }
        ), {
        name: 'xtend-mui-storage', // unique name
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        partialize: (state) => ({}),
    }
    )

)
