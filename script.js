let screen = document.querySelector(".screen");
let upperScreen = document.querySelector(".upperScreen");
let lowerScreen = document.querySelector(".lowerScreen");
let buttons = document.querySelector(".screen-and-buttons");

let accumulator=0, newOperand;
let operatorAlert = 0;
let savedOperator = "";

buttons.addEventListener("click", (e)=>
{



// **********************************************************************
				// NUMBERS
// **********************************************************************

if (e.target.className.split(" ")[1] == "numbers") {

	// when no other numbers are there or when the operator is just entered
	// replace everything with currently entered value

	if (lowerScreen.textContent == "0" || operatorAlert == 1) {
		lowerScreen.textContent = e.target.textContent;
		operatorAlert = 0;
		return;
	}

	// keep adding numbers 

	lowerScreen.textContent += e.target.textContent;
	return;
}






// **********************************************************************
				// OPERATORS
// **********************************************************************

if (e.target.className.split(" ")[1] == "operators") {

	
	newOperand = lowerScreen.textContent;

	if (accumulator == 0 && savedOperator == ""){
		upperScreen.textContent = lowerScreen.textContent + e.target.textContent;
		savedOperator = e.target.textContent;
		accumulator = lowerScreen.textContent;
		operatorAlert = 1;
		return;
	}
	
	// if operator is just pressed before
	if (operatorAlert == 1) {
		return;
	}
	
	if (e.target.textContent == "=") {
		accumulator = operate(+accumulator, +newOperand, savedOperator);
		lowerScreen.textContent = accumulator;
		upperScreen.textContent = upperScreen.textContent + newOperand + e.target.textContent;

		operatorAlert = 1; // operator is just pressed

		return;
	}
	
	accumulator = operate(+accumulator, +newOperand, savedOperator);
	lowerScreen.textContent = accumulator;
	upperScreen.textContent = lowerScreen.textContent + e.target.textContent;

	savedOperator = e.target.textContent;

	operatorAlert = 1;






	
}






// **********************************************************************
				// DECIMAL
// **********************************************************************
if (e.target.textContent == ".") {
	if (lowerScreen.textContent.includes(".")){
		return;
	}
	else if (operatorAlert == 1) {
		lowerScreen.textContent = "0" + e.target.textContent;
		operatorAlert = 0;
	}
	else{
	lowerScreen.textContent += e.target.textContent;
	}
}

// **********************************************************************
				// CLEAR
// **********************************************************************


if (e.target.className.split(" ")[1] == "clear") {
	lowerScreen.textContent = "0";
	upperScreen.textContent = "";

	accumulator = 0;
	newOperand = 0;
	savedOperator = "";
}
// **********************************************************************
				// DELETE
// **********************************************************************

if (e.target.textContent == "DELETE") {

	if (lowerScreen.textContent == "0")
		return; 

	if (lowerScreen.textContent.length == 1){ 
		lowerScreen.textContent = "0";
		return;
	}
	let toTrim = lowerScreen.textContent;
	lowerScreen.textContent = toTrim.slice(0, toTrim.length-1);
}
});
// **********************************************************************













function operate(accumulator, newOperand, savedOperator){
	switch (savedOperator){
		case '+':
			accumulator += newOperand;
			break;
		case '-':
			accumulator -= newOperand;
			break;
		case '×':
			accumulator *= newOperand;
			break;
		case '÷':
			accumulator /= newOperand;
			break;
		default:
		
	}
	if (Number.isInteger(accumulator))
		return accumulator;

	return accumulator.toFixed(3);
}

