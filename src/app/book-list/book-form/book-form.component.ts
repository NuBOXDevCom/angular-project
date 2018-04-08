import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../models/book.model';
import {BooksService} from '../../services/books.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  progress = 0;

  constructor(private formBuilder: FormBuilder, private booksService: BooksService,
              private router: Router, private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
    this.initForm();
    const uploadProgress = Observable.interval(1);
    uploadProgress.subscribe(
      () => {
        this.progress = Math.round(this.booksService.uploadProgress);
      }
    );
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }

  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;
    const newBook = new Book(title, author);
    newBook.synopsis = synopsis;
    if (this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }
    this.booksService.createNewBook(newBook);
    this.flashMessage.show('Saved successfully !', {cssClass: 'alert alert-success', timeout: 5000});
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}

