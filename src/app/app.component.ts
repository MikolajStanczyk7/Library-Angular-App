import { Component, OnInit } from '@angular/core';
import { BookService } from './services/book.service';
import { NgFor, NgIf } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, AddBookComponent],
  template: `
    <div class="container">
      <h1>Books from Spring Boot</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let book of books">
            <td>{{ book.id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.author?.name || '-' }}</td>
            <td>
              <span *ngIf="book.categories && book.categories.length > 0; else noCategory">
                <span *ngFor="let cat of book.categories; let last = last">
                  {{ cat.name }}<span *ngIf="!last">, </span>
                </span>
              </span>
              <ng-template #noCategory>-</ng-template>
            </td>

            
          </tr>
        </tbody>
      </table>
      <div *ngIf="books.length === 0" class="empty-info">
        No books found in the database.
      </div>
    </div>
    <app-add-book></app-add-book>

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }
}
