
document.getElementById("btn1").onclick = function() {Add()};
let list = document.getElementById("list");
let divPairs = document.getElementById("div-pairs");
let numbers = [];

function Add() {

  let number = document.getElementById("number").value;
  if (number != ""){
    numbers.push(number);
    document.getElementById("number_input").value = numbers;
    list.style.display = "block";
    list.innerHTML =  `Os números adicionados a lista são: ${numbers}` ;
    }
    else {
        alert("Insira um valor para ser adicionado")
    }
    document.getElementById('number').value='';

    return numbers;

}

let num;

function sums(arr){
    let pairs = [];
    let numList = [];
    num = document.getElementById("number_check").value;
    if (arr.length != 0){
        for(let i = 0; i< arr.length; i++){
            let currNum = parseInt(arr[i]);
            let diff = num - currNum;
            if(numList.includes(diff)){
                pairs.push([currNum, diff]);
            }
            numList.push(currNum);
        }
        if (pairs.length != 0){
            divPairs.innerHTML = `Os pares que somados resultam em ${num} são:  ` 
            for (let x = 0; x < pairs.length; x++){
                divPairs.innerHTML  += `|${pairs[x]}|`;
            }
            return pairs;
        }
        else{
            divPairs.innerHTML =  `Essa lista não possui pares que somados resultam em ${num}.` 
        }
    }
    else{
        alert("A lista está vazia, preencha-a!")
    }
}















