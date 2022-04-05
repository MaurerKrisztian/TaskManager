import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-cp',
  templateUrl: './button-cp.component.html',
  styleUrls: ['./button-cp.component.scss'],
})
export class ButtonCpComponent implements OnInit {
  @Input()
  text: string | undefined;

  constructor() {}

  ngOnInit(): void {}
}
