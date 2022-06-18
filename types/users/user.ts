export interface User {
    id?: string;
    login: string;
    password: string;
    name: string;
    lastName: string;
    age: number;
    address: string;
    visitId?: string;
}

export interface Doctor extends User {
    specialization?: string;
}

export interface Patient extends User {}

