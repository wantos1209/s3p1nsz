const colors = [
    "E7484F",
    "F68B1D",
    "FCED00",
    "009E4F",
    "00AAC3",
    "732982",
    "E7484F"
];

const maxSpins = 5;
let spinNames = Array(maxSpins).fill("...");
let currentIndex = 0;
let spinCount = 0;
let selectedNames = new Set();

$(document).ready(function() {
    loadNames();
    updateLastPickedList();
});

function loadNames() {
    const storedNames = JSON.parse(localStorage.getItem('names')) || [];
    if (storedNames.length > 0) {
        $('#txtList').val(storedNames.map(name => name.nama).join('\n'));
    }
}

function start() {
    if (spinCount >= maxSpins) {
        alert("Maximum spins reached.");
        return;
    }

    $(".spinner-button").prop("disabled", true);

    let storedNames = JSON.parse(localStorage.getItem('names')) || [];
    let winningNames = storedNames.filter(name => name.iswin === 1 && !selectedNames.has(name.nama));

    if (winningNames.length < 1) {
        alert("Error.");
        $(".spinner-button").prop("disabled", false);
        return;
    }

    let decidedNames = winningNames.slice(0, maxSpins).map(name => name.nama); // Ensure we have up to maxSpins names
    let shuffledNames = shuffleArray(storedNames);

    if (shuffledNames.length < 1) return;

    let i = 0;
    let randomizer = setInterval(() => {
        $("#lastPickedList li").each(function(index) {
            let randomColor = Math.floor(Math.random()*16777215).toString(16); // Generate random color
            $(this).text(shuffledNames[i].nama)
                .css("color", `#${randomColor}`);
            i = (i + 1) % shuffledNames.length;
        });
    }, 50);

    setTimeout(() => {
        clearInterval(randomizer);
        $("#lastPickedList li").each(function(index) {
            $(this).text(decidedNames[index] || "...");
        });

        decidedNames.forEach(name => selectedNames.add(name));

        spinNames = decidedNames;
        updateLastPickedList();

        spinCount++;
        $(".spinner-button").prop("disabled", spinCount >= maxSpins);
    }, 3000);
}

function updateLastPickedList() {
    $("#lastPickedList li").each(function(index) {
        $(this).text(spinNames[index]);
    });
}

function randomRange(myMin, myMax) {
    return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function toggleList() {
    $(".wrapper").toggleClass("show");
}
