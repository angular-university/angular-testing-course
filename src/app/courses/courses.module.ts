import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from '../app.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from '../about/about.component';
import {CourseComponent} from './course/course.component';
import {CoursesCardListComponent} from './courses-card-list/courses-card-list.component';
import {CourseDialogComponent} from './course-dialog/course-dialog.component';
import {BrowserModule} from '@angular/platform-browser';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule, MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {AppRoutingModule} from '../app-routing.module';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {ReactiveFormsModule} from '@angular/forms';
import {CoursesService} from './services/courses.service';
import {CourseResolver} from './services/course.resolver';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    CourseComponent,
    CoursesCardListComponent,
    CourseDialogComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    CourseComponent,
    CoursesCardListComponent,
    CourseDialogComponent
  ],
  providers: [
    CoursesService,
    CourseResolver
  ],
  entryComponents: [CourseDialogComponent]

})export class CoursesModule {



}



