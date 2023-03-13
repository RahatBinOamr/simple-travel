var carObject = {
  vehicle: "Car",
  imageUrl:
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",

  farePerKilo: 3,
  capacity: 4,
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?",
};

var boatObject = {
  vehicle: "Boat",
  imageUrl:
    "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9hdHxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",

  farePerKilo: 3,
  capacity: 4,
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?",
};
var bikeObject = {
  vehicle: "Bike",
  imageUrl:
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmlrZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",

  farePerKilo: 2,

  capacity: 2,

  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?",
};
// farePerKilo -> per kilometer cost for hiring the vehicle

var busObject = {
  vehicle: "Bus",
  imageUrl:
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",

  farePerKilo: 3,
  capacity: 30,
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eligendi veritatis expedita, dicta aut eum itaque ut tempora alias laudantium?",
};

const servicesArray = [boatObject, bikeObject, carObject, busObject];

function displayServices(service) {
  // step1 : access the main section by id
  // step2 : create a div element
  // step3: create innerHTML of the avobe div dinamically with service
  // step: append the div to main section

  const mainSection = document.getElementById("main-section");
  const stringifiedObj = JSON.stringify(service);
  const div = document.createElement("div");

  div.innerHTML = `
     <div class="card mt-3  mx-auto" style="max-width: 800px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src=${service.imageUrl} class="img-fluid rounded-start h-100" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Transport Mood ${service.vehicle}</h5>
                <p class="card-text">${service.description}</p>
                <p class="card-text"><small class="text-muted">Fare per kilo ${service.farePerKilo}</small> <small class="text-muted">Capacity ${service.capacity}</small></p>
                <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick='handleBooking(${stringifiedObj})' data-bs-target="#exampleModal">
                see details
          </button>
              </div>
            </div>
          </div>
  </div>
  `;

  mainSection.appendChild(div);
}
function displayAllArticles(arr) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    displayServices(element);
  }
}

displayAllArticles(servicesArray);

function handleBooking(obj) {
  const modalBody = document.getElementById("modal-body");

  const stringifiedObj = JSON.stringify(obj);

  modalBody.innerHTML = `
    
    <div class="card mx-auto" style="width: 18rem;">
  <img src=${obj.imageUrl} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Vehicle Mood : ${obj.vehicle}</h5>
    <p class="card-text">${obj.description}</p>
    <p class="card-text"><small class="text-muted">Fare per kilo ${obj.farePerKilo}</small> <small class="text-muted">Capacity ${obj.capacity}</small></p>
    <div class="d-flex flex-column" role="search">
     <p>Fare: <small class="text-muted" id="fare"></small > </p>
     <p>tax: <small class="text-muted" id="tax"></small > </p>
     <p>Total-cost: <small class="text-muted" id="totalCost"></small > </p>
    <input class="form-control m-2" id= "distance-input"  type="number" placeholder="Koto kilo jaba?" aria-label="Search"/>
    <input class="form-control m-2" type="number" id= "quantity-input" placeholder="koita gari lagbe?" aria-label="Search"/>
    <button class="btn btn-outline-success" id="search-btn" aria-label="type="submit" onclick='calculateCost(${stringifiedObj})'>submit</button>
  </div>
  </div>
</div>
    
    `;
}

function calculateCost(obj) {
  // console.log(obj);
  const quantity = document.getElementById("quantity-input").value;
  const distance = document.getElementById("distance-input").value;

  const fareDiv = document.getElementById("fare");
  const fare  = (quantity * distance * obj.farePerKilo);
  fareDiv.innerHTML =fare  ;
  console.log(typeof fare);


  const taxDiv = document.getElementById("tax");
  const tax= parseFloat((fare*.05).toFixed(2));

  taxDiv.innerHTML=tax;
  console.log(typeof tax);

const totalDiv = document.getElementById("totalCost");
const totalCost = parseFloat((fare + tax).toFixed(2));
console.log(typeof totalCost);
totalDiv.innerHTML=totalCost; 

}


document.getElementById("search-btn").addEventListener("click", function(){
  const  value = document.getElementById("search-value").value;
  
  for (let i = 0; i < servicesArray.length; i++) {
      const element = servicesArray[i];
      if(value.toLowerCase() == element.vehicle.toLowerCase()){
              document.getElementById("main-section").innerHTML=""
              displayServices(element)
              return;
      }
      
  }
  
  alert("nothing found with your input")
  
  
  })
