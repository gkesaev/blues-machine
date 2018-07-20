var context = new AudioContext();
var note = { Frequencie: "C4", duration: "0.2"}
var notes = [440, 540, 220, 240, 340, 500, 244];

var interval = 0.8;

var STOP_PLAYBACK = false;

function play(frequency, duration, time) {
    var o = context.createOscillator();
    var g = context.createGain();
    o.connect(g);
    g.connect(context.destination);
    g.gain.exponentialRampToValueAtTime(
        0.00001, context.currentTime + duration + time
    );
    o.frequency.value = frequency;
    o.start(time);
}

function playNotes()
{
    var duration = 0.3;
    STOP_PLAYBACK = false;
    console.log('playing notes');
    for (let i = 0; i < notes.length; i++) {
        if (STOP_PLAYBACK) {
            console.log("break");
            break;
        }
        play(notes[i], duration, i * interval);
        console.log("current note " + i);
    }
}

function stopPlayback()
{
    console.log("stopping playback");
    STOP_PLAYBACK = true;
}
