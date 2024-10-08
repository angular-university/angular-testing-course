import { CommentService } from './comment.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IComment } from '../interfaces/comment.interface';

fdescribe('CommentService', () => {
  let service: CommentService;
  let httpMock: HttpTestingController;
  let comment: IComment = { postId: 1, id: 1, name: 'name', email: 'email', body: 'body' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });
    service = TestBed.inject(CommentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getSelectedComment() should return selected comment', () => { 
    service.setSelectedComment(comment);
    expect(service.getSelectedComment()).toEqual(comment);
    httpMock.verify();
  } );  

  it('should set selected comment and load comments', () => {
    
    service.setSelectedComment(comment);
    expect(service.getSelectedComment()).toEqual(comment);

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/comments');
    expect(req.request.method).toBe('GET');
    req.flush([comment]);

    expect(service['latestComments']).toEqual([comment]);
  });
});