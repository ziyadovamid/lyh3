let add = document.querySelectorAll('.first-box button');
let Button = document.querySelectorAll('.second-box button');
let red = document.querySelector('.in p');
let blue = document.querySelector('.out p');
let x = "1 RUB",y = "1 RUB",any;
red.innerHTML = x+" = "+y;
let base='RUB',symbols='RUB';

let input = document.querySelector('.in input')
let output = document.querySelector('.out input')

add.forEach((item)=>{
    item.addEventListener('click',(e)=>{
        x = "1 "+ e.target.innerText;
        base = e.target.innerText;
        myFunction();
        console.log(base,symbols);
        if(e.target){
            e.target.class = 'active';
            let notButton = document.querySelectorAll('.first-box button:not(button.active)');
            notButton.forEach((element)=>{
                element.style.background = 'white';
                element.style.color = '#E5E5E5';
            })
            e.target.style.background = '#833AE0';
            e.target.style.color = 'white';
        }
    })
})

Button.forEach((element)=>{
    element.addEventListener('click',(a)=>{
        symbols = a.target.innerText;
        myFunction();
        if(a.target){
            a.target.class = 'active';
            let notButton = document.querySelectorAll('.second-box button:not(button.active)');
            notButton.forEach((element)=>{
                element.style.background = 'white';
                element.style.color = '#E5E5E5';
            })
            a.target.style.background = '#833AE0';
            a.target.style.color = 'white';
        }
    })
})

async function myFunction(){
    let q = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`)
    let d = await q.json();
    any = d.rates[symbols];
    console.log(any)
    input.oninput = function(){
        output.value = any * input.value;
    }
    output.oninput = function(){
        input.value = 1/any * output.value;
    }
    output.value = any * input.value;
    y = any + " " + symbols;
    red.innerHTML = x+" = "+y;
    blue.innerHTML = "1 "+ symbols +" = "+1/any + " " + base;
}  

myFunction();
