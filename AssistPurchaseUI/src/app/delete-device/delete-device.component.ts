import { Component, Inject, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {PurchaseService} from '../Services/Purchase.service'
@Component({
  selector: 'delete-comp',
  templateUrl: './delete-device.component.html',
  styleUrls: ['./delete-device.component.css']
})
export class DeleteDeviceComponent implements OnInit {
  client:HttpClient;
  message:string;
  baseUrl: string;
  response:any;
  constructor(httpClient:HttpClient,@Inject('apiBaseAddress')baseUrl:string,private purchaseServiceRef:PurchaseService) {
    this.client = httpClient;
    this.baseUrl = baseUrl;
   }
  productId:string;
  ngOnInit(): void {
  }
  onDelete()
  {
    this.response = this.purchaseServiceRef.onDelete(this.productId).subscribe(response => 

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
      this.message ="Product deleted successfully"
    }
    return;
  }
  reset(){
    this.productId ="";
    this.message = undefined;
  }
}
