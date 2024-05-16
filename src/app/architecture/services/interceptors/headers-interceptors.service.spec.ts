// import { TestBed } from '@angular/core/testing';

// import { HeadersInterceptorsService } from './headers-interceptors.service';
// import { HttpHandler, HttpRequest } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('HeadersInterceptorsService', () => {
//   let service: HeadersInterceptorsService;
//   let mockReq: HttpRequest<any>;
//   let mockNext: HttpHandler;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, ],
   
//     });

//     mockReq = new HttpRequest<any>('GET', '/api/data');
  
    
//     service = TestBed.inject(HeadersInterceptorsService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should set content-type header to application/json on intecept', () => {
//     service.intercept(mockReq, mockNext).subscribe()

    

//     jest.spyOn(service, "intercept");
//     // console.log("sdfghjkl:::", mockNext.handle);


//     expect(service.intercept).toHaveBeenCalled();

//     // expect(mockNext.handle).toHaveBeenCalledWith(
//     //   expect.objectContaining({
//     //     headers: expect.objectContaining ({
//     //       'Content-Type': 'application/json'
//     //     })
//     //   })
//     // )
//   })
// });
