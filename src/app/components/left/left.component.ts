import { DOCUMENT } from '@angular/common';
import { Component, OnInit,Output, EventEmitter, Inject,Renderer2,} from '@angular/core';

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
interface emit{
  score:number;
  status:boolean;
}


@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  template: '<app-right (messageEvent)="receiveMessage($event)"></app-right>',
  styleUrls: ['./left.component.css'],
})
export class LeftComponent implements OnInit {
  constructor(private rend: Renderer2, @Inject(DOCUMENT) private doc: any) {
    this.stat={
      score:0,
      status:false,
    };
    this.cont={"name":"India","population":1380004385,"flag":"https://flagcdn.com/in.svg","independent":false};
  }
  @Output() statuss = new EventEmitter<emit>();
  stat:emit;
  cont:country;
  ngOnInit(): void {
    const styless = this.doc.createElement('STYLE') as HTMLStyleElement;
    styless.id = 'dynamic-theme-css';
    styless.innerHTML = this.stylee;
    this.rend.appendChild(this.doc.head, styless);
  }

  receiveMessage(rec:event) {
    if(rec.status){
      this.cont=rec.c;
      this.stat.score++;
      this.ngOnChanges();
      //console.log(this.cont.name);
    }
    else{
      this.ngOnDestroy();
    }
    this.stat.status=rec.status;
    this.statuss.emit(this.stat);
  }


  public get stylee(): string {
    return `
    .card__content1{
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
    .card__content1:hover {
      margin-top:0px;
    }`;
  }
  ngOnChanges() {
    //console.log(this.cont.name);
    const styles = this.doc.getElementById('dynamic-theme-css');
    if (styles) {
      styles.innerHTML = this.stylee;
    }
  }
  ngOnDestroy() {
    const styles = this.doc.getElementById('dynamic-theme-css');
    if (styles) {
      styles.parentElement.removeChild(styles);
    }
  }
}
