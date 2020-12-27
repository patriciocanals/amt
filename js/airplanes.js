//Var
const edSelect = document.querySelector('#economy-demand');
const bdSelect = document.querySelector('#bussines-demand');
const fdSelect = document.querySelector('#first-demand');
const cdSelect = document.querySelector('#cargo-demand');
const catdSelect = document.querySelector('#category-demand');
const rangedSelect = document.querySelector('#range-demand');
const taSelect = document.querySelector('#ta-time');
const btnSubmit = document.querySelector('#submit');
const btnReset = document.querySelector('#reset');
const form = document.querySelector('#form');
const divResult = document.querySelector('#result');
const chkbox = document.querySelector('#ta-checkbox');

//EventListeners
form.addEventListener('submit',calculate);
form.addEventListener('reset',blank)

//Functions
function calculate(e){
    e.preventDefault();
    getOffer();
}
function blank(e){
    e.preventDefault();
    prevCheck();
    edSelect.value = '';
    bdSelect.value = '';
    fdSelect.value = '';
    cdSelect.value = '';
    catdSelect.value = '';
    rangedSelect.value = '';
    taSelect.value = '';
}
function getOffer(){
    let fq;
    if(chkbox.checked){
        fq = parseFloat(taSelect.value);
    } else {
       fq = Math.floor(24 / parseFloat(taSelect.value));
    };
    let eo = Math.ceil((parseInt(edSelect.value) / 2) / fq);
    let bo = Math.ceil((parseInt(bdSelect.value) / 2) / fq);
    let fo = Math.ceil((parseInt(fdSelect.value) / 2) / fq);
    let co = Math.ceil((parseInt(cdSelect.value) / 2) / fq);
    let catd = parseInt(catdSelect.value);
    let ranged = parseInt(rangedSelect.value);
    let total = eo + 2*bo + 4*fo;
    showResults(fq,eo,bo,fo,co,total,catd,ranged);
    filterAirplanes(total,catd,ranged);
}
function showResults(fq,eo,bo,fo,co,total,catd,ranged){
    prevCheck();
    let divOffer = document.createElement('div');
    divOffer.classList.add("card", "text-white", "bg-success", "mb-3","p-2","text-center","sticky-top");
    divOffer.innerHTML = `
    <h3>CONFIG</h3>
    <p>${eo}/${bo}/${fo}/${co}</p>
    <p>${total} total pax - ${fq} per day - ${ranged}km - CAT:${catd}<p>
    `;
    divResult.appendChild(divOffer);
}
function filterAirplanes(total,catd,ranged){
    
    airplanes.forEach(element => {
        airplanes.sort((a,b) => {
            return a.pax - b.pax;
        });
        if(element.cat <= catd && element.range >= ranged && element.pax >= total){
        console.log(element);
        let divCard = document.createElement('div');
        divCard.classList.add("card","mb-3","text-white","bg-dark");
        divCard.innerHTML = `
        <img src="../img/${element.img}" class="card-img" alt="${element.model}">
        <div class="card-img-overlay">
            <h5 class="card-title">${element.brand} ${element.model}</h5>
            <p class="card-text">CAT: ${element.cat} PAX: ${element.pax}</p>
            <p class="card-text">Range: ${element.range}km Price: $${element.price}</p>
        </div>
        `;
        divResult.appendChild(divCard);
        }
    });
}
function prevCheck(){
    while (divResult.hasChildNodes()) {  
        divResult.removeChild(divResult.firstChild);
      }
};