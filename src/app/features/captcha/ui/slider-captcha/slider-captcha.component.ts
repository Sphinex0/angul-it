import { Component, Input, Output, EventEmitter, OnInit, signal, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms'; // 1. Import ReactiveFormsModule

@Component({
  selector: 'app-slider-captcha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // 2. Add to imports
  templateUrl: './slider-captcha.component.html',
  styleUrl: './slider-captcha.component.css'
})
export class SliderCaptchaComponent implements OnChanges {
  @Input({ required: true }) data: any;
  @Output() answerChange = new EventEmitter<string>();
  @Input() initialAnswer: string = '';


  // 3. The Control
  sliderControl = new FormControl(0, { nonNullable: true });

  // 4. Visual State (Signal for performance)
  sliderValue = signal<number>(+this.initialAnswer || 0);

  // Puzzle State
  targetX = signal<number>(0);
  targetY = signal<number>(40);

  // The SVG Path
  readonly puzzlePath = "M 10 0 L 30 0 C 30 0 30 10 40 10 C 50 10 50 0 50 0 L 70 0 L 70 30 L 60 30 C 60 30 50 30 50 40 C 50 50 60 50 60 50 L 70 50 L 70 70 L 10 70 L 10 0 Z";

  constructor() {
    // 5. Sync Control -> Signal
    // This ensures the SVG updates smoothly while dragging
    this.sliderControl.valueChanges.subscribe(val => {
      this.sliderValue.set(val);
    });
  }

  ngOnInit() {
    this.targetX.set(+this.data.target)
    console.log(this.data)
  }
    ngOnChanges() {
    // if (changes['initialAnswer'])
      this.sliderControl.setValue(+this.initialAnswer || 50);
    // }
  }


  // 6. Called only when user RELEASES the slider
  onRelease() {
    const currentVal = this.sliderControl.value;

    this.answerChange.emit(currentVal.toString());
  }
}
