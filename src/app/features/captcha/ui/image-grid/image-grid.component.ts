import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-grid.component.html',
  styleUrl: './image-grid.component.css'
})
export class ImageGridComponent {
  data = input.required<any>();
  initialSelection = input<string[]>([]);
  selectionChange = output<string[]>();

  selectedIds = signal<string[]>([]);

  constructor() {
    effect(() => {
      this.selectedIds.set(this.initialSelection());
    });
  }

  toggleSelection(id: string) {
    this.selectedIds.update(current =>
      current.includes(id)
        ? current.filter(x => x !== id)
        : [...current, id]
    );
    this.selectionChange.emit(this.selectedIds());
  }

  isSelected(id: string): boolean {
    return this.selectedIds().includes(id);
  }
}
