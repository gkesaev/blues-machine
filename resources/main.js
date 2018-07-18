var context = new AudioContext();

var notes = [1175, 2794, 220, 240, 340, 500, 144];
var duration = 1;
var interval = 2;

function play(frequency, time) {
    let o = context.createOscillator();
    let g = context.createGain();
    o.connect(g);
    g.connect(context.destination);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration + time);
    o.frequency.value = frequency;
    o.start(time);
}

var buffer = [];

function playNote(noteClass, noteName){
    buffer.push(noteName.toUpperCase());
    document.querySelector('.chosen-keys').innerHTML = buffer.join(", ");

    // var note = document.querySelector('.' + note);
    // note.play();
    for (let i = 0; i < notes.length; i++) {
        play(notes[i], i * interval);
    }
}

function saveNote(note, buffer){
    //save the selected note to buffer on click
}

function storeSequence(buffer){
    //save the sequence to the DB
}

function addDuplicate(buffer){
    //add a duplicate of the sequence to the DB
}

function addRevesed(buffer){
    //add a revesed duplicate to the DB
}