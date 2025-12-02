import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';


describe('Async Testing Examples', () => {

    it('Asynchronous test example with async/await (setTimeout)', async () => {
        let test = false;
    
        const delayPromise = new Promise<void>(resolve => {
            setTimeout(() => {
                console.log('running assertions');
                test = true;
                resolve(); 
            }, 1000);
        });
    
        await delayPromise;
    
        expect(test).toBeTruthy();
    });

    it('Asynchronous test example - setTimeout() with async/await', async () => {
        let test = false;
    
        const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
    
        const timeoutPromise = delay(1000).then(() => {
            console.log('running assertions setTimeout()');
            test = true;
        });
    
        await timeoutPromise;
    
        expect(test).toBeTruthy();
    });


    it('Asynchronous test example - plain Promise with async/await', async () => {
        let test = false;
    
        console.log('Creating promise');
    
        const promiseChain = Promise.resolve()
            .then(() => {
                console.log('Promise first then() evaluated successfully');
                return Promise.resolve(); 
            })
            .then(() => {
                console.log('Promise second then() evaluated successfully');
                test = true;
            });
    
        await promiseChain;
    
        console.log('Running test assertions');
    
        expect(test).toBeTruthy();
    });


    it('Asynchronous test example - Promises + setTimeout() with async/await', async () => {
        let counter = 0;
    
        const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
    
        const outerPromise = Promise.resolve()
            .then(async () => { 
                counter += 10;
                
                await delay(1000).then(() => {
                    counter += 1;
                });
            });
    
        expect(counter).toBe(0);
    
        await outerPromise;
    
        expect(counter).toBe(11);
    });

    it('Asynchronous test example - Observables with firstValueFrom', async () => {
        let test = false;
    
        console.log('Creating Observable');
    
        const test$ = of(true).pipe(delay(1000));
    
        const finalValue = firstValueFrom(test$.pipe(
            tap(() => { 
                test = true; 
            })
        ));
    
        await finalValue;
    
        console.log('Running test assertions');
        
        expect(test).toBe(true);
        expect(finalValue).toBeTruthy(); 
    });


});
















