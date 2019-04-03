
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseComponent } from './course.component';
import {CoursesModule} from '../courses.module';
import {CoursesService} from '../services/courses.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {COURSES} from '../../../../server/db-data';
import {of} from 'rxjs';
import {setupCourses} from '../common/setup-test-data';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {

    const courseServicesSpy = jasmine.createSpyObj('CoursesService', ['findLessons']);

    courseServicesSpy.findLessons.and.returnValue(of());

    const mockActivatedRoute = {
      snapshot: {
        data: {
          course: COURSES[12]
        }
      }
    };

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: CoursesService, useValue: courseServicesSpy},

      ]
    }).compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the course data', () => {
    pending();
  });

  it('should display the course lessons', () => {
    pending();
  });

  it('should load the next page of lessons', () => {
    pending();
  });

  it('should search for lessons', () => {
    pending();
  });


});
