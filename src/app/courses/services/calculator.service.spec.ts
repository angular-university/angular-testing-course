import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {
    let calculator: CalculatorService;
    let loggerSpy: any;

    // Executed before each of the specifications (it)
    beforeEach(() => {
        console.log('Calling beforeEach');
        // Creates a complete fake implementation of LoggerService;
        // The second parameter is an array of methods that we'll be able
        // to spy
        loggerSpy = jasmine.createSpyObj('LoggerService', [
            'log'
        ]);
        
        // Instead of using service constructor, we can configure it
        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                {
                    provide: LoggerService, useValue: loggerSpy
                }
            ]
        })

        // Each test will have a different instance of calculator
        calculator = TestBed.inject(CalculatorService);
    });

    it('should add two numbers', () => {
        console.log('add test');

        const result = calculator.add(2, 2);
        
        expect(result).toBe(4, "unexpected add result");
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract two numbers', () => {
        console.log('subtract test');

        const result = calculator.subtract(2, 2);
        
        expect(result).toBe(0, "unexpected subtraction result");
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
});