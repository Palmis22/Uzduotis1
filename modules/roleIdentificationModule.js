import {initializeApp} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {getDatabase, ref, get} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

import {firebaseConfig} from "../firebase.js"



const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


function getuseruid() {
    
    let user = auth.currentUser
    return user.uid
}


function userRoleIdentifikcation() {
    
    const userRole = get(ref(database, 'Users/' + getuseruid())).then((snapshot) => {
        return snapshot.val().role;
    })
    .catch((error) => {
        console.log(error)
    })

    return userRole
}

export {userRoleIdentifikcation}