import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, get,} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

import {firebaseConfig} from "../firebase.js"


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const user = auth.currentUser;


function headerFuncionality(userID) {
    creatingUserHello(userID);
    creatingLogoutBtn(); 
}


const creatingLogoutBtn = ()=> {
    const logoutBtnContainer = document.querySelector('.logoutBtnContainer');
    logoutBtnContainer.innerHTML = `<i class="fa-solid fa-right-from-bracket logoutBtn"></i>`;
    const carouselContainer = document.querySelector('.carousel-container');

    const logOutBtnFunction = (e) => {
      e.preventDefault();
      
      signOut(auth)
        .then(() => {
         
          carouselContainer.style.display = 'block';
          console.log("Signed out");
        })
        .catch((error) => {
       
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    };

    const logOutBtn = document.querySelector(".logoutBtn");
    logOutBtn.addEventListener('click', logOutBtnFunction);
};


const creatingUserHello = (userID)=> {
    const userHello = document.querySelector('.userHello');
    
    get(ref(database, 'Users/' + userID)).then((userSnapshot) => {
        const userData = userSnapshot.val();
        let userName = userData.email.replace(/@.*$/, "");
        let userRole = userData.role.replace("_", " ")
        userHello.innerHTML = `
        <p>Hello ${userName}!</p>
        <p>role: ${userRole}.</p>`
    });
}

export { headerFuncionality }