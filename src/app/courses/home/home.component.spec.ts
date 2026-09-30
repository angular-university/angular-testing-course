import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { CoursesService } from '../services/courses.service';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { click } from '../common/test-utils';

describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let el: DebugElement;
    let coursesService: any;

    const beginnerCourses = setupCourses()
        .filter(course => course.category == 'BEGINNER');

    const advancedCourses = setupCourses()
        .filter(course => course.category == 'ADVANCED');



    beforeEach(async() => {

        const coursesServiceSpy = {
            findAllCourses: vi.fn().mockName("CoursesService.findAllCourses")
        };

        TestBed.configureTestingModule({
            imports: [
                CoursesModule,
                NoopAnimationsModule
            ],
            providers: [
                { provide: CoursesService, useValue: coursesServiceSpy }
            ]
        }).compileComponents()
            .then(() => {
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            coursesService = TestBed.inject(CoursesService);
        });

    });

    it("should create the component", () => {

        expect(component).toBeTruthy();

    });


    it("should display only beginner courses", () => {

        coursesService.findAllCourses.mockReturnValue(of(beginnerCourses));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mdc-tab"));

        expect(tabs.length,"Unexpected number of tabs found").toBe(1);

    });


    it("should display only advanced courses", () => {

        coursesService.findAllCourses.mockReturnValue(of(advancedCourses));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mdc-tab"));

        expect(tabs.length, "Unexpected number of tabs found").toBe(1);

    });


    it("should display both tabs", () => {

        coursesService.findAllCourses.mockReturnValue(of(setupCourses()));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css(".mdc-tab"));

        expect(tabs.length,"Expected to find 2 tabs").toBe(2);

    });


    it("should display advanced courses when tab clicked - fakeAsync", async() => {

        coursesService.findAllCourses.mockReturnValue(of(setupCourses()));

        fixture.detectChanges();

        await fixture.whenStable();

        const tabs = el.queryAll(By.css(".mdc-tab"));

        click(tabs[1]);

        fixture.detectChanges();

        await fixture.whenStable();

        const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));

        console.log(cardTitles);

        expect(cardTitles.length, "Could not find card titles").toBeGreaterThan(0);

        expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

    });


    it("should display advanced courses when tab clicked - async", async () => {

        coursesService.findAllCourses.mockReturnValue(of(setupCourses()));

        fixture.detectChanges();

        await fixture.whenStable();

        const tabs = el.queryAll(By.css(".mdc-tab"));

        click(tabs[1]);

        fixture.detectChanges();

        await fixture.whenStable();

        fixture.whenStable().then(() => {

            console.log("called whenStable() ");

            const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));

            expect(cardTitles.length,"Could not find card titles").toBeGreaterThan(0);

            expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

        });

    });


});





















