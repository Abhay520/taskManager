import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  readonly ROOT_URL;

  constructor(private http : HttpClient) {
    this.ROOT_URL = "http://localhost:3000"
  }

  createList(title : string){
    //Send a web request to create a list
    return this.http.post<List>(`${this.ROOT_URL}/lists`, {title});
  }

  createTask(title : string, listId : string){
    //Send a web request to create a list
    return this.http.post<Task>(`${this.ROOT_URL}/lists/${listId}/tasks`, {title});
  }

  getLists(){
    return this.http.get<List[]>(`${this.ROOT_URL}/lists`);
  }

  getTasks(listId : string){
    return this.http.get<Task[]>(`${this.ROOT_URL}/lists/${listId}/tasks`);
  }
}
