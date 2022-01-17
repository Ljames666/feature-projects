export interface IProject {
    uid: string;
    name: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    user?: string;
}
