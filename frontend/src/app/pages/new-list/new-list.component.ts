import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router, RouterModule } from '@angular/router';
import { List } from '../../models/list.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.scss'
})
export class NewListComponent {
  constructor(private taskService : TaskService, private router: Router){}
  
  createList(title : string){
    this.taskService.createList(title).subscribe((list : List) => {
      console.log(list);
      //Now we navigate to /lists/response._id
      this.router.navigate([ '/lists', list._id ]); 
    })
  }
}
