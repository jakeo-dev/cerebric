console.log('v1.2');
console.log('whats new: \n \n Additions \n  • Skip step button \n  • Practice mode option to disable adding times and reached goals to the records list \n  • Option to change difficulty of auto set goal: Easy, Normal, or Challenging \n  • Click the timer icon to pause/unpause the timer \n  • Click up and down arrows to show/hide text and edit/close text \n  • Spellcheck added to inputs \n  • Counts number of times text entered incorrectly \n  • Change theme button added as a dev button \n \n Improvements \n  • Auto set goal improvements \n  • Style improvements \n  • Bug fixes');

// inputs
let memText;
let currentInput;
let ogInput;

// counting time
let time = 0;
let interval;
let rnd = 10;
let tCount = 0.1;
let tAmount = 100; // ADD a 0 to rnd and tCount, and REMOVE a 0 from tAmount, to be more specific with the times (ex. 100, 0.01, and 1000: 3.82 seconds)
let paused = false;

// goals & records
let goal;
let record;
let sum = 0;
let average = 0;

// list to array
let txt;
let ret;
let listItems;
let fasterThanAll = 0;

// options
let igPunc = true;
let auSeGo = false;
let goalDiff = 2;
let incLimit = 2;
let currentTheme = 0;
let theme = 0;
let pMode = false;

// text counters
let wCount;
let lCount;

// other
let step = 1;
let incorrect = 0;
let textVisible = false;
let userEntered;
let acronym;
let borderWidth;
let borderRadius = '6px'; // default screen.width < 500
let half;

// colors
let lightRed = '#d14848'; /*  new record / goal reached / record */
let titleRed = '#ffd0d0'; /* title */
let darkerRed = '#b9483b'; /* incorrect */
let lightWhite = '#f7f7f7'; /* show options background on hover */
let darkerWhite = '#b8c2c5'; /* border for options and options on hover*/
let darkestBlue = '#162a2c'; /* show options text color */
let shadow = '#0000002e'; /* shadow for divs on background */
let green = '#368546'; /* correct */

window.onload = setBorderWidth;

function setBorderWidth() {
    if (screen.width > 500 && screen.width < 1100) {
        borderWidth = '4px';
    } else if (screen.width >= 1100) {
        borderWidth = '3px';
    }
}

/* document.getElementById('timesList').addEventListener('click', function (e) {
    var tgt = e.target;
    if (tgt.tagName.toUpperCase() == 'LI') {
        tgt.parentNode.removeChild(tgt); // or tgt.remove();

        listToArray();

        for (var i = 0; i < ret.length; i++) {
            sum = +sum + +j;
        }

        average = sum / ret.length;
        sum = 0; // resets sum

        if (ret.length >= 2) {
            if (average == 1 || average == 1.0) {
                document.getElementById('timesAverage').innerText = `Average: ${(Math.round(average * rnd)) / rnd} second`;
            } else {
                document.getElementById('timesAverage').innerText = `Average: ${(Math.round(average * rnd)) / rnd} seconds`;
            }
        } else {
            document.getElementById('timesAverage').innerText = '';
        }
    }
});

document.getElementById('goalsList').addEventListener('click', function (e) {
    var tgt = e.target;
    if (tgt.tagName.toUpperCase() == 'LI') {
        tgt.parentNode.removeChild(tgt); // or tgt.remove();
    }
}); */

function nextStep() {
    if (step == 1) {
        if (document.getElementById('memInput').value == '') {
            document.getElementById('warning').innerText = 'Enter something to memorize!';
            document.getElementById('warning').style.color = darkerRed;

            document.getElementById('memInput').focus();

        } else {
            document.getElementById('directions').innerText = 'First, read the text and type it.';

            memText = document.getElementById('memInput').value;
            document.getElementById('memText').innerText = memText;

            document.getElementById('memInput').value = '';

            document.getElementById('memTextDiv').style.display = 'flex';
            document.getElementById('enterMemDiv').style.display = 'none';
            document.getElementById('tryMemDiv').style.display = 'block';
            document.getElementById('nextStepDiv').style.display = 'none';
            document.getElementById('skipStepDiv').style.display = 'block';

            step++;

        }

    } else if (step == 2) {
        document.getElementById('directions').innerText = 'Now, listen to the text being spoken.';

        document.getElementById('fullEnterTryMem').style.display = 'none';
        document.getElementById('speakText').style.display = 'block';
        document.getElementById('status').style.display = 'none';
        document.getElementById('nextStepDiv').style.display = 'none';
        document.getElementById('skipStepDiv').style.display = 'block';

        step++;

    } else if (step == 3) {
        try {
            document.getElementById('directions').innerText = 'Now, type the text while only reading the first letter of each word.';

            let matches = memText.match(/\b(\w)/g); // ['U','W','U']
            acronym = matches.join('___ '); // U___ W___ U
            acronym = acronym + '___'; // U___ W___ U___
            document.getElementById('memText').innerText = acronym;

            step++;

        } catch (err) {
            step++;
            nextStep();

            alert('Error: ' + err.message + '\nSkipping step 4.');

        } finally {
            document.getElementById('tryMemInput').value = '';

            document.getElementById('fullEnterTryMem').style.display = 'flex';
            document.getElementById('speakText').style.display = 'none';
            document.getElementById('status').style.display = 'none';
            document.getElementById('nextStepDiv').style.display = 'none';
            document.getElementById('skipStepDiv').style.display = 'block';
        }

    } else if (step == 4) {
        document.getElementById('directions').innerText = 'Now, type the text without reading it.';

        document.getElementById('tryMemInput').value = '';

        document.getElementById('memTextDiv').style.display = 'none';
        document.getElementById('status').style.display = 'none';
        document.getElementById('nextStepDiv').style.display = 'none';
        document.getElementById('skipStepDiv').style.display = 'block';

        step++;

    } else if (step == 5) {
        document.getElementById('directions').innerText = 'Now, type the text as fast as you can.';

        document.getElementById('tryMemInput').value = '';

        document.getElementById('status').style.display = 'none';
        document.getElementById('nextStepDiv').style.display = 'none';
        document.getElementById('skipStepDiv').style.display = 'block';

        step++;

    } else if (step == 6) {
        document.getElementById('directions').innerText = 'Keep trying to type the text faster!';

        document.getElementById('tryMemInput').value = '';

        document.getElementById('status').style.display = 'none';
        document.getElementById('timesBox').style.display = 'block';
        document.getElementById('goalButton').style.display = 'initial';
        document.getElementById('practiceButton').style.display = 'initial';
        document.getElementById('nextStepDiv').style.display = 'none';
        document.getElementById('skipStepDiv').style.display = 'none';

        if (currentInput == ogInput) {
            addTime(time);
        } else {
            document.getElementById('timesSubtextEl').style.display = 'block';
        }

        document.getElementById('timeDiv').style.display = 'none';

        time = 0;

        start = function () {
            start = function () { };
            interval = setInterval(function () {
                if (paused == false) {
                    document.getElementById('timeDiv').style.display = 'flex';

                    time = (Math.round((time + tCount) * rnd)) / rnd;

                    if (time == 1) {
                        document.getElementById('time').innerText = `${time} second`;
                    } else {
                        document.getElementById('time').innerText = `${time} seconds`;
                    }
                    // rounds number to tenth place

                    if (document.getElementById('status').innerText == 'Enter text to beat your record!') {
                        document.getElementById('status').style.display = 'none';
                    }
                }

            }, tAmount);

        };

        step++;
    }

    document.getElementById('tryMemInput').disabled = false;
    document.getElementById('enterTry').disabled = false;
    document.getElementById('showText').disabled = false;
    document.getElementById('tryMemInput').classList.remove('disabled');
    document.getElementById('enterTry').classList.remove('disabled');
    document.getElementById('showText').classList.remove('disabled');

    if (document.getElementById('showText').style.display == 'initial') {
        textVisible = false;

        document.getElementById('memTextDiv').style.display = 'none';
        document.getElementById('showText').style.display = 'none';
        document.getElementById('showText').innerHTML = `<i class=\'fa-solid fa-eye\'></i>Show Text`;
    }

    document.getElementById('tryMemInput').focus();

    incorrect = 0;

    paused = false;

    clearInterval(interval); // stops timer

    // document.getElementById('step').innerText = `Step ${step - 1}`;
    // console.log('step ' + step);
}

function start() {
    if (step == 6 || step == 7) {
        start = function () { };
        interval = setInterval(function () {
            if (paused == false) {
                document.getElementById('timeDiv').style.display = 'flex';

                time = (Math.round((time + tCount) * rnd)) / rnd;

                if (time == 1) {
                    document.getElementById('time').innerText = `${time} second`;
                } else {
                    document.getElementById('time').innerText = `${time} seconds`;
                }
                // rounds number to tenth place

                if (document.getElementById('status').innerText == 'Enter text to beat your record!') {
                    document.getElementById('status').style.display = 'none';
                }
            }

            setInputs();

        }, tAmount);
    }
};

function reset() {
    document.getElementById('tryMemInput').value = '';
    document.getElementById('timeDiv').style.display = 'none';
    document.getElementById('status').style.display = 'none';

    document.getElementById('enterTry').style.display = 'initial';
    document.getElementById('resetTime').style.display = 'none';

    textVisible = false;

    paused = false;

    document.getElementById('tryMemInput').disabled = false;
    document.getElementById('enterTry').disabled = false;
    document.getElementById('showText').disabled = false;
    document.getElementById('tryMemInput').classList.remove('disabled');
    document.getElementById('enterTry').classList.remove('disabled');
    document.getElementById('showText').classList.remove('disabled');

    document.getElementById('memTextDiv').style.display = 'none';
    document.getElementById('showText').style.display = 'none';
    document.getElementById('showText').innerHTML = `<i class=\'fa-solid fa-eye\'></i>Show Text`;

    document.getElementById('tryMemInput').focus();

    if (!isNaN(goal) && goal !== 0 && time <= goal && time > 0) {  // if the goal is a number (not null) and is not 0 and the time is less than the goal, then say it reached the goal, else just say correct
        goal = 0;
        document.getElementById('goalButton').innerHTML = `<i class=\'fa-solid fa-bullseye\'></i>Set Goal`;
    }

    if (auSeGo && pMode == false) {

        /* auto set goal */

        if (goalDiff == 1) {
            if (record == undefined) {
                goal = (average - (average * 0.04));

            } /* else if (average >= median * 1.5 || average <= median * 1.5) {
                goal = (record - (0.78 * (median - record)) - (0.015 * (median)));

            } */ else if (record <= average / 2) {
                goal = (record - (0.24 * (average - record)) + (0.1 * (average)));

            } else {
                goal = (record - (0.78 * (average - record)) - (0.015 * (average)));
            }

        } else if (goalDiff == 2) {
            if (record == undefined) {
                goal = (average - (average * 0.08));

            } /* else if (average >= median * 1.5 || average <= median * 1.5) {
                goal = (record - (0.36 * (median - record)) - (0.06 * (median)));

            } */ else if (record <= average / 2) {
                goal = (record - (0.28 * (average - record)) + (0.1 * (average)));

            } else {
                goal = (record - (0.36 * (average - record)) - (0.06 * (average)));
            }

        } else if (goalDiff == 3) {
            if (record == undefined) {
                goal = (average - (average * 0.15));

            } /* else if (average >= median * 1.5 || average <= median * 1.5) {
                goal = (record - (0.08 * (median - record)) - (0.1 * (median)));

            } */ else if (record <= average / 2) {
                goal = (record - (0.4 * (average - record)) + (0.1 * (average)));

            } else {
                goal = (record - (0.08 * (average - record)) - (0.1 * (average)));
            }
        }

        goal = (Math.round(goal * rnd)) / rnd;

        /* */

        if (goal <= 0 || goal > 3600) {
            document.getElementById('goalButton').innerHTML = `<i class=\'fa-solid fa-bullseye\'></i>Set Goal`;
        } else if (goal == 1) {
            document.getElementById('goalButton').innerHTML = `<i class=\'fa-solid fa-bullseye\'></i><b>${goal} second</b>`;
        } else {
            document.getElementById('goalButton').innerHTML = `<i class=\'fa-solid fa-bullseye\'></i><b>${goal} seconds</b>`;
        }
    }

    time = 0;

    start = function () {
        if (step == 6 || step == 7) {
            start = function () { };
            interval = setInterval(function () {
                if (paused == false) {
                    document.getElementById('timeDiv').style.display = 'flex';

                    time = (Math.round((time + tCount) * rnd)) / rnd;

                    if (time == 1) {
                        document.getElementById('time').innerText = `${time} second`;
                    } else {
                        document.getElementById('time').innerText = `${time} seconds`;
                    }
                    // rounds number to tenth place

                    if (document.getElementById('status').innerText == 'Enter text to beat your record!') {
                        document.getElementById('status').style.display = 'none';
                    }
                }

            }, tAmount);
        }
    };

    clearInterval(interval); // stops timer

    if (pMode == false) {
        document.getElementById('goalButton').disabled = false;
        document.getElementById('goalButton').classList.remove('disabled');
    }
}

function enterTry() {
    setInputs();

    if (currentInput == ogInput) {
        document.getElementById('status').innerHTML = '<i class=\'fa-solid fa-circle-check\'></i>Correct!';
        document.getElementById('status').style.color = green;

        incorrect = 0;

        paused = false;

        if (step == 6) {
            document.getElementById('timeDiv').style.display = 'flex';

            clearInterval(interval); // stops timer

            listToArray();

            document.getElementById('nextStepDiv').style.display = 'block';
            document.getElementById('skipStepDiv').style.display = 'none';

        } else if (step == 7) {
            document.getElementById('timeDiv').style.display = 'flex';

            addTime(time);

            listToArray();

            fasterThanAll = 0;

            for (var i = 0; i < ret.length; i++) {
                let j = ret[i];

                sum = +sum + +j;

                if (time <= j) { // current time less than or equal to time currently looked at in array, less than doesnt work idk why
                    fasterThanAll++; // should increase every time it sees the time is less than another time
                }
            }

            if (!pMode) {

                findAverage();
                findMedian();

                if (fasterThanAll == ret.length && time > 0) {
                    document.getElementById('status').style.display = 'block';

                    document.getElementById('status').innerHTML = '<i class=\'fa-solid fa-circle-check\'></i>Correct! New record!';

                    if (theme == 0) {
                        document.getElementById('status').style.color = lightRed;
                    } else {
                        document.getElementById('status').style.color = titleRed;
                    }

                    record = time;

                    if (record == 1) {
                        document.getElementById('timesRecord').innerHTML = `<i class='fa-solid fa-stopwatch'></i>Record: ${record} second`;
                    } else {
                        document.getElementById('timesRecord').innerHTML = `<i class='fa-solid fa-stopwatch'></i>Record: ${record} seconds`;
                    }
                }

                if (ret.length > 1) {
                    if (average == 1) {
                        document.getElementById('timesAverage').innerHTML = `<i class='fa-solid fa-stopwatch'></i>Average: ${average} second`;
                    } else {
                        document.getElementById('timesAverage').innerHTML = `<i class='fa-solid fa-stopwatch'></i>Average: ${average} seconds`;
                    }
                }
            }

            addReachedGoal(goal, time);

            clearInterval(interval); // stops timer

            document.getElementById('enterTry').style.display = 'none';
            document.getElementById('resetTime').style.display = 'initial';

            document.getElementById('goalButton').disabled = true;
            document.getElementById('goalButton').classList.add('disabled');

        } else {
            document.getElementById('nextStepDiv').style.display = 'block';
            document.getElementById('skipStepDiv').style.display = 'none';
        }

        if (document.getElementById('status').innerText == 'Enter text to beat your record!') {
            document.getElementById('status').style.display = 'none';
        }

        /* if (document.getElementById('memTextDiv') !== 'none' && document.getElementById('memText') !== memText) {
            showText();
        } */

        document.getElementById('tryMemInput').disabled = true;
        document.getElementById('enterTry').disabled = true;
        document.getElementById('showText').disabled = true;
        document.getElementById('tryMemInput').classList.add('disabled');
        document.getElementById('enterTry').classList.add('disabled');
        document.getElementById('showText').classList.add('disabled');

        document.getElementById('tryMemInput').blur();

    } else if (step == 7 && document.getElementById('tryMemInput').value == '') {
        document.getElementById('status').style.display = 'block';

        document.getElementById('status').innerText = 'Enter text to beat your record!';
        document.getElementById('status').style.color = darkerRed;

    } else {
        document.getElementById('status').style.display = 'block';

        incorrect++;

        if (incorrect == 1) {
            document.getElementById('status').innerHTML = `<i class=\'fa-solid fa-circle-xmark\'></i>Incorrect!`;
        } else {
            document.getElementById('status').innerHTML = `<i class=\'fa-solid fa-circle-xmark\'></i>Incorrect! ×${incorrect}`;
        }

        document.getElementById('status').style.color = darkerRed;

        document.getElementById('tryMemInput').focus();

        if (step == 4 || step == 5 || step == 6 || step == 7) {
            if (incorrect >= incLimit) {
                document.getElementById('showText').style.display = 'initial';
            }
        }
    }

    if (!isNaN(goal) && goal !== 0 && time <= goal && time > 0) { // if the goal is a number (not null) and is not 0 and the time is less than the goal, then say it reached the goal, else just say correct
        document.getElementById('status').innerHTML = `<i class=\'fa-solid fa-circle-check\'></i>Correct! You reached your goal!`;
        if (theme == 0) {
            document.getElementById('status').style.color = lightRed;
        } else {
            document.getElementById('status').style.color = titleRed;
        }

        if (goal == 1) {
            document.getElementById('goalButton').innerHTML = `<i class=\'fa-solid fa-circle-check\'></i><b>${goal} second</b>`;
        } else {
            document.getElementById('goalButton').innerHTML = `<i class=\'fa-solid fa-circle-check\'></i><b>${goal} seconds</b>`;
        }

    }

    document.getElementById('status').style.display = 'block';
}

/* this converts list to array (ret) somehow */

function listToArray() {
    listItems = document.getElementById('timesList').getElementsByTagName('li'),

        myArray = map(listItems, getText);
}

function map(arrayLike, fn) {
    ret = [];
    i = -1;
    len = arrayLike.length;
    while (++i < len) ret[i] = fn(arrayLike[i]);

    return ret;
}

function getText(node) {
    if (node.nodeType === 3) return node.data;
    txt = '';
    if (node = node.firstChild) do {
        txt += getText(node);

    } while (node = node.nextSibling);

    txt = txt.replace(' seconds', '').replace(' second', ''); // replaces the word 'second' to compare the times

    return txt;
}

/* */

function addTime(time) {
    if (time > 0 && pMode == false) {
        var li = document.createElement('li');
        li.className = 'listEl';

        if (time == 1) {
            var inputValue = `${time} second`;
        } else {
            var inputValue = `${time} seconds`;
        }

        var icon = document.createElement('i');
        icon.className = 'fa-solid fa-stopwatch';
        li.appendChild(icon);

        var text = document.createTextNode(inputValue);
        li.appendChild(text);

        document.getElementById('timesList').appendChild(li);

        if (document.getElementById('timesSubtextEl').style.display !== 'none') {
            document.getElementById('timesSubtextEl').style.display = 'none';
        }
    }
}

function addReachedGoal(goal, time) {
    if (!isNaN(goal) && goal !== 0 && time <= goal && time > 0 && pMode == false) { // if the goal is a number (not null) and is not 0 and the time is less than the goal
        li = document.createElement('li');
        li.className = 'listEl';

        var icon = document.createElement('i');
        icon.className = 'fa-solid fa-bullseye';
        li.appendChild(icon);

        if (goal == 1) {
            text = document.createTextNode(`${goal} second`);
        } else {
            text = document.createTextNode(`${goal} seconds`);
        }
        li.appendChild(text);

        li.appendChild(document.createElement('br'));

        icon = document.createElement('i');
        icon.className = 'fa-solid fa-stopwatch';
        li.appendChild(icon);

        if (time == 1) {
            text = document.createTextNode(`${time} second`);
        } else {
            text = document.createTextNode(`${time} seconds`);
        }
        li.appendChild(text);

        document.getElementById('goalsList').appendChild(li);

        document.getElementById('goalsSubtext').style.display = 'none';

    }
}

function speak() {
    var msg = new SpeechSynthesisUtterance();
    msg.text = memText;
    window.speechSynthesis.speak(msg);

    document.getElementById('nextStepDiv').style.display = 'block';
    document.getElementById('skipStepDiv').style.display = 'none';
}

function showText() {
    if (textVisible == false) {
        textVisible = true;

        document.getElementById('showText').innerHTML = '<i class=\'fa-solid fa-eye-slash\'></i>Hide Text';

        document.getElementById('memText').innerText = memText; // for step 4
        document.getElementById('memTextDiv').style.display = 'flex';

    } else {
        textVisible = false;

        document.getElementById('showText').innerHTML = '<i class=\'fa-solid fa-eye\'></i>Show Text';

        if (step == 4) {
            document.getElementById('memText').innerText = acronym;
        } else {
            document.getElementById('memTextDiv').style.display = 'none';
        }
    }
}

function toggleIgPunc() {
    if (igPunc == false) {
        igPunc = true;
        document.getElementById('ignorePunc').innerText = 'Ignore Punctuation: On';
    } else {
        igPunc = false;
        document.getElementById('ignorePunc').innerText = 'Ignore Punctuation: Off';
    }
}

function toggleAutoGoal() {
    if (auSeGo == false) {
        auSeGo = true;
        document.getElementById('autoSetGoal').innerText = 'Auto Set Goal: On';
        document.getElementById('changeDiffDiv').style.display = 'block';

    } else {
        auSeGo = false;
        document.getElementById('autoSetGoal').innerText = 'Auto Set Goal: Off';
        document.getElementById('changeDiffDiv').style.display = 'none';
    }
}

function changeIncLim() {
    if (incLimit < 8) {
        incLimit++;
    } else {
        incLimit = 1;
    }

    document.getElementById('incorrectLimit').innerText = 'Incorrect Limit: ' + incLimit;
}

function setGoal() {
    if (auSeGo) {
        userEntered = prompt('Enter a number to set your goal \n * This will disable auto set goal');
    } else {
        userEntered = prompt('Enter a number to set your goal');
    }

    if (userEntered == null || userEntered == '') {
        return;

    } else if (isNaN(userEntered)) {
        alert('Please enter a number');

    } else if (userEntered <= 0) {
        alert('Please enter a number above zero');

    } else if (userEntered > 3600) {
        alert('Please enter a lower number');

    } else {
        goal = (Math.round(userEntered * rnd)) / rnd;

        if (goal == 1) {
            document.getElementById('goalButton').innerHTML = `<i class=\'fa-solid fa-bullseye\'></i><b>${goal} second</b>`;
        } else {
            document.getElementById('goalButton').innerHTML = `<i class=\'fa-solid fa-bullseye\'></i><b>${goal} seconds</b>`;
        }

        auSeGo = false;
        document.getElementById('autoSetGoal').innerText = 'Auto Set Goal: Off';
        document.getElementById('changeDiffDiv').style.display = 'none';
    }
}

function changeGoalDiff() {
    if (goalDiff == 1) {
        goalDiff = 2;
        document.getElementById('changeDiff').innerText = 'Goal Difficulty: Normal';

    } else if (goalDiff == 2) {
        goalDiff = 3;
        document.getElementById('changeDiff').innerText = 'Goal Difficulty: Challenging';

    } else if (goalDiff == 3) {
        goalDiff = 1;
        document.getElementById('changeDiff').innerText = 'Goal Difficulty: Easy';
    }
}

function count() {
    if (document.getElementById('memInput').value == '') {
        wCount = 0;
        lCount = 0;
    } else {
        wCount = document.getElementById('memInput').value.replace(/\,/g, '').replace(/\./g, '').replace(/\!/g, '').replace(/\?/g, '').replace(/\&/g, '').replace(/\'/g, '').replace(/\'/g, '').replace(/\-/g, '').replace(/\%/g, '').replace(/\s\w/g, '^~^a').split('^~^').length;
        lCount = document.getElementById('memInput').value.replace(/\s/g, '').length;
    }

    if (wCount == 1) {
        document.getElementById('wordCount').innerText = `${wCount} word`;
    } else {
        document.getElementById('wordCount').innerText = `${wCount} words`;
    }

    if (lCount == 1) {
        document.getElementById('letterCount').innerText = `${lCount} letter`;
    } else {
        document.getElementById('letterCount').innerText = `${lCount} letters`;
    }
}

/* hides options when clicking off */

document.addEventListener('click', function handleClickOutsideBox(event) {
    if (!document.getElementById('fullOptionsDiv').contains(event.target)) {
        document.getElementById('optionsDiv').style.display = 'none';

        document.getElementById('showOptions').style.boxShadow = 'none';
        document.getElementById('showOptions').style.borderBottomLeftRadius = borderRadius;
        document.getElementById('showOptions').style.borderBottomRightRadius = borderRadius;
        document.getElementById('showOptions').style.backgroundColor = 'transparent';
        document.getElementById('showOptions').style.color = lightWhite;
    }
});

/* */

function showOps() {
    if (document.getElementById('optionsDiv').style.display == 'flex') {
        document.getElementById('optionsDiv').style.display = 'none';

        document.getElementById('showOptions').style.boxShadow = 'none';
        document.getElementById('showOptions').style.borderBottomLeftRadius = borderRadius;
        document.getElementById('showOptions').style.borderBottomRightRadius = borderRadius;
        document.getElementById('showOptions').style.backgroundColor = 'transparent';
        document.getElementById('showOptions').style.color = lightWhite;

        if (document.getElementById('memInput').value == 'ravioli ravioli give me the formuoli' || document.getElementById('tryMemInput').value == 'ravioli ravioli give me the formuoli') {
            document.getElementById('devDiv').style.display = 'block';
        }

    } else {
        document.getElementById('optionsDiv').style.display = 'flex';

        document.getElementById('showOptions').style.boxShadow = '0 5px 10px 0 ' + shadow;
        document.getElementById('showOptions').style.borderBottomLeftRadius = '0';
        document.getElementById('showOptions').style.borderBottomRightRadius = '0';
        document.getElementById('showOptions').style.backgroundColor = lightWhite;
        document.getElementById('showOptions').style.color = lightRed;
    }
}

/* hovering doesnt change color in css after clicking the button for some reason */

function onOps() {
    document.getElementById('showOptions').style.backgroundColor = lightWhite;
    document.getElementById('showOptions').style.color = lightRed;
}

function offOps() {
    if (document.getElementById('optionsDiv').style.display !== 'flex') {
        document.getElementById('showOptions').style.backgroundColor = 'transparent';
        document.getElementById('showOptions').style.color = lightWhite;
    }
}

/* */

function editText() {
    document.getElementById('memEditText').value = memText;

    document.getElementById('memEditText').style.display = 'flex';
    document.getElementById('memText').style.display = 'none';

    document.getElementById('editMemText').style.display = 'none';
    document.getElementById('saveMemText').style.display = 'flex';
    document.getElementById('closeMemText').style.display = 'flex';

    disableOnEdit();

    document.getElementById('memTextDiv').style.borderBottomColor = '#3c8b91';
    document.getElementById('memTextDiv').style.borderBottomLeftRadius = '0';
    document.getElementById('memTextDiv').style.borderBottomRightRadius = '0';

    document.getElementById('memEditText').focus();
}

function saveText() {
    document.getElementById('memEditText').style.display = 'none';
    document.getElementById('memText').style.display = 'flex';

    memText = document.getElementById('memEditText').value;

    if (step == 4) {
        matches = memText.match(/\b(\w)/g); // ['U','W','U']
        acronym = matches.join('___ '); // U___ W___ U
        acronym = acronym + '___'; // U___ W___ U___
        document.getElementById('memText').innerText = acronym;
    } else {
        document.getElementById('memText').innerText = memText;
    }

    document.getElementById('editMemText').style.display = 'flex';
    document.getElementById('saveMemText').style.display = 'none';
    document.getElementById('closeMemText').style.display = 'none';

    enableOnEdit();

    document.getElementById('memTextDiv').style.borderBottomColor = 'transparent';
    document.getElementById('memTextDiv').style.borderBottomLeftRadius = borderRadius;
    document.getElementById('memTextDiv').style.borderBottomRightRadius = borderRadius;

    document.getElementById('memEditText').innerText = memText;
    document.getElementById('memEditText').blur();

    if (document.getElementById('nextStepDiv').style.display !== 'block') {
        document.getElementById('tryMemInput').focus();
    }
}

function closeText() {
    document.getElementById('memEditText').style.display = 'none';
    document.getElementById('memText').style.display = 'flex';

    document.getElementById('editMemText').style.display = 'flex';
    document.getElementById('saveMemText').style.display = 'none';
    document.getElementById('closeMemText').style.display = 'none';

    enableOnEdit();

    document.getElementById('memTextDiv').style.borderBottomColor = 'transparent';
    document.getElementById('memTextDiv').style.borderBottomLeftRadius = borderRadius;
    document.getElementById('memTextDiv').style.borderBottomRightRadius = borderRadius;

    document.getElementById('memEditText').innerText = memText;
    document.getElementById('memEditText').blur();

    if (document.getElementById('nextStepDiv').style.display !== 'block') {
        document.getElementById('tryMemInput').focus();
    }
}

function disableOnEdit() {
    document.getElementById('tryMemInput').disabled = true;
    document.getElementById('enterTry').disabled = true;
    document.getElementById('speakText').disabled = true;
    document.getElementById('showText').disabled = true;
    document.getElementById('nextStep').disabled = true;
    document.getElementById('skipStep').disabled = true;
    document.getElementById('tryMemInput').classList.add('disabled');
    document.getElementById('enterTry').classList.add('disabled');
    document.getElementById('speakText').classList.add('disabled');
    document.getElementById('showText').classList.add('disabled');
    document.getElementById('nextStep').classList.add('disabledFilled');
    document.getElementById('skipStep').classList.add('disabledFilled');
}

function enableOnEdit() {
    if ((step !== 7 && document.getElementById('nextStepDiv').style.display !== 'block') || (step == 7 && document.getElementById('resetTime').style.display !== 'initial')) {
        document.getElementById('tryMemInput').disabled = false;
        document.getElementById('enterTry').disabled = false;
        document.getElementById('showText').disabled = false;
        document.getElementById('tryMemInput').classList.remove('disabled');
        document.getElementById('enterTry').classList.remove('disabled');
        document.getElementById('showText').classList.remove('disabled');
    }

    document.getElementById('speakText').disabled = false;
    document.getElementById('nextStep').disabled = false;
    document.getElementById('skipStep').disabled = false;
    document.getElementById('speakText').classList.remove('disabled');
    document.getElementById('nextStep').classList.remove('disabledFilled');
    document.getElementById('skipStep').classList.remove('disabledFilled');
}

function findAverage() {
    average = (Math.round((sum / ret.length) * rnd)) / rnd;
    sum = 0; // resets sum
}

function findMedian() {
    ret.sort(function (a, b) {
        return a - b;
    });

    half = Math.floor(ret.length / 2);

    if (ret.length % 2) {
        median = (Math.round(ret[half] * rnd)) / rnd;
    } else {
        median = (Math.round((+(ret[half - 1]) + +(ret[half])) / 2.0 * rnd)) / rnd;
    }
}

function setInputs() {
    if (igPunc) { // changes values if ignore punctuation is on
        currentInput = document.getElementById('tryMemInput').value.toString().toLowerCase().replace(/\,/g, '').replace(/\./g, '').replace(/\!/g, '').replace(/\?/g, '').replace(/\&/g, '').replace(/\'/g, '').replace(/\'/g, '').replace(/\-/g, '').replace(/\%/g, '').replace(/\s/g, '');
        ogInput = memText.toString().toLowerCase().replace(/\,/g, '').replace(/\./g, '').replace(/\!/g, '').replace(/\?/g, '').replace(/\&/g, '').replace(/\'/g, '').replace(/\'/g, '').replace(/\-/g, '').replace(/\%/g, '').replace(/\s/g, '');
    } else {
        currentInput = document.getElementById('tryMemInput').value.toString().toLowerCase();
        ogInput = memText.toString().toLowerCase();
    }
}

function togglePractice() {
    if (pMode == false) {
        pMode = true;
        document.getElementById('practiceButton').innerHTML = `Practice Mode: On`;

        document.getElementById('goalButton').innerHTML = `<i class=\'fa-solid fa-bullseye\'></i>Set Goal`;
        goal = 0;

        document.getElementById('goalButton').disabled = true;
        document.getElementById('goalButton').classList.add('disabled');

    } else {
        pMode = false;
        document.getElementById('practiceButton').innerHTML = `Practice Mode: Off`;

        if (document.getElementById('resetTime').style.display !== 'initial') {
            document.getElementById('goalButton').disabled = false;
            document.getElementById('goalButton').classList.remove('disabled');
        }
    }
}

function pauseUnpause() {
    if (paused == false) {
        paused = true;

    } else {
        paused = false;
    }
}

document.body.onkeyup = function (event) {
    if (event.keyCode == 13) {
        if (document.getElementById('memInput') === document.activeElement && (document.getElementById('tryMemInput') === document.activeElement) == false && (document.getElementById('memEditText') === document.activeElement) == false) {
            document.getElementById('nextStep').click(); // clicks next for 1st step
            // next clicked b/c 1st input was active, 2nd and edit was not

        } else if (document.getElementById('tryMemInput') === document.activeElement && (document.getElementById('memInput') === document.activeElement) == false && (document.getElementById('memEditText') === document.activeElement) == false) {
            document.getElementById('enterTry').click(); // clicks enter
            // enter clicked b/c 2nd input was active, 1st and edit was not

        } else if (document.getElementById('memEditText') === document.activeElement && (document.getElementById('memInput') === document.activeElement) == false && (document.getElementById('tryMemInput') === document.activeElement) == false) {
            document.getElementById('saveMemText').click(); // clicks save edit
            // enter clicked b/c edit input was active, 1st and 2nd was not

        } else if (document.getElementById('nextStepDiv').style.display == 'block') {
            document.getElementById('nextStep').click(); // clicks next for all steps except 1st step
            // next clicked b/c nextstepdiv was visible

        } else if (document.getElementById('speakText').style.display == 'block') {
            document.getElementById('speakText').click(); // clicks speak
            // speak clicked b/c speak button was visible

        } else if (document.getElementById('resetTime').style.display == 'initial' && document.getElementById('enterTry').style.display == 'none') {
            document.getElementById('resetTime').click(); // clicks reset
            // reset clicked b/c resettime button was visible
        }

    } else if (event.keyCode == 27) {
        if (document.getElementById('memEditText') === document.activeElement) {
            document.getElementById('closeMemText').click();
        }

    } else if (event.keyCode == 38) {
        if (document.getElementById('tryMemInput') === document.activeElement && document.getElementById('showText').style.display == 'initial' && textVisible == false) {
            document.getElementById('showText').click();

        } else if (document.getElementById('tryMemInput') === document.activeElement && document.getElementById('memTextDiv').style.display == 'flex') {
            document.getElementById('editMemText').click();
        }

    } else if (event.keyCode == 40) {
        if (document.getElementById('memEditText') === document.activeElement && document.getElementById('memTextDiv').style.display == 'flex') {
            document.getElementById('closeMemText').click();

        } else if (document.getElementById('tryMemInput') === document.activeElement && document.getElementById('showText').style.display == 'initial' && textVisible == true) {
            document.getElementById('showText').click();
        }
    }
}

function changeTheme() {
    let el = document.querySelectorAll('*');

    if (currentTheme == 0) {
        currentTheme = 1;
        document.getElementById('themeButton').innerText = 'theme: highlight red';

        for (var i = 0; i < el.length; i++) {
            el[i].style.backgroundColor = '#cf000021';
            el[i].style.borderColor = '#cf000021';
        }

    } else if (currentTheme == 1) {
        currentTheme = 2;
        document.getElementById('themeButton').innerText = 'theme: highlight yellow';

        for (var i = 0; i < el.length; i++) {
            el[i].style.backgroundColor = '#e0cf0d21';
            el[i].style.borderColor = '#e0cf0d21';
        }

    } else if (currentTheme == 2) {
        currentTheme = 3;
        document.getElementById('themeButton').innerText = 'theme: highlight green';

        for (var i = 0; i < el.length; i++) {
            el[i].style.backgroundColor = '#07e04421';
            el[i].style.borderColor = '#07e04421';
        }

    } else if (currentTheme == 3) {
        currentTheme = 4;
        document.getElementById('themeButton').innerText = 'theme: highlight blue';

        for (var i = 0; i < el.length; i++) {
            el[i].style.backgroundColor = '#005eff21';
            el[i].style.borderColor = '#005eff21';
        }

    } else if (currentTheme == 4) {
        currentTheme = 5;
        document.getElementById('themeButton').innerText = 'theme: highlight purple';

        for (var i = 0; i < el.length; i++) {
            el[i].style.backgroundColor = '#f700ff21';
            el[i].style.borderColor = '#f700ff21';
        }

    } else if (currentTheme == 5) {
        currentTheme = 0;
        document.getElementById('themeButton').innerText = 'theme: black and white';

        for (var i = 0; i < el.length; i++) {
            el[i].style.backgroundColor = 'initial';
            el[i].style.borderColor = 'initial';
        }
    }
}

function toggleTheme() {
    if (theme == 0) {
        document.getElementById('darkTheme').innerText = 'Theme: Dark';
        theme = 1;

        dThemeTitle = '#fff';
        lightRed = '#1a1a1a';
        titleRed = '#edb2b2';
        darkerRed = '#db786e';
        lightWhite = '#c1d5de';
        darkerWhite = '#3a3e40';
        darkestBlue = '#549da1';
        green = '#4db062';

        document.documentElement.style.setProperty('--lightRed', lightRed);
        document.documentElement.style.setProperty('--titleRed', titleRed);
        document.documentElement.style.setProperty('--red', '#805252');
        document.documentElement.style.setProperty('--darkRed', '#bf7e83');
        document.documentElement.style.setProperty('--darkerRed', darkerRed);

        document.documentElement.style.setProperty('--select', '#65cbdd8f');
        document.documentElement.style.setProperty('--lightBlue', '#1e3c3d');
        document.documentElement.style.setProperty('--blue', '#274b4d');
        document.documentElement.style.setProperty('--darkBlue', '#325f61');
        document.documentElement.style.setProperty('--darkerBlue', '#498a8c');
        document.documentElement.style.setProperty('--darkestBlue', darkestBlue);
        document.documentElement.style.setProperty('--textBlue', '#cae1e3');

        document.documentElement.style.setProperty('--lighterWhite', '#fafeff');
        document.documentElement.style.setProperty('--lightWhite', lightWhite);
        document.documentElement.style.setProperty('--darkWhite', '#2e3133');
        document.documentElement.style.setProperty('--darkerWhite', darkerWhite);
        document.documentElement.style.setProperty('--darkestWhite', '#b8c2c5');
        document.documentElement.style.setProperty('--moreDarkestWhite', '#d3dcdf');
        document.documentElement.style.setProperty('--mostDarkestWhite', '#eff5f7');
        document.documentElement.style.setProperty('--semiTransparentWhite', '#516f7288');

        document.getElementById('title').style.color = dThemeTitle;
        document.getElementById('showOptions').style.backgroundColor = lightWhite;
        document.getElementById('showOptions').style.color = lightRed;
        document.getElementById('optionsDiv').style.backgroundColor = darkerWhite;
        document.getElementById('timesRecord').style.color = titleRed;

        document.documentElement.style.setProperty('--disabled', '#596970');
        document.documentElement.style.setProperty('--darkDisabled', '#4a5a61');
        document.documentElement.style.setProperty('--disabledFilled', '#3e5b63');

        document.documentElement.style.setProperty('--green', green);

    } else if (theme == 1) {
        document.getElementById('darkTheme').innerText = 'Theme: Midnight';
        theme = 2;

        lightRed = '#000';
        lightWhite = '#cadbe3';
        darkerWhite = '#1e2021';
        darkestBlue = '#49898a';

        document.documentElement.style.setProperty('--lightRed', lightRed);

        document.documentElement.style.setProperty('--lightBlue', '#000');
        document.documentElement.style.setProperty('--blue', '#162b2b');
        document.documentElement.style.setProperty('--darkBlue', '#213e40');
        document.documentElement.style.setProperty('--darkerBlue', '#40797a');
        document.documentElement.style.setProperty('--darkestBlue', darkestBlue);

        document.documentElement.style.setProperty('--lightWhite', lightWhite);
        document.documentElement.style.setProperty('--darkWhite', '#131414');
        document.documentElement.style.setProperty('--darkerWhite', darkerWhite);

        document.getElementById('showOptions').style.backgroundColor = lightWhite;
        document.getElementById('showOptions').style.color = lightRed;
        document.getElementById('optionsDiv').style.backgroundColor = darkerWhite;

    } else if (theme == 2) {
        document.getElementById('darkTheme').innerText = 'Theme: Light';
        theme = 0;

        lightRed = '#d14848';
        titleRed = '#ffd0d0';
        darkerRed = '#bd493c';
        lightWhite = '#eff5f7';
        darkerWhite = '#b8c2c5';
        darkestBlue = '#2d6a6e';
        green = '#368546';

        document.documentElement.style.setProperty('--lightRed', lightRed);
        document.documentElement.style.setProperty('--titleRed', titleRed);
        document.documentElement.style.setProperty('--red', '#ec9aa2');
        document.documentElement.style.setProperty('--darkRed', '#a83d46');
        document.documentElement.style.setProperty('--darkerRed', darkerRed);

        document.documentElement.style.setProperty('--select', '#4c99a78f');
        document.documentElement.style.setProperty('--lightBlue', '#6ce5e9');
        document.documentElement.style.setProperty('--blue', '#56cfd8');
        document.documentElement.style.setProperty('--darkBlue', '#49afb3');
        document.documentElement.style.setProperty('--darkerBlue', '#3c8b91');
        document.documentElement.style.setProperty('--darkestBlue', darkestBlue);
        document.documentElement.style.setProperty('--textBlue', '#162a2c');

        document.documentElement.style.setProperty('--lighterWhite', '#f8fdff');
        document.documentElement.style.setProperty('--lightWhite', lightWhite);
        document.documentElement.style.setProperty('--darkWhite', '#d3dcdf');
        document.documentElement.style.setProperty('--darkerWhite', darkerWhite);
        document.documentElement.style.setProperty('--darkestWhite', '#97a2a5');
        document.documentElement.style.setProperty('--moreDarkestWhite', '#7e888b');
        document.documentElement.style.setProperty('--mostDarkestWhite', '#444d52');
        document.documentElement.style.setProperty('--semiTransparentWhite', '#ffffff7e');

        document.getElementById('showOptions').style.backgroundColor = lightWhite;
        document.getElementById('showOptions').style.color = lightRed;
        document.getElementById('optionsDiv').style.backgroundColor = lightWhite;
        document.getElementById('timesRecord').style.color = lightRed;

        document.documentElement.style.setProperty('--disabled', '#60757e');
        document.documentElement.style.setProperty('--darkDisabled', '#7192a1');
        document.documentElement.style.setProperty('--disabledFilled', '#476977');

        document.documentElement.style.setProperty('--green', green);
    }
}