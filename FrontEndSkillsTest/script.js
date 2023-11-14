document.addEventListener("DOMContentLoaded", async () =>{
    document.querySelectorAll(".btn").forEach((btn) => {
        //Add event to every button in the calculator
        btn.addEventListener("click", handleClick);
      });
      
      const display = document.querySelector("#display-text");
      
      const currencyDict = {};
      await GetCurrentCurrencyDict();
      
      const maxNumOfDisplay = 12;
      //Get largest number with maxNumOfDisplay digits
      const maxNum = Math.pow(10, maxNumOfDisplay - 1) - 1;
      
      let rememberedNum = 0;
      let currentOperator = "";
      let clearDisplay = false;
      
      function handleClick(event) {
        const val = event.target.value;
      
        const num = parseInt(val);
      
        //Button was a number
        if (!isNaN(num)) {
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
          updateDisplay(parseFloat(display.innerHTML + num));
        }
      
        //Update the display
        function updateDisplay(num) {
          //Ensure we don't overflow the display
          if (num.toString().length >= maxNumOfDisplay) {
            
              if(num.toString().includes(".")){
                  updateDisplay(num.toString().slice(0,-1));
                  return;
              }
              display.textContent = maxNum;
      
            return;
          }
          display.innerHTML = num;
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
              const num = (parseFloat(rememberedNum) / parseFloat(display.textContent));
              updateDisplay(
                  num.toString().includes(".") ? num.toFixed(4) : num
              );
              break;
          }
          currentOperator = "";
          return true;
        }
      
        function handleCurrency(currency)
        {
            //Convert Displayed Value into selected Currency
            const currencyRate = currencyDict[currency];
            const displayValue = parseFloat(parseFloat(display.textContent)/currencyRate);
            updateDisplay(displayValue);
        }

      }
      async function GetCurrentCurrencyDict(){
        await $.ajax({
            //We could use 'http://api.nbp.pl/api/exchangerates/rates/{table}/{code}/' URl but that would send a request for every currency
            url: 'http://api.nbp.pl/api/exchangerates/tables/A/',
            type: "GET",
            dataType: "json",
            headers: {
                'Accept': 'application/json'
            },
            success: function (data) {
                //Just get the calculator currencies
                const currencies = ["USD", "GBP", "EUR"];
                const rates = data[0].rates;
                rates.forEach(rate => {
                    if(currencies.includes(rate.code)){
                        currencyDict[rate.code] = rate.mid;
                    }
                });
            }
            });
      }
});