import { Component,Inject, OnInit } from '@angular/core';
import {CustomerAlert} from '../Services/CustomerAlertService'
import {CustomerFormComponent} from '../customer-form/customer-form.component'
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import { ProductRecord } from '../Services/ProductRecordService';
import{PurchaseService} from '../Services/Purchase.service'
@Component({
  selector: 'chat-comp',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {
  alert:CustomerAlert;
  boxText:string;
  response:any;
  result:string;
  flag:boolean;
  answer:string;
  baseUrl:string;
  client:HttpClient;
  info:CustomerFormComponent;
  message:string;
  records:string[];
  values:string;
  amount:number;
  prefer:string;
  compactFilterWords:string[];
  portableFilterWords:string[];
  batterySupportFilterWords:string[];
  priceFilterWords:string[];
  safeToFlyFilterWords:string[];
  softwareUpdateFilterWords:string[];
  touchScreenFilterWords:string[];
  thirdPartyDeviceFilterWords:string[];
  multiPatientFilterWords:string[];
  productTrainingFilterWords:string[];
  cyberSecurityFilterWords:string[];
  
  constructor(private router:Router, httpClient:HttpClient, @Inject('apiBaseAddress')baseUrl:string,private purchaseServiceRef:PurchaseService) {
     this.alert = new CustomerAlert();
     this.values = "";
     this.compactFilterWords = ["compact", "compactness"];
     this.portableFilterWords = ["portable", "portability"];
     this.priceFilterWords = ["below", "above", "price", "rate", "cost", "budget"];
     this.touchScreenFilterWords = ["touch screen"];
     this.productTrainingFilterWords = ["product specific training", "product training", "specific training", "training"];
     this.safeToFlyFilterWords = ["safe to fly", "fly", "safe to fly certificate" ];
     this.softwareUpdateFilterWords = ["software update support", "software update", "update"];
     this.thirdPartyDeviceFilterWords = ["third party device"];
     this.multiPatientFilterWords = ["multi-patient", "multi patient", "multiple patient"];
     this.cyberSecurityFilterWords = ["privacy", "cyber security", "secure"];
     this.batterySupportFilterWords = ["battery", "charge"];
     this.flag = false;
     this.client = httpClient;
     this.result = "";
     this.baseUrl = baseUrl;
  }
  navigate()
  {
    this.router.navigate(['/customerinfo'])
  } 
  ngOnInit(): void {
  }
  onTextBoxEdit(value){
    this.boxText = value;
  }
  enterText(){
    this.processQuestion(this.boxText.toLowerCase());
    this.values = this.values + this.boxText + "\n";
    this.boxText = "";
    this.flag = false;
    this.result = "";
  }
  processQuestion(boxText){
      this.checkForCompactFilter(boxText);
      this.checkForPortableFilter(boxText);
      this.checkForPriceFilter(boxText);
      this.checkForBatteryFilter(boxText);
      this.checkForSafeToFlyFilter(boxText);
      this.checkForSoftwareUpdateFilter(boxText);
      this.checkForTouchScreenFilter(boxText);
      this.checkForThirdPartyDeviceFilter(boxText);
      this.checkForCyberSecurityFilter(boxText);
      this.checkForMultiPatientFilter(boxText);
      this.checkForProductTrainingFilter(boxText);
  }
  checkForCompactFilter(boxText:any){
      for(var str in this.compactFilterWords){
        if((boxText.includes(this.compactFilterWords[str]))&&(!this.flag)){
          this.flag = true;
          this.response = this.purchaseServiceRef.checkForCompactFilter().subscribe(response=>{
            this.createResponse(response.body);
          })
        }
      }
  }
  checkForPortableFilter(boxText:any){
    for(var str in this.portableFilterWords){
      if((boxText.includes(this.portableFilterWords[str]))&&(!this.flag)){
        this.flag = true;
        this.response = this.purchaseServiceRef.checkForPortableFilter().subscribe(response=>{
          this.createResponse(response.body);
        })
      }
    }
  }
  checkForPriceFilter(boxText:any){
    for(var str in this.priceFilterWords){
      if((boxText.includes(this.priceFilterWords[str]))&&(!this.flag)){
        this.flag = true;
        this.getPreference(boxText);
        this.response =this.purchaseServiceRef.checkForPriceFilter(this.amount,this.prefer).subscribe(response=>{
          this.createResponse(response.body);
        })
      }
    }
  }
  checkForBatteryFilter(boxText:any){
    for(var str in this.batterySupportFilterWords){
      if((boxText.includes(this.batterySupportFilterWords[str]))&&(!this.flag)){
        this.flag = true;
        this.response = this.purchaseServiceRef.checkForBatteryFilter().subscribe(response=>{
          this.createResponse(response.body);
        })
      }
    }
  }
  checkForSafeToFlyFilter(boxText:any){
    for(var str in this.safeToFlyFilterWords){
      if((boxText.includes(this.safeToFlyFilterWords[str]))&&(!this.flag)){
        this.flag = true;
        this.response = this.purchaseServiceRef.checkForSafeToFlyFilter().subscribe(response=>{
          this.createResponse(response.body);
        })
      }
    }
  }
  checkForSoftwareUpdateFilter(boxText:any){
    for(var str in this.softwareUpdateFilterWords){
      if((boxText.includes(this.softwareUpdateFilterWords[str]))&&(!this.flag)){
        this.flag = true;
        this.response = this.purchaseServiceRef.checkForSoftwareUpdateFilter().subscribe(response=>{
          this.createResponse(response.body);
        })
      }
    }
  }
  checkForTouchScreenFilter(boxText:any){
    for(var str in this.touchScreenFilterWords){
      if((boxText.includes(this.touchScreenFilterWords[str]))&&(!this.flag)){
        this.flag = true;
        this.response = this.purchaseServiceRef.checkForTouchScreenFilter().subscribe(response=>{
          this.createResponse(response.body);
        })
      }
    }
  }
  checkForThirdPartyDeviceFilter(boxText:any){
    for(var str in this.thirdPartyDeviceFilterWords){
      if((boxText.includes(this.thirdPartyDeviceFilterWords[str]))&&(!this.flag)){
        this.flag = true;
        this.response = this.purchaseServiceRef.checkForThirdPartyDeviceFilter().subscribe(response=>{
          this.createResponse(response.body);
        })
      }
    }
  }
  checkForCyberSecurityFilter(boxText:any){
    for(var str in this.cyberSecurityFilterWords){
      if((boxText.includes(this.cyberSecurityFilterWords[str]))&&(!this.flag)){
        this.flag = true;
        this.response = this.purchaseServiceRef.checkForCyberSecurityFilter().subscribe(response=>{
          this.createResponse(response.body);
        })
      }
    }
  }
  checkForMultiPatientFilter(boxText:any){
    for(var str in this.multiPatientFilterWords){
      if((boxText.includes(this.multiPatientFilterWords[str]))&&(!this.flag)){
        this.flag = true;
        this.response = this.purchaseServiceRef.checkForMultiPatientFilter().subscribe(response=>{
          this.createResponse(response.body);
        })
      }
    }
  }
  checkForProductTrainingFilter(boxText:any){
    for(var str in this.productTrainingFilterWords){
      if((boxText.includes(this.productTrainingFilterWords[str]))&&(!this.flag)){
        this.flag = true;
        this.response = this.purchaseServiceRef.checkForProductTrainingFilter().subscribe(response=>{
          this.createResponse(response.body);
        })
      }
    }
  }
  createResponse(body){
    this.message = JSON.stringify(body);
    this.records = JSON.parse(this.message);
    for(var i=0; i<4; i++){
      this.result = this.result + this.records[i] + "\n";
    }
    this.values = this.values + this.result;
  }
  getPreference(boxText){
    
    if(boxText.includes("below")){
        this.prefer = "below";
    }
    else{
      this.prefer = "above";
    }
  }
}
