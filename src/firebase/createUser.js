import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "./firebase";


export function createUser(email, password, name) {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return updateProfile(user, {displayName: name})
                    .then(() => {
                        resolve(user);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
}

