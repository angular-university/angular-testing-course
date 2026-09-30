import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {setupCourses} from '../common/setup-test-data';


describe('CoursesCardListComponent', () => {

    let component: CoursesCardListComponent;
    let fixture: ComponentFixture<CoursesCardListComponent>;
    let el: DebugElement;

    beforeEach((() => {
        TestBed.configureTestingModule({
            imports: [CoursesModule]
        })
        .compileComponents()
        .then(() => {

            fixture = TestBed.createComponent(CoursesCardListComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;

        });
    }));

    it('should create the component', () => {

        expect(component).toBeTruthy();

    });

    it('should display the course list', () => {

        component.courses = setupCourses();

        fixture.detectChanges();

        const cards = el.queryAll(By.css(".course-card"));

        expect(cards,"Could not find cards").toBeTruthy();
        expect(cards.length,"Unexpected number of courses").toBe(12);

    });

    it('should display the first course', () => {

        component.courses = setupCourses();

        fixture.detectChanges();

        const course = component.courses[0];

        const card = el.query(By.css(".course-card:first-child")),
                title = card.query(By.css("mat-card-title")),
                image = card.query(By.css("img"));

        expect(card,"Could not find course card").toBeTruthy();

        expect(title.nativeElement.textContent).toBe(course.titles.description);

        expect(image.nativeElement.src).toBe(course.iconUrl);

    });

});


