export function countArr(arr){
    var done = 0
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].completed){
            done++
        }
    }
    return done
}



export function sortArr(arr) {
    arr.sort((a, b) => {
        return a.completed - b.completed
    })

    return arr
}


