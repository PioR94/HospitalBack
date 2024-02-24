import { Doctor } from '../types';

export const mockDoctor: Doctor = {
  id: '1',
  login: 'doctor11',
  password: '1111',
  mail: 'doctor@o2.pl',
  name: 'John',
  lastName: 'Smith',
  street: 'Long Street',
  code: '22-22',
  city: 'London',
  specialization: 'surgeon',
  price: '200',
  latitude: 53.1111,
  longitude: 51.2222,
};

export const mockPatient = {
  id: '2',
  login: 'patient',
  password: '1111',
  mail: 'patient@o2.pl',
  name: 'John',
  lastName: 'Smith',
  street: 'Long Street',
  code: '22-22',
  city: 'London',
};
