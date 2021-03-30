import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../tasks.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  allTasks:Array<Task> = [];
  columnsToDisplay = ['id', 'name','task','deadline'];
  constructor(public taskSer: TaskService) { }

  ngOnInit(): void {
    this.taskSer.loadTasks().subscribe(result=>this.allTasks=result);
  }

}
