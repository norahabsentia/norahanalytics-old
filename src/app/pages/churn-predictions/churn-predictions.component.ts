import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbColorHelper, NbThemeService} from "@nebular/theme";
import {LocalDataSource} from "ng2-smart-table";
import {DataService} from "../../@core/data/getcountrydata.service";
import {SmartTableService} from "../../@core/data/smart-table.service";

@Component({
  selector: 'churn-predictions',
  templateUrl: './churn-predictions.component.html',
  styleUrls: ['./churn-predictions.component.scss']
})
export class ChurnPredictionsComponent implements OnInit, OnDestroy {

  data: any;
  options: any;
  themeSubscription: any;
  dataBar1: any;
  dataBar2: any;
  optionsBar: any;
  showDownload;
  showEngagement;
  showLocation;
  selectedLocation = "Location";
  selectedEngagement = "Engagement";
  dataLocation= [
    {name: 'Location'},
    {name: 'Affluence'},
    {name: 'Mobile Brand'},
    {name: 'Platform'},
  ];
  dataEngagement = [
    {name: 'Engagement'},
    {name: 'Skill'},
    {name: 'Out of Life'},
    {name: 'Stuck at level'},
  ]
  clickLocation(item){
    this.selectedLocation = item.name;
    this.showLocation = false;
    this.setData('dataBar1');
  }
  clickEngagement(item){
    this.selectedEngagement = item.name;
    this.showEngagement = false;
    this.setData('dataBar2');

  }

  settings = {
    hideSubHeader: false,
    actions: false,
    columns: {
      ProductID: {
        title: 'User ID',
        type: 'number',
        editable: false,
        filter: false,
        width: '50%'
      },
      AndroidBase: {
        title: 'Churn Probability',
        type: 'string',
        editable: false,
        filter: false,
        width: '50%'
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();
  public tabledata: any


  constructor(private theme: NbThemeService, private service: SmartTableService, public dataservice: DataService) {

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
      this.setData('dataBar1');
      this.setData('dataBar2');



      this.optionsBar = barOptions;
    });
  }

  ngOnInit(){
    this.getDataFromJson()

  }

  setData(i){
    var dataPack1 = [];
    var dataPack2 = [];
    var dataPack3 = [];
    for(let i = 0; i < 12 ; i++){
      dataPack1.push(Math.floor(Math.random() * 60000) + 1  );
      dataPack2.push(Math.floor(Math.random() * 60000) + 1  );
      dataPack3.push(Math.floor(Math.random() * 60000) + 1  );
    }
    console.log(dataPack1, dataPack2)
    this[i] = {
      labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
      datasets: [
        {
          label: 'dataPack1',
          data: dataPack1,
          backgroundColor: "rgba(55, 160, 225, 0.7)",
          hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
          hoverBorderWidth: 2,
          hoverBorderColor: 'lightgrey'
        },
        {
          label: 'dataPack2',
          data: dataPack2,
          backgroundColor: "rgba(225, 58, 55, 0.7)",
          hoverBackgroundColor: "rgba(225, 58, 55, 0.7)",
          hoverBorderWidth: 2,
          hoverBorderColor: 'lightgrey'
        },
        {
          label: 'dataPack3',
          data: dataPack3,
          backgroundColor: "rgba(55, 160, 0, 0.7)",
          hoverBackgroundColor: "rgba(55, 160, 0, 0.7)",
          hoverBorderWidth: 2,
          hoverBorderColor: 'lightgrey'
        }
      ],
    };
  }

  getDataFromJson() {
    this.dataservice.getData().subscribe((data) => {
      this.tabledata = data.data;
    });

  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
