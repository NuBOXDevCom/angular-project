import {Component, OnDestroy, OnInit} from '@angular/core';
import {BooksService} from '../services/books.service';
import {Book} from '../models/book.model';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;

  constructor(private booksService: BooksService, private router: Router, private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
    this.flashMessage.show('Deleted successfully !', {cssClass: 'alert alert-success', timeout: 5000});
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }
}
