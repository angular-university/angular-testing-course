import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed} from '@angular/core/testing';
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
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;

  beforeEach((() => {

    const courseServicesSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: CoursesService, useValue: courseServicesSpy}
      ]
    }).compileComponents();


  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });


  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {

    TestBed.get(CoursesService).findAllCourses.and.returnValue(
      of(setupCourses().filter(course => course.category == 'BEGINNER')));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(1, "Unexpected number of tabs found");

  });


  it("should display only advanced courses", () => {

    TestBed.get(CoursesService).findAllCourses.and.returnValue(
      of(setupCourses().filter(course => course.category == 'ADVANCED')));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(1, "Unexpected number of tabs found ");

  });


  it("should display both tabs", () => {

    TestBed.get(CoursesService).findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(2, "Expected to find 2 tabs");

  });


  it("should display advanced courses when tab clicked", async(() => {

    TestBed.get(CoursesService).findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    click(tabs[1]);

    fixture.detectChanges();

    fixture.whenStable().then(() => {

      const cardTitles = el.queryAll(By.css('.mat-card-title'));

      expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");

      expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");


    });


  }));

});


