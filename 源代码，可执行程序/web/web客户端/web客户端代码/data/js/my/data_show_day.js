var the_traffic_day_data;//客流量按日计
var the_store_amount_day_data;//入店量按日计
var traffic_and_the_amount_of_store_day_time;//客流量/入店量按日计时间轴

var the_into_the_store_rate_day_data;//入店率按日计

var new_and_old_customers_day_time;//新老顾客按日计计时间轴
var the_new_customers_day_data;//新顾客按日计
var the_old_customers_day_data;//老顾客按日计

var the_resident_time_day_number;//驻店时长按日计人数
var the_resident_time_day_time;//驻店时长按日计时间

var the_bounce_rate_day_data;//跳出率按日计
var the_deep_rate_day_data;//深访率按日计
var bounce_rate_and_deep_rate_day_time;//跳出率/深访率按日计时间轴
$(document).ready(function(){
	request_traffic_amount_and_the_amount_of_store_day();
	//chart_traffic_amount_and_the_amount_of_store_and_into_the_store_rate_day();
	//chart_last_into_the_shore_rate_day();
	request_the_new_and_old_customers_day();
	//chart_the_new_and_old_customers_day();
	request_the_resident_time_day();
	//chart_the_resident_time_day();
	request_deep_rate_and_bounce_rate_day();
	//chart_deep_rate_and_bounce_rate_day();
	//chart_last_deep_rate_and_bounce_rate_day();
});

function request_traffic_amount_and_the_amount_of_store_day(){
	var my_url = project_name + "/get_traffic_amount_and_the_amount_of_store_day";
	$.ajax({
		type: "GET",
		url: my_url,
		success: traffic_amount_and_the_amount_of_store_day_callback
	});
}

function traffic_amount_and_the_amount_of_store_day_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = progect_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_traffic_day_data = obj['traffic'];
		the_store_amount_day_data = obj['store_amount'];
		traffic_and_the_amount_of_store_day_time = obj['time'];
		var start_time = obj["show_start_time"];
		var end_time = obj["show_end_time"];
		document.getElementById("start_date").value = start_time;
		document.getElementById("end_date").value = end_time; 
		request_into_the_store_rate_day();
	}
}

function request_into_the_store_rate_day(){
	var my_url = project_name + "/get_into_the_store_rate_day";
	$.ajax({
		type: "GET",
		url: my_url,
		success: into_the_store_rate_day_callback
	});
}

function into_the_store_rate_day_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_into_the_store_rate_day_data = obj['into_the_store_rate'];
		chart_traffic_amount_and_the_amount_of_store_and_into_the_store_rate_day();
		chart_last_into_the_shore_rate_day();
	}
}

function chart_traffic_amount_and_the_amount_of_store_and_into_the_store_rate_day(){
	var traffic_amount_and_the_amount_of_store_and_into_the_store_rate_day = echarts.init(document.getElementById("traffic_amount_and_the_amount_of_store_and_into_the_store_rate_day"));
	var colors = ['#5793f3', '#d14a61', '#675bba'];
	var option = {
		color: colors,

		tooltip: {
			trigger: 'axis',
			axisPointer: {type: 'cross'}
		},
		grid: {
			right: '20%'
		},
		toolbox: {
			feature: {
				dataView: {show: true, readOnly: false},
				restore: {show: true},
				saveAsImage: {show: true}
			}
		},
		legend: {
			data:['客流量','入店量','入店率']
		},
		xAxis: [
			{
				type: 'category',
				axisTick: {
					alignWithLabel: true
				},
				//data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
				data: traffic_and_the_amount_of_store_day_time
			}
		],
		yAxis: [
			{
				type: 'value',
				name: '客流量/入店量',
				position: 'left',
				axisLine: {
					lineStyle: {
						color: colors[0]
					}
				},
				axisLabel: {
					formatter: '{value} 人'
				}
			},
			{
				type: 'value',
				name: '入店率',
				position: 'right',
				offset: 80,
				axisLine: {
					lineStyle: {
						color: colors[1]
					}
				},
				axisLabel: {
					formatter: '{value}'
				}
			}
		],
		series: [
			{
				name:'客流量',
				type:'bar',
				//data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
				data: the_traffic_day_data
			},
			{
				name:'入店量',
				type:'bar',
				//data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
				data: the_store_amount_day_data
			},
			{
				name:'入店率',
				type:'line',
				yAxisIndex: 1,
				//data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
				data: the_into_the_store_rate_day_data
			}
		]
	};
	traffic_amount_and_the_amount_of_store_and_into_the_store_rate_day.setOption(option);
	window.addEventListener("resize",function(){
		traffic_amount_and_the_amount_of_store_and_into_the_store_rate_day.resize();
	});
}

function chart_last_into_the_shore_rate_day(){
	var last_into_the_shore_rate_day = echarts.init(document.getElementById("last_into_the_shore_rate_day"));
	var temp = the_into_the_store_rate_day_data.length;
	var last_into_the_store_rate = parseFloat(the_into_the_store_rate_day_data[temp - 1].toFixed(4))
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		series: [{
			name: '入店率',
			type: 'pie',
			radius: ['45%', '70%'],
			label: {
				normal: {
					position: 'center'
				}
			},
			data: [{
				value: last_into_the_store_rate,
				//value: 0.3456,
				name: '入店率',
				label: {
					normal: {
						formatter: '{d}%',
						textStyle: {
							fontSize: 16,
							fontWeight: 'bold'
						}
					}
				},
				itemStyle: {
					normal: {
						color: '#007be8'
					},
					emphasis: {
						color: '#007be8'
					}
				}
			}, {
				value: 1 - last_into_the_store_rate,
				//value: 1 - 0.3456,
				name: '其他',
				label: {
					normal: {
						formatter: '\n入店率',
						textStyle: {
							color: '#555',
							fontSize: 12
						}
					}
				},
				tooltip: {
					show: false
				},
				itemStyle: {
					normal: {
						color: '#aaa'
					},
					emphasis: {
						color: '#aaa'
					}
				},
				hoverAnimation: false
			}]
		}]
	};
	last_into_the_shore_rate_day.setOption(option);
	window.addEventListener("resize",function(){
		last_into_the_shore_rate_day.resize();
	});
}

function request_the_new_and_old_customers_day(){
	var my_url = project_name + "/get_the_new_and_old_customers_day";
	$.ajax({
		type: "GET",
		url: my_url,
		success: the_new_and_old_customers_day_callback
	});
}

function the_new_and_old_customers_day_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_new_customers_day_data = obj['new_customers'];
		the_old_customers_day_data = obj['old_customers'];
		new_and_old_customers_day_time = obj['time'];
		chart_the_new_and_old_customers_day();
	}
}

function chart_the_new_and_old_customers_day(){
	var the_new_and_old_customers_day = echarts.init(document.getElementById("the_new_and_old_customers_day"));
	var option = {
		tooltip : {
			trigger: 'axis'
		},
		legend: {
			data:['新顾客','老顾客']
		},
		toolbox: {
			show : true,
			feature : {
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				type : 'category',
				//data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
				data: new_and_old_customers_day_time
			}
		],
		yAxis : [
			{
				type : 'value'
			}
		],
		series : [
			{
				name:'新顾客',
				type:'bar',
				//data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
				data: the_new_customers_day_data,
				markLine : {
					data : [
						{type : 'average', name: '平均值'}
					]
				}
			},
			{
				name:'老顾客',
				type:'bar',
				//data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
				data: the_old_customers_day_data,
				markLine : {
					data : [
						{type : 'average', name : '平均值'}
					]
				}
			}
		]
	};
	the_new_and_old_customers_day.setOption(option);
	window.addEventListener("resize",function(){
		the_new_and_old_customers_day.resize();
	});
}

function request_the_resident_time_day(){
	var my_url = project_name + "/get_the_resident_time_day";
	$.ajax({
		type: "GET",
		url: my_url,
		success: the_resident_time_day_callback
	});
}

function the_resident_time_day_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_resident_time_day_number = obj['the_resident_time_number'];
		the_resident_time_day_time = obj['the_resident_time_time']
		chart_the_resident_time_day();
	}
}

function chart_the_resident_time_day(){
	var the_resident_time_day = echarts.init(document.getElementById("the_resident_time_day"));
	var option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data:['驻店时长']
		},
		toolbox: {
			show : true,
			feature : {
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		xAxis:  {
			type: 'category',
			boundaryGap: false,
			//data: ['6/1','6/4','6/7','6/10','6/13','6/16','6/19','6/21','6/24','6/27','6/30','7/2','7/5','7/8','7/11']
			data: the_resident_time_day_time
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value} 人'
			}
		},
		series: [
			{
				name:'驻店时长',
				type:'line',
				//data:[92, 96, 99, 91, 96, 103, 100,92, 96, 99, 91, 96, 103, 100,115]
				data: the_resident_time_day_number
			}
		]
	};
	the_resident_time_day.setOption(option);
	window.addEventListener("resize",function(){
		the_resident_time_day.resize();
	});
}

function request_deep_rate_and_bounce_rate_day(){
	var my_url = project_name + "/get_deep_rate_and_bounce_rate_day";
	$.ajax({
		type: "GET",
		url: my_url,
		success: deep_rate_and_bounce_rate_day_callback
	});
}

function deep_rate_and_bounce_rate_day_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_bounce_rate_day_data = obj['bounce_rate'];
		the_deep_rate_day_data = obj['deep_rate'];
		bounce_rate_and_deep_rate_day_time = obj['time'];
		chart_deep_rate_and_bounce_rate_day();;
		chart_last_deep_rate_and_bounce_rate_day();
	}
}

function chart_deep_rate_and_bounce_rate_day(){
	var deep_rate_and_bounce_rate_day = echarts.init(document.getElementById("deep_rate_and_bounce_rate_day"));
	var option = {
		tooltip: {
            trigger: 'axis'
        },
		toolbox: {
			feature: {
				dataView: {show: true, readOnly: false},
				restore: {show: true},
				saveAsImage: {show: true}
			}
		},
		legend: {
			data:['跳出率','深访率']
		},
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                //data: ['1', '5', '10', '15', '20', '25', '31']
				data: bounce_rate_and_deep_rate_day_time
            }
        ],
        yAxis: [
            {
                name: '比率',
                type: 'value'
            }
        ],
        series: [
            {
                name: '跳出率',
                type: 'line',
                tooltip: {
                    trigger: 'axis'
                },
                smooth: true,
                itemStyle: {
                    normal: {
                        color: 'rgba(2, 197, 233, 0.2)',
                        lineStyle: {
                            color: 'rgba(23, 107, 203, 0.2)'
                        },
                        areaStyle: {
                            color: 'rgba(223, 147, 233, 0.2)'
                        }
                    }
                },
                //data: [10, 12, 21, 54, 60, 80, 71]
				data: the_bounce_rate_day_data
            },
            {
                name: '深访率',
                type: 'line',
                tooltip: {
                    trigger: 'axis'
                },
                smooth: true,
                itemStyle: {
                    normal: {
                        color: 'rgba(2, 197, 233, 0.2)',
                        lineStyle: {
                            color: 'rgba(2, 197, 233, 0.2)'
                        },
                        areaStyle: {
                            color: 'rgba(2, 197, 233, 0.2)'
                        }
                    }
                },
                //data: [30, 32, 61, 24, 20, 90, 20]
				data: the_deep_rate_day_data
            }
        ]
	};
	deep_rate_and_bounce_rate_day.setOption(option);
	window.addEventListener("resize",function(){
		deep_rate_and_bounce_rate_day.resize();
	});
}

function chart_last_deep_rate_and_bounce_rate_day(){
	var last_deep_rate_and_bounce_rate_day = echarts.init(document.getElementById("last_deep_rate_and_bounce_rate_day"));
	var temp = the_bounce_rate_day_data.length;
	var last_bounce_rate = parseFloat(the_bounce_rate_day_data[temp - 1].toFixed(4));
	var last_deep_rate = parseFloat(the_deep_rate_day_data[temp - 1].toFixed(4))
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data:['跳出率','深访率','其他']
		},
		series: [
			{
				name:'跳出率/深访率',
				type:'pie',
				radius: ['50%', '70%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: '30',
							fontWeight: 'bold'
						}
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data:[
					{value:last_bounce_rate, name:'跳出率'},
					{value:last_deep_rate, name:'深访率'},
					{value:1 - last_bounce_rate - last_deep_rate, name:'其他'}
				]
			}
		]
	};
	last_deep_rate_and_bounce_rate_day.setOption(option);
	window.addEventListener("resize",function(){
		last_deep_rate_and_bounce_rate_day.resize();
	});
}

function select_data()
{
    var start_date = document.getElementById("start_date").value;
	var end_date = document.getElementById("end_date").value;
	var start_strs = new Array();
	var end_strs = new Array();
	start_strs = start_date.split("-");
	end_strs = end_date.split("-");
	var start_year = parseInt(start_strs[0]);
	var start_month = parseInt(start_strs[1]);
	var start_day = parseInt(start_strs[2]);
	var end_year = parseInt(end_strs[0]);
	var end_month = parseInt(end_strs[1]);
	var end_day = parseInt(end_strs[2]);
	if(start_year > end_year)
	{
	    alert("抱歉，开始时间不能大于结束时间！");
	}
	else
	{
	    if(start_year == end_year)
		{
		    if(start_month > end_month)
			{
			    alert("抱歉，开始时间不能大于结束时间！");
			}
			else
			{
			    if(start_month == end_month)
				{
				    if(start_day > end_day)
					{
					    alert("抱歉，开始时间不能大于结束时间！");
					}
					else
					{
					    request_data(start_year, start_month, start_day, end_year, end_month, end_day);
					}
				}
				else
				{
					request_data(start_year, start_month, start_day, end_year, end_month, end_day);
				}
			}
		}
		else
		{
		    request_data(start_year, start_month, start_day, end_year, end_month, end_day);
		}
	}
}

function request_data(start_year, start_month, start_day, end_year, end_month, end_day){
	custom_request_traffic_and_the_amount_of_store_day(start_year, start_month, start_day, end_year, end_month, end_day);
	custom_request_the_new_and_old_customers_day(start_year, start_month, start_day, end_year, end_month, end_day);
	custom_request_the_resident_time_day(start_year, start_month, start_day, end_year, end_month, end_day);
	custom_request_deep_rate_and_bounce_rate_day(start_year, start_month, start_day, end_year, end_month, end_day);
}

function custom_request_traffic_and_the_amount_of_store_day(start_year, start_month, start_day, end_year, end_month, end_day){
	var my_url = project_name + "/get_custom_traffic_and_the_amount_of_store_day";
    var request_time = new Object();
    request_time.start_year = start_year;
    request_time.start_month = start_month;
    request_time.start_day = start_day;
    request_time.end_year = end_year;
    request_time.end_month = end_month;
    request_time.end_day = end_day;
	$.ajax({
		type: "GET",
		url: my_url,
		data: request_time,
		success: custom_traffic_amount_and_the_amount_of_store_day_callback,
		error: function(data)
		{
		   alert("连接服务器失败！");
		}
	});
}

function custom_traffic_amount_and_the_amount_of_store_day_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_traffic_day_data = obj['traffic'];
		the_store_amount_day_data = obj['store_amount'];
		traffic_and_the_amount_of_store_day_time = obj['time'];
		var start_time = obj["show_start_time"];
		var end_time = obj["show_end_time"];
		document.getElementById("start_date").value = start_time;
		document.getElementById("end_date").value = end_time; 
		var start_strs = new Array();
		var end_strs = new Array();
		start_strs = start_time.split("-");
		end_strs = end_time.split("-");
		var start_year = parseInt(start_strs[0]);
		var start_month = parseInt(start_strs[1]);
		var start_day = parseInt(start_strs[2]);
		var end_year = parseInt(end_strs[0]);
		var end_month = parseInt(end_strs[1]);
		var end_day = parseInt(end_strs[2]);
		custom_request_into_the_store_rate_day(start_year, start_month, start_day, end_year, end_month, end_day);
	}
}

function custom_request_into_the_store_rate_day(start_year, start_month, start_day, end_year, end_month, end_day){
	var my_url = project_name + "/get_custom_into_the_store_rate_day";
    var request_time = new Object();
    request_time.start_year = start_year;
    request_time.start_month = start_month;
    request_time.start_day = start_day;
    request_time.end_year = end_year;
    request_time.end_month = end_month;
    request_time.end_day = end_day;
	$.ajax({
		type: "GET",
		url: my_url,
		data: request_time,
		success: custom_into_the_store_rate_day_callback,
		error: function(data)
		{
		   alert("连接服务器失败！");
		}
	});
}

function custom_into_the_store_rate_day_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_into_the_store_rate_day_data = obj['into_the_store_rate'];
		chart_traffic_amount_and_the_amount_of_store_and_into_the_store_rate_day();
		chart_last_into_the_shore_rate_day();
	}
}

function custom_request_the_new_and_old_customers_day(start_year, start_month, start_day, end_year, end_month, end_day){
	var my_url = project_name + "/get_custom_the_new_and_old_customers_day";
    var request_time = new Object();
    request_time.start_year = start_year;
    request_time.start_month = start_month;
    request_time.start_day = start_day;
    request_time.end_year = end_year;
    request_time.end_month = end_month;
    request_time.end_day = end_day;
	$.ajax({
		type: "GET",
		url: my_url,
		data: request_time,
		success: custom_the_new_and_old_customers_day_callback,
		error: function(data)
		{
		   alert("连接服务器失败！");
		}
	});
}

function custom_the_new_and_old_customers_day_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_new_customers_day_data = obj['new_customers'];
		the_old_customers_day_data = obj['old_customers'];
		new_and_old_customers_day_time = obj['time'];
		chart_the_new_and_old_customers_day();
	}
}

function custom_request_the_resident_time_day(start_year, start_month, start_day, end_year, end_month, end_day){
	var my_url = project_name + "/get_custom_the_resident_time_day";
    var request_time = new Object();
    request_time.end_year = end_year;
    request_time.end_month = end_month;
    request_time.end_day = end_day;
	$.ajax({
		type: "GET",
		url: my_url,
		data: request_time,
		success: the_resident_time_day_callback,
		error: function(data)
		{
		   alert("连接服务器失败！");
		}
	});
}

function the_resident_time_day_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_resident_time_day_number = obj['the_resident_time_number'];
		the_resident_time_day_time = obj['the_resident_time_time']
		chart_the_resident_time_day();
	}
}

function custom_request_deep_rate_and_bounce_rate_day(start_year, start_month, start_day, end_year, end_month, end_day){
	var my_url = project_name + "/get_custom_deep_rate_and_bounce_rate_day";
    var request_time = new Object();
    request_time.start_year = start_year;
    request_time.start_month = start_month;
    request_time.start_day = start_day;
    request_time.end_year = end_year;
    request_time.end_month = end_month;
    request_time.end_day = end_day;
	$.ajax({
		type: "GET",
		url: my_url,
		data: request_time,
		success: custom_deep_rate_and_bounce_rate_day_callback,
		error: function(data)
		{
		   alert("连接服务器失败！");
		}
	});
}

function custom_deep_rate_and_bounce_rate_day_callback(data){
	var index = data.indexOf("error");
	if(index == 0){
		window.location.href = project_name + "/data/login.html";
	}else{
		var obj = JSON.parse(data);
		the_bounce_rate_day_data = obj['bounce_rate'];
		the_deep_rate_day_data = obj['deep_rate'];
		bounce_rate_and_deep_rate_day_time = obj['time'];
		chart_deep_rate_and_bounce_rate_day();;
		chart_last_deep_rate_and_bounce_rate_day();
	}
}