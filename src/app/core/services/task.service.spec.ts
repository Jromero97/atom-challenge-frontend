import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TaskService } from "./task.service"
import { TestBed } from "@angular/core/testing";
import { Task } from "../models/task.model";
import { environment } from "../../../environments/environment";

describe('TaskService', () => {
    let service: TaskService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TaskService],
        });
        service = TestBed.inject(TaskService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should fetch task for a given email', () => {
        const dummyTasks: Task[] = [
            { id: '1', title: 'Test 1', description: 'Desc 1', completed: false, userEmail: 'test@test.com', tags: ['Testing'] },
        ];

        service.getTasks('test@test.com').subscribe(tasks => {
            expect(tasks.length).toBe(1);
            expect(tasks).toEqual(dummyTasks);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/tasks?email=test@test.com`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyTasks);
    });

    it('should update a task', () => {
        const updatePayload: Partial<Task> = { title: 'Updated Title', description: 'Update Description' };

        service.updateTask('123', updatePayload).subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/tasks/123`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatePayload);
        req.flush({ success: true });
    });

    it('should delete a task', () => {
        service.deleteTask('123').subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/tasks/123`);
        expect(req.request.method).toBe('DELETE');
        req.flush({ success: true });
    });
});