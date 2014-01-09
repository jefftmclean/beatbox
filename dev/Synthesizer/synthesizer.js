$(document).ready(function(){
  
  var timeSig = [3,4];

  var tracks = [
    [
      {note:E5,duration:1},
      {note:D5,duration:1},
      {note:F5,duration:1},
      {note:E5,duration:1}
    ],
    [
      {note:C5,duration:1},
      {note:Bb4,duration:1},
      {note:C5,duration:1},
      {note:C5,duration:1}
    ],
    [
      {note:G4,duration:1},
      {note:F4,duration:1},
      {note:A4,duration:1},
      {note:G4,duration:1}
    ],
    [
      {note:C3,duration:1},
      {note:C3,duration:1},
      {note:C3,duration:1},
      {note:C3,duration:1}
    ],

  ]

  var units = 4;

  var context = new window.webkitAudioContext();

  oscillators = new Array();

  for(i=0;i<tracks.length;i++){
    oscillators.push([]);
    for (j=0;j<tracks[i].length;j++){
      oscillators[i].push(context.createOscillator());
      oscillators[i][j].frequency.value = tracks[i][j].note;
      oscillators[i][j].duration = tracks[i][j].duration;
      oscillators[i][j].start(0);
    }
  }

  $('ul.buttons li').click(function(){
    var type = $(this).html();
    for (i=0;i<tracks.length;i++){
      for (j=0;j<tracks[i].length;j++){
        oscillators[i][j].type = type;
      }
    }
  });

  play = function(barLength){
    var playback = 0;
    for (i=0;i<tracks.length;i++){
      oscillators[i][0].connect(context.destination);
    }
    setInterval(function(){
      for (a=0;a<tracks.length;a++){
        oscillators[a][playback].disconnect();
      }
      playback += 1;
      if (playback == units){
        playback = 0;
      }
      for (a=0;a<tracks.length;a++){
        oscillators[a][playback].connect(context.destination);
      }
    },barLength/units);
  }

});