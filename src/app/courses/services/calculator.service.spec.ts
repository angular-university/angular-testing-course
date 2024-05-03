import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import {TestBed} from '@angular/core/testing';


describe('CalculatorService', () => {

    // let calculator: CalculatorService,
    //     loggerSpy: any;

    // beforeEach(()=> {

    //     console.log("Calling beforeEach");

    //     loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);

    //     TestBed.configureTestingModule({
    //         providers: [
    //             CalculatorService,
    //             {provide: LoggerService, useValue: loggerSpy}
    //         ]
    //     });

    //     calculator = TestBed.inject(CalculatorService);

    // });

    it('should add two numbers', () => {

        const calculator = new CalculatorService(new LoggerService());

        const result = calculator.add(2, 2)

        expect(result).toBe(4)

        // console.log("add test");

        // const result = calculator.add(2, 2);

        // expect(result).toBe(4);

        // expect(loggerSpy.log).toHaveBeenCalledTimes(1);

    });


    it('should subtract two numbers', () => {

        const calculator = new CalculatorService(new LoggerService());

        const result = calculator.subtract(2, 2)

        expect(result).toBe(0, "unexpected subtraction result")

        // console.log("subtract test");

        // const result = calculator.subtract(2, 2);

        // expect(result).toBe(0, "unexpected subtraction result");

        // expect(loggerSpy.log).toHaveBeenCalledTimes(1);

    });

});
