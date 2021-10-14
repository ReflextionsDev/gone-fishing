// Stretch goals
// Make weight mult determined by desc 1, and value mult from desc2

// Prompt sync
const prompt = require('prompt-sync')({ sigint: true })

// Game Vars
const timeStart = 6
const timeLimit = 6
const timeMax = timeStart + timeLimit
const weightLimit = 10
const weightMin = 0.1
const weightMax = 15
const valueMin = 0.05
const valueMax = 50

// Player Vars
let totalWeight = 0
let totalValue = 0
let timePassed = 0
let fishCaught = 0
let money = 0
let fish = []

// Fish Vars
let fishDesc1 = ['Enormous', 'Tiny', 'Small', 'Large', 'Regular', 'Massive']
let fishDesc2 = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Rare', 'Common', 'Ancient', 'Young', 'Old', 'Ugly', 'Pretty']
let fishNames = ['Trout', 'Goldfish', 'Tuna', 'Carp', 'Blobfish', 'Footballfish', 'Snakehead', 'Sunfish', 'Pike', 'Catfish']

// Game
navIntro()

function navIntro() {
    console.log('\n' + '================= [GONE FISHING] ====================' + '\n')
    console.log("You've gone fishing! Try to maximize the value of your caught fish. You can fish for " + timeLimit + " hours (till " + formatTime(timeMax) + ") and can catch at most " + weightLimit + " lbs of fish.")
    navBreak()
    navMain()
}

function navBreak() {
    console.log('\n' + '=====================================' + '\n')
}

function navMain() {

    updateStats()

    if (timePassed >= timeLimit) {
        navEnd()
    } else {
        console.log("The time is " + formatTime(timeStart + timePassed) + ". So far you've caught: ")
        console.log(fishCaught + " fish, " + formatWeight(totalWeight) + ", " + formatMoney(totalValue))
        console.log("Press any button to continue")
        prompt('')
        navFish()
    }
}


function navFish() {

    navBreak()
    let tempFish = getFish()
    console.log("You caught a " + tempFish.name + " weighing " + formatWeight(tempFish.weight) + ", and valued at " + formatMoney(tempFish.value))

    if ((Number(totalWeight) + Number(tempFish.weight)) > weightLimit) {
        console.log("This fish would put you over " + weightLimit + "lbs, so you release it.")
    } else {
        console.log("Your action: [c]atch or [r]elease?")
        let input = prompt("")

        while (input !== 'c' && input !== 'r') {
            console.log("Please enter [c] or [r]")
            input = prompt("")
        }

        if (input === 'c') {
            console.log("You chose to keep the fish.")
            fish.push(tempFish)
        } else if (input === 'r') {
            console.log("You chose to release the fish.")
        }
    }

    timePassed++
    navBreak()
    navMain()
}


function navEnd() {
    console.log("The time is " + formatTime(timeStart + timePassed) + ". Time's up!" + '\n')
    console.log("You caught " + fishCaught + " fish: ")
    console.log()

    for (let i = 0; i < fish.length; i++) {
        console.log('* ' + fish[i].name + ", " + formatWeight(fish[i].weight) + ", " + formatMoney(fish[i].value))
    }

    console.log()
    console.log(`Total weight: ${totalWeight}lbs`)
    console.log(`Total value: ${formatMoney(totalValue)}`)
}


// Utilities

// Returns a string in 12hr format (5:31pm)
function formatTime(time) {

    let m = (time % 24) < 12 ? 'am' : 'pm'
    let hours = (Math.floor(time + 11) % 12) + 1
    let minutes = Math.round(60 * (time % 1))
    minutes = minutes.toString().padStart(2, '0')

    let timeString = hours + ':' + minutes + m
    return timeString
}

// Formats money into dollar format ($1.03)
function formatMoney(money) {
    let output = '$' + Number(money).toFixed(2)
    return output
}

// Formats weight (12.32lbs)
function formatWeight(weight) {
    let output = Number(weight).toFixed(2) + 'lbs'
    return output
}

// Returns a double formated to 2 decimal places (1.23)
function randomDouble(min, max) {
    let num = Math.random() * (max - min) + min;
    num = num.toFixed(2)
    return num;
}

// Returns a random int, inclusive
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Fish Functions

// Returns a new fish object with random values
function getFish() {
    let fishName = fishDesc1[randomInt(0, fishDesc1.length - 1)] + " " + fishDesc2[randomInt(0, fishDesc2.length - 1)] + " " + fishNames[randomInt(0, fishNames.length - 1)]
    let fishWeight = randomDouble(weightMin, weightMax)
    let fishValue = randomDouble(valueMin, valueMax)
    let fish = newFish(fishName, fishWeight, fishValue)
    return fish
}

// Creates a new fish object
function newFish(name, weight, value) {
    let fish = {}
    fish.name = name
    fish.weight = weight
    fish.value = value
    return fish
}

// Updates total fish, weight, and value
function updateStats() {
    fishCaught = 0
    totalWeight = 0
    totalValue = 0

    for (let i = 0; i < fish.length; i++) {
        const index = fish[i]
        fishCaught++
        totalWeight += Number(fish[i].weight)
        totalValue += Number(fish[i].value)
    }
}