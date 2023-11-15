document.addEventListener("DOMContentLoaded", async () => {
  document.querySelectorAll(".btn").forEach((btn) => {
    //Add event to every button in the calculator
    btn.addEventListener("click", handleClick);
  });

  const display = document.querySelector("#display-text");

  const currencyDict = {};
  await GetCurrentCurrencyDict();

  //Set max number of digits to display
  //It makes the display more like a real calculator
  const maxNumOfDisplay = 12;
  //Get largest number with maxNumOfDisplay digits
  const maxNum = Math.pow(10, maxNumOfDisplay - 1) - 1;

  let rememberedNum = 0;
  let currentOperator = "";
  let clearDisplay = false;

  function handleClick(event) {
    const val = event.target.value;

    const num = parseInt(val);

    if (!isNaN(num)) {
      //Button was a number
      if (clearDisplay) {
        //There is a operation queued
        //Clear the display
        display.textContent = "0";
        clearDisplay = false;
      }

      addToDisplay(val);
      return;
    }

    switch (val) {
      //Clear all numbers
      case "C":
        rememberedNum = 0;
        currentOperator = "";
        display.textContent = "0";
        clearDisplay = false;
        return;

      //Add a period
      case ".":
        //There is a period already
        if (display.textContent.includes(".")) {
          return;
        }

        display.textContent += ".";
        return;
      //#region Operators

      case "=":
        handleOperations();
        return;

      case "+":
        //Check if there was already a operation queued
        handleOperations();
        rememberedNum = display.textContent;
        currentOperator = "+";
        clearDisplay = true;
        return;
      case "-":
        //Check if there was already a operation queued
        handleOperations();
        rememberedNum = display.textContent;
        currentOperator = "-";
        clearDisplay = true;
        return;
      case "/":
        //Check if there was already a operation queued
        handleOperations();
        rememberedNum = display.textContent;
        currentOperator = "/";
        clearDisplay = true;
        return;
      case "*":
        //Check if there was already a operation queued
        handleOperations();
        rememberedNum = display.textContent;
        currentOperator = "*";
        clearDisplay = true;
        return;
      //#endregion
      //Currency buttons
      default:
        handleCurrency(val);
    }

    function addToDisplay(num) {
      updateDisplay(parseFloat(display.textContent + num));
    }

    //Update the display
    function updateDisplay(num) {
      //Ensure we don't overflow the display
      if (num.toString().length >= maxNumOfDisplay) {
        if (num.toString().includes(".")) {
          //Decrease the precision of the number
          updateDisplay(num.toString().slice(0, -1));
          return;
        }
        display.textContent = maxNum;

        return;
      }
      display.textContent = num;
    }

    function handleOperations() {
      if (currentOperator == "") return false;

      //There is a operation queued
      //Do the operation
      switch (currentOperator) {
        case "+":
          updateDisplay(
            parseFloat(rememberedNum) + parseFloat(display.textContent)
          );
          break;
        case "-":
          updateDisplay(
            parseFloat(rememberedNum) - parseFloat(display.textContent)
          );
          break;
        case "*":
          updateDisplay(
            parseFloat(rememberedNum) * parseFloat(display.textContent)
          );
          break;
        case "/":
          const num =
            parseFloat(rememberedNum) / parseFloat(display.textContent);
          updateDisplay(num.toString().includes(".") ? num.toFixed(4) : num);
          break;
      }
      currentOperator = "";
      return true;
    }

    function handleCurrency(currency) {
      //Convert Displayed Value into selected Currency
      const currencyRate = currencyDict[currency];
      const displayValue = parseFloat(
        parseFloat(display.textContent) / currencyRate
      );
      updateDisplay(displayValue);
    }
  }
  async function GetCurrentCurrencyDict() {
    await $.ajax({
      //We could use 'http://api.nbp.pl/api/exchangerates/rates/{table}/{code}/{Date}/' URl but that would send a request for every currency
      //Exchange rates are updated every working day so the last update before 12/11/2023 would be 10/11/2023
      url: "http://api.nbp.pl/api/exchangerates/tables/A/2023-11-10",
      type: "GET",
      dataType: "json",
      headers: {
        Accept: "application/json",
      },
      success: function (data) {
        //Just get the calculator currencies
        const currencies = ["USD", "GBP", "EUR"];
        const rates = data[0].rates;
        rates.forEach((rate) => {
          if (currencies.includes(rate.code)) {
            currencyDict[rate.code] = rate.mid;
            //Enable currency buttons
            document.querySelector('button[value="'+rate.code+'"]').disabled = false;
          }
        });
      },
      error: function () {
        //Disable currency buttons
        document
          .querySelectorAll('button[btntype="currency"]')
          .forEach((btn) => {
            btn.disabled = true;
          });
      },
    });
  }
});
