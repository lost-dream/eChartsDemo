$(function () {

  function renderHistogram(data, domElement, title, type) {
    /*
    *  data: 数据对象
    *  domElement: 画布的父容器
    *  title: 图表的标题
    *  type: pv || uv
    *  */
    document.getElementById(domElement).removeAttribute("_echarts_instance_");
    var coordinateXValue = [];
    var coordinateYValue = [];
    data.forEach(function (v) {
      coordinateXValue.push(v.name);
      if (type === 'pv') {
        coordinateYValue.push(v.pv);
      } else if (type === 'uv') {
        coordinateYValue.push(v.uv);
      } else {
        throw '没有填写分类'
      }
      var myChart = echarts.init(document.getElementById(domElement));
      var option = {
        title: {
          text: title
        },
        tooltip: {},
        legend: {},
        xAxis: {
          nameTextStyle: {
            lineHeight: 5
          },
          axisLabel: {
            formatter: function (value) {
              return value.split("").join("\n");
            }
          },
          data: coordinateXValue
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          barWidth: 25,
          barGap: '100%',
          data: coordinateYValue,
          itemStyle: {
            normal: {
              color: function (params) {
                var colorLists = ["#f6412e", "#9e1cb2", "#3c4db7", "#3694f6", "#3ebcd5", "#2f948c", "#8bc441", "#cdde20", "#fcec1a"];
                return colorLists[params.dataIndex];
              }
            }
          }
        }]
      };
      myChart.setOption(option)
    })
  }

  function renderLineChart(data, domElement, title, type) {
    /*
   *  data: 数据对象
   *  domElement: 画布的父容器
   *  title: 图表的标题
   *  type: pv || uv
   *  */
    document.getElementById(domElement).removeAttribute("_echarts_instance_");
    var coordinateXValue = app.timeList;
    var coordinateYValue = [];
    var icon = [];
    var series = [];
    var legendData = [];
    var colors = ["#f6412e", "#9e1cb2", "#3c4db7", "#3694f6", "#3ebcd5", "#2f948c", "#8bc441", "#cdde20", "#fcec1a"];
    data.forEach(function (v, i) {
      icon.push(v.title);
      if (type === 'pv') {
        coordinateYValue.push(v.pv);
      } else if (type === 'uv') {
        coordinateYValue.push(v.uv);
      } else {
        throw '类型错误'
      }
      series.push({
        name: icon[i],
        type: 'line',
        symbol: 'circle',
        symbolSize: 4,
        barWidth: 25,
        barGap: '100%',
        data: coordinateYValue[i],
        markPoint: {
          symbol: 'rect',
          size: 100
        },
        itemStyle: {
          normal: {
            color: colors[i],
            lineStyle: {
              color: colors[i]
            }
          }
        }
      });
      legendData.push({
        name: icon[i],
        icon: 'rect'
      });
      var myChart = echarts.init(document.getElementById(domElement));
      var option = {
        title: {
          text: title
        },
        tooltip: {},
        legend: {
          data: legendData,
          itemWidth: 10,
          itemHeight: 10,
          right: 0
        },
        xAxis: {
          nameTextStyle: {
            lineHeight: 10
          },
          axisLabel: {
            formatter: function (value) {
              return value.replace('-','月')
            }
          },
          data: coordinateXValue
        },
        yAxis: {},
        series: series,
        dataZoom: [
          {
            start: 0,
            end: 100,
            type: 'slider',
            show: true,
            handleSize: 20,//滑动条的 左右2个滑动条的大小
            height: 20,//组件高度
            left: 50, //左边的距离
            right: 40,//右边的距离
            bottom: 0,
            handleColor: '#f6412e',//h滑动图标的颜色
            handleStyle: {
              borderColor: "#cacaca",
              borderWidth: "1",
              shadowBlur: 2,
              background: "#ddd",
              shadowColor: "#ddd"
            },
            fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                offset: 0,
                color: '#1eb5e5'
              },
              {
                offset: 1,
                color: '#5ccbb1'
              }]),
            backgroundColor: '#ddd',
            handleIcon: 'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',
            filterMode: 'filter'
          }
        ],
        grid: [
          {
            bottom:50
          }
        ]
      };
      myChart.setOption(option)
    })
  }

  function setHistogramDate(day) {
    /*
    * day: 返回的天数    eg:day === 1表示昨天
    * 如果不传表示今天
    */
    day = day === undefined ? 0 : day;
    var start = new Date();
    var end = new Date();
    var arr = [];
    if (day === 0) {
      start.setTime(start.getTime())
    } else {
      start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
    }
    end.setTime(end.getTime());
    var startDate = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds();
    var endDate = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds();
    arr.push(startDate, endDate);
    console.log('开始时间：' + startDate + '          结束时间：' + endDate);
    app.datePicker1 = arr;
  }

  function setLineChartDate(day) {
    /*
    * day: 返回的天数    eg:day === 1表示昨天
    * 如果不传表示今天
    */
    day = day === undefined ? 0 : day;
    var start = new Date();
    var end = new Date();
    var arr = [];
    if (day === 0) {
      start.setTime(start.getTime())
    } else {
      start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
    }
    end.setTime(end.getTime());
    var startDate = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds();
    var endDate = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds();
    arr.push(startDate, endDate);
    app.startDate = startDate;
    app.endDate = endDate;
    console.log('开始时间：' + startDate + '          结束时间：' + endDate);
    app.datePicker2 = arr;
  }

  function createHistogramData(response, wrapper) {
    /*
    *  response: 数据对象
    *  wrapper: 承载创建出数据的容器
    */
    var resItem = response.data.items;
    var home_pv_total = 0;
    var home_uv_total = 0;
    var login_pv_total = 0;
    var login_uv_total = 0;
    var registered_pv_total = 0;
    var registered_uv_total = 0;
    var download_pv_total = 0;
    var download_uv_total = 0;
    var loan_market_pv_total = 0;
    var loan_market_uv_total = 0;
    var home_card_pv_total = 0;
    var home_card_uv_total = 0;
    var home_credit_pv_total = 0;
    var home_credit_uv_total = 0;
    var banner_pv_total = 0;
    var banner_uv_total = 0;
    var home_loan_pv_total = 0;
    var home_loan_uv_total = 0;
    resItem.forEach(function (v) {
      home_pv_total += v.home_pv;
      home_uv_total += v.home_uv;
      login_pv_total += v.login_pv;
      login_uv_total += v.login_uv;
      registered_pv_total += v.registered_pv;
      registered_uv_total += v.registered_pv;
      download_pv_total += v.download_pv;
      download_uv_total += v.download_pv;
      loan_market_pv_total += v.loan_market_pv;
      loan_market_uv_total += v.loan_market_uv;
      home_card_pv_total += v.home_card_pv;
      home_card_uv_total += v.home_card_uv;
      home_credit_pv_total += v.home_credit_pv;
      home_credit_uv_total += v.home_credit_uv;
      banner_pv_total += v.banner_pv;
      banner_uv_total += v.banner_uv;
      home_loan_pv_total += v.home_loan_pv;
      home_loan_uv_total += v.home_loan_uv;
    });
    wrapper.push(
      {
        name: "主页面",
        pv: home_pv_total,
        uv: home_uv_total
      },
      {
        name: "登陆",
        pv: login_pv_total,
        uv: login_uv_total
      },
      {
        name: "注册",
        pv: registered_pv_total,
        uv: registered_uv_total
      },
      {
        name: "下载",
        pv: download_pv_total,
        uv: download_uv_total
      },
      {
        name: "活动页",
        pv: loan_market_pv_total,
        uv: loan_market_uv_total
      },
      {
        name: "推荐",
        pv: home_card_pv_total,
        uv: home_card_uv_total
      },
      {
        name: "超市",
        pv: home_credit_pv_total,
        uv: home_credit_uv_total
      },
      {
        name: "信用卡",
        pv: banner_pv_total,
        uv: banner_uv_total
      },
      {
        name: "报告",
        pv: home_loan_pv_total,
        uv: home_loan_uv_total
      }
    );
  }

  function createLineChartData(response, wrapper) {
    /*
    *  response: 数据对象
    *  wrapper: 承载创建出数据的容器
    */
    var icon = ['主页面', '登陆', '注册', '下载', '活动页', '推荐', '超市', '信用卡', '报告'];
    var values = [];
    var resItem = response.data.items;
    var home_pv = [];
    var home_uv = [];
    var login_pv = [];
    var login_uv = [];
    var registered_pv = [];
    var registered_uv = [];
    var download_pv = [];
    var download_uv = [];
    var loan_market_pv = [];
    var loan_market_uv = [];
    var home_card_pv = [];
    var home_card_uv = [];
    var home_credit_pv = [];
    var home_credit_uv = [];
    var banner_pv = [];
    var banner_uv = [];
    var home_loan_pv = [];
    var home_loan_uv = [];
    resItem.forEach(function (v) {
      home_pv.push(v.home_pv);
      home_uv.push(v.home_uv);
      login_pv.push(v.login_pv);
      login_uv.push(v.login_uv);
      registered_pv.push(v.registered_pv);
      registered_uv.push(v.registered_uv);
      download_pv.push(v.download_pv);
      download_uv.push(v.download_uv);
      loan_market_pv.push(v.loan_market_pv);
      loan_market_uv.push(v.loan_market_uv);
      home_card_pv.push(v.home_card_pv);
      home_card_uv.push(v.home_card_uv);
      home_credit_pv.push(v.home_credit_pv);
      home_credit_uv.push(v.home_credit_uv);
      banner_pv.push(v.banner_pv);
      banner_uv.push(v.banner_uv);
      home_loan_pv.push(v.home_loan_pv);
      home_loan_uv.push(v.home_loan_uv);
    });
    values.push(home_pv, home_uv, login_pv, login_uv, registered_pv, registered_uv, download_pv, download_uv, loan_market_pv, loan_market_uv, home_card_pv, home_card_uv, home_credit_pv, home_credit_uv, banner_pv, banner_uv, home_loan_pv, home_loan_uv);
    // console.log(values);
    resItem.forEach(function (v, i) {
      wrapper.push(
        {
          name: v.date,
          title: icon[i],
          pv: values[i * 2],
          uv: values[i * 2 + 1]
        }
      )
    });
    // console.log(wrapper);
  }

  var app = new Vue({
    el: '#app',
    data: function () {
      return {
        hidden: false,
        user_info: "",
        startTime: "",
        endTime: "",
        datePicker1: [],
        datePicker2: [],
        tableData1: '',
        tablePageData: '',
        checkList: [],
        checkbox: '',
        startDate: '',
        endDate: '',
        timeList:''
      }
    },
    watch:{
      datePicker2:function () {
        var start = new Date(app.startDate).getTime();
        var end = new Date(app.endDate).getTime();
        var time =[];
        for(var i=start;i<end;i += 24* 3600*1000 ){
          time.push((new Date(i).getMonth() + 1) + '-' + new Date(i).getDate() )
        }
        app.timeList = time;
      }
    },
    methods: {
      getChangeDate: function (value) {
        var start = value[0];
        var end1111 = new Date(value[1]);
        end1111.setTime(end1111.getTime() + 3600 * 1000 * 24);
        var startDate = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds();
        var endDate = end1111.getFullYear() + '-' + (end1111.getMonth() + 1) + '-' + (end1111.getDate()) + ' ' + end1111.getHours() + ':' + end1111.getMinutes() + ':' + end1111.getSeconds();
        app.startDate = startDate;
        app.endDate = endDate;
        console.log('手动选择的开始时间：' + startDate + '          手动选择的结束时间：' + endDate);
      },
      todayHistogram: function () {
        setHistogramDate()
      },
      yesterdayHistogram: function () {
        setHistogramDate(1)
      },
      weekendHistogram: function () {
        setHistogramDate(7)
      },
      mounthHistogram: function () {
        setHistogramDate(30)
      },
      weekendLineChart: function () {
        setLineChartDate(7)
      },
      harfMounthLineChart: function () {
        setLineChartDate(15)
      },
      mounthLineChart: function () {
        setLineChartDate(30)
      },
      handleCheckedChange: function (value) {
        axios.get('/api').then(function (res) {
          var histogramData = [];
          createHistogramData(res, histogramData);
          var initHistogramData = histogramData;
          var a = [];
          if (value.length === 0) {
            histogramData = initHistogramData;
          } else {
            for (var i = 0; i < value.length; i++) {
              for (var j = 0; j < histogramData.length; j++) {
                if (histogramData[j].name === value[i]) {
                  a.push(histogramData[j]);
                }
              }
            }
            histogramData = a;
          }
          renderHistogram(histogramData, 'histogram1', 'PV 柱状图', 'pv');
          renderHistogram(histogramData, 'histogram2', 'uV 柱状图', 'uv');
        })
      },
      handleCheckedChange2: function (value) {
        axios.get('/api').then(function (res) {
          var icon = ['主页', '登陆', '注册', '下载', '活动页', '推荐', '超市', '信用卡', '报告'];
          var lineChartData = [];
          createLineChartData(res, lineChartData);
          var initLineChartData = lineChartData;
          var b = [];
          if (value.length === 0) {
            lineChartData = initLineChartData;
          } else {
            for (var i = 0; i < value.length; i++) {
              for (var j = 0; j < lineChartData.length; j++) {
                if (lineChartData[j].title === value[i]) {
                  b.push(lineChartData[j]);
                }
              }
            }
            lineChartData = b;
          }
          renderLineChart(lineChartData, 'lineChart1', 'PV 趋势图', 'pv');
          renderLineChart(lineChartData, 'lineChart2', 'UV 趋势图', 'uv');
        })
      },
      pageDataSearch: function () {
        axios.get('/api').then(function (response) {
          if (response.data.status === 'success') {
            app.tablePageData = response.data.items;
            var histogramData = [];
            createHistogramData(response, histogramData);
            // 生成checkbox框
            var checkboxes = [];
            histogramData.forEach(function (v) {
              checkboxes.push(v.name);
            });
            app.checkbox = checkboxes;
            renderHistogram(histogramData, 'histogram1', 'PV 柱状图', 'pv');
            renderHistogram(histogramData, 'histogram2', 'UV 柱状图', 'uv');
          }
        }).catch(function (error) {
          app.$message({
            message:error,
            type: 'warning'
          });
        })
      },
      pageDataSearch2: function () {
        axios.get('/api').then(function (response) {
          if (response.data.status === 'success') {
            app.tablePageData = response.data.items;
            var icon = ['主页', '登陆', '注册', '下载', '活动页', '推荐', '超市', '信用卡', '报告'];
            var lineChartData = [];
            createLineChartData(response, lineChartData);
            // 生成checkbox框
            var checkboxes = [];
            icon.forEach(function (v, i) {
              checkboxes.push(icon[i]);
            });
            app.checkbox = checkboxes;
            renderLineChart(lineChartData, 'lineChart1', 'PV 趋势图', 'pv');
            renderLineChart(lineChartData, 'lineChart2', 'UV 趋势图', 'uv');
          }
        }).catch(function (error) {
          app.$message({
            message:error,
            type: 'warning'
          });
        })
      }
    }
  })
});