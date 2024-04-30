import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { List } from '../../models/list.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [RouterModule, CommonModule  ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent {

  lists: List[] = [];
  tasks : Task[] = [];

  constructor(private taskService : TaskService, private route : ActivatedRoute){
  }

  ngOnInit(){
    this.route.params.subscribe(
      (params : Params) => {
        console.log(params);
        this.taskService.getTasks(params['listId']).subscribe((tasks : Task[]) => {
          this.tasks = tasks;
        })
      }
    )

    this.taskService.getLists().subscribe((lists : any) => {
      this.lists = lists;
    })
  }

}
