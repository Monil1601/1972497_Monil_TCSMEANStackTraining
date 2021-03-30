import { Component, OnInit } from '@angular/core';
import { TaskService } from './../task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  

  constructor(public taskSer:TaskService) { }
    
   
  ngOnInit(): void { 
  }

  addData(taskRef:any){
    console.log(taskRef);
    this.taskSer.storeTask(taskRef);
    }

}
