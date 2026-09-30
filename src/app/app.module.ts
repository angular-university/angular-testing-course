import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from '@angular/material/button'
import { MatToolbarModule } from "@angular/material/toolbar";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {CoursesModule} from './courses/courses.module';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], 
    imports: [BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        CoursesModule,
        AppRoutingModule,
    ], 
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {
}
