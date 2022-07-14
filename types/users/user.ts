export interface User {
    id?: string;
    login: string;
    password: string;
    mail: string;
    name: string;
    lastName: string;
    address: string;
}

export interface Doctor extends User {
    specialization?: string;
}

export interface Patient extends User {}

