import { Component, Input, Output, EventEmitter, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-grid.component.html',
  styleUrl: './image-grid.component.css'
})
export class ImageGridComponent implements OnChanges {
  @Input({ required: true }) data: any;

  @Input() initialSelection: string[] = [];

  @Output() selectionChange = new EventEmitter<string[]>();

  selectedIds = signal<string[]>([]);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['initialSelection']) {
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
