import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {
    let calculator: CalculatorService;
    let loggerSpy: any;

    beforeEach(() => {
        // Only the service itself has to be actually instanciated.
        // All the other service's dependencies must be mocked by creating a spy obj, 
        // and adding inside the providers array like below.
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                { provide: LoggerService, useValue: loggerSpy },
            ],
        });

        calculator = TestBed.inject(CalculatorService);
    });

    it('should add two numbers', () => {
        const result = calculator.add(2, 2);
        expect(result).toBe(4);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract two numbers', () => {
        const result = calculator.subtract(2, 2);
        expect(result).toBe(0, 'unexpected subtraction result');
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
});