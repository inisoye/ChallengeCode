/*
 * ✅ Use the Coinlore API (Coins)
 *    https://www.coinlore.com/cryptocurrency-data-api
 *
 *    Get 10 coins per "page"
 */

//* added to control data changes when nav-buttons are clicked

let tableBody = document.querySelector("tbody");

let nextButton = document.querySelector("button.next");
let previousButton = document.querySelector("button.previous");

let loopStart = 11;
let loopEnd = 21;

fetch("https://api.coinlore.com/api/tickers/")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let dataArray = data.data;

    for (i = 0; i < 100; i++) {
      let newRow = document.createElement("tr");
      newRow.innerHTML = `<td>${dataArray[i].name}</td>
                          <td>${dataArray[i].symbol}</td>
                          <td>$ ${dataArray[i].price_usd}</td>
                          <td>${dataArray[i].tsupply} ${dataArray[i].symbol}</td>`;

      tableBody.appendChild(newRow);
    }

    //*get all rows
    let tableRows = document.querySelectorAll("tr");

    //* display only first ten by default (hides others)
    for (i = 11; i < tableRows.length; i++) {
      tableRows[i].classList.add("hide-row");
    }

    //* create function that hides all
    function hideAllRows() {
      for (i = 1; i < tableRows.length; i++) {
        tableRows[i].classList.add("hide-row");
      }
    }

    nextButton.addEventListener("click", function() {
      previousButton.style.visibility = "visible";

      hideAllRows();

      //* increment loop limits to control data been shown
      if (loopEnd <= 101) {
        loopStart += 10;
        loopEnd += 10;
      }

      for (i = loopStart; i < loopEnd; i++) {
        tableRows[i].classList.remove("hide-row");
      }

      //* hide nav buttons at limits
      if (loopEnd >= 101) {
        nextButton.style.visibility = "hidden";
      } else {
        nextButton.style.visibility = "visible";
      }
    });

    previousButton.addEventListener("click", function() {
      nextButton.style.visibility = "visible";

      hideAllRows();

      if (loopEnd >= 11) {
        loopStart -= 10;
        loopEnd -= 10;
      }

      for (i = loopStart; i < loopEnd; i++) {
        tableRows[i].classList.remove("hide-row");
      }

      if (loopEnd <= 11) {
        previousButton.style.visibility = "hidden";
      } else {
        previousButton.style.visibility = "visible";
      }
    });
  })
  .catch(function(error) {
    console.log(error);
  });
