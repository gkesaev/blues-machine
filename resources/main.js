var context = new AudioContext();
var duration = 1;
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
            el.classList.remove('disabled');
        }
    }
    disable(){ 
        this._isActive = false;
        let el = document.querySelector('.note-' + this._name);
        if (el){
            el.classList.add('disabled');
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
document.querySelector('.stop-button').addEventListener("click", stopPlay);
document.querySelector('.generate-button').addEventListener("mouseup", generate);
document.querySelector('.reset-button').addEventListener("click", reset);
document.querySelector('.identity-button').addEventListener("click", addIdentity);
document.querySelector('.retrograde-button').addEventListener("click", addRetrograde);
document.querySelector('.transposition-button').addEventListener("click", addTransposition);
document.querySelector('.pause-button').addEventListener("click", addPause);
document.querySelector('.bpm-value').addEventListener("change", () => transposition(3));

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

function generate(){
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
    document.querySelectorAll('button').forEach((x) => x.removeAttribute('disabled'));
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

function startPlay(){
    // document.querySelector('.generate-button').setAttribute('disabled', 'disabled');
}

function stopPlay(){
    document.querySelector('.stop-button').setAttribute('disabled', 'disabled');
    document.querySelector('.generate-button').removeAttribute('disabled');
    // context.close();
}

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
    //save the sequence to the DB
}