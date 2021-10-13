
let min = 3
let max = 5





function randomDouble(min, max) {
    let num = Math.random() * (max - min) + min;
    num = num.toFixed(2)
    return num;
}

console.log(randomDouble(1,3))