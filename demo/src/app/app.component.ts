import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface Task {
  id: number;
  todo: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sections = ['To Do', 'In Review', 'Completed'];

  public todo :string[] = [];
  public inreview :string[] = [];
  public completed:string[] =[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://dummyjson.com/todos?limit=10').subscribe((res) => {
      console.log(res)
      this.todo= res.todos
      .filter((t: Task) => !t.completed && t.todo)
      .map((t:Task) =>t.todo);
      this.completed = res.todos
      .filter((t: Task) => t.completed && t.todo)
      .map((t:Task)=>t.todo);
       console.log(this.todo,this.completed,this.inreview)
    });
   
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

 

  
}
