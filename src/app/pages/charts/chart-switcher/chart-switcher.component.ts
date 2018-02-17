import {Component, Input, OnInit} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {SmartTableService} from "../../../@core/data/smart-table.service";
import {DataService} from "../../../@core/data/getcountrydata.service";

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
    {
      type: 'Pie',
      icon: 'fa-pie-chart',
      show: true,
      label: 'Display pie chart',

    },
    {
      type: 'Line',
      icon: 'fa-line-chart',
      show: false,
      label: 'Display line chart',

    },
    {
      type: 'Bar',
      icon: 'fa-bar-chart',
      show: false,
      label: 'Display bar chart',
    },
    {
      type: 'Table',
      icon: 'fa-table',
      show: false,
      label: 'Display table',
    },
    {
      type: 'Histogram',
      icon: 'fa-bar-chart',
      show: false,
      label: 'Display Histogram chart',
    },

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
  selectedLocation = 'Churned';
  showLocation;
  dataLocation= [
    {name: 'Churned'},
    {name: 'Predicted to churn'},
    {name: 'Churned and predicted'},
    {name: 'Predicted but not churned'},
    {name: 'Churned but not predicted'}
  ];

  source: LocalDataSource = new LocalDataSource();
  public tabledata: any

  @Input() title;
  constructor(private service: SmartTableService, public dataservice: DataService) {
    const data = this.service.getData();
    this.source.load(data);
  }

  clickLocation(item){
    this.selectedLocation = item.name;
    this.showLocation = false;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  ngOnInit() {
    this.getDataFromJson()
  }
  getDataFromJson() {
    this.dataservice.getData().subscribe((data) => {
        this.tabledata = data.data;
      });

  }
  changeonddl(): void {
  }
}
