// REQs
// The user is able to 'catch' fish with randomly generated names, weights, and values
// The time of day is shown to the user
// The user can only fish for six hours
// The user can only catch at maximum 10 lbs of fish
// Each turn, the sum of the user's caught fishes' weight and value is displayed
// You make at least three commits in git (after completing parts of the project)
// At the end of the game, all the fish that the user caught are displayed along with a sum of their weight and value

// Prompt sync
const prompt = require('prompt-sync')({ sigint: true })

// Game vars
const timeStart = 6
const timeLimit = 6
const timeMax = timeStart + timeLimit
const weightMax = 10

// Player vars
let weight = 0
let timePassed = 0
let fishCaught = 0
let money = 0

let x = "PLACEHOLDER"

// Fish objects > name, weight, value

// Game
navIntro()

function navIntro() {
    console.log('\n' + '================= [GONE FISHING] ====================' + '\n')
    console.log("You've gone fishing! Try to maximize the value of your caught fish. You can fish for " + timeLimit + " hours (till " + formatTime(timeMax) + ") and can catch at most " + weightMax + " lbs of fish.")
    navBreak()
    navMain()
}

function navBreak() {
    console.log('\n' + '=====================================' + '\n')
}

function navMain() {

    if (timePassed >= timeLimit) {
        navEnd()
    } else {
        console.log("The time is " + formatTime(timeStart + timePassed) + ". So far you've caught: ")
        console.log(fishCaught + " fish, " + weight + " lbs, " + "$0.00")
        console.log("Press any button to continue")
        prompt('')
        navFish()
    }
}

// replace with fish obj

function navFish() {
    console.log("You caught a " + x + " weighing " + x + " lbs and valued at " + x)

    console.log("Your action: [c]atch or [r]elease?")
    let input = prompt("")

    while (input !== 'c' && input !== 'r') {
        console.log("Please enter [c] or [r]")
        input = prompt("")
    }

    if (input === 'c') {
        console.log("You chose to keep the fish.")
    } else if (input === 'r') {
        console.log("You chose to release the fish.")
    }

    timePassed++

    navBreak()
    navMain()
}


// move to main?
function navEnd() {
    console.log("The time is " + formatTime(timeStart + timePassed) + ". Time's up!")
    console.log("You caught " + x + " fish: ")
}


// Returns a string in 12hr format
function formatTime(time) {

    let m = (time % 24) < 12 ? 'am' : 'pm'
    let hours = (Math.floor(time + 11) % 12) + 1
    let minutes = Math.round(60 * (time % 1))
    minutes = minutes.toString().padStart(2, '0')

    let timeString = hours + ':' + minutes + m
    return timeString
}

// To Do
function formatMoney(money) {
    return money
}