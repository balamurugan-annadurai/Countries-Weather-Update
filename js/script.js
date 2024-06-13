/**************************start**************************/

//// fetching country data to display country details 
const fetchData = fetch("https://restcountries.com/v3.1/all");
var array;
const data = fetchData
.then(response =>response.json())
.then(data => {
     displayCountriesNames(data); // function to display country details
})
.catch((data)=>{
    errorMsg(data);  // function to display error if unable to fetch country details
});
//// fetching country data to display country details 

//// creating basic variables
const container = document.createElement("div");
container.setAttribute("class","container");
document.body.append(container);

var h1 = document.createElement("h1");
h1.textContent = "Countries Weather Update";
h1.setAttribute("class","text-center");
h1.setAttribute("id","title");
    container.append(h1);

var tempDisplay = document.createElement("div");
tempDisplay.setAttribute("class","col-6");
var icon = document.createElement("i");
const iconBtn = document.createElement("a");
icon.setAttribute("class","");
iconBtn.append(icon);
tempDisplay.append(iconBtn);

/////////////////////////////////////////////

//// Event to close temp display tab
var tempH1 = document.createElement('h1');
    document.body.addEventListener("mousedown",()=>{
    tempDisplay.removeAttribute("class","tempDisplay");
    document.body.style.overflow = "auto";
    tempH1.textContent = "";
})

const row = document.createElement("div");
row.setAttribute("class","row");
container.append(row);

//////////////////////////////////////

//// function to display countries
function displayCountriesNames(array){

    for(let i=0;i<array.length;i++){
       
        const col = document.createElement("div");
        col.setAttribute("class","col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-4");
        row.append(col);

        const card = document.createElement("div");
        card.setAttribute("class","card h-100  border-black");
        const img = document.createElement("img");
        img.setAttribute("src",array[i].flags.png);
        img.setAttribute("class","h-100 card img card-img-top  border-black");
        const cardBody = document.createElement("div");
        cardBody.setAttribute("class","card-body d-flex flex-column align-items-center");
        
        const cardText = document.createElement("div");
        cardText.setAttribute("class","card-text d-flex flex-column align-items-center mb-3");

        const capital = document.createElement("h5");
        capital.setAttribute("class"," card-body fw-bold ");
        capital.textContent = `Captial: ${array[i].capital}`;
        const btn = document.createElement("button");
        btn.setAttribute("class","btn btn-primary p-2");
        btn.setAttribute("id",array[i].capital)
        btn.textContent = "Click for weather";

        btn.addEventListener("click",(event)=>{
            const captialCity = event.srcElement.id;
            tempDisplay.setAttribute("class","tempDisplay");
            container.append(tempDisplay);
            showTempByClick(captialCity);
        }) 

        const region =document.createElement("p");
        region.setAttribute("class","fs-5 fw-bold  ");
        region.textContent = `Region: ${array[i].region}`; 
        
        const latLng = document.createElement("p");
        latLng.setAttribute("class","fb5 fw-bolder ");
        latLng.textContent = `LanLat: ${array[i].latlng}`;

        const nativeName = document.createElement("p");
        nativeName.textContent = `Native name: ${array[i].name.nativeName ? Object.values(array[i].name.nativeName)[0].common : "N/A"}`;
        nativeName.setAttribute("class","fw-bolder");

        const population = document.createElement("p");
        population.setAttribute("class","fs-5 fw-bold ");
        population.textContent = `Population: ${array[i].population.toLocaleString()}`;

        const countryCode = document.createElement("p");
        countryCode.setAttribute("class","fs-5 fw-bold ");
        countryCode.textContent = `Country Code: ${array[i].cca3}`;

        const cardHeader = document.createElement("div");
        cardHeader.setAttribute("class", "card-header bg-black text-white text-center fs-3");
        cardHeader.textContent =array[i].name.common;
        cardText.append(region,countryCode,latLng)
        cardBody.append(capital,cardText,btn);
        card.append(cardHeader,img,cardBody);

        
        col.append(card);
    }
}
///////////////////////////////////////////////

/// function to display error msg when countries details not able to fetch
function errorMsg(data){
    const container = document.createElement("div");
    container.setAttribute("class","container vh-100 d-flex justify-content-center align-items-center");
    document.body.append(container);
    const errorMsg = document.createElement("h1");
    errorMsg.textContent = `${data.message} - please try again later!`;
    h1.setAttribute("class","d-none")
    container.append(errorMsg);
}
////////////////////////////////////////////////


/// function to get countries temp
function showTempByClick(id){
      
       let captialCity = id;
       const apiKey = "ff4489edb69dfaec1eb032e4ed3bbce9";
       const weatherData = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${captialCity}&appid=${apiKey}&units=metric`);

       weatherData.then(res => res.json())
       .then(data => {
         displayTemp(data); // fucntion to display country temp
       })
       .catch(() => {
         tempH1.textContent =  `Please try again later 🙏`;
         tempH1.setAttribute("class","text-white text-center")
       });
    
}
////////////////////////////////////////

/// function to display country temp
function displayTemp(data){
    if(data.main.temp < 10){
        tempH1.textContent =  `${data.main.temp}°C 🥶`;
    }else if(data.main.temp < 20 && data.main.temp >= 10){
        tempH1.textContent =  `${data.main.temp}°C 🍃`;
    }
    else if(data.main.temp < 30 && data.main.temp >= 20){
        tempH1.textContent =  `${data.main.temp}°C 🌤️ `;
    } 
    else{
        tempH1.textContent =  `${data.main.temp}°C 🥵 `;
    }
    tempH1.setAttribute("class","text-center fs-1")
}
/////////////////////////////////////
tempDisplay.append(tempH1);

/**************************End**************************/








