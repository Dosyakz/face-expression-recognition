function getVal(){
    const myInput = document.querySelector('#vv');    
    number_sec = myInput.value;
    if(number_sec>9){
        alert("Number should be less than 10.Please try again!");
    }
    else if(number_sec<9){
        alert(number_sec);
    }
}