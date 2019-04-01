import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';




fdescribe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let courseServicesSpy: any;

  courseServicesSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: CoursesService, useValue: courseServicesSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.debugElement.componentInstance;
    el = fixture.debugElement;


  }));


  it("should create the component", async(() => {

    expect(component).toBeTruthy();

  }));


  it("should display only beginner courses", async(() => {

    courseServicesSpy.findAllCourses.and.returnValue(of(setupCourses().filter(course => course.category == 'BEGINNER')));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(1, "Unexpected number of tabs found");

  }));




});


