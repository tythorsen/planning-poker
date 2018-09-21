import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'planning-poker-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public constructor(private firestore: AngularFirestore) {}

  public ngOnInit() {
    this.firestore.collection('items').add({
      fuck: 'yeah'
    });
  }
}
