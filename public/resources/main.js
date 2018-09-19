if (window.location.hostname === "georgekesaev.github.io") {
    window.location.href = "https://blues-machine.herokuapp.com/";
}

window.onload = () => {
    let isChrome = !!window.chrome && !!window.chrome.webstore;
    if (!isChrome){
        let elem = document.querySelector('header');
        let node = document.createElement('H4');
        node.innerText = "For best experience please use Google Chrome.";
        node.style.color = 'black';
        elem.appendChild(node);
    }
};
var context = new AudioContext();
var interval = 2;
var isPaused = false;
var keepPlaying = false;
var playedNote = -1;

class Note {
    constructor(noteId, name, displayName, freqArr, duration = 1) {
        this._noteId = noteId;
        this._name = name;
        this._displayName = displayName;
        this._freqArr = freqArr;
        this._duration = duration;
        this._isActive = true;
    }
    set name(noteId) { this._noteId = noteId; }
    get name() { return this._noteId; }
    set name(name) { this._name = name; }
    get name() { return this._name; }
    set name(displayName) { this._displayName = displayName; }
    get name() { return this._displayName; }
    set duration(duration) { this._duration = duration; }
    get duration() { return this._duration; }
    set freqArr(freqArr) { this._freqArr = freqArr; }
    get freqArr() { return this._freqArr; }
    set isActive(isActive) { this._isActive = isActive; }
    get isActive() { return this._isActive; }

    enable() {
        this._isActive = true;
        let el = document.querySelector('.note-' + this._name);
        if (el) {
            el.classList.remove('disabled-key');
        }
    }
    disable() {
        this._isActive = false;
        let el = document.querySelector('.note-' + this._name);
        if (el) {
            el.classList.add('disabled-key');
        }
    }
}

var notes = {
    0: new Note(0, "C", "C", [261.6, 523.3, 261.6]),
    1: new Note(1, "CS", "C#", [277.2, 554.4, 277.2]),
    2: new Note(2, "D", "D", [293.7, 587.3, 293.7]),
    3: new Note(3, "DS", "D#", [311.1, 622.3, 311.1]),
    4: new Note(4, "E", "E", [329.6, 659.3]),
    5: new Note(5, "F", "F", [349.2, 698.5]),
    6: new Note(6, "FS", "F#", [370, 740]),
    7: new Note(7, "G", "G", [392, 784]),
    8: new Note(8, "GS", "G#", [415.3, 830.6]),
    9: new Note(9, "A", "A", [440, 880]),
    10: new Note(10, "AS", "A#", [466.2, 932.3]),
    11: new Note(11, "B", "B", [493.9, 987.8]),
    12: new Note(12, "-", "-", [0])
} // due to the table: https://www.seventhstring.com/resources/notefrequencies.html

var initialSet = new Set();
var buffer = [];
var notesOfFinalSetElements = [];

document.querySelector('.play-button').addEventListener("click", startPlay);
document.querySelector('.pause-button').addEventListener("click", pausePlay);
document.querySelector('.reset-button').addEventListener("click", reset);
document.querySelector('.stop-button').addEventListener("click", stopPlay);
document.querySelector('.identity-button').addEventListener("click", addIdentity);
document.querySelector('.retrograde-button').addEventListener("click", addRetrograde);
document.querySelector('.transposition-button').addEventListener("click", addTransposition);
document.querySelector('.save-song').addEventListener("click", storeSequence);
document.querySelector('.load-song').addEventListener("click", showLoadSongPopup);
document.querySelectorAll('.close-popup').forEach(popup => popup.addEventListener("click", hidePopup));
document.querySelectorAll('.popup-mask').forEach(mask => mask.addEventListener('click', hidePopup));

let error_message_element = document.querySelectorAll('.error-message');
let chosen_keys = document.querySelector('.chosen-keys');
let clipboard_element = document.getElementById("copyToClipboard");
let final_set_keys_element = document.querySelector('.final-set-keys');
clipboard_element.addEventListener("click", copyToClipboard);
clipboard_element.addEventListener('mouseover', outFunc);

function onNoteClick(noteId) {
    let note = notes[noteId];
    if (note._isActive) {
        note.disable();
        addToBuffer(note);
        playNote(note);
    }
}

function disableButtons(flag) {
    document.querySelector('.identity-button').disabled = flag;
    document.querySelector('.retrograde-button').disabled = flag;
    document.querySelector('.transposition-button').disabled = flag;
    document.querySelector('.play-button').disabled = flag;
    document.querySelector('.pause-button').disabled = flag;
    document.querySelector('.save-song').disabled = flag;
}

function loadNote(noteId) {
    let note = notes[noteId];
    if (note._isActive) {
        note.disable();
        addToBuffer(note);
    }
}

function addToBuffer(note) {
    buffer.push(note);

    if (initialSet.size < 12) {
        let newNoteToInitialSet = "<div class='one-note-of-initial-set'>" + note._displayName + "</div>";
        initialSet.add(note);
        chosen_keys.innerHTML = buffer.length == 1 ? newNoteToInitialSet : chosen_keys.innerHTML + " " + newNoteToInitialSet;

        if (initialSet.size == 12) {
            disableButtons(false);
            showBuffer();
        }
    }
}

function play(frequency, duration, time) {
    let o = context.createOscillator();
    let g = context.createGain();
    o.connect(g);
    g.connect(context.destination);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration + time);
    o.frequency.value = frequency;
    o.start(time);
}

function playNote(note) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < note._freqArr.length; i++) {
            play(note._freqArr[i], note._duration, i * interval);
        }
    });
}

function markPlayedNote(){
    notesOfFinalSetElements[playedNote].style.backgroundColor = '#c0d857';
    notesOfFinalSetElements[playedNote].style.color = 'white';
    notesOfFinalSetElements[playedNote].style.width = '35px';
    notesOfFinalSetElements[playedNote].style.height = '35px';
    notesOfFinalSetElements[playedNote].style.lineHeight = '35px';
}

function unMarkPlayedNotes(noteIndex){
    if(noteIndex === undefined){
        notesOfFinalSetElements.forEach(elem => {
            elem.style.backgroundColor = '';
            elem.style.color = '';
            elem.style.width = '';
            elem.style.height = '';
            elem.style.lineHeight = '';
        });
    }
    else{
        notesOfFinalSetElements[noteIndex].style.backgroundColor = '';
        notesOfFinalSetElements[noteIndex].style.color = '';
        notesOfFinalSetElements[noteIndex].style.width = '';
        notesOfFinalSetElements[noteIndex].style.height = '';
        notesOfFinalSetElements[noteIndex].style.lineHeight = '';
    }
}

function playing() {
    if (playedNote >= -1 && playedNote < buffer.length && keepPlaying)  {
        playedNote++;
        markPlayedNote();
        playNote(buffer[playedNote]);
        setTimeout(() => {
            let c = playedNote;
            if (-1 < c && c < buffer.length && !isPaused){
                unMarkPlayedNotes(c);
                playing();
            }
        }, interval + buffer[playedNote]._duration * 500);
    }
}

function startPlay() {
    if(isPaused == false){
        
    }
    else{
        unMarkPlayedNotes();
        isPaused = false;
    }
    keepPlaying = true;
    playing();
}

function stopPlay() {
    keepPlaying = false;
    isPaused = false;
    unMarkPlayedNotes();
    playedNote = -1;
}

function pausePlay(){
    keepPlaying = false;
    isPaused = true;
}

function reset() {
    stopPlay();
    document.querySelector('.play-button').addEventListener("click", startPlay);
    Object.keys(notes).forEach((key) => notes[key].enable());
    disableButtons(true);
    initialSet.clear();
    buffer = [];
    final_set_keys_element.innerHTML = "Complete your initial set and then use the options above";
    chosen_keys.innerHTML = "Click on the piano to start playing";
}

function addIdentity() {
    let tempBuff = Array.from(initialSet);;
    buffer = buffer.concat(tempBuff);
    showBuffer();
}

function addRetrograde() {
    let tempBuff = Array.from(initialSet);;
    buffer = buffer.concat(tempBuff.reverse());
    showBuffer();
}

function addTransposition() {
    let byHowMuch = document.querySelector('input[name="transposition"]').value;
    if (byHowMuch === undefined || byHowMuch === "") {
        byHowMuch = 0;
    }
    initialSet.forEach(note => {
        let newNoteId = (note._noteId + parseInt(byHowMuch)) % 12;
        while (newNoteId < 0) {
            newNoteId += 12;
        }
        buffer.push(notes[newNoteId]);
    });
    showBuffer();
}

function addPause() {
    buffer.push(notes[12]);
    showBuffer();
}

function showBuffer() {
    final_set_keys_element.innerHTML = "";
    let newFinalNote = "";
    buffer.forEach(note => {
        newFinalNote = "<div class='one-note-of-final-set'>" + note._displayName + "</div>";
        final_set_keys_element.innerHTML = final_set_keys_element.innerHTML + " " + newFinalNote;
    });
    notesOfFinalSetElements = document.querySelectorAll('.one-note-of-final-set');
}

function storeSequence() {
    if (buffer.length > 0) {
        let data = {};
        data.notes = buffer;

        let p = request('POST', '/song', data);
        p.then(res => {
            let songId = res;
            document.querySelector(".saved-song-number").innerHTML = "<strong>" + songId + "</strong>";
            clipboard_element.style.visibility = "visible";
        })
            .catch(err => popupError(err));
    }
    else {
        popupError("Cannot save an empty song");
    }
    showSaveSongPopup();
}

function loadSequence() {
    let load_id = document.getElementById("songID").value;

    let p = request("GET", "/song/" + load_id);
    p.then(res => {
        if (res.errors === undefined || res.errors.length == 0) {
            let responseBuffer = res.notes;
            reset();
            responseBuffer.forEach(n => {
                if (initialSet.size <= 12) {
                    notes[n._noteId].disable();
                }
                addToBuffer(notes[n._noteId]);
            })
            showBuffer();
            hidePopup();
        }
        else {
            throw res.errors;
        }
    })
        .catch(err => popupError(err));
}

function showSaveSongPopup() {
    document.querySelector('.popup-mask').style.display = "initial";
    document.querySelector('.save-popup').style.display = "initial";
    clipboard_element.style.visibility = "visible";
}

function showLoadSongPopup() {
    document.querySelector('.load-button').addEventListener("click", loadSequence);
    document.querySelector('.popup-mask').style.display = "initial";
    document.querySelector('.load-popup').style.display = "initial";
}

function hidePopup() {
    document.querySelector('.popup-mask').style.display = "none";
    document.querySelector('.load-button').removeEventListener("click", loadSequence);
    document.querySelector('.save-popup').style.display = "none";
    document.querySelector('.load-popup').style.display = "none";
    clipboard_element.style.visibility = "hidden";
    error_message_element.forEach(p => p.style.visibility = 'hidden');
}

function request(method, url, data = {}) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener('load', e => resolve(JSON.parse(e.target.responseText)));
        xhr.addEventListener('error', e => reject(JSON.parse(e.target.responseText)));
        xhr.open(method, url);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(JSON.stringify(data));
    });
}

function copyToClipboard() {
    let textArea = document.createElement("textarea");
    textArea.value = document.querySelector(".saved-song-number").textContent;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    let tooltip = document.getElementById("copyToClipboardTooltip");
    tooltip.innerHTML = "Copied: " + document.querySelector(".saved-song-number").textContent;
}

function outFunc() {
    let tooltip = document.getElementById("copyToClipboardTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}

function popupError(err) {
    error_message_element.forEach(p => {
        p.textContent = err;
        p.style.visibility = 'visible'
    });
}
