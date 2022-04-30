import { Component,OnInit } from '@angular/core';
import { stringify } from 'querystring';


interface leaderboard{
  name:string,
  score:number
}
interface emit{
  score:number;
  status:boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: '<app-left (messageEvent)="status($event)"></app-left>',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(){
    this.localitem=localStorage.getItem("scores");
    if(this.localitem==null){
      this.scores=[];
    }
    else{
      this.scores=JSON.parse(this.localitem);
    }
    this.vis="A";
    this.pas={
      name:'',
      score:0,
    };
  }
  pas:leaderboard;
  scores:leaderboard[];
  title = 'higher-lower';
  vis:string;
  localitem:any;


  play(){
    this.vis="B";
  }
  back(){
    this.vis="A";
    this.pas={
      name:'',
      score:0,
    };
  }
  status(stat:emit){
    this.pas.score=stat.score;
    if(!stat.status){
      var personCopy : leaderboard = { ...this.pas};
      if(this.scores.length>9 && stat.score>=this.scores[9].score){
      this.scores[9].name=personCopy.name;
      this.scores[9].score=personCopy.score;
      }
      else if(this.scores.length<=9){
      var personCopy : leaderboard = { ...this.pas};
      this.scores.push(personCopy);
      }
      this.scores.sort((a, b) => (a.score > b.score ? -1 : 1));
      if(this.pas.score==249){
        this.vis='D';
      }
      else{
        this.vis="C";
      }
      localStorage.setItem("scores",JSON.stringify(this.scores));

    }
  }
}
