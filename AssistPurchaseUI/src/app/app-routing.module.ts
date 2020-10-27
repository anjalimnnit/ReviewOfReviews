import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component'
import {CustomerFormComponent} from './customer-form/customer-form.component'
import {ConfigurationComponent} from './configuration/configuration.component'
import {ChatBotComponent} from './chat-bot/chat-bot.component'
import {AddDeviceComponent} from './add-device/add-device.component'
import {DeleteDeviceComponent} from './delete-device/delete-device.component'
import {UpdateDeviceComponent} from './update-device/update-device.component'
import {LoginComponent} from './login/login.component'
import {GetProductByIdComponent} from './get-product-by-id/get-product-by-id.component'

const routes: Routes = [
  {path:"", redirectTo:'home', pathMatch: 'full'},
  {path:'home', component:HomeComponent},
  {path:'customerinfo', component:CustomerFormComponent},
  {path:'config',component:ConfigurationComponent},
  {path:'chatbot',component:ChatBotComponent},
  {path:'addDevice',component:AddDeviceComponent},
  {path:'deleteDevice',component:DeleteDeviceComponent},
  {path:'updateDevice',component:UpdateDeviceComponent},
  {path:'login',component:LoginComponent},
  {path:'getDevice', component:GetProductByIdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
