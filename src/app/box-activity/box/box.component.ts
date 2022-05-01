import { Component, Input, OnInit } from '@angular/core';

export interface IBoxContent {
  hoverText: string;
  date: Date;
  state?: 'not-done' | 'done' | 'skipped' | string;
}

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
  @Input()
  contetnt: IBoxContent = {
    hoverText: '',
    date: new Date(),
    state: 'not-done',
  };

  private readonly stateTextMap = {
    'not-done': '',
    done: 'Well Done!',
    skipped: 'Skipped.',
  };

  getDisplayText() {
    return `${
      // @ts-ignore
      this.stateTextMap[this.contetnt.state]
    } \n ${
      this.contetnt.hoverText
    } \n ${new Date(this.contetnt.date).toLocaleDateString()}`;
  }

  constructor() {}

  ngOnInit(): void {}
}
