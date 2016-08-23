//header nav fixde in top

//window.onscroll = function(){
//var t = document.documentElement.scrollTop || document.body.scrollTop;
//var top = $( "#top");
//var header = $( "#header");
//if( t >= 45 ) {
//	top.attr("display","none");
//	header.chidren("nav").addClass("navbar-fixed-top");
//	} else {
//	top.attr(""display","block");
//	header.chidren("nav").removeClass("navbar-fixed-top");
//	}
//}=
//header top onclick cut   导航切换
/*	$("#headNav li").click(
		function(){
		$(this).addClass("fore1").siblings().removeClass("fore1");
});*/

//Production of the year chart
//设置图表的宽高
var chartW = $(".farm .chart").width()*0.67;
//console.log(chartW);
var chartH = $(".farm .chart").css({"height":chartW + 'px'});
var myChart_1 = echarts.init(document.getElementById('chart_1'));
// 指定图表的配置项和数据
        option = {
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius: '90%',
            data:[
                {value:235, name:'甜菜'},
                {value:274, name:'小麦'},
                {value:310, name:'大豆'},
                {value:335, name:'玉米'},
                {value:400, name:'大豆'}
            ]
        }
    ]
};
        // 使用刚指定的配置项和数据显示图表。
        myChart_1.setOption(option);
        window.onresize = myChart_1.resize;

//The covers an area of farm chart 
var myChart_2 = echarts.init(document.getElementById('chart_2'));
// 指定图表的配置项和数据
        option = {
    series : [
        {
            name: '访问来源',
            type: 'pie',
//          radius: '55%',
            radius: '90%',
            
            data:[
                {value:235, name:'乡农场'},
                {value:274, name:'张家湾农场'},
                {value:310, name:'绥棱林场'},
                {value:335, name:'三吉台农场'},
                {value:400, name:'二六农场'},
                {value:235, name:'海湾农场'},
                {value:310, name:'绥棱林场'},
                {value:335, name:'三吉台农场'},
            ]
        }
    ]
};

        // 使用刚指定的配置项和数据显示图表。
        myChart_2.setOption(option);
        window.onresize = myChart_2.resize;

        
//vote 投票柱状图  
var myChart_3 = echarts.init(document.getElementById('chart_3'));
function fetchData(cb) {
    // 通过 setTimeout 模拟异步加载
    setTimeout(function () {
        cb({
            categories: ["亲子","采摘","种地","烧烤","垂钓","亲子"],
            data: [5, 20, 36, 10, 10, 20]
        });
    }, 3000);
}

// 初始 option
option = {
    title: {
//      text: '异步数据加载示例'
    },
    tooltip: {},
    legend: {
        data:['销量1']
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [{
//      name: '销量1',
        type: 'bar',
        data: []
    }]
};
myChart_3.showLoading();

fetchData(function (data) {
    myChart_3.hideLoading();
    myChart_3.setOption({
        xAxis: {
            data: data.categories
        },
        series: [{
            // 根据名字对应到相应的系列
            name: '销量1',
            data: data.data
        }]
    });
});
myChart_3.setOption(option);

var myChart_4 = echarts.init(document.getElementById('chart_4'));
function fetchData(cb) {
    // 通过 setTimeout 模拟异步加载
    setTimeout(function () {
        cb({
            categories: ["亲子","采摘","种地","烧烤","垂钓","亲子"],
            data: [5, 20, 36, 10, 10, 20]
        });
    }, 3000);
}

// 初始 option
option = {
    title: {
//      text: '异步数据加载示例'
    },
    tooltip: {},
    legend: {
        data:['销量1']
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [{
//      name: '销量1',
        type: 'bar',
        data: []
    }]
};
myChart_4.showLoading();

fetchData(function (data) {
    myChart_4.hideLoading();
    myChart_4.setOption({
        xAxis: {
            data: data.categories
        },
        series: [{
            // 根据名字对应到相应的系列
            name: '销量1',
            data: data.data
        }]
    });
});
myChart_4.setOption(option);


