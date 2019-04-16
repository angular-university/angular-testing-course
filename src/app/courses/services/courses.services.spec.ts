import {CoursesService} from './courses.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('CoursesService', () => {

    let coursesService: CoursesService,
        httpTestingController: HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                CoursesService,
                HttpClientTestingModule
            ]
        });

        coursesService = TestBed.get(CoursesService),
        httpTestingController = TestBed.get(HttpTestingController);

    });

    it('should retrieve all courses', () => {


    });


});