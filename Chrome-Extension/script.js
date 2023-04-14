// Exchange Rate Extension

// document.addEventListener("DOMContentLoaded", () => {
const amountInput = document.getElementById("amount");
const currencyOption = document.getElementById("currency");
const convertBtn = document.getElementById("convert");
const result = document.getElementById("result");

// hide(remove it) apiKey before pushing code to github
const apiKey = "j7kfE+ZIJj+PdTwr5kROiQ==bGoPrt8IgsAqoTKH";
// const apiKey = "Your API Key";
const apiUrl = "https://api.api-ninjas.com/v1/exchangerate?pair=USD_";

convertBtn.addEventListener("click", () => {
  const amountTotal = amountInput.value;
  const currencyTotal = currencyOption.value;
  const url = apiUrl + currencyTotal;
  fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const rate = data.exchange_rate;
      const resultPrice = (amountTotal * rate).toFixed(2);
      result.innerHTML = `${amountTotal} USD = ${resultPrice} ${currencyTotal}`;
    })
    .catch((error) => {
      console.error("Request Failed: ", error);
      result.innerHTML = "An error occured please try again later";
    });
});
// });
//  "exchange rate for a given currency pair" refers to the value at which one currency can be exchanged for another currency in the foreign exchange (forex) market.
//  https://api-ninjas.com/api/exchangerate
//  Go to "chrome://extensions/"  -> Developer mode turn it on -> click 'Load UNpacked'

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Lead Tracker Extension
const inputEle = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const saveTabBtn = document.getElementById("save-tab-btn");
const uList = document.getElementById("ul-el");
let myLeads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// const tabs = [{ url: "https://www.linkedin.com/in/per-harald-borgen/" }];

// when save tab button gets hit, extension should head over to the address bar and grab the url
saveTabBtn.addEventListener("click", () => {
  // console.log(tabs[0].url);
  // Grab the url of the current tab

  // chrome.tab.query(
  //   {
  //     active: true,
  //     currentWindow: true,
  //   },
  //   function (tabs) {
  //     // since only 1 tab should be active and in the current window at once
  //     // the return variable should only have one entry
  //     let activeTab = tabs[0];
  //     let activeTabId = activeTab.id;
  //   }
  // );
  // hey chrome, i want to query some of your tabs
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      // since only 1 tab should be active and in the current window at once
      // the return variable should only have one entry

      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads);
    }
  );
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // uList.innerHTML += `<li>${myLeads[i]}</li>`;
    // alternative way
    // createElement -> textContent -> ul.append(li)
    // const li = document.createElement("li");
    // li.textContent = myLeads[i];
    // uList.append(li);

    listItems += `<li><a href="${leads[i]}" target="_blank" >${leads[i]}</a></li>`;
  }
  // rendering the li items inside the unordered list using ul.innerHTML
  uList.innerHTML = listItems;
}

// when double clicked, clear localStorage, myLeads, and DOM
deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", () => {
  myLeads.push(inputEle.value);
  inputEle.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

// icon -> sales representatives , this app bring in more dollars for their commission
// storing leads across page refresh

// 1. Save a key-value pair in localStorage
// 2. Refresh page. Get value and log it to console.
// 3. clear localStorage

// HINTS:
// localStorage.setItem(key,value)
// localStorage.getItem(key)
// localStorage.clear()
// PS: both key and value need to be strings

// How do i store arrays in localStorage (JSON.stringify and JSON.parse)

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// px to rem and rem to px
const pxUnits = document.getElementById("input-px-units");
const remUnits = document.getElementById("input-rem-units");
const remResult = document.getElementById("result-rem-units");
const pxResult = document.getElementById("result-px-units");

pxUnits.addEventListener("change", () => {
  pxResult.classList.remove("resultsSt");
  remResult.classList.add("resultsSt");
  remUnits.value = "";
  pxResult.textContent = "";
  const cal = (1 / 16) * pxUnits.value;
  remResult.textContent = `Output:   ${cal} rem`;
});

remUnits.addEventListener("change", () => {
  remResult.classList.remove("resultsSt");
  pxResult.classList.add("resultsSt");

  pxUnits.value = "";
  remResult.textContent = "";
  const cal = remUnits.value * 16;
  pxResult.textContent = `Output:   ${cal} px`;
});
