import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../../architecture/utils/interfaces';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let _http: HttpClient;

  const mockUserData: User = {
    firstName: "John",
    lastName: "Doe",
    username: "Johndoe",
    email: "johndoe@gmail.com",
    password: "123456",
    confirmPassword: "123456",
  }; 

  const mockResponse = {
    message: "Successfull RESTful api call",
  }

  //Test Params
  const params = new HttpParams()
    .set('testParams', "testParams");

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService, 
        {
          provide: HttpClient, 
          useValue: {
            post: jest.fn(() => of(mockResponse)),
            put: jest.fn(()=>of(mockResponse))
          }
        }
      ]
    });
    service = TestBed.inject(AuthService);
    _http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  /*************Register User  */
  it('Should return an Observable with a successful message on successful registration', () => {
    const registerUser$ = service.registerUser(mockUserData);

    registerUser$.subscribe(res => {
      expect(res).toEqual(mockResponse); //Expect successful response
    })
  }); 

  it('Should call HttpClient.post with the correct URL and data', () => {
    service.registerUser(mockUserData);

    expect(_http.post).toHaveBeenCalledWith(
      `${service.serverUrl}/register`,
      mockUserData
    );
  }); 

  /*********** Login User */
  it('should return an Observable with successful message on successful login', () => {


    const loginUser$ = service.logInUser(mockUserData, params);

    loginUser$.subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
  });

  it('should call HttpClient.post with the correct URL and data', () => {
    service.logInUser(mockUserData, params);

    expect(_http.post).toHaveBeenCalledWith(
      `${service.serverUrl}/signIn`,
      mockUserData,
      { params: params }
    );
  });


  /*********Logout User */
  it('should return an Observable with successful logout message on logOutUser call', () => {
    const logOutUser$ = service.logOutUser();

    logOutUser$.subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
  });

  it('should call HttpClient.put with the correct URL and data', () => {
    service.logOutUser();

    expect(_http.put).toHaveBeenCalledWith(
      `${service.serverUrl}/logout`,
      {}
    );
  });




});
