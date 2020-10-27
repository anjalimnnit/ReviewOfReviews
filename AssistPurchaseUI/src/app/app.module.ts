import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component'
import {CustomerAlert} from './Services/CustomerAlertService'
import { AddDeviceComponent } from './add-device/add-device.component';
import { UpdateDeviceComponent } from './update-device/update-device.component';
import { DeleteDeviceComponent } from './delete-device/delete-device.component';
import { GetProductByIdComponent } from './get-product-by-id/get-product-by-id.component';
import { HttpClientModule } from '@angular/common/http';
import {ProductRecord} from './Services/ProductRecordService'
import {PurchaseService} from './Services/Purchase.service'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerFormComponent,
    ChatBotComponent,
    ConfigurationComponent,
    LoginComponent,
    AddDeviceComponent,
    UpdateDeviceComponent,
    DeleteDeviceComponent,
    GetProductByIdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,FormsModule,HttpClientModule, CommonModule
  ],
  providers: [{provide:CustomerAlert,useClass:CustomerAlert},
    {provide:'apiBaseAddress',useValue:"http://localhost:51964"},
    {provide:ProductRecord, useClass:ProductRecord},
    {provide:PurchaseService,useClass:PurchaseService},
    {provide:CustomerAlert,useClass:CustomerAlert}

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
