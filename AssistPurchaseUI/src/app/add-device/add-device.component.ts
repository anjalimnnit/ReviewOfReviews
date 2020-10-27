import { Component, Inject,OnInit } from '@angular/core';
import {ProductRecord} from '../Services/ProductRecordService'
import { HttpClient } from '@angular/common/http';
import{PurchaseService} from '../Services/Purchase.service'
@Component({
  selector: 'add-comp',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})

export class AddDeviceComponent implements OnInit {
  
  message:string;
  user:ProductRecord;
  client:HttpClient;
  baseUrl:string;
  response:any;
  constructor(httpClient:HttpClient,@Inject('apiBaseAddress')baseUrl:string, user:ProductRecord,private purchaseServiceRef:PurchaseService) { 
    this.client = httpClient;
    this.baseUrl = baseUrl;
    this.user = user;
  }

  ProductId:string;
  ProductName:string;
  Description:string;
  ProductSpecificTraining:string;
  Price:string;
  SoftwareUpdateSupport:string
  Portability:string;
  Compact:string;
  BatterySupport:string;
  ThirdPartyDeviceSupport:string;
  SafeToFlyCertification:string;
  TouchScreenSupport:string;
  MultiPatientSupport:string;
  CyberSecurity:string;
  
  ngOnInit(): void {
  }
  
  addDevice()
  {
    this.user={ProductId:this.ProductId, ProductName:this.ProductName, Description:this.Description,ProductSpecificTraining: this.ProductSpecificTraining,
      Price:this.Price, SoftwareUpdateSupport:this.SoftwareUpdateSupport ,Portability:this.Portability,Compact:this.Compact,BatterySupport:this.BatterySupport,
      ThirdPartyDeviceSupport:this.ThirdPartyDeviceSupport,SafeToFlyCertification:this.SafeToFlyCertification,
      TouchScreenSupport:this.TouchScreenSupport,MultiPatientSupport:this.MultiPatientSupport,
      CyberSecurity:this.CyberSecurity}
      this.response=this.purchaseServiceRef.add(this.user).subscribe(response =>
        this.createResponse(response.status)
        );
      this.checkMessage();
      
  }
    checkMessage(){
      if(this.message === undefined){
        this.message = "Please recheck the information given"
      }
      return;
    }
    createResponse(status:any){
      if(status==200){
        this.message ="Product added successfully"
      }
      return;
    }
    reset(){
      this.ProductId ="";
      this.ProductName = "";
      this.Description ="";
      this.Price ="";
      this.Portability = "";
      this.Compact ="";
      this.SafeToFlyCertification ="";
      this.BatterySupport = "";
      this.CyberSecurity ="";
      this.ProductSpecificTraining ="";
      this.ThirdPartyDeviceSupport = "";
      this.TouchScreenSupport ="";
      this.MultiPatientSupport ="";
      this.SoftwareUpdateSupport = "";
      this.message = undefined;
    }
  
  

  
}
