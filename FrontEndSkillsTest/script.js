


document.querySelectorAll(".btn").forEach(btn =>{
    //Add event to every button in the calculator
    btn.addEventListener("click", handleClick);
});

const display = document.querySelector("#display-text");

const maxNumOfDisplay = 11;



function handleClick(event) {

    const val = event.target.value;

    const num = parseInt(val);
    
    //Button was a number
    if(!isNaN(num))
    {
        //Ensure we don't overflow the display
        if(display.textContent.length >= maxNumOfDisplay)
        {
            return;
        }
        
        updateDisplay(val);
        return;
    }



    //Update the display
    function updateDisplay(num)
    {
        display.textContent = parseFloat(display.innerHTML + num);
    }

}