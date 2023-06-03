function getVal(){
    const myInput = document.querySelector('#vv');    
    number_sec = myInput.value;
    if(isNaN(number_sec)){
        alert("please this is not number");
     }else{
        if(number_sec>9){
            alert("Number should be less than 10.Please try again!");
        }
        else if(number_sec<9){
            console.log(number_sec);
            let div = document.querySelector('#changed');
            div.innerText = "изменен на "+ number_sec;
        }
     }
    
    
}

