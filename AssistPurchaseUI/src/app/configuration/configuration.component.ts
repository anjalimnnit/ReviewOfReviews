import { Component,Inject, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http'
import { ProductRecord } from '../Services/ProductRecordService';
import {PurchaseService} from '../Services/Purchase.service'
@Component({
  selector: 'config-comp',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  response:any;
  baseUrl:string;
  message:string;
  htmlMessage:string;
  records:ProductRecord[];
  client:HttpClient;
  purchaseServiceRef:PurchaseService
  constructor(private router:Router,httpClient:HttpClient, @Inject('apiBaseAddress')baseUrl:string,purchaseServiceRef:PurchaseService) { 
    this.client = httpClient;
    this.baseUrl = baseUrl;
    this.htmlMessage ="";
    this.purchaseServiceRef=purchaseServiceRef;
  }

  ngOnInit(): void {
  }
  
  navigateAddDevice(){
    this.router.navigate(['/addDevice'])
  }
  navigateDeleteDevice()
  {
    this.router.navigate(['/deleteDevice'])
  }
  navigateUpdateDevice()
  {
    this.router.navigate(['/updateDevice'])
  }
  navigateGetAllDevices(){
    this.response = this.purchaseServiceRef.navigate().subscribe(response=>
      this.createResponse(response.body)
    );
    
    
  }
 
  createResponse(body){
      
      this.message = JSON.stringify(body);
      this.records = JSON.parse(this.message);
      //console.log(this.record); 
      for(var i=0;i<this.records.length;i++){
        for(var key in this.records[i]){
          this.htmlMessage = this.htmlMessage + key + " : " +this.records[i][key] + "<br>";
        }

        this.htmlMessage = this.htmlMessage + "<br><br>";
      }
      
  }

  navigateGetDeviceById(){
    this.router.navigate(['/getDevice'])
  }
}
