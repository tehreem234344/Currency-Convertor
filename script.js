const BASE_URL="https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".form select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load",()=>{
    UpdateExchangeRates();
})

for ( let select of dropdowns){
    for ( let Currcode in countryList){
    let newoptions= document.createElement("option");
    newoptions.innerText=Currcode;
    newoptions.value=Currcode;
    if (select.name === "from" && Currcode === "USD"){
        newoptions.selected= "selected";
    } else   if (select.name === "to" && Currcode === "PKR"){
        newoptions.selected= "selected";
    }
    select.append(newoptions);
}
select.addEventListener("change",(evt)=>{
    UpdateFlag(evt.target);
});
}

const UpdateFlag = (element)=>{
    let Currcode =element.value;
    let countryCode =countryList[Currcode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newsrc;
}

btn.addEventListener("click",  (evt)=>{
    evt.preventDefault();
    UpdateExchangeRates();
})
const UpdateExchangeRates =  async ()=>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
   if(amtval === "" || amtval < 1 ){
    amtval=1;
    amount.value="1";
   }
 

    const URL = `${BASE_URL}?amount=${amtval}&from=${fromCurr.value}&to=${toCurr.value}`;
   let response = await fetch(URL);
   let data =  await response.json();
  let rate = data.rates[toCurr.value];
     let finalamount = amtval * rate;
     msg.innerText =`${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`
}