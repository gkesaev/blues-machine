var context;
window.addEventListener('load', init, false);
function init(){
    try{
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();

    }
    catch(e) {
        alert('Web Audio API is not supported in this browser, sorry');
    }
}

// Interesting example

// var context = null;   // the Web Audio "context" object
// var midiAccess = null;  // the MIDIAccess object.
// var oscillator = null;  // the single oscillator
// var envelope = null;    // the envelope for the single oscillator
// var attack = 0.05;      // attack speed
// var release = 0.05;   // release speed
// var portamento = 0.05;  // portamento/glide speed
// var activeNotes = []; // the stack of actively-pressed keys

// window.addEventListener('load', function () {
//     // patch up prefixes
//     window.AudioContext = window.AudioContext || window.webkitAudioContext;

//     context = new AudioContext();
//     if (navigator.requestMIDIAccess)
//         navigator.requestMIDIAccess().then(onMIDIInit, onMIDIReject);
//     else
//         alert("No MIDI support present in your browser.  You're gonna have a bad time.")

//     // set up the basic oscillator chain, muted to begin with.
//     oscillator = context.createOscillator();
//     oscillator.frequency.setValueAtTime(110, 0);
//     envelope = context.createGain();
//     oscillator.connect(envelope);
//     envelope.connect(context.destination);
//     envelope.gain.value = 0.0;  // Mute the sound
//     oscillator.start(0);  // Go ahead and start up the oscillator
// });

// function onMIDIInit(midi) {
//     midiAccess = midi;

//     var haveAtLeastOneDevice = false;
//     var inputs = midiAccess.inputs.values();
//     for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
//         input.value.onmidimessage = MIDIMessageEventHandler;
//         haveAtLeastOneDevice = true;
//     }
//     if (!haveAtLeastOneDevice)
//         alert("No MIDI input devices present.  You're gonna have a bad time.");
// }

// function onMIDIReject(err) {
//     alert("The MIDI system failed to start.  You're gonna have a bad time.");
// }

// function MIDIMessageEventHandler(event) {
//     // Mask off the lower nibble (MIDI channel, which we don't care about)
//     switch (event.data[0] & 0xf0) {
//         case 0x90:
//             if (event.data[2] != 0) {  // if velocity != 0, this is a note-on message
//                 noteOn(event.data[1]);
//                 return;
//             }
//         // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
//         case 0x80:
//             noteOff(event.data[1]);
//             return;
//     }
// }

// function frequencyFromNoteNumber(note) {
//     return 440 * Math.pow(2, (note - 69) / 12);
// }

// function noteOn(noteNumber) {
//     activeNotes.push(noteNumber);
//     oscillator.frequency.cancelScheduledValues(0);
//     oscillator.frequency.setTargetAtTime(frequencyFromNoteNumber(noteNumber), 0, portamento);
//     envelope.gain.cancelScheduledValues(0);
//     envelope.gain.setTargetAtTime(1.0, 0, attack);
// }

// function noteOff(noteNumber) {
//     var position = activeNotes.indexOf(noteNumber);
//     if (position != -1) {
//         activeNotes.splice(position, 1);
//     }
//     if (activeNotes.length == 0) {  // shut off the envelope
//         envelope.gain.cancelScheduledValues(0);
//         envelope.gain.setTargetAtTime(0.0, 0, release);
//     } else {
//         oscillator.frequency.cancelScheduledValues(0);
//         oscillator.frequency.setTargetAtTime(frequencyFromNoteNumber(activeNotes[activeNotes.length - 1]), 0, portamento);
//     }
// }

// //http://abcnotation.com/wiki/abc:standard:v2.1#abc_tutorials

// // Definitions of header

// X = "1";
// T = "machine";
// M = "4/4";
// L = "1/4";
// K = "C";
// Q = "1/4=120";
// Z = "John Smith, &lt;j.s@mail.com&gt";
// endline = "\n";
// // notes = "C,D,E,F,G,A,B,CDEFGABcdefgabc'd'e'f'g'a'b'";
// notes = "C,D,E,F,G,A,B,C";

// window.onload = function () {
//     MIDI.loadPlugin({
//         soundfontUrl: "./soundfont/",
//         instrument: "acoustic_grand_piano",
//         onprogress: function (state, progress) {
//             console.log(state, progress);
//         },
//         onsuccess: function () {
//             var delay = 0; // play one note every quarter second
//             var note = 50; // the MIDI note
//             var velocity = 127; // how hard the note hits
//             // play the note
//             MIDI.setVolume(0, 127);
//             MIDI.noteOn(0, note, velocity, delay);
//             MIDI.noteOff(0, note, delay + 0.75);
//         }
//     });
// };
// first = true;   //TODO: remove
// var counter = 0;
// var bar = [];
// var asciiBar = [];
// var improv = [];
// var asciiImprov = [];
// var notesLeft = document.getElementById("notes-left");
// notesLeft.value = 12 - bar.length;

// var context = new AudioContext(),
//     settings = {
//         id: 'keyboard',
//         width: 600,
//         height: 200,
//         startNote: 'C4',
//         whiteNotesColour: '#fff',
//         blackNotesColour: '#000',
//         borderColour: '#000',
//         activeColour: 'yellow',
//         octaves: 1
//     },
//     keyboard = new QwertyHancock(settings);

// masterGain = context.createGain();
// nodes = [];

// masterGain.gain.value = 0.5;
// masterGain.connect(context.destination);



// var getMIDIOfNote = function (note) {
//     var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
//         key_number,
//         octave;

//     if (note.length === 3) {
//         octave = note.charAt(2);
//     } else {
//         octave = note.charAt(1);
//     }

//     key_number = notes.indexOf(note.slice(0, -1));
//     console.log("key_number: " + key_number);
//     if (key_number < 3) {
//         // added + 8 to convert to midi numbers
//         key_number = key_number + 12 + ((octave - 1) * 12) + 1 + 8;
//     } else {
//         // added + 8 to convert to midi numbers
//         key_number = key_number + ((octave - 1) * 12) + 1 + 8;
//     }
//     return key_number;
// };

// st = asciiBar.join(" ");
// document.getElementById("base-bar").value = "X: 1\n" +
//     // "T: Cooley's\n" +
//     "M: 4/4\n" +
//     "L: 1/8\n" +
//     "K: Cmaj\n" +
//     st + "|";

// //C 	C# 	D 	D# 	E 	F 	F# 	G 	G# 	A 	A# 	B
// //48 	49 	50 	51 	52 	53 	54 	55 	56 	57 	58 	59
// keyboard.keyDown = function (note, frequency) {

//     var delay = 0; // play one note every quarter second
//     var noteNum = getMIDIOfNote(note); // the MIDI note
//     // var note = 50; // the MIDI note
//     var velocity = 127; // how hard the note hits
//     // play the note
//     MIDI.setVolume(0, 127);
//     MIDI.noteOn(0, noteNum, velocity, delay);
//     MIDI.noteOff(0, noteNum, delay + 0.75);

//     if (counter < 12) {
//         bar.push(noteNum);
//         console.log("noteMIDIToASCII test " + noteMIDIToASCII(noteNum));
//         asciiBar.push(note);

//         var st = document.getElementById("bar-cooleys");
//         st = asciiBar.join(" ");
//         console.log(st);
//         document.getElementById("base-bar").value = "X: 1\n" +
//             // "T: Cooley's\n" +
//             "M: 4/4\n" +
//             "L: 1/8\n" +
//             "K: Cmin\n" +
//             st + "|";
//         document.getElementById("base-bar").value = X + endline + M + endline + L + endline + K + endline;
//         notesLeft.innerHTML = 12 - bar.length;
//         console.log("left " + notesLeft.value + " bar.length " + bar.length);
//         initEditor();
//     }
//     counter++;
//     // else{
//     if (12 == counter) {
//         // if(first) {
//         //     first = false;
//         improv = bar.slice();
//         for (i = 0; i < bar.length; i++) {
//             asciiImprov.push(noteMIDIToASCII(bar[i]));
//         }

//         // document.getElementById("improvString").innerHTML = "X: 1\n" +
//         cooleys = "X: 1\n" +
//             // "T: Cooley's\n" +
//             "M: 4/4\n" +
//             // "L: 1/8\n" +
//             // "K: Emin\n" +
//             asciiImprov.join(" ") + "|";

//         ABCJS.renderAbc('improvNotes', cooleys);
//         return false;
//         console.log(asciiImprov.join("").toString());
//     }
//     // }
// };

// //G4 G4 G4 A3 A2 A#2|
// var noteMIDIToASCII = function (note) {
//     var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
//         octave = Math.floor(note / 12);

//     if (octave < 1)
//         return notes[note % 12];
//     else
//         return notes[note % 12] + octave.toString();
// };


// var cleanBar = function () {
//     counter = 0;
//     emptyArray(asciiBar);
//     emptyArray(bar);
//     document.getElementById("base-bar").value = "X: 1\n" +
//         // "T: Cooley's\n" +
//         "M: 4/4\n" +
//         // "L: 1/8\n" +
//         // "K: Emin\n" +
//         asciiBar.join("") + "|";
// };


// var emptyArray = function (arr) {
//     arr.length = 0;
// };


// var cleanImprov = function () {
//     emptyArray(improv);
//     // improv.length = 0;
//     emptyArray(asciiImprov);
//     cooleys = "X: 1\n" +
//         // "T: Cooley's\n" +
//         "M: 4/4\n" +
//         // "L: 1/8\n" +
//         // "K: Emin\n" +
//         asciiImprov.join(" ") + "|";
//     ABCJS.renderAbc('improvNotes', cooleys);
// };

// var addReverse = function () {
//     asciiImprov.push("\n");
//     for (i = bar.length - 1; i >= 0; i--) {
//         improv.push(bar[i]);
//         asciiImprov.push(noteMIDIToASCII(bar[i]));
//     }
//     cooleys = "X: 1\n" +
//         // "T: Cooley's\n" +
//         "M: 4/4\n" +
//         // "L: 1/8\n" +
//         // "K: Emin\n" +
//         asciiImprov.join(" ") + "|";
//     ABCJS.renderAbc('improvNotes', cooleys);
//     console.log("addReverse, newLen = " + improv.length + "addReverse, asciiImprov = " + asciiImprov.length);
// };


// var addBase = function () {
//     asciiImprov.push("\n");
//     for (i = 0; i < bar.length; i++) {
//         improv.push(bar[i]);
//         asciiImprov.push(noteMIDIToASCII(bar[i]));
//     }
//     cooleys = "X: 1\n" +
//         // "T: Cooley's\n" +
//         "M: 4/4\n" +
//         // "L: 1/8\n" +
//         // "K: Emin\n" +
//         asciiImprov.join(" ") + "|";
//     ABCJS.renderAbc('improvNotes', cooleys);
//     console.log("addBase, newLen = " + improv.length + "addBase, asciiImprov = " + asciiImprov.length);
// };

// keyboard.keyUp = function (note, frequency) {
//     var note = getMIDIOfNote(note);
//     MIDI.noteOff(0, note, 0);
// };


// stopPlayback = false;
// function playImprovAll() {
//     var velocity = 127; // how hard the note hits
//     var delay = 0;
//     // play the note
//     MIDI.setVolume(0, 127);
//     for (i = 0; i < improv.length; i++) {
//         MIDI.noteOn(0, improv[i], velocity, 0.75);
//         sleep(700);
//         if (stopPlayback) {
//             stopPlayback = false;
//             break;
//         }
//         //MIDI.noteOff(0, improv[i], delay + 0.75);
//     }
// }


// function sleep(milliseconds) {
//     var start = new Date().getTime();
//     for (var i = 0; i < 1e7; i++) {
//         if ((new Date().getTime() - start) > milliseconds) {
//             break;
//         }
//     }
// }

// function stopPlaybackFunc() {
//     stopPlayback = true;
//     MIDI.stopAllNotes();
// }


// function selectionCallback(abcelem) {
//     var note = {};
//     for (var key in abcelem) {
//         if (abcelem.hasOwnProperty(key) && key !== "abselem")
//             note[key] = abcelem[key];
//     }
//     // console.log(abcelem);
//     var el = document.getElementById("selection");
//     el.innerHTML = "<b>selectionCallback parameter:</b><br>" + JSON.stringify(note);
// }

// function initEditor() {
//     new ABCJS.Editor("base-bar", {
//         paper_id: "paper0",
//         generate_midi: true,
//         midi_id: "midi",
//         midi_download_id: "midi-download",
//         generate_warnings: true,
//         warnings_id: "warnings",
//         midi_options: {
//             generateDownload: true
//         },
//         render_options: {
//             listener: { highlight: selectionCallback }
//         }
//     });
// }

// window.addEventListener("load", initEditor, false);
