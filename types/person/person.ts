export interface Person {
    id: string;
    name: string;
    lastName: string;
    age: number;
}

export interface Doctor extends Person {
    specialization: string;

}