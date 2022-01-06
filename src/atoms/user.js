import { atom } from 'recoil'

export const userAtom = atom({
  key: 'user',
  default: {}
})

// const authAtom = atom({
//     key: 'auth',
//     // get initial state from local storage to enable user to stay logged in
//     default: JSON.parse(localStorage.getItem('user'))
// });

// export { authAtom };