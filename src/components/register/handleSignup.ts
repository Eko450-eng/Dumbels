import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import error from '../../interfaces/error'
import userTemplate from '../../interfaces/userTemplate'

const number = (v:any) => v.match(/[0-9]/)
const letter = (v:any) => v.match(/[a-z]/)
const upperCaseLetter = (v:any) => v.match(/[A-Z]/)
const specialCharacter = (v:any) => v.match(/[$&+,:;=?@#|'<>.^*()%!-]/)
const length = (v:any) => v.length > 7

const userExists: error = {name: "userExists", message: "This user is already registered"}
const noMatch: error = {name:"noMatch", message: "Passwords dont match"}
const strength: error = {name:"strength", message: "Passwords dont meet strength requirement"}
const dafuq: error = {name: "error", message: "No idea what happened"}

const passwordStrengthRequirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

const handleSignup = async(password: string, pass: string, e:any) =>{
    let passCheck =
        (password === pass) &&
        number(password) &&
        letter(password) &&
        upperCaseLetter(password) &&
        specialCharacter(password) &&
        length(password)

        const userNameRef = doc(db, 'users', e.userName)
        const userNameSnap = await getDoc(userNameRef)

        const user: userTemplate = {
            userName: e.userName,
            firstName: e.firstName,
            lastName: e.lastName,
            age: e.age,
            gender: e.gender,
            email: e.email,
            activated: false
        }



        if(userNameSnap.exists()){
            throw userExists
        }else if(password !== pass){
            throw noMatch
        }else if(!passCheck){
            throw strength
        }else if(passCheck){
            return user
        }
    throw dafuq
}

export { handleSignup, passwordStrengthRequirements }
