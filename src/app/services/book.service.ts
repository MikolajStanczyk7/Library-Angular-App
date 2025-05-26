import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // private apiUrl = 'http://localhost:8080/books';
  private apiUrl = 'http://localhost:8081/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addBook(book: any) {
  return this.http.post('http://localhost:8081/books', book);
  }
}
