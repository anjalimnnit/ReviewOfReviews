import { Component } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AssistPurchaseUI';
  constructor(private router:Router) { }
  navigateToChatBot(){
    this.router.navigate(['/chatbot'])
  }
  navigateToHome()
  {
  this.router.navigate(['/home'])
  }
  navigateToLogin()
  {
    this.router.navigate(['/login'])
  }
}

