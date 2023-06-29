import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();

  onEditClick() {
    this.edit.emit();
  }

  onDeleteClick() {
    this.delete.emit();
  }
}
