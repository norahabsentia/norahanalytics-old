import { Component, OnInit, ViewChild } from '@angular/core';
import { TextInputHighlightComponent } from 'angular-text-input-highlight/text-input-highlight.component';
import { HighlightTag } from 'angular-text-input-highlight';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'norah-scheduler',
  templateUrl: 'norah-scheduler.component.html',
  styleUrls: ['./norah-scheduler.component.scss'],
  
})

export class NorahSchedulerComponent implements OnInit {
constructor(
        private route: ActivatedRoute,
        private router: Router
        ) { }
 options = ['thrice a day', 'twice a day', 'once a day', 'once in 2 days', 'once in 3 days', 'once a week', 'custom'];
 options2 = ['before active time', 'during active time', 'after active time'];
optionSelected: any;
optionSelected2: any;
optionSelected3: any;
optionSelected4: any;
optionSelected5: any;
optionSelected6: any;
returnUrl: string;
norahscheduler = [{"high_churner":{"first":"once a day","second":"before active time"},"regular":{"first":"thrice a day","second":"before active time"},"loyal":{"first":"once in 2 days","second":"before active time"}}];

  //this.optionSelected = 'thrice a day';
onOptionSelected(event){
 console.log(event); //option value will be sent as event
}
  
  
  ngOnInit() {
    

  }
  reset(){
    
    this.norahscheduler = [{"high_churner":{"first":"once a day","second":"before active time"},"regular":{"first":"thrice a day","second":"before active time"},"loyal":{"first":"once in 2 days","second":"before active time"}}];
    //this.router.navigateByUrl('pages/norah-scheduler');
  }
  onTransfer(form: NgForm){
    
    console.log(this.norahscheduler);
  }

  

 


 

  
}
