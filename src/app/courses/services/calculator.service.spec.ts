import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';

// x - отключает тест
// f - фокусируется на тесте и пропускает остальные

describe('CalculatorService', () => {

  let
    calculator: CalculatorService,
    loggerSpy: any;

  // TODO будет выполняться перед каждой из спецификаций (it)
  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    // console.log('тест запущен!');

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: loggerSpy,
        }
      ]
    });

    calculator = TestBed.get(CalculatorService);
  });


  // спецификация
  it('должен сложить два числа', () => {

    console.log('тест на сложение');

    const result = calculator.add(2, 2);

    expect(result).toBe(4);

    // TODO указываем сколько раз должен быть вызван
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });


  // спецификация
  it('должен вычесть два числа', () => {

    console.log('тест на вычитание');

    const result = calculator.subtract(2, 2);

    expect(result).toBe(0,
      'неожиданный результат вычитания'
    );

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
