import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {ProductRecord} from '../Services/ProductRecordService'
import{CustomerAlert} from '../Services/CustomerAlertService'
import {Observable, of} from 'rxjs';
@Injectable()
export class PurchaseService{

  httpClient:HttpClient;
  baseUrl:string;
  constructor(httpClient:HttpClient,@Inject('apiBaseAddress')baseUrl:string){
    this.httpClient=httpClient;
    this.baseUrl=baseUrl;
    
  }

  add(user:ProductRecord){
    let observableStream=this.httpClient.post(`${this.baseUrl}/api/ProductsDatabase/products`,user, {observe:'response'});
    return observableStream;
  }
  update(user:ProductRecord,productId:string)
  {
    let observableStream=this.httpClient.put(`${this.baseUrl}/api/ProductsDatabase/products/`+productId, user, {observe:'response'});
    return observableStream;
  }
  
  getProductById(productId:string)
  {
      let observableStream=this.httpClient.get<ProductRecord>(`${this.baseUrl}/api/ProductsDatabase/products/`+productId, { responseType:'json', observe:'response'});
      return observableStream;
  }

 contactSalesperson(alert:CustomerAlert)
 {
   let observableStream=this.httpClient.post(`${this.baseUrl}/api/alert/alerts`,alert, {observe:'response'});
   return observableStream;

 } 

 checkForCompactFilter()
 {
     let observableStream=this.httpClient.get<ProductRecord>(`${this.baseUrl}/api/productfilters/filters/compact/true`, { responseType:'json', observe:'response'});
     return observableStream;
 }
 checkForPortableFilter()
 {
     let observableStream=this.httpClient.get<ProductRecord>(`${this.baseUrl}/api/productfilters/filters/portability/true`, { responseType:'json', observe:'response'});
     return observableStream;
 }
 checkForPriceFilter(amount,prefer:string)
 {
     let observableStream=this.httpClient.get<ProductRecord>(`${this.baseUrl}/api/productfilters/filters/price/`+amount+"/"+prefer, { responseType:'json', observe:'response'});
     return observableStream;
 }
 checkForBatteryFilter()
 {
     let observableStream=this.httpClient.get<ProductRecord>(`${this.baseUrl}/api/productfilters/filters/batterysupport/true`, { responseType:'json', observe:'response'});
     return observableStream;
 }
 checkForSafeToFlyFilter()
 {
     let observableStream=this.httpClient.get<ProductRecord>(`${this.baseUrl}/api/productfilters/filters/safetofly/true`, { responseType:'json', observe:'response'});
     return observableStream;
 }
 checkForSoftwareUpdateFilter()
 {
     let observableStream=this.httpClient.get<ProductRecord>(`${this.baseUrl}/api/productfilters/filters/softwareupdatesupport/true`, { responseType:'json', observe:'response'});
     return observableStream;
 }
 checkForTouchScreenFilter()
 {
     let observableStream=this.httpClient.get<ProductRecord>(`${this.baseUrl}/api/productfilters/filters/touchscreen/true`, { responseType:'json', observe:'response'});
     return observableStream;
 }
 checkForThirdPartyDeviceFilter()
 {
     let observableStream=this.httpClient.get<ProductRecord>(`${this.baseUrl}/api/productfilters/filters/thirdpartydevicesupport/true`, { responseType:'json', observe:'response'});
     return observableStream;
 }
 checkForCyberSecurityFilter()
 {
     let observableStream=this.httpClient.get<ProductRecord>(`${this.baseUrl}/api/productfilters/filters/cybersecurity/true`, { responseType:'json', observe:'response'});
     return observableStream;
 }
 checkForMultiPatientFilter()
 {
     let observableStream=this.httpClient.get<ProductRecord>(`${this.baseUrl}/api/productfilters/filters/multipatientsupport/true`, { responseType:'json', observe:'response'});
     return observableStream;
 }
 checkForProductTrainingFilter()
 {
     let observableStream=this.httpClient.get<ProductRecord>(`${this.baseUrl}/api/productfilters/filters/productspecifictraining/true`, { responseType:'json', observe:'response'});
     return observableStream;
 }
 navigate()
 {
     let observableStream=this.httpClient.get<ProductRecord[]>(`${this.baseUrl}/api/ProductsDatabase/products`, { responseType:'json', observe:'response'});
     return observableStream;
 }
 onDelete(productId:string)
 {
     let observableStream=this.httpClient.delete(`${this.baseUrl}/api/ProductsDatabase/products/`+productId ,{observe:'response'});
     return observableStream;
 }
}
