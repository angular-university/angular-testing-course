import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import {TestBed} from '@angular/core/testing';


describe('CalculatorService', () => {

  let calculator: CalculatorService,
      loggerSpy:any;

  beforeEach(() => {

    console.log("Calling beforeEach()");

    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    loggerSpy.log.and.returnValue(undefined);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue: loggerSpy}
      ]
    });

    calculator = TestBed.get(CalculatorService);

  });

  it("should add two numbers", () => {

    const result = calculator.add(2, 2);

    expect(result).toBe(4);

    expect(loggerSpy.log.calls.count())
      .toBe(1, 'logger method should only be called once');

    expect(loggerSpy.log).toHaveBeenCalledWith("Addition operation called");

  });


  it("should subtract two numbers", () => {

    const result = calculator.subtract(2, 2);

    expect(result).toBe(0);

    expect(loggerSpy.log.calls.count())
      .toBe(1, 'logger method should only be called once');

    expect(loggerSpy.log).toHaveBeenCalledWith("Subtraction operation called");

  });

});
