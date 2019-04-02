import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  let fixture: ComponentFixture<CoursesCardListComponent>;
  let component:CoursesCardListComponent;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoursesModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesCardListComponent);
    component = fixture.debugElement.componentInstance;
    el = fixture.debugElement;

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesCardListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

  });


  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display the course list", () => {

    component.courses = setupCourses();

    fixture.detectChanges();

    const cards = el.queryAll(By.css('.course-card'));

    expect(cards).toBeTruthy("Could not finds cards");
    expect(cards.length).toBe(12, "Unexpected number of courses");

  });


  it("should display the first course", () => {

    component.courses = setupCourses();

    const course = component.courses[0];

    fixture.detectChanges();

    const card = el.query(By.css('.course-card:first-child')),
          title = card.query(By.css("mat-card-title")),
          image = card.query(By.css("img"));

    expect(card).toBeTruthy("Could not finds course card");
    expect(title.nativeElement.textContent).toBe(course.titles.description, "Wrong course title found");
    expect(image.nativeElement.src).toBe(course.iconUrl, "Wrong image found");


  });


});


