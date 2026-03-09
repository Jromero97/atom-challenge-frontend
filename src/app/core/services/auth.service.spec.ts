import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from "./auth.service";
import { environment } from "../../../environments/environment";

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
        localStorage.clear();
    });

    it('should clear user on logout', async () => {
        await service.logout();

        expect(service.currentUser()).toBeNull();
    });

    it('should execute backend login check correctly', () => {
        service.checkUser('test@example.com').subscribe();
        const req = httpMock.expectOne(`${environment.apiUrl}/users/test@example.com`);
        expect(req.request.method).toBe('GET');
    });
})