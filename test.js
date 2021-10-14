function getRndInteger(min, max, delta) {
    return delta * Math.floor(Math.random() * (max - min) / delta + min / delta);
}

console.log(getRndInteger(50, 500, 50))


