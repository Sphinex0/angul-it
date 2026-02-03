import { Component, Input, Output, EventEmitter, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [CommonModule],  // , NgOptimizedImage
  templateUrl: './image-grid.component.html',
  styleUrl: './image-grid.component.css'
})
export class ImageGridComponent implements OnChanges {
  @Input({ required: true }) data: any;

  // NEW: Accept saved answers from the parent
  @Input() initialSelection: string[] = [];

  @Output() selectionChange = new EventEmitter<string[]>();

  selectedIds = signal<string[]>([]);

  // Lifecycle Hook: Runs every time [data] or [initialSelection] changes
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['initialSelection']) {
      // If we moved to a new stage, reset the grid to the saved answer (or empty)
      this.selectedIds.set(this.initialSelection || []);
    }
  }

  toggleSelection(id: string) {
    this.selectedIds.update(current => {
      if (current.includes(id)) {
        return current.filter(x => x !== id);
      } else {
        return [...current, id];
      }
    });
    this.selectionChange.emit(this.selectedIds());
  }

  isSelected(id: string): boolean {
    return this.selectedIds().includes(id);
  }
}
