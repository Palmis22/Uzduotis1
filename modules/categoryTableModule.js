import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, set, ref, remove, get } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

import { firebaseConfig } from "../firebase.js";
import { universalModalFunctionality } from "./universalModalModule.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();




let catNo = 0;

function categoryTableHeader() {

  const categoryContainer = document.querySelector('.categoryContainer');
  categoryContainer.innerHTML = `
          <div class="container table-container my-2 card">
          <h2>Categories:</h2>
          <table class="table table-bordered table-hover category-table">
              <thead>
                  <th class="text-center">Category number</th>
                  <th class="d-flex flex-row categories-input-container">
                    <input type="text" class="form-control category-input" id="search-name" placeholder="Enter category">
                    <button class="btn btn-primary enterCategoryBtn">Add</button>
                  </th>
              </thead>
              <tbody class="tbody2"></tbody>
          </table>
          </div>`
}



function AddCategoryToTable(category, key) {

  const categoryTable = document.querySelector('.category-table');

  const tbody2 = document.querySelector('.tbody2');
  let trow = document.createElement('tr');
  trow.setAttribute('data-id', key);


  let td1 = document.createElement('td');
  td1.classList.add('text-center');

  let td2 = document.createElement('td');
  td2.classList.add('text-center');

  let td5 = document.createElement('td');
  td5.classList.add('d-flex', 'justify-content-center', 'align-items-center')


  td1.innerHTML = ++catNo;
  td2.innerHTML = category;
  td5.innerHTML = `<button class="btn btn-primary delCategoryBtn">Delete</button>`

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td5);

  tbody2.appendChild(trow);
  categoryTable.appendChild(tbody2);

}

function AddAllItemsToCategoryTable(categories) {
  catNo = 0;

  for (let i in categories) {
    AddCategoryToTable(categories[i].category, i);
  }
}

function addCategoryBtnFunction() {
  const categoryInput = document.querySelector('.category-input').value;

  if (categoryInput.length < 5) {
    universalModalFunctionality('Name must be atleast 5 symbols');
  } else {
    set(ref(database, 'categories/' + categoryInput), {
      category: categoryInput
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        alert(error)
      })
  }
}


function delCategoryBtnsFunction() {
  const delCategoryBtns = document.querySelectorAll('.delCategoryBtn');
  delCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const uniqueBtnID = btn.parentElement.parentElement.getAttribute('data-id');
      console.log(uniqueBtnID)
      get(ref(database, `categories/${uniqueBtnID}`)).then((snapshot) => {
        if (snapshot.exists()) {
          remove(ref(database, `categories/${uniqueBtnID}`))
            .then(() => {
             
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("No data available")
        }
      })
    })
  })
}

function categoryTable() {

  get(ref(database, 'categories/')).then((snapshot) => {
    const userData = snapshot.val();

    categoryTableHeader();
    AddAllItemsToCategoryTable(userData);

    const categoryBtn = document.querySelector('.enterCategoryBtn');

  
    categoryBtn.addEventListener('click', addCategoryBtnFunction)
    delCategoryBtnsFunction();
  });
}

export { categoryTable }