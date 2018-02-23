import {Component, Input, OnInit} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {SmartTableService} from "../../../@core/data/smart-table.service";
import {DataService} from "../../../@core/data/getcountrydata.service";
import {NbColorHelper, NbThemeService} from "@nebular/theme";

@Component({
  selector: 'chart-switcher',
  templateUrl: './chart-switcher.component.html',
  styleUrls: ['./chart-switcher.component.scss']
})
export class ChartSwitcherComponent implements OnInit {

  showSelectItems;
  charts = [
    // {
    //   type: 'Area',
    //   icon: 'fa-area-chart',
    //   show: false,
    //   label: 'Display simple area chart',
    // },
    // {
    //   type: 'Pie',
    //   icon: 'fa-pie-chart',
    //   show: true,
    //   label: 'Display pie chart',
    //
    // },
    // {
    //   type: 'Line',
    //   icon: 'fa-line-chart',
    //   show: false,
    //   label: 'Display line chart',
    //
    // },
    // {
    //   type: 'Bar',
    //   icon: 'fa-bar-chart',
    //   show: false,
    //   label: 'Display bar chart',
    // },

    {
      type: 'StackBar',
      icon: 'fa-bar-chart',
      show: true,
      label: 'Display bar chart',
    },

    {
      type: 'Table',
      icon: 'fa-table',
      show: false,
      label: 'Display table',
    },
    // {
    //   type: 'Histogram',
    //   icon: 'fa-bar-chart',
    //   show: false,
    //   label: 'Display Histogram chart',
    // },

  ]
  change() {
    this.showSelectItems = true;
  }
  select(item) {
    for(let o of this.charts){
      o.show = false;
    }

    item.show = true;
    this.showSelectItems = false;
  }


  settings = {
    hideSubHeader: false,
    actions:
      {
        position: 'right',
        add : false,
        custom: [
          {
            name: '<i class="nb-loop" (click)="onClick()"></i>',
            title: '<i class="nb-loop" (click)="onClick()"></i>',
          },
        ],
      },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    reset: {
      reset: '<i class="nb-loop"></i>',
    },
    columns: {
      ProductID: {
        title: 'Product ID',
        type: 'number',
        editable: false,
        filter: false,
      },
      AndroidBase: {
        title: 'Android Base Price',
        type: 'string',
        editable: false,
        filter: false,
      },
      IOSBase: {
        title: 'IOS Base Price',
        type: 'string',
        editable: false,
        filter: false,
      },
      AndroidRecommended: {
        title: 'Android Recommended Price Range',
        type: 'string',
        editable: false,
        filter: false,
      },
      IOSRecommended: {
        title: 'IOS Recommended Price Range',
        type: 'string',
        editable: false,
        filter: false,
      },
      AndroidCustom: {
        title: 'Android Custom Price Range',
        type: 'string',
        editable: true,
        filter: false,
      },
      IOSCustom: {
        title: 'IOS Custom Price Range',
        type: 'string',
        editable: true,
        filter: false,
      },
    },
  };
  selectedLocation = '';
  showLocation;
  dataLocation= [
  ];

  source: LocalDataSource = new LocalDataSource();
  public tabledata: any

  //map
  latlong: any = {};
  mapData: any[];
  max = -Infinity;
  min = Infinity;
  options: any;
  optionsBar;
  bubbleTheme: any;
  geoColors: any[];
  themeSubscription: any;

  dataBar;
  dataLine;
  dataEBar;
  dataEPie;

  @Input() title;
  @Input() showMap;
  @Input() data;

  constructor(private service: SmartTableService, public dataservice: DataService, private theme: NbThemeService) {
    const data = this.service.getData();
    this.source.load(data);
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        // labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
        datasets: [{
          data: [300, 500, 100],
          backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight],
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        // legend: {
        //   labels: {
        //     fontColor: chartjs.textColor,
        //   },
        // },
      };

      let barOptions = {
        animation: {
          duration: 10,
        },
        tooltips: {
          mode: 'label',
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: { display: false },
          }],
          yAxes: [{
            stacked: true,

          }],
        }, // scales
        legend: {display: true}
      }
      this.setData();

      this.optionsBar = barOptions;
    });
  }

  setChartBarData(){
    let labels = [];
    let keys =[];
    let datasets = [];
    if(this.data){
      for(let item of this.data){
        labels.push(item.value);

        keys = Object.keys(item);
      }
      keys.splice(keys.indexOf('value'), 1);
      for(let key of keys){
        let arr = [];
        for(let item of this.data){
          arr.push(item[key]);
        }
        datasets.push({
            data: arr,
            label: key,
            backgroundColor: NbColorHelper.hexToRgbA(this.getRandomColor(), 0.8),
          })
      }
    }

    this.dataBar = {
      labels: labels,
      datasets: datasets,
    };
  }

  setChartLineData(){
    let labels = [];
    let keys =[];
    let datasets = [];
    if(this.data){
      for(let item of this.data){
        labels.push(item.value);

        keys = Object.keys(item);
      }
      keys.splice(keys.indexOf('value'), 1);
      for(let key of keys){
        let arr = [];
        for(let item of this.data){
          arr.push(item[key]);
        }
        datasets.push({
          data: arr,
          backgroundColor: NbColorHelper.hexToRgbA(this.getRandomColor(), 0.8),
          name: key,
          type:'line',
          stack: '总量',
        })
      }
    }

    this.dataLine = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: keys
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: labels
      },
      yAxis: {
        type: 'value'
      },
      series: datasets
    }
  }
  reload = true;
  setChartEBarData(i){
    this.dataEBar = null;
    this.reload = false;
    setTimeout(() => {
      this.reload = true;
      setTimeout(() => {
          if(document.getElementById('echartsbar'))
        document.getElementById('echartsbar').click();
      }, 100);
    }, 100);
    let labels = [];
    let keys =[];
    let datasets = [];
    if(this.data){
      for(let item of this.data){
        labels.push(item.value);

        keys = Object.keys(item);
      }
      keys.splice(keys.indexOf('value'), 1);
      for(let key of keys){
        let arr = [];
        for(let item of this.data){
          arr.push(item[key]);
        }
        datasets.push({
          data: arr,
          // label: key,
          // backgroundColor: NbColorHelper.hexToRgbA(this.getRandomColor(), 0.8),
          name: key,
          type: 'bar',
          barWidth: '60%',
        })
      }
    }
    this.dataLocation = keys;
    this.selectedLocation = this.dataLocation[i];
    console.log( datasets[i], i)
    this.dataEBar = {
      backgroundColor: echarts.bg,
      color: [this.getRandomColor()],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: labels,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: echarts.axisLineColor,
            },
          },
          axisLabel: {
            textStyle: {
              color: echarts.textColor,
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: echarts.axisLineColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: echarts.splitLineColor,
            },
          },
          axisLabel: {
            textStyle: {
              color: echarts.textColor,
            },
          },
        },
      ],
      series: [
        datasets[i]
      ],
    };
  }

  setChartEPieData(i){
    this.dataEPie = null;
    this.reload = false;
    setTimeout(() => {
      this.reload = true;
      setTimeout(() => {

        document.getElementById('echartspie').click();
      }, 100);
    }, 100);
    let labels = [];
    let keys =[];
    let datasets = [];
    let colors = [];
    if(this.data){
      for(let item of this.data){
        labels.push(item.value);

        keys = Object.keys(item);
      }
      keys.splice(keys.indexOf('value'), 1);
      for(let key of keys){

        let arr = [];
          for(let i = 0; i < this.data.length; i++){

          arr.push({ value: this.data[i][key], name: labels[i] });
        }
        colors.push(this.getRandomColor());
        datasets.push(
          arr
        )
      }
    }
    this.dataLocation = keys;
    this.selectedLocation = this.dataLocation[i];
    console.log(datasets, datasets[i], i)
    this.dataEPie = {
      backgroundColor: echarts.bg,
      color: colors,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: labels,
        textStyle: {
          color: echarts.textColor,
        },
      },
      series: [
        {
          // name: 'Countries',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          data: datasets[i],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: echarts.itemHoverShadowColor,
            },
          },
          label: {
            normal: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
          },
        },
      ],
    };
  }

   getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }


  clickLocation(i){
    this.selectedLocation = i;
    this.showLocation = false;
    for( let item of this.charts){
      if(item.show && item.type === 'Histogram'){
        this.setChartEBarData(this.dataLocation.indexOf(i));
      }
      if(item.show && item.type === 'Pie'){
        this.setChartEPieData(this.dataLocation.indexOf(i));
      }
    }

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  ngOnInit() {
    this.getDataFromJson();
    if(this.showMap){
      this.charts.push( {
        type: 'Map',
        icon: 'fa-map',
        show: true,
        label: 'Display gradient map',
      });

      this.select(this.charts[this.charts.length - 1]);
    }
    this.setChartBarData();
    this.setChartLineData();
    this.setChartEBarData(0);
    this.setChartEPieData(0);
  }
  getDataFromJson() {
    this.dataservice.getData().subscribe((data) => {
        this.tabledata = data.data;
      });

  }
  changeonddl(): void {
  }
  dataBar1
  setData(){
    var dataPack1 = [];
    var dataPack2 = [];
    var dataPack3 = [];
    for(let i = 0; i < 12 ; i++){
      dataPack1.push(Math.floor(Math.random() * 60000) + 1  );
      dataPack2.push(Math.floor(Math.random() * 60000) + 1  );
      dataPack3.push(Math.floor(Math.random() * 60000) + 1  );
    }
    console.log(dataPack1, dataPack2)
    this.dataBar1 = {
      labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
      datasets: [
        {
          label: 'dataPack1',
          data: dataPack1,
          backgroundColor: "#81b7dc",
          hoverBackgroundColor: "#81b7dc",
          hoverBorderWidth: 2,
          hoverBorderColor: '#dddde0'
        },
        {
          label: 'dataPack2',
          data: dataPack2,
          backgroundColor: "#bcbabe",
          hoverBackgroundColor: "#bcbabe",
          hoverBorderWidth: 2,
          hoverBorderColor: '#bcbabe'
        },
        {
          label: 'dataPack3',
          data: dataPack3,

          backgroundColor: "#dddde0",
          hoverBackgroundColor: "#dddde0",
          hoverBorderWidth: 2,
          hoverBorderColor: '#81b7dc'
        }
      ],
    };
  }
}
