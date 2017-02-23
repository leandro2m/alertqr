angular.module('App').controller('cisternaDashCtrl', function($scope,$resource){
   
queue()
    .defer(d3.json, "/api/data")
    .await(makeGraphs);

function makeGraphs(error, apiData){
	
   //Start Transformations
	var dataSet = apiData;
    //  "datetime": "2/17/2017  9:00:00"
	var dateFormat = d3.time.format("%m/%d/%Y %H:%M:%S");
	var monthFormat = d3.time.format("%m");
	
	dataSet.forEach(function(d) {
		d.datetime = dateFormat.parse(d.datetime);
		d.month = monthFormat(d.datetime);
		if (d.level4 = 1) {
			d.total = 90;
			} 
		else if (d.level3 = 1) {
			d.total = 75;
			}
		else if (d.level2 = 1) {
			d.total = 50;
			}
		else if (d.level1 = 1) {
			d.total = 20;
			}	
		 else {
			d.total = 10;
		}	
	});

		
	//Cria Crossfilter
	var ndx = crossfilter(dataSet);
	
    // Cria as dimensões
    var reservatorio = ndx.dimension(function(d) { return d.poleid; });	
	var timeDim = ndx.dimension(function(d) {return new Date(d.datetime).getTime() });

    //Define o toggle de reservatorios
	var reservatorioGroup = reservatorio.group();
	
	//Define o reservatorio do bloco 1
//	 timeDim.filter(function(d) {return d.poleid == 1}); 
	
	//Define o chart #1 de níveis sobrepostos 
	var status_tc = timeDim.group().reduceSum(function(d) { if (d.level1 = 1 && d.poleid = 1) {return 20;} else {return 10;};});
	var status_tl = timeDim.group().reduceSum(function(d) { if (d.level2 = 1 && d.poleid = 1 ) {return 30;} else {return 0;};});
	var status_tm = timeDim.group().reduceSum(function(d) { if (d.level3 = 1 && d.poleid = 1) {return 20;} else {return 0;};});
	var status_tf = timeDim.group().reduceSum(function(d) { if (d.level4 = 1 && d.poleid = 1) {return 20;} else {return 0;};});	
	
	
	//Define o bar chart de dias críticos
    var countCriticalDays = timeDim.group().reduce(
	function reduceAdd(p, v) {return (v.total = 10) ? p + 1 : p;},
	function reduceRemove(p, v) {return (v.total > 10) ? p - 1 : p;},
	function reduceInitial() {return 0;}
	);

	//Define threshold values for data
	var minDate = timeDim.bottom(1)[0].datetime;
	var maxDate = timeDim.top(1)[0].datetime;	
	
	// seleciona o periodo de visualização (semana ou mes)
	d3.select('#date_select2').on('change', function() { 
	   var nd = new Date();
	   var now = new Date();
	   switch (this.value) {
          case "week":
		      {
				nd = d3.time.monday(now);  
			   }
          break;
          case "month":
              {
				nd = d3.time.month(now);  
			   }
          break;
		            case "all":
              {
				nd = timeDim.bottom(1)[0].datetime;
			   }
          break;
         default:
               nd = timeDim.bottom(1)[0].datetime;
       }
        minDate = nd;
		maxDate = now;
		
		var dateChart = dc.lineChart("#date-chart2");
	dateChart
		//		.width(600)
		.height(220)
		.margins({top: 80, right: 30, bottom: 50, left: 50})
		.legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
		.renderlet(function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");}) 
		.dimension(timeDim)
		.group(status_tc,"critical")
		.stack(status_tl,"low")
		.stack(status_tm,"medium")
		.stack(status_tf,"full")
		.renderArea(true)
		.transitionDuration(500)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
		.xAxisLabel("Data")
		.brushOn(false)
		.yAxisLabel("Volume H2O") 
		.ordinalColors(['#ff0000','#00bfff','#1e90ff','#0000ff','#747474','#910091','#a65628'])
		.yAxis().ticks(10);


	var criticalDaysChart = dc.barChart("#critical-days-chart2");		
    criticalDaysChart
//      .width(300)
      .height(220)
	  .margins({top: 30, right: 30, bottom: 50, left: 50})
	  .legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
	  .renderlet(function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");}) 	  
      .dimension(timeDim)
      .group(countCriticalDays,"Reserva Crítica")
   	  .x(d3.time.scale().domain([minDate, maxDate]))
	  .transitionDuration(500)
      .centerBar(false)
      .barPadding(10)
      .xAxisLabel('Data')
	  .brushOn(false)
      .ordinalColors(['#f40000','#ffff30','#009100','#009191','#ff7f00','#ffff33','#a65628'])
      .yAxisLabel('Critical Events');
		
	    dc.renderAll();
    });		
	
	
	
	//Define os menus e charts
	  selectField = dc.selectMenu('#menuselect2')
        .dimension(reservatorio)
        .group(reservatorioGroup); 

	var dateChart = dc.lineChart("#date-chart2");
	dateChart
		//		.width(600)
		.height(220)
		.margins({top: 80, right: 30, bottom: 50, left: 50})
		.legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
		.renderlet(function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");}) 
		.dimension(timeDim)
		.group(status_tc,"critical")
		.stack(status_tl,"low")
		.stack(status_tm,"medium")
		.stack(status_tf,"full")
		.renderArea(true)
		.transitionDuration(500)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
		.xAxisLabel("Data")
		.brushOn(false)
		.yAxisLabel("Volume Cisterna") 
		.ordinalColors(['#ff0000','#00bfff','#1e90ff','#0000ff','#747474','#910091','#a65628'])
		.yAxis().ticks(10);


	var criticalDaysChart = dc.barChart("#critical-days-chart2");		
    criticalDaysChart
//      .width(300)
      .height(220)
	  .margins({top: 30, right: 30, bottom: 50, left: 50})
	  .legend(dc.legend().x(60).y(10).itemHeight(13).gap(5))
	  .renderlet(function (chart) {chart.selectAll("g.x text").attr('dx', '-30').attr('dy', '-7').attr('transform', "rotate(-90)");}) 		  
      .dimension(timeDim)
      .group(countCriticalDays,"Reserva Crítica")
   	  .x(d3.time.scale().domain([minDate, maxDate]))
	  .transitionDuration(500)
      .centerBar(false)
      .barPadding(10)
      .xAxisLabel('Data')
	  .brushOn(false)
      .ordinalColors(['#f40000','#ffff30','#009100','#009191','#ff7f00','#ffff33','#a65628'])
      .yAxisLabel('Count');
		
    dc.renderAll();
	
   };

var ci3Min = setInterval(renderData, 180000);
function renderData() {
		queue().defer(d3.json, "/api/data").await(makeGraphs);
}	
   
});

