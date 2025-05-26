import { Component, Output, EventEmitter } from '@angular/core';
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
  @Output() bookAdded = new EventEmitter<void>();

  book: any = {
    title: '',
    year: null,
    authorName: '',
    publisherName: '',
    categoryNames: ''
  };

  constructor(private bookService: BookService) {}

  onSubmit() {
    // Zamień string kategorii na tablicę
    const preparedBook = {
      ...this.book,
      categoryNames: this.book.categoryNames
        ? this.book.categoryNames.split(',').map((cat: string) => cat.trim())
        : []
    };

    this.bookService.addBook(preparedBook).subscribe({
      next: () => {
        alert('Book added!');
        this.book = {
          title: '',
          year: null,
          authorName: '',
          publisherName: '',
          categoryNames: ''
        };
        this.bookAdded.emit(); // Emituje zdarzenie do rodzica (app.component)
      },
      error: (err: any) => alert('Error: ' + err.message)
    });
  }
}
