import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES, findLessonsForCourse } from "../../../../server/db-data";
import { Course } from "../model/course";
import { HttpErrorResponse } from "@angular/common/http";

describe('CoursesService', () => {
    let coursesService: CoursesService;
    let httpTestingController: HttpTestingController;

    // Here we'll need to provide a HttpClient mock implementation
    beforeEach(() => {
        TestBed.configureTestingModule({
            // It's wise to use the testing module from angular
            imports: [HttpClientTestingModule],
            providers: [
                CoursesService,
            ]
        });

        coursesService = TestBed.inject(CoursesService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should retrieve all courses', () => {
        coursesService.findAllCourses()
            .subscribe(courses => {
                // Expect the courses to return not null or undefind
                expect(courses).toBeTruthy('No courses returned');
                expect(courses.length).toBe(12, "incorrect number of courses");
                const course = courses.find(course => course.id === 12);
                expect(course.titles.description).toBe('Angular Testing Course');
            });

        // Expect one call to /api/courses
        const testRequest = httpTestingController.expectOne('/api/courses');

        // Expect correct HTTP VERB
        expect(testRequest.request.method).toEqual('GET');

        testRequest.flush({
            payload: Object.values(COURSES)
        });
    });

    it('should retrieve Angular Testing Course', () => {
        coursesService.findCourseById(12)
            .subscribe(course => {
                expect(course).toBeTruthy('Course not found');
                expect(course.id).toBe(12);
                expect(course.titles.description).toBe('Angular Testing Course');
            });

        // Expect one call to /api/courses
        const testRequest = httpTestingController.expectOne('/api/courses/12');

        // Expect correct HTTP VERB
        expect(testRequest.request.method).toEqual('GET');

        testRequest.flush(COURSES[12]);
    });

    it('should save the course data', () => {
        const changes: Partial<Course> = { titles: { description: 'Testing Course' }};

        coursesService.saveCourse(12, changes)
            .subscribe(course => {
                expect(course.id).toBe(12);
            })
        
            const req = httpTestingController.expectOne('/api/courses/12');
            expect(req.request.method).toEqual('PUT');
            expect(req.request.body.titles.description).toEqual(changes.titles.description);
            
            req.flush({
                ...COURSES[12],
                ...changes
            });
    });

    it('should throw error if save course fails', () => {
        const changes: Partial<Course> = { titles: { description: 'Testing Course' }};
        coursesService.saveCourse(12, changes)
            .subscribe(() => fail('save failed'),
            (error: HttpErrorResponse) => {
                expect(error.status).toBe(500);
            });
        const req = httpTestingController.expectOne('/api/courses/12');
        expect(req.request.method).toEqual('PUT');

        req.flush('Save course failed', {
            status: 500, statusText: 'Internal Server Error'
        });
    });

    it('should find a lesson list', () => {
        coursesService.findLessons(12)
            .subscribe(lessons => {
                expect(lessons).toBeTruthy();
                expect(lessons.length).toBe(3);
            });
        const req = httpTestingController.expectOne(req => req.url === '/api/lessons');
        expect(req.request.method).toEqual('GET');
        expect(req.request.params.get('courseId')).toEqual('12');
        expect(req.request.params.get('filter')).toEqual('');
        expect(req.request.params.get('sortOrder')).toEqual('asc');
        expect(req.request.params.get('pageNumber')).toEqual('0');
        expect(req.request.params.get('pageSize')).toEqual('3');
        
        const responsePayload = findLessonsForCourse(12).slice(0, 3);

        req.flush({
            payload: responsePayload
        });
    });

    afterEach(() => {
        httpTestingController.verify();
    })
});