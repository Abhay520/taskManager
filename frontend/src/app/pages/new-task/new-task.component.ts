import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {

  constructor(private taskService : TaskService, 
    private route: ActivatedRoute, private router : Router){}

  listId : string = "";

  ngOnInit(){
    this.route.params.subscribe(
      (params : Params) => {
        this.listId = params["listId"];
        console.log(this.listId);
      }
    )
  }
  
  createTask(title : string){
    this.taskService.createTask(title, this.listId).subscribe((newTask : Task) => {
      console.log(newTask);
      //Now we navigate to lists/listid/tasks/response._id
      this.router.navigate(['../'], {relativeTo : this.route});
    })
  }
}
