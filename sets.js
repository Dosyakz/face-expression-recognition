function getVal(){
    const myInput = document.querySelector('#vv');
    const mydis = document.querySelector('#dd');
    const mysad = document.querySelector('#ss');
    const myfear= document.querySelector('#ff');
    angr = myInput.value;
    ssad = mysad.value;
    ddis = mydis.value;
    fearp = myfear.value;
    
    sadd(ssad);
    fearr(fearp);
    diss(ddis);
    angry_(angr);
}

function sadd(ssad){
    check_number(ssad);
    if(ssad.length==0){
        ssad = 95;
        return ssad;
    }
    else{
        if(ssad>100){
           ssad=95;
           return ssad; 
        }
        else{
            return ssad;
        }
    }
}

function fearr(ffear){
    check_number(ffear);
    if(ffear.length==0){
        console.log('this is an empty number');
        ffear = 95;
    }else{
        console.log();
    }
}

function diss(ddis){
    check_number(ddis);
    if(ddis.length==0){
        console.log('this is an empty number');
        ddis = 95;
    }else{
        console.log();
    }
}

function angry_(angr){
    check_number(angr);
    if(angr.length==0){
        console.log('this is an empty number');
        angr = 95;
    }else{
        console.log();
    }
}

function check_number(num){
    if(isNaN(num)){
        alert("please this is not number");
     }else{
            if(num<100){
                return num;
            }
            else{
                alert("please number should be till 100%");
            }
        }
}
