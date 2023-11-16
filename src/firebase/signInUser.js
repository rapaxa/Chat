import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "./firebase";
export function signInUser(email, password) {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                resolve(user); // Разрешаем обещание с результатом
            })
            .catch(error =>{
                console.log('errrrrror')
            })
    });
}