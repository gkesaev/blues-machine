//import { WSAVERNOTSUPPORTED } from "constants";

var buffer = [];

function playNote(note){
    var note = document.querySelector('.' + note);
    note.play();
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