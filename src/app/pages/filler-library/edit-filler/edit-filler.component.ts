import { Component, OnInit , Input } from '@angular/core';

import { NgForm } from '@angular/forms';

import { NotificationService } from '../shared/notification.service';

import { Notification } from '../shared/notification.model';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-filler',
  templateUrl: './edit-filler.component.html',
  styleUrls: ['./edit-filler.component.scss']
})
export class EditFiller implements OnInit {
  @Input() curfiller = [];
  curfillerKey;
  editValue = 0;
  editSegmentKey;
  addValueTextbox:string;
  addValue:string;
  constructor(private notificationService: NotificationService, private tostr: ToastrService) { }
  
  ngOnInit() {  
      console.log('current filler')
      console.log(this.curfiller);
      
      if(this.curfiller['value_segments']){
          this.curfillerKey = Object.keys(this.curfiller['value_segments']);
      }
  } 
  
  getCurrentFillerKeys(){
      this.curfillerKey = Object.keys(this.curfiller['value_segments']);
      return this.curfillerKey;
  }
  editfillerValue(key){
      this.editSegmentKey = key;
      this.editValue = 1;
  }
  addSegmentFiller(event){
      var i = 0;   
      this.notificationService.editFillerItemArray.forEach(element => {
          if(element.name == event){
              this.curfiller['value_segments'][this.editSegmentKey].push(element.name);
              this.notificationService.editFillerItemArray.splice(i, 1);
              return;
          }
          i ++;
      });
  }
  showEditFillerTemplate(value){
      this.notificationService.editFillerSection = value;
  }
  addValueFiller(){
      this.notificationService.addFillerTextbox = 1;
  }
  createFillerValue(val){
      console.log(val)
      console.log(this.addValue);
      
      this.curfiller['value_segments'][this.addValue] = [];
      this.editSegmentKey = this.addValue;
      this.notificationService.addFillerTextbox = 0;
      this.editValue = 1;
      
      this.getCurrentFillerKeys();
  }
}

