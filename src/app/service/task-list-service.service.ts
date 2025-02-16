import { Injectable, signal } from '@angular/core';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskListServiceService {

  constructor() { }

   tasks= signal<Task[]> ([
    
    /*  {taskId:1,taskDescription:"Task 1", taskStatus:true},
      {taskId:2,taskDescription:"Task 2", taskStatus:false},
      {taskId:3,taskDescription:"Task 3", taskStatus:true},
      {taskId:4,taskDescription:"Task 4", taskStatus:true},
      {taskId:5,taskDescription:"Task 5", taskStatus:false}*/
  
    ]);

    getTaskstsFromLocalStorage(){
      this.tasks.set(JSON.parse(localStorage.getItem("taskList") || "[]"));
    }

    setTaskstsFromLocalStorage():void{
      localStorage.setItem("taskList",JSON.stringify(this.tasks()));
    }

    insertNewTask(task:Task):Task[]{
      this.tasks.update(() => [...this.tasks(),task] );
      this.setTaskstsFromLocalStorage();
      return this.tasks();
    }

    updateTask(taskIndex:number){
      let  updatedTasks = this.tasks();
      let task=updatedTasks[taskIndex];
      task.taskStatus = !task.taskStatus;
      updatedTasks[taskIndex] = task;
      console.log(updatedTasks);
      this.tasks.set(updatedTasks);
      this.setTaskstsFromLocalStorage();
    }

    deleteTask(index:number){
      this.tasks().splice(index,1)
      this.tasks.set( this.tasks());
      // this.tasks.update(() => this.tasks().filter(t => t !=task));
      this.setTaskstsFromLocalStorage();
    }

    

}
