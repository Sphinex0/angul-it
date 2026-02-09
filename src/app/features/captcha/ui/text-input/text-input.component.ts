import { Component, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
  data = input.required<any>();
  initialAnswer = input<string>('');
  answerChange = output<string>();

  inputControl = new FormControl('', [Validators.required]);

  constructor() {
    effect(() => {
      this.inputControl.setValue(this.initialAnswer(), { emitEvent: false });
    });

    this.inputControl.valueChanges.subscribe(value => {
      this.answerChange.emit(value || '');
    });
  }
}
