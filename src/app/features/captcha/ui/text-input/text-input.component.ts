import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent implements OnChanges {
  @Input({ required: true }) data: any;
  @Input() initialAnswer: string = '';

  // Output the raw value (string) to the parent
  @Output() answerChange = new EventEmitter<string>();

  // Create a FormControl with validation (e.g., required, min length)
  inputControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3) // Example: text must be 3+ chars
  ]);

  constructor() {
    // Listen to value changes and emit to parent
    this.inputControl.valueChanges.subscribe(value => {
      this.answerChange.emit(value || '');
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['initialAnswer']) {
      this.inputControl.setValue(this.initialAnswer || '', { emitEvent: false });
    // }
  }
}
