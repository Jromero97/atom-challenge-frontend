export interface Task {
    id?: string;
    title: string;
    description: string;
    tags: string[];
    completed: boolean;
    createdAt?: string | Date;
    userEmail: string;
}