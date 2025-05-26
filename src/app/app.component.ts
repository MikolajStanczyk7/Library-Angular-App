import { Component, OnInit } from '@angular/core';
import { BookService } from './services/book.service';
import { NgFor, NgIf } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, AddBookComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  books: any[] = [];
  loading = true;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.reloadBooks();
  }

  reloadBooks() {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: () => {
        this.books = [];
        this.loading = false;
      }
    });
  }
}
