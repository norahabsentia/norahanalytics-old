
@Component({
  selector: 'button-view',
  template: `
    <button (click)="onClick()">{{ renderValue }}</button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    this.save.emit(this.rowData);
  }
}


import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalDataSource, ViewCell} from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { DataService } from '../../../@core/data/getcountrydata.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    .rightposition{
       float:right;
       margin:10px 0px;
    }
      .icon-setting{
        display:inline-block;
        padding: .375rem .75rem !important;
      }
      .dropdown, .dropup, .btn-group {
    margin-bottom: 1rem;
  }
  .setwidth{
    width: 25%;
  }
  .dropdownset{
    height: 200px;
    overflow: scroll;
    width: 25%;
  }

  nb-card-body {
   
  }
  `],
})
export class SmartTableComponent implements OnInit {
  settings = {
     hideSubHeader: false,
    actions: false,
   //   actions:
   //    {
   //      position: 'right',
   //      add : false,
   //    custom: [
   //      {
   //        name: '<i class="nb-loop" (click)="onClick()"></i>',
   //        title: '<i class="nb-loop" (click)="onClick()"></i>',
   //      },
   //    ],
   //   },
   // edit: {
   //    editButtonContent: '<i class="nb-edit"></i>',
   //    saveButtonContent: '<i class="nb-checkmark"></i>',
   //    cancelButtonContent: '<i class="nb-close"></i>',
   //  },
   //  delete: {
   //    deleteButtonContent: '<i class="nb-trash"></i>',
   //    confirmDelete: true,
   //  },
   //  reset: {
   //    reset: '<i class="nb-loop"></i>',
   //    },
    columns: {
      ProductID: {
        title: 'Product ID',
        type: 'number',
         editable: false,
         filter: false,
        },
      BasePrice: {
        title: 'Base Price',
        type: 'number',
         editable: false,
          filter: false,
      },
      RMin: {
        title: 'Min',
        type: 'number',
         editable: false,
          filter: false,
      },
      RMax: {
        title: 'Max',
        type: 'number',
         editable: false,
          filter: false,
      },
      CMin: {
        title: 'Min',
        type: 'number',
        editable: false,
         filter: false,
      },
      CMax: {
        title: 'Max',
        type: 'number',
        editable: true,
         filter: false,
      },
      button: {
        title: 'Actions',
        type: 'custom',
        editable: false,
        filter: false,
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            // this.showModal = true;

            alert(`${row.ProductID} saved!`)
          });
        }
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
public tabledata: any
  constructor(private service: SmartTableService, public dataservice: DataService) {
    const data = this.service.getData();
    this.source.load(data);
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
  this.dataservice.getData()
                   .subscribe((data) => { this.tabledata
                    this.tabledata = data.data;
                  });

}
    changeonddl(): void {
    }
  showModal;
  onClick(){
    console.log(2323)
  this.showModal = true;
  }
}
