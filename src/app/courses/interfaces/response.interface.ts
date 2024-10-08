import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

// Define the IMessageObject interface (example structure)
export interface IMessageObject {
    content: string;
}

// Define the IHttpResponse interface
export interface IHttpResponse<T> {
    messages: IMessageObject;
    data: T;
}

// Example of using the interface with a User type
export interface HttpClientptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}


