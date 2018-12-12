var delay = function(s){
    return new Promise(function(resolve,reject){
        setTimeout(resolve,5000); 
    });
};

async function loadpic(){
    $('#aboutusWanted').animate({
        'opacity': '1',
        'width': '100%',
        'left': '0%',
        'top': '0%',
    },700)
}
loadpic()