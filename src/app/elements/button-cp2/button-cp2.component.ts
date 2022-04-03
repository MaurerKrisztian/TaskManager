import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-cp2',
  templateUrl: './button-cp2.component.html',
  styleUrls: ['./button-cp2.component.scss']
})
export class ButtonCp2Component implements OnInit {

  @Input()
  text: string | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
