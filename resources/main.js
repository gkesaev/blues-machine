var context = new AudioContext();
var duration = 1;
var interval = 2;
class Note{
    constructor(name, freqArr, duration = 1){
        this._name = name;
        this._freqArr = freqArr;
        this._duration = duration;
        this._isActive = 1;
    }
    set name(name){ this._name = name;}
    get name(){ return this._name;}
    set duration(duration){ this._duration = duration;}
    get duration(){ return this._duration;}
    set freqArr(freqArr){ this._freqArr = freqArr;}
    get freqArr(){ return this._freqArr;}
    set isActive(isActive){ this._isActive = isActive;}
    get isActive(){ return this._isActive;}

    enable(){ 
        this._isActive = true;
        let el = document.querySelector('.note-' + this._name);
        el.classList.remove('disabled');
    }
    disable(){ 
        this._isActive = false;
        let el = document.querySelector('.note-' + this._name);
        el.classList.add('disabled');
    }
}

var notes = {
    "C" : new Note("C" , [261.6, 523.3, 261.6]),
    "CS": new Note("CS", [277.2, 554.4, 277.2]),
    "D" : new Note("D" , [293.7, 587.3, 293.7]),
    "DS": new Note("DS", [311.1, 622.3, 311.1]),
    "E" : new Note("E" , [329.6, 659.3]),
    "F" : new Note("F" , [349.2, 698.5]),
    "FS": new Note("FS", [370, 740]),
    "G" : new Note("G" , [392, 784]),
    "GS": new Note("GS", [415.3, 830.6]),
    "A" : new Note("A" , [440, 880]),
    "AS": new Note("AS", [466.2, 932.3]),
    "B" : new Note("B" , [493.9, 987.8]),
    "-" : new Note("-" , [0])
} // due to the table: https://www.seventhstring.com/resources/notefrequencies.html

var initialSet = new Set();
var buffer = [];

document.querySelector('.play-button').addEventListener("click", () => startPlay());
document.querySelector('.stop-button').addEventListener("click", () => stopPlay());
document.querySelector('.generate-button').addEventListener("click", () => generate());
document.querySelector('.reset-button').addEventListener("click", () => reset());
document.querySelector('.identity-button').addEventListener("click", () => addIdentity());
document.querySelector('.reverse-button').addEventListener("click", () => addReversed());

function play(frequency, duration, time) {
    let o = context.createOscillator();
    let g = context.createGain();
    o.connect(g);
    g.connect(context.destination);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration + time);
    o.frequency.value = frequency;
    o.start(time);
}

function onNoteClick(noteName){
    if (notes[noteName]._isActive){
        notes[noteName].disable();
        addToBuffer(noteName);
        playNote(noteName);
    }
}

function addToBuffer(noteName){
    initialSet.add(noteName.toUpperCase());
    buffer = Array.from(initialSet);
    document.querySelector('.chosen-keys').innerHTML = buffer.join(", ");
    showBuffer();
}

function playNote(noteName){
    for (let i = 0; i < notes[noteName].freqArr.length; i++) {
        play(notes[noteName].freqArr[i], notes[noteName].duration, i * interval);
    }
}

function generate(){
    for (let i = 0; i < buffer.length; i++){
        let noteName = buffer[i];
        let waitingTime = (interval + notes[noteName].duration * 500);
        var tOut = setTimeout(() => true, waitingTime);
        playNote(noteName)
        wait(waitingTime);
    }
}

function reset(){
    for (let i in notes){
        notes[i].enable();
    }
    initialSet.clear();
    document.querySelector('.final-set-keys').innerHTML = "";
    document.querySelector('.chosen-keys').innerHTML = "";
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

function addReversed(){
    let tempBuff = Array.from(initialSet);;
    buffer = buffer.concat(tempBuff.reverse());
    showBuffer();
}

function showBuffer(){
    let tempBuff = buffer;
    document.querySelector('.final-set-keys').innerHTML = tempBuff.join(", ");
}

function storeSequence(){
    //save the sequence to the DB
}