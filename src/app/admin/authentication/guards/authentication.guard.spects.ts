// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { authenticationGuard } from './authentication.guard';
// import { of } from 'rxjs';


// describe('authenticationGuard', () => {
//   let guard: authenticationGuard
  
//   const executeGuard: CanActivateFn = (...guardParameters) => 
//       TestBed.runInInjectionContext(() => authenticationGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [], 
//       providers: [{authenticationGuard, useValue: {}}]
//     });

//     guard = TestBed.inject(authenticationGuard);

//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });


//   it('should allow access when user is registered (username in sessionStorage)', () => {
//     sessionStorage.setItem('username', 'test_user'); // Simulate logged-in user

//     const result = guard.canActivate(null, null); // Mock route and state

//     expect(result).toBe(true); // Expect guard to allow access
//   });

//   it('should deny access when user is not registered (no username in sessionStorage)', () => {
//     sessionStorage.removeItem('username'); // Simulate non-logged-in user

//     const result = guard.canActivate(null, null); // Mock route and state

//     expect(result).toBe(false); // Expect guard to deny access
//   });

//   it('should return an observable for asynchronous checks (optional)', () => {
//     // Mock an asynchronous check (e.g., API call)
//     const isRegistered$ = of(true); // Observable returning true

//     spyOn(guard, 'checkRegistration').and.returnValue(isRegistered$); // Mock checkRegistration method

//     const result = guard.canActivate(null, null); // Mock route and state

//     expect(result).toBe(isRegistered$); // Expect guard to return the observable
//   });
// });
