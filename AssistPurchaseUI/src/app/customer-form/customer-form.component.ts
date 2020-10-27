import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {CustomerAlert} from '../Services/CustomerAlertService'
import {Inject} from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import{PurchaseService} from '../Services/Purchase.service'
@Component({
  selector: 'customerForm-comp',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  client:HttpClient
  alert:CustomerAlert
  baseUrl : string
  message:string;
  constructor(private router:Router, alert:CustomerAlert, httpClient:HttpClient, @Inject('apiBaseAddress')baseUrl:string,private purchaseServiceRef:PurchaseService) {
    this.alert = alert;
    this.client = httpClient;
    this.baseUrl = baseUrl
  } 
  customerName:string;
  emailId:string;
  phoneNumber:string;
  productId:string;
  response:any;
 
 
  ngOnInit(): void {
  }
  contactSalesPerson(){
    
    this.alert.CustomerName = this.customerName;
    this.alert.CustomerEmailId = this.emailId;
    this.alert.PhoneNumber = this.phoneNumber;
    this.alert.ProductId = this.productId;
    this.response = this.purchaseServiceRef.contactSalesperson(this.alert).subscribe(response => 
    this.createResponse(response.status)
      
    );
    this.checkMessage();
    this.reset();
  }
  checkMessage(){
    if(this.message === undefined){
      this.message = "Please recheck the information given"
    }
    return;
  }
  createResponse(status:any){
    if(status==200){
      this.message ="Our sales person will contact you shortly. Thank you for visiting"
    }
    return;
  }
  reset(){
    this.emailId ="";
    this.customerName = "";
    this.phoneNumber ="";
  }
}
