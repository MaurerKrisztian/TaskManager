import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const progressBar = document.querySelector(".bar"),
      progressBarValue = document.querySelector('.bar__value');
    let value = 0;
    const max = 100;

    let anim = setInterval(() => {
      if (value == max) {
        clearInterval(anim);
      } else {
        value += 1;
        // @ts-ignore
        progressBar.value = value;
        // @ts-ignore
        progressBarValue.innerText = value + '%';
      }
    }, 80);

  }

}
