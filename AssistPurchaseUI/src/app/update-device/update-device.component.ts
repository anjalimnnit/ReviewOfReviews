import { Component,Inject, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {ProductRecord} from '../Services/ProductRecordService'
import {PurchaseService} from '../Services/Purchase.service'
@Component({
  selector: 'update-comp',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.css']
})
export class UpdateDeviceComponent implements OnInit {

  message:string;
  user:ProductRecord;
  client:HttpClient;
  baseUrl:string;
  response:any;
 
  constructor(httpClient:HttpClient,@Inject('apiBaseAddress')baseUrl:string,private updateServiceRef: PurchaseService,user:ProductRecord) { 
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
  
  onUpdate()
  {
    this.user={ProductId:this.ProductId, ProductName:this.ProductName, Description:this.Description,ProductSpecificTraining: this.ProductSpecificTraining,
      Price:this.Price, SoftwareUpdateSupport:this.SoftwareUpdateSupport ,Portability:this.Portability,Compact:this.Compact,BatterySupport:this.BatterySupport,
      ThirdPartyDeviceSupport:this.ThirdPartyDeviceSupport,SafeToFlyCertification:this.SafeToFlyCertification,
      TouchScreenSupport:this.TouchScreenSupport,MultiPatientSupport:this.MultiPatientSupport,
      CyberSecurity:this.CyberSecurity,}

      this.response = this.updateServiceRef.update(this.user,this.ProductId).subscribe(response => {

        this.createResponse(response.status);
        
      });
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
        this.message ="Product updated successfully"
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
      this.message= undefined;
    }
}
