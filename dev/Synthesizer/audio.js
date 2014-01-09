$(document).ready(function(){
  
  context = new window.webkitAudioContext();

  oscillators = [[],[]];

  var units = 4;
  var tracks = 2;

  for(i=0;i<tracks;i++){
    for (j=0;j<units;j++){
      oscillators[i][j] = context.createOscillator();
      oscillators[i][j].start(0);
    }
  }

  oscillators[0][0].frequency.value = tones.C5;
  oscillators[0][1].frequency.value = tones.G5;
  oscillators[0][2].frequency.value = tones.E5;
  oscillators[0][3].frequency.value = tones.A5;

  oscillators[1][0].frequency.value = tones.C3;
  oscillators[1][1].frequency.value = tones.C3;
  oscillators[1][2].frequency.value = tones.F3;
  oscillators[1][3].frequency.value = tones.F3;


  $('ul.synth li').mouseover(function(){
    var oscNum = parseInt($(this).attr("class"));
    oscillators[0][oscNum].connect(context.destination);
  });
  $('ul.synth li').mouseleave(function(){
    var oscNum = parseInt($(this).attr("class"))-1;
    oscillators[oscNum].disconnect();
  });

  $('ul.buttons li').click(function(){
    var type = $(this).html();
    for (k=0;k<tracks;k++){
      for (i=0;i<units;i++){
        oscillators[k][i].type = type;
      }
    }
    return type;
  });


  var barLength = 2000;

  var activeNote = 0;

  oscillators[0][activeNote].connect(context.destination);
  oscillators[1][activeNote].connect(context.destination);
  setInterval(function(){
    for (a=0;a<tracks;a++){
      oscillators[a][activeNote].disconnect();
    }
    activeNote += 1;
    if (activeNote == units){
      activeNote = 0;
    }
    for (a=0;a<tracks;a++){
      oscillators[a][activeNote].connect(context.destination);
    }
    $('button').html(activeNote);
  },barLength/units);

});