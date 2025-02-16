import { Component, computed, signal } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { Task } from '../../model/task';
import { TaskListServiceService } from '../../service/task-list-service.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-todolist',
  imports: [ListItemComponent, ListItemComponent, ReactiveFormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  toDoForm!: FormGroup;
  listName = signal<string>("To Do List"); 
  tasks= computed<Task[]>(()=>this.taskListService.tasks());

  constructor(private taskListService : TaskListServiceService, private fb : FormBuilder){
    this.toDoForm = this.fb.group(
      {
        taskDescription: ['', Validators.required]
      }
    );
  }

  toggleTaskStatus(id: number) {
    this.taskListService.updateTask(id);
  }
  ngOnInit():void{
    this.taskListService.getTaskstsFromLocalStorage();
  }
  addTask() {
    if(this.toDoForm.valid){
      this.taskListService.insertNewTask({taskDescription:this.toDoForm.value.taskDescription,taskStatus:true});
      this.toDoForm.reset();
    }
  }
  deleteTask(id:number):void{
    this.taskListService.deleteTask(id);
  }
}
