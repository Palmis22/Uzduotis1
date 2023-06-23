import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, remove, get, set, update } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, deleteUser} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";


import { firebaseConfig } from "../firebase.js";
import { universalModalFunctionality } from "./universalModalModule.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

let userNr = 0;

function userTableHeader() {
  const userTableContainer = document.querySelector('.userTableContainer');

  userTableContainer.innerHTML = `
            <div class="container table-container my-2 card">
              
                  <h2>Registered users:</h2>
                  <table class="table table-hover table-dark user-table">
                      <thead>
                          <th class="text-center">User number</th>
                          <th class="text-center">User email</th>
                          <th class="text-center user-role">User role</th>
                          <th class="text-center user-date">Date registered</th>
                          
                      </thead>
                      <tbody class="tbody1"></tbody>
                  </table>
                
            </div>`
};

function AddItemToTable(email, role, date, key, banStatus) {

  const userMaintable = document.querySelector('.user-table');

  const tbody1 = document.querySelector('.tbody1');
  let trow = document.createElement('tr');
  trow.setAttribute('data-id', key)

  let td1 = document.createElement('td');
  td1.classList.add('text-center');

  let td2 = document.createElement('td');
  td2.classList.add('text-center');
  let td3 = document.createElement('td');
  td3.classList.add('text-center', 'user-role');
  let td4 = document.createElement('td');
  td4.classList.add('text-center', 'user-date');
  

  let td6 = document.createElement('td');
  td6.classList.add('bannedOrNo', 'd-flex', 'justify-content-center', 'align-items-center');

  td1.innerHTML = ++userNr;
  td2.innerHTML = email;
  td3.innerHTML = role;
  td4.innerHTML = date;
  
  if (banStatus) {
    td6.innerHTML = `<button class="btn btn-primary userUnblockBtn">Press to UnBlock</button>`
  } else {
    td6.innerHTML = `<button class="btn btn-primary userBlockBtn">Press to Block</button>`
  }
  

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td6);

  tbody1.appendChild(trow);

  userMaintable.appendChild(tbody1);
};

function AddAllItemsToTable(User) {

  userNr = 0;

  for (let i in User) {
    if (User[i].role !== 'admin') {
      AddItemToTable(User[i].email, User[i].role, User[i].timestamp, i, User[i].banStatus);
    }
  }
};


function banUserBtnsFunctionality() {
  const banUserBtns = document.querySelectorAll('.bannedOrNo');
  banUserBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      
      const userUniqID = btn.parentElement.getAttribute('data-id');
      
      get(ref(database, 'Users/' + userUniqID)).then((snapshot) => {
        const userData = snapshot.val();
        
        if (userData.banStatus === false) {
          update(ref(database, 'Users/' + userUniqID), {
            banStatus: true
          })
            .then(() => {
              btn.innerHTML = `<button class="btn btn-primary userUnblockBtn">Press to Unblock</button>`;
              universalModalFunctionality('This user was blocked');
            })
            .catch((error) => {
              console.log(error);
            })
        } else {
          update(ref(database, 'Users/' + userUniqID), {
            banStatus: false
          })
            .then(() => {
              btn.innerHTML = `<button class="btn btn-primary userBlockBtn">Press to Block</button>`;
              universalModalFunctionality('This user was Unblocked');
            })
            .catch((error) => {
              console.log(error);
            })
        }
      })
    })
  })
}


function userTable() {
  get(ref(database, 'Users/')).then((snapshot) => {
    const userData = snapshot.val();
    userTableHeader();
    AddAllItemsToTable(userData);
    banUserBtnsFunctionality()
  });
};

export { userTable }