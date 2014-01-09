$(document).ready(function(){
  
  tracks = [
    [C5,C5,B4],
    [E5,F5,D5],
    [G5,A5,G5]
  ]

  var units = tracks[0].length;
  var trackNum = tracks.length;

  context = new window.webkitAudioContext();

  oscillators = new Array();

  for(i=0;i<trackNum;i++){
    oscillators.push([]);
    for (j=0;j<units;j++){
      oscillators[i].push(context.createOscillator());
      oscillators[i][j].frequency.value = tracks[i][j];
      oscillators[i][j].start(0);
    }
  }

  $('ul.buttons li').click(function(){
    var type = $(this).html();
    for (k=0;k<trackNum;k++){
      for (i=0;i<units;i++){
        oscillators[k][i].type = type;
      }
    }
  });

  play = function(barLength){
    var playback = 0;
    for (i=0;i<trackNum;i++){
      oscillators[i][0].connect(context.destination);
    }
    setInterval(function(){
      for (a=0;a<trackNum;a++){
        oscillators[a][playback].disconnect();
      }
      playback += 1;
      if (playback == units){
        playback = 0;
      }
      for (a=0;a<trackNum;a++){
        oscillators[a][playback].connect(context.destination);
      }
    },barLength/units);
  }

});