

console.log(formatMoney(13.2322235))


console.log(formatMoney(13))


console.log(formatMoney(13.23))

console.log(formatMoney(123))
console.log(formatMoney(18.1))
console.log(formatMoney(5.12))

console.log(formatMoney(0.05))



function formatMoney(money) {
    return '$' + money.toFixed(2)
}