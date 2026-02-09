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

  @Output() answerChange = new EventEmitter<string>();

  inputControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  constructor() {
    this.inputControl.valueChanges.subscribe(value => {
      this.answerChange.emit(value || '');
    });
  }

  ngOnChanges(changes: SimpleChanges) {
      this.inputControl.setValue(this.initialAnswer || '', { emitEvent: false });
  }
}
