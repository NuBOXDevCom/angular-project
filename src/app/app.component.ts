import { Component } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(){
    const config = {
      apiKey: "AIzaSyDhVQzwEI0KbvyPv2-ca31M3hA_p5mLOhs",
      authDomain: "angular-project-c6402.firebaseapp.com",
      databaseURL: "https://angular-project-c6402.firebaseio.com",
      projectId: "angular-project-c6402",
      storageBucket: "angular-project-c6402.appspot.com",
      messagingSenderId: "847835485107"
    };
    firebase.initializeApp(config);
  }

}
