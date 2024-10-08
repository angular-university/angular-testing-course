import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

// Create a mock for LoggerService
describe('CalculatorService', () => {
  let calculatorService: CalculatorService;
  let loggerService: jest.Mocked<LoggerService>;

  beforeEach(() => {
    // Create a mock for LoggerService
    loggerService = {
      log: jest.fn()
    } as jest.Mocked<LoggerService>;

    // Inject the mock into CalculatorService
    calculatorService = new CalculatorService(loggerService);
  });

  it('should add two numbers and log the operation', () => {
    const result = calculatorService.add(2, 3);

    // Check if the result is correct
    expect(result).toBe(5);

    // Check if the log method was called once with the correct message
    expect(loggerService.log).toHaveBeenCalledTimes(1);
    expect(loggerService.log).toHaveBeenCalledWith('Addition operation called');
  });

  it('should subtract two numbers and log the operation', () => {
    const result = calculatorService.subtract(5, 3);

    // Check if the result is correct
    expect(result).toBe(2);

    // Check if the log method was called once with the correct message
    expect(loggerService.log).toHaveBeenCalledTimes(1);
    expect(loggerService.log).toHaveBeenCalledWith('Subtraction operation called');
  });
});
