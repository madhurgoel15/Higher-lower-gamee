import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import * as data from './data.json' ;
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  name=data;

  constructor(){}
  ngOnInit(): void {
  console.log(data);
  }
}



