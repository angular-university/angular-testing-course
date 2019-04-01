import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from './courses.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';


describe('CoursesService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let coursesService: CoursesService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    coursesService = TestBed.get(CoursesService);

  });


  it('should retrieve all courses', () => {

    coursesService.findAllCourses()
      .subscribe(courses => {

        expect(<any>courses).toBeTruthy('No value returned');
        expect(courses.length).toBe(12, `number of courses not correct`);

        const course = courses.find(course => course.id == 12);

        expect(course.titles.description).toBe('Angular Testing Course',
          `The name of the course is incorrect`);

      });

    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');

    req.flush({payload: Object.values(COURSES)});

  });


  it('should save a course', () => {

    coursesService.saveCourse(12, {titles: {description: 'Testing Course'}})
      .subscribe();

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');

    req.flush({});

  });


  it('should throw error if request fails', () => {

    const errorMessage = 'Internal Server Error';

    coursesService.saveCourse(12, {titles: {description: 'Testing Course'}})
      .subscribe(() => {

          fail('The returned observable should have errored out.');

        },
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(500, 'status');
          expect(error.error).toEqual(errorMessage, 'message');
        }
      );


    const req = httpTestingController.expectOne('/api/courses/12');

    // Respond with mock error
    req.flush(errorMessage, {status: 500, statusText: 'Error'});

  });


  afterEach(() => {

    httpTestingController.verify();

  });

});
