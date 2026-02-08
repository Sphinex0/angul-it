import { Component, Input, Output, EventEmitter, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider-captcha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './slider-captcha.component.html',
  styleUrl: './slider-captcha.component.css'
})
export class SliderCaptchaComponent implements OnInit {
  @Input({ required: true }) data: any;
  @Output() answerChange = new EventEmitter<string>();

  // State
  sliderValue = signal<number>(0); // 0 to 240 (Width - PieceWidth)

  // Puzzle State (In SVG Coordinates 300x150)
  targetX = signal<number>(0);
  targetY = signal<number>(0);

  // A generic "Puzzle Piece" shape path
  // This draws a square with a bump on the right and a notch on the top
  readonly puzzlePath = "M 10 0 L 30 0 C 30 0 30 10 40 10 C 50 10 50 0 50 0 L 70 0 L 70 30 L 60 30 C 60 30 50 30 50 40 C 50 50 60 50 60 50 L 70 50 L 70 70 L 10 70 L 10 0 Z";

  ngOnInit() {
    this.generateRandomPuzzle();
  }

  generateRandomPuzzle() {
    // Random X between 100 and 240 (keep it on the right side)
    const x = Math.floor(Math.random() * 140) + 100;
    this.targetX.set(x);

    // Random Y between 10 and 80 (keep it vertical safe)
    const y = Math.floor(Math.random() * 70) + 10;
    this.targetY.set(y);
  }

  onRelease() {
    // Check if user is close (Tolerance of 5 units)
    const diff = Math.abs(this.sliderValue() - this.targetX());
    const answer = diff < 50 ? "true": "false"
    console.log(diff);
    this.answerChange.emit(answer);
  }
}
