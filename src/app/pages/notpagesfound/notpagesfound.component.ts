import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notpagesfound',
  templateUrl: './notpagesfound.component.html',
  styleUrls: [ './notpagesfound.component.css'
  ]
})
export class NotpagesfoundComponent implements OnInit {

  year = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
