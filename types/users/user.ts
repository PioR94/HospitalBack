export interface Patient {
  id?: string;
  login: string;
  password: string;
  mail: string;
  name: string;
  lastName: string;
  street: string;
  code: string;
  city: string;
}

export interface Doctor {
  id?: string;
  login: string;
  password: string;
  mail: string;
  name: string;
  lastName: string;
  street: string;
  code: string;
  city: string;
  specialization?: string;
  price?: string;
  latitude: number;
  longitude: number;
}
