import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Notification} from './notification.model';

@Injectable()
export class NotificationService {

  notificationList: AngularFireList<any> ;
  selectedNotification: Notification = new Notification();
  temp: Notification = new Notification();
  rightArray: any = [];
  itemArray : any =[];
  tempItemArray : any =[];
  tempRightArray : any =[];
  itemsInit = [
    {id:1,name:'Normacjk'},
    {id:2,name:'Inspiring'},
    {id:3,name:'Extraordinary'},
    {id:4,name:'Successfully accomplished'},
    {id:5,name:'Unsuccessfull'},
    {id:6,name:'Trending'},
    {id:7,name:'Over Anticipated'},
    {id:8,name:'Normally Existed.'},
    {id:9,name:'item1'},
    {id:10,name:'item2'},
    {id:11,name:'item3'},
    {id:12,name:'item4'},
    {id:13,name:'item5'},
  ];

  fillerArray = [
     {filler_id:'1',tag_name:'Country',count:4},
     {filler_id:'2',tag_name:'Time',count:1},
     {filler_id:'3',tag_name:'Month',count:2},
     {filler_id:'4',tag_name:'brave',count:5},
     {filler_id:'5',tag_name:'Day',count:6},
     {filler_id:'6',tag_name:'Username',count:4},
     {filler_id:'7',tag_name:'test1',count:5},
     {filler_id:'8',tag_name:'test3',count:5},
     {filler_id:'9',tag_name:'test2',count:0},
     {filler_id:'10',tag_name:'test4',count:6},
     {filler_id:'11',tag_name:'test5',count:11},
  ];
  constructor(private firebase :AngularFireDatabase) { }
  
  getData(){
    this.notificationList = this.firebase.list('notifications');
    return this.notificationList;
  }

  insertNotification(notification : Notification,arr)
  {
    this.getData();
    if(!notification.deeplink){
      this.notificationList.push({
        title: notification.title,
        body: notification.body,
        deeplink: '',
        Customer_Segment_ID: arr
      });
    }
    else{
      this.notificationList.push({
        title: notification.title,
        body: notification.body,
        deeplink: notification.deeplink,
        Customer_Segment_ID: arr
      });
    }
    
    
  }

  updateNotification(notification : Notification,arr){
   
    if(!notification.deeplink){
      this.notificationList.update(notification.noti_ID,
        {
          title: notification.title,
          body: notification.body,
          deeplink: '',
          Customer_Segment_ID: arr
        });
    }
    else{ 
      this.notificationList.update(notification.noti_ID,
        {
          title: notification.title,
          body: notification.body,
          deeplink: notification.deeplink,
          Customer_Segment_ID: arr
        });
    }
  }

  deleteNotification(noti_ID : string){
    this.notificationList.remove(noti_ID);

  }

  getFiller(){
      return this.fillerArray;
  }
  
  addFiller(val){
      var id = this.fillerArray.length;
      this.fillerArray.push({filler_id: (id+1)+'' , tag_name:val , count:0});
      return this.fillerArray;
  }

}
