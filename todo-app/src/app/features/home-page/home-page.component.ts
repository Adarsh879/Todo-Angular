import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  taskName: string = '';
  tasks?: any[];

  constructor(private httpClient: HttpClient) { }


  ngOnInit(): void {
    this.httpClient.get('http://localhost:3000/task/getTasks').subscribe((response: any) => {
      console.log(response);
      this.tasks = response;
      console.log(this.tasks);
    });
  }

  onSubmit() {
    this.httpClient.post('http://localhost:3000/task/addTask', {
      task: this.taskName
    }).subscribe((response) => {
      console.log(response);
      this.tasks?.push(response);
    });
  }

  deleteTask(taskId: string) {
    this.httpClient.delete(`http://localhost:3000/task/deleteTask/${taskId}`).subscribe((response: any) => {
      
    console.log(response);
      if(response.message ==="success") {
        this.tasks = this.tasks?.filter((task) => task._id !== taskId);
      }
    });
  }

  markTaskAsDone(taskId: string) {
    this.httpClient.put(`http://localhost:3000/task/markTaskAsDone/${taskId}`,{
      isDone: true
    }).subscribe((response: any) => {
      console.log(response);
      if(response.message ==="success") {
        this.tasks = this.tasks?.map((task) => {
          if(task._id === taskId) {
            task = response.task;
          }
          return task;
        });
      }
    });
  }
}
