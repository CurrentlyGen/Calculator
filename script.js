function Calculator(){
  this.methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "x": (a, b) => a * b,
    "/": (a, b) => a / b,
  }
  
  this.calculate = function(operation) {
    let split = operation.split(" "),
        a = +split[0],
        op = split[1],
        b = +split[2];
    
    return Math.round(this.methods[op](a, b)*100)/100;
  }
}

const powerCalc = new Calculator;
const firstLine = document.getElementById("line1");
const secondLine = document.getElementById("line2");

function functionality() {
  const dgit = Array.from(document.querySelectorAll("#keyContainer > .digit"));
  const dec = document.querySelector(".decimal")
  const ops = Array.from(document.querySelectorAll("#keyContainer > .operator"));
  const eql = document.querySelector("#keyContainer > .equal");
  const clr = document.querySelector("#clear");
  const dlt = document.querySelector("#delete");

  const validOpRgx = /[0-9]+\s[+-/x]\s$/

  function keyBtnHandler() {
    if(/[=]$/.test(firstLine.textContent)) {
      clear();
      secondLine.textContent = this.textContent;
    } else if(secondLine.textContent === "0"){
        secondLine.textContent = this.textContent
    } else if(!validOpRgx.test(firstLine.textContent)) {
      secondLine.textContent += this.textContent;
    } else {
      secondLine.textContent += this.textContent;
    }
  }

  function decimalBtnHandler() {
    if(!/[.]/.test(secondLine.textContent)) secondLine.textContent += ".";
  }

  function operatorBtnHandler(){
    function operateResult(operator){
      secondLine.textContent += ` ${operator} `;
      firstLine.textContent = secondLine.textContent;
      secondLine.textContent = "0";
    }
    if(validOpRgx.test(firstLine.textContent) && secondLine.textContent == 0) {
      firstLine.textContent = firstLine.textContent.slice(0, -3) + ` ${this.textContent} `;
    } else if(
        validOpRgx.test(firstLine.textContent) && /[1-9]+/.test(secondLine.textContent)
      ) {
      operate();
      operateResult(this.textContent);
    } else {
      operateResult(this.textContent);
    }
  }

  function operate() {
    if(validOpRgx.test(firstLine.textContent)) {
      let displayResult = powerCalc.calculate(
        firstLine.textContent + secondLine.textContent
      );
      console.log(typeof displayResult)
      firstLine.textContent += secondLine.textContent + " ="
      if(isNaN(displayResult) || displayResult === Infinity) {
        secondLine.textContent = "Syntax Error";
        setTimeout(clear, 500);
      } else {
        secondLine.textContent = `${displayResult}`;
      }
    } else {
      firstLine.textContent = secondLine.textContent + " =";
    }
  }

  function clear() {
    firstLine.textContent = "";
    secondLine.textContent = "0";
  }

  function dlete() {
    if(
        validOpRgx.test(firstLine.textContent) && /^[0]$/.test(secondLine.textContent)
      ) {
      secondLine.textContent = firstLine.textContent.slice(0, -3);
      firstLine.textContent = "";
    }
    else if(/^[0-9]$/.test(secondLine.textContent)) {
      secondLine.textContent = 0;
    }
    else {
      secondLine.textContent = secondLine.textContent.slice(0, -1);
    }
  }

  dgit.forEach(item => item.addEventListener("click", keyBtnHandler));

  dec.addEventListener("click", decimalBtnHandler);

  ops.forEach(item => item.addEventListener("click", operatorBtnHandler));

  eql.addEventListener("click", operate);

  clr.addEventListener("click", clear);

  dlt.addEventListener("click", dlete);
};

functionality()
