import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'performance-analysis-user-behavior-basis',
  templateUrl: './performance-analysis-user-behavior-basis.component.html',
  styleUrls: ['./performance-analysis-user-behavior-basis.component.scss']
})
export class PerformanceAnalysisUserBehaviorBasisComponent implements OnInit {
  currentlevel;
  lastAction;
  engagement;
  totalGame;
  userSkill;
  Out_of_Lives;
  LevelStickiness;
  Loyalty_Index;
  Platform;
  constructor(private http: HttpClient) {

    this.http.get('../../../json/new_currentlevel-aggr-format.json').subscribe((data: any) => {
      this.currentlevel = data.currentlevel;
      console.log(data.currentlevel)
    });
    this.http.get('../../../json/new_lastaction-aggr-format.json').subscribe((data: any) => {
      this.lastAction = data.LastAction;
      console.log(data.LastAction)
    });
    this.http.get('../../../json/engagement-aggr-format.json').subscribe((data: any) => {
      this.engagement = data.Engagement;
      console.log(data.Engagement)
    });
    this.http.get('../../../json/Total_time_spent_in_Game-aggr-format.json').subscribe((data: any) => {
      this.totalGame = data.Total_time_spent_in_Game;
      console.log(data.Total_time_spent_in_Game)
    });
    // this.http.get('../../../json/User_Skill-aggr-format.json').subscribe((data: any) => {
    // this.http.get('../../../json/User_Skill-aggr-format.json').subscribe((data: any) => {
    //   this.userSkill = data.User_Skill;
    //   console.log(data.User_Skill)
    // });
    this.http.get('../../../json/Out_of_Lives-aggr-format.json').subscribe((data: any) => {
      this.engagement = data.Engagement;
      console.log(data.Engagement)
    });
    this.http.get('../../../json/Level Stickiness-aggr-format.json').subscribe((data: any) => {
      this.LevelStickiness = data['Level Stickiness'];
      console.log(data['Level Stickiness'])
    });
    // this.http.get('../../../json/Loyalty_Index-aggr-format.json').subscribe((data: any) => {
    this.http.get('../../../json/platform-aggr-format.json').subscribe((data: any) => {
      this.Loyalty_Index = data.Platform;
      this.engagement = data.Platform;
      this.userSkill = data.Platform;
      this.Out_of_Lives = data.Platform;
      console.log(data.Loyalty_Index)
    });
    this.http.get('../../../json/platform-aggr-format.json').subscribe((data: any) => {
      this.Platform = data.Platform;
      console.log(data.Platform)
    });
  }

  ngOnInit() {
  }

}
