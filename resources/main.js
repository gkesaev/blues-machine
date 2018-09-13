if (window.location.hostname === "georgekesaev.github.io") {
    window.location.href = "https://blues-machine.herokuapp.com/";
}

var context = new AudioContext();
// var duration = 1;
var interval = 2;
class Melody{
    constructor(setOfNotes, bpm){
        this._setOfNotes = setOfNotes;
        this._bpm = bpm;
    }
}
class Note{
    constructor(noteId, name, displayName, freqArr, duration = 1){
        this._noteId = noteId;
        this._name = name;
        this._displayName = displayName;
        this._freqArr = freqArr;
        this._duration = duration;
        this._isActive = true;
    }
    set name(noteId){ this._noteId = noteId;}
    get name(){ return this._noteId;}
    set name(name){ this._name = name;}
    get name(){ return this._name;}
    set name(displayName){ this._displayName = displayName;}
    get name(){ return this._displayName;}
    set duration(duration){ this._duration = duration;}
    get duration(){ return this._duration;}
    set freqArr(freqArr){ this._freqArr = freqArr;}
    get freqArr(){ return this._freqArr;}
    set isActive(isActive){ this._isActive = isActive;}
    get isActive(){ return this._isActive;}

    enable(){
        this._isActive = true;
        let el = document.querySelector('.note-' + this._name);
        if (el){
            el.classList.remove('disabled-key');
        }
    }
    disable(){
        this._isActive = false;
        let el = document.querySelector('.note-' + this._name);
        if (el){
            el.classList.add('disabled-key');
        }
    }
}

var notes = {
    0 : new Note(0 , "C" , "C" , [261.6, 523.3, 261.6]),
    1 : new Note(1 , "CS", "C#", [277.2, 554.4, 277.2]),
    2 : new Note(2 , "D" , "D" , [293.7, 587.3, 293.7]),
    3 : new Note(3 , "DS", "D#", [311.1, 622.3, 311.1]),
    4 : new Note(4 , "E" , "E" , [329.6, 659.3]),
    5 : new Note(5 , "F" , "F" , [349.2, 698.5]),
    6 : new Note(6 , "FS", "F#", [370, 740]),
    7 : new Note(7 , "G" , "G" , [392, 784]),
    8 : new Note(8 , "GS", "G#", [415.3, 830.6]),
    9 : new Note(9 , "A" , "A" , [440, 880]),
    10: new Note(10, "AS", "A#", [466.2, 932.3]),
    11: new Note(11, "B" , "B" , [493.9, 987.8]),
    12: new Note(12, "-" , "-" , [0])
} // due to the table: https://www.seventhstring.com/resources/notefrequencies.html

var initialSet = new Set();
var buffer = [];

document.querySelector('.play-button').addEventListener("click", startPlay);
// document.querySelector('.generate-button').addEventListener("mouseup", generate);
document.querySelector('.reset-button').addEventListener("click", reset);
document.querySelector('.identity-button').addEventListener("click", addIdentity);
document.querySelector('.retrograde-button').addEventListener("click", addRetrograde);
document.querySelector('.transposition-button').addEventListener("click", addTransposition);
document.querySelector('.pause-button').addEventListener("click", addPause);

document.querySelector('.bpm-value').addEventListener("change", () => transposition(document.querySelector("input[name=transposition]").value));

document.querySelector('.save-song').addEventListener("click", storeSequence);
document.querySelector('.load-song').addEventListener("click", showLoadSongPopup);
document.querySelectorAll('.close-popup').forEach(popup => popup.addEventListener("click", hidePopup));

function play(frequency, duration, time) {
    let o = context.createOscillator();
    let g = context.createGain();
    o.connect(g);
    g.connect(context.destination);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration + time);
    o.frequency.value = frequency;
    o.start(time);
}

function onNoteClick(noteId){
    let note = notes[noteId];
    if (note._isActive){
        note.disable();
        addToBuffer(note);
        playNote(note);
    }
}

function loadNote(noteId){
    let note = notes[noteId];
    if (note._isActive){
        note.disable();
        addToBuffer(note);
    }
}

function addToBuffer(note){
    initialSet.add(note);
    buffer = Array.from(initialSet);
    if(buffer.length == 1){
        document.querySelector('.chosen-keys').innerHTML = note._displayName;
    }
    else{
        document.querySelector('.chosen-keys').innerHTML += ", " + note._displayName;
    }
    showBuffer();
}

function playNote(note){
    for (let i = 0; i < note.freqArr.length; i++) {
        play(note.freqArr[i], note.duration, i * interval);
    }
}

function startPlay(){
    buffer.forEach((note) => {
        playNote(note);
        wait(interval + note.duration * 500);
    });
}

function reset(){
    Object.keys(notes).forEach((key) => notes[key].enable());
    initialSet.clear();
    buffer = [];
    document.querySelector('.final-set-keys').innerHTML = "Click on the piano to start playing";
    document.querySelector('.chosen-keys').innerHTML = "Click on the piano to start playing";
}

function wait(ms){
    let start = new Date();
    let stop = start;
    while(stop - start < ms){
        stop = new Date();
    }
}

function addIdentity(){
    let tempBuff = Array.from(initialSet);;
    buffer = buffer.concat(tempBuff);
    showBuffer();
}

function addRetrograde(){
    let tempBuff = Array.from(initialSet);;
    buffer = buffer.concat(tempBuff.reverse());
    showBuffer();
}

function changeBPM(){
    document.querySelector('.bpm-value').value;
}

function showBuffer(){
    let tempBuff = [];
    buffer.forEach((note) => tempBuff.push(note._displayName));
    document.querySelector('.final-set-keys').innerHTML = tempBuff.join(", ");
}

// function generate(){
//
// }

function addTransposition(){
    let tempBuff = [];
    let byHowMuch = document.querySelector('input[name="transposition"]').value;
    initialSet.forEach(note => {
        let newNoteId = (note._noteId + byHowMuch) % 12;
        tempBuff.push(notes[newNoteId]);
    });
    buffer = buffer.concat(tempBuff);
    showBuffer();
}

function addPause(){
    buffer.push(notes[12]);
    showBuffer();
}

function storeSequence(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let songId = JSON.parse(xhttp.responseText).song_id;

            document.querySelector(".saved-song-number").innerHTML = "<strong>" + songId + "</strong>"
        }
     };
    let n = [];
    buffer.forEach(note => n.push(note._noteId));
    let data = {};
    data.notes = n;
    let p = request('POST', '/song', data);
    p.then(res => {
        console.log("then res: " + JSON.stringify(res));
        let songId = res;
        document.querySelector(".saved-song-number").innerHTML = "<strong>" + songId + "</strong>";
    })
    .catch(err => console.error("catch err: " + err));
    showSaveSongPopup();
}

function loadSequence() {
    let load_id =  document.getElementsByName("songID")[0].value;
    console.log("loading id: " + load_id);

    let p = request("GET", "/song/" + load_id);
    p.then(res => {
        console.log("then res: " + JSON.stringify(res));
        console.log("then res: " + res.notes);
        let responseBuffer = res.notes;

        responseBuffer.forEach(noteId => loadNote(noteId));
        showBuffer();
        hidePopup();
    })
    .catch(err => console.error("catch err: " + err));
}

function showSaveSongPopup(){
    document.querySelector('.popup-mask').style.display="initial";
    document.querySelector('.save-popup').style.display="initial";
}

function showLoadSongPopup(){
    document.querySelector('.load-button').addEventListener("click", loadSequence);
    document.querySelector('.popup-mask').style.display="initial";
    document.querySelector('.load-popup').style.display="initial";
}

function hidePopup(){
    document.querySelector('.popup-mask').style.display="none";
    document.querySelector('.load-button').removeEventListener("click", loadSequence);
    document.querySelector('.save-popup').style.display="none";
    document.querySelector('.load-popup').style.display="none";
}

function request(method, url, data = {}) {
    console.log(data);
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener('load', e => resolve(JSON.parse(e.target.responseText)));
        xhr.addEventListener('error', e => reject(JSON.parse(e.target.responseText)));
        console.log("sending: " + JSON.stringify(data) + ", to URL: " + url);
        xhr.open(method, url);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(JSON.stringify(data));
    });
}
