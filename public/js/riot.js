$(document).on('ready',init);

function init(){
	configHchart();
	controlContainer();
    //startSocket();
}

function configHchart(){
	Highcharts.setOptions({
		global: {
			useUTC: false
		}
    });
}

function startSocket(series){
    io.on('data_arduino', function(data){
        //debugger;
        console.log(data.temperatura);
        //$('#list_socket').append('<li>'+data.val+'</li>');

        tiempo = (new Date()).getTime(), // current time
        
        //temperatura = Math.random();

        temperatura = parseInt(data.temperatura);

        console.log('foco: '+data.foco+' - ventilador: '+data.ventilador);

        series.addPoint([tiempo, temperatura], true, true);
        
        if(temperatura<25)
        {
            //alert("temperatura baja");
            //$('#alertas').prepend("<br><font color='blue'>Temperatura Baja: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +" </font>");
            $('#mensaje').prepend($('<li>').text("Temperatura Baja: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +"\n").attr('style','background:#B2B2B2;border-style: groove; font-family: "Montserrat";border-radius: 15px;'));
        }
        if(temperatura>33)
        {
            //alert("temperatura baja");
            //$('#alertas').prepend("<br><font color='red'>Temperatura Alta: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +" </font>");
            $('#mensaje').prepend($('<li>').text("Temperatura Alta: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +"\n").attr('style','background:#FF8040;border-style: groove; font-family: "Montserrat";border-radius: 15px;'));
        }
        if(temperatura >= 25 && temperatura <= 33)
        {
            //alert("temperatura baja");
            //$('#alertas').prepend("<br><font color='green'>Temperatura Normal: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +" </font>");
            $('#mensaje').prepend($('<li>').text("Temperatura Normal: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +"\n").attr('style','background:#00FF3B; border-style: groove;font-family: "Montserrat";border-radius: 15px;'));
        }

        movimiento(data.foco,data.ventilador);

    });
}

function printTemperatura(){
	var tiempo, temperatura;
    // set up the updating of the chart each second
    var series = this.series[0];
    //setInterval(function () {}, 1000);
    startSocket(series);
}

function formato(){
	/*
	if(Highcharts.numberFormat(this.y, 2)<0.5)
	{
		$('#alertas').append("<br>temperatura : "+Highcharts.numberFormat(this.y, 2)+" Alerta<br>");
	}
	*/
    return '<b>' + this.series.name + '</b><br/>' +
    	Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +'Temperatura: '+
    	Highcharts.numberFormat(this.y, 2);
}

function data(){
	// generate an array of random data
    var data = [],
        time = (new Date()).getTime(),
        i;

    var yr;

    for (i = -19; i <= 0; i += 1) {
    	yr=Math.random();
		data.push({
			x: time + i * 1000,
            y: yr
        });
	}
	return data;
}

function controlContainer(){
	$('#container').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                	//Imprime Temperatura
                    load: printTemperatura
                }
            },
            title: {
                text: 'Monitoreo de Secado de Madera'
            },
			subtitle:{
				align:'center',text:'#################################################'
			},
            xAxis: {
				title:{
					text:'Tiempo actual'
				},
                type: 'datetime',
                tickPixelInterval: 100	
            },
            yAxis: {
                title: {
                    text: 'Temperatura en grados Centigrados'
                },
                plotLines: [{
                    value: 25,
                    width: 2,
                    color: 'red'
                },{
                    value: 33,
                    width: 2,
                    color: 'red'
                }]
				
            },
            tooltip: {
            	//Llama a la funcion formato
                formatter: formato
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series: [{
                name: 'Datos recibidos',
                data: (data())
            }]
        });
}

function test(){
	alert('Wujuuuu');
}
function movimiento(foco,aspa)
{
    if(aspa==0)
    {
        $('#aspa').attr('src','/img/ventioff.jpg');
        $('#estadoa').text('Apagado');
    }
    else{
        $('#aspa').attr('src','/img/vention.gif');
        $('#estadoa').text('Encendido');
    }
    if(foco==0)
    {
        $('#focos').attr('src','/img/focooff.jpg');
        $('#estadof').text('Apagado');
    }else{
        $('#focos').attr('src','/img/focoon.jpg');
        $('#estadof').text('Encendido');
    }
    
}