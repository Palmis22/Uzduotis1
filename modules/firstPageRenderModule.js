import { creatingRegForm } from "./regFormModule.js";

function firstPageRender() {
    const headerContainer = document.querySelector('.headerContainer');
    headerContainer.style.display = 'none';
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.innerHTML = `


    <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
  <div class="carousel-inner">
  
    <div class="carousel-item active">
      <img class="img2" src="./images/img1.jpg" class="d-block w-100 " alt="img1">
      <div class="carousel-caption">
                            <h3>Events site</h3>
                        </div>
    </div>
    <div class="carousel-item">
      <img class="img2" src="./images/img2.jpg" class="d-block w-100 " alt="img2">
      <div class="carousel-caption">
      <h3>Events site</h3>
  </div>
    </div>
    <div class="carousel-item">
      <img class="img2" src="./images/img3.jpg" class="d-block w-100" alt="img3">
      <div class="carousel-caption">
      <h3>Events site</h3>
  </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  
</div>

    
    <div class="d-flex justify-content-center">
        <button class="btn btn-primary firstEntryBtn">Enter</button>
    </div>`

    const firstEntryBtn = document.querySelector('.firstEntryBtn');
    firstEntryBtn.addEventListener('click', () => {
        carouselContainer.style.display = 'none';
        headerContainer.style.display = 'block';
        creatingRegForm();
    })
}

export { firstPageRender }