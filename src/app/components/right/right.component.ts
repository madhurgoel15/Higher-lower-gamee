import { Component,Output, EventEmitter,OnInit ,Renderer2,Inject} from '@angular/core';
import * as data from '../data.json' ;
import { DOCUMENT } from '@angular/common';

interface country{
  name:string,
  population:Number,
  flag:string,
  independent:boolean
}
interface event{
  c:country,
  status:boolean
}

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css'
  ],
})


export class RightComponent implements OnInit {

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: any) {
    this.countries.splice(this.countries.length-2,2);
    console.log(this.co);
    console.log(this.countries);
    this.index = Math.floor(Math.random() * (this.countries.length)+1)-1;
    console.log(this.index);
    this.cont = this.countries[this.index];
    this.prev_c=1380004385;
    this.prev_n="India";
    this.score=0;
    this.pas ={
      c:this.cont,
      status:true,
    };
  }
  cont:country;
  co: country[]={...data};
  countries = Object.values(this.co);
  index: number;
  prev_c: Number;
  prev_n: string;
  score: number;
  pas:event;

  ngOnInit(): void {
    const styles = this.document.createElement('STYLE') as HTMLStyleElement;
    styles.id = 'dynamic-theme-css1';
    styles.innerHTML = this.style;
    this.renderer.appendChild(this.document.head, styles);
  }

  @Output() newItemEvent = new EventEmitter<event>();
  higher(){
    if(this.cont.population>=this.prev_c){
      this.prev_c=this.cont.population
      this.prev_n=this.cont.name;
      this.pas.c=this.cont;
      this.pas.status=true;
      this.newItemEvent.emit(this.pas);
      this.countries.splice(this.index,1);
      if(this.countries.length==0){
        this.pas.status=false;
        this.newItemEvent.emit(this.pas);
      }
      this.index = Math.floor(Math.random() * (this.countries.length)+1)-1;
      console.log(this.index);
      this.cont = this.countries[this.index];
      this.score++;
      this.ngOnChanges();

    }
    else{
      this.pas.c=this.cont;
      this.pas.status=false;
      this.newItemEvent.emit(this.pas);
      this.ngOnDestroy();
    }
  }

  lower(){
    if(this.cont.population<=this.prev_c){
      this.prev_c=this.cont.population
      this.prev_n=this.cont.name;
      this.pas.c=this.cont;
      this.pas.status=true;
      this.newItemEvent.emit(this.pas);
      this.countries.splice(this.index,1);
      if(this.countries.length==0){
        this.pas.status=false;
        this.newItemEvent.emit(this.pas);
      }
      this.index = Math.floor(Math.random() * (this.countries.length)+1)-1;
      console.log(this.index);
      this.cont = this.countries[this.index];
      this.score++;
      this.ngOnChanges();
    }
    else{
      this.pas.c=this.cont;
      this.pas.status=false;
      this.newItemEvent.emit(this.pas);
      this.ngOnDestroy();
    }
  }
  public get style(): string {
    return `
    .card__content{
      height: 80%;
      width: 80%;
      border-radius: 5px;
      box-shadow: 16px 16px 44px #706f6f, -16px -16px 44px #a3a8a3;
      color: aliceblue;
      padding-top: 4%;
      font-family: "Roboto", sans-serif;
      background:  linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) , url(${this.cont.flag}) ,fixed, no-repeat;
      background-position : center center;
      background-size : cover;
      margin: 10px auto;
      transition: 0.3s all ease-in-out;
    }
    .card__content:hover {
      margin-top:0px;
    }`;
  }
  ngOnChanges() {
    const styles = this.document.getElementById('dynamic-theme-css1');
    if (styles) {
      styles.innerHTML = this.style;
    }
  }
  ngOnDestroy() {
    const styles = this.document.getElementById('dynamic-theme-css1');
    if (styles) {
      styles.parentElement.removeChild(styles);
    }
  }
}
