import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  book: any = {
    title: '',
    year: null,
    author: { id: null },
    publisher: { id: null },
    categories: []
  };

  categoryId: number | null = null;

  constructor(private bookService: BookService) {}

  onSubmit() {
    if (this.categoryId) {
      this.book.categories = [{ id: this.categoryId }];
    }
    this.bookService.addBook(this.book).subscribe({
      next: () => {
        alert('Book added!');
        this.book = {
          title: '',
          year: null,
          author: { id: null },
          publisher: { id: null },
          categories: []
        };
        this.categoryId = null;
      },
      error: (err: any) => alert('Error: ' + err.message)
    });
  }
}
