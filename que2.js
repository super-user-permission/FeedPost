var a = [-1,-3,-5,-6,-8,,,]

var b = [0,-2,10,8,9,1,3]

function MergeSort(a,b){
    for(i=0; i<b.length; i++){
        a.push(b[i])
    }
    console.log(a)
    a.sort(function(a,b) {return a-b})
    console.log(a)
    
}

MergeSort(a,b);