import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpParamsOptions } from '@angular/common/http';
import { IComment } from '../interfaces/comment.interface';
import { HttpClientptions, IMessageObject } from '../interfaces/response.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface IHttpResponse<T> extends IHttpTypedResponse<T> {
    messages: IMessageObject;
}

interface IHttpTypedResponse<T> {
    [key: string]: T | IMessageObject;
}

@Injectable({
  providedIn: 'root'
})

export class CommentService {
    private selectedComment: IComment;
    private latestComments: IComment[];

    constructor(private http: HttpClient, private handler: HttpBackend) {
        this.http = new HttpClient(this.handler);
    }

    setSelectedComment(comment: IComment) {
        this.selectedComment = comment;
        this.loadComments();
    }

    getSelectedComment(): IComment {
        return this.selectedComment;
    }

    // ... your methods that use this.http
    loadComments():void {
        // call this.http.get() here and store result in this.latestComments    
        this.myGet('https://jsonplaceholder.typicode.com/comments').subscribe((comments: any[]) => { 
            this.latestComments = comments;
        });  
    }
    // Example of a function that returns an IHttpResponse with User data


    myGet<T>(url:string, options?: HttpClientptions, label: string = 'data'): Observable<IMessageObject | T> {

        return this.http.get<IHttpResponse<T>>(url, options).pipe(
            map((response) => response[label])
        );
    }
}
