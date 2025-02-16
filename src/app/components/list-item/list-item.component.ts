import { Component, input, output, signal } from '@angular/core';
import { Task } from '../../model/task';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list-item',
  imports: [NgClass],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  taskContent = input.required<string>();
  id= input.required<number>();
  checked = input.required<boolean>();
  deleteTask=output<number>();
  toggleStatus = output<number>();
  
}
