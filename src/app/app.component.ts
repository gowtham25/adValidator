import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() { }
  resourceFormType:string;
  myFilterDataForTable:any = {};
  isDataTableRepresentation:boolean = true;
  showButton:boolean = false
  dataTableFilterData(event:any){
    this.myFilterDataForTable = event;
    this.showButton = true;
  }
  resourseFormData(event:any){
    this.resourceFormType = event;
  }
  enableDataTable(){
    this.isDataTableRepresentation = true;
    $('.showTable').addClass('active');
    $('.showChart').removeClass('active');
  }
  enablePieChart(){
    this.isDataTableRepresentation = false;
    $('.showTable').removeClass('active');
    $('.showChart').addClass('active');
  }
}
