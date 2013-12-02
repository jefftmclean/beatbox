var beatbox = new Object();
beatbox.units = 8;
beatbox.tones = 4;

beatbox.generateGrid = function(tones,units){
	$("#beatbox").empty();
	for (i=0;i<tones;i++){
		$("#beatbox").append("<ul>");
		for (j=0;j<units;j++){
			$("#beatbox ul:last-of-type").append("<li></li>")
		}
		$("#beatbox").append("</ul>")
	}
	$("#beatbox li").width( 100/beatbox.units + "%" );
	$("#beatbox ul").height( 100/beatbox.tones + "%" );
}

//create a data table to mirror the UI - set of on/off switches that will dictate whether the cell will make a tone on playback
beatbox.generateSwitches = function(tones,units){
	beatbox.switches = [];
	for (i=0;i<tones;i++){
		beatbox.switches.push([])
		for (j=0;j<units;j++){
			beatbox.switches[i].push([0])
		}
	}
	return beatbox.switches;
}

beatbox.update = function(){
	beatbox.generateSwitches(beatbox.tones,beatbox.units);
	beatbox.generateGrid(beatbox.tones,beatbox.units);
	$("#tones").html(beatbox.tones + " Tones");
	$("#units").html("Units: 1/" + beatbox.units);
}

$(document).ready(function(){

	//use the initial tone/unit values to generate the grid when the page loads
	beatbox.update();

	$("#tone-decreaser").click(function(){
		if (beatbox.tones > 1){
			beatbox.tones -= 1;
			beatbox.update();
		}
	});
	$("#tone-increaser").click(function(){
		beatbox.tones += 1;
		beatbox.update();
	});
	$("#unit-decreaser").click(function(){
		if (beatbox.units > 2){
			beatbox.units -= 2;
			beatbox.update();
		}
	});
	$("#unit-increaser").click(function(){
		beatbox.units += 2;
		beatbox.update();
	});
});