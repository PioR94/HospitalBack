import { Doctor, Patient } from '../types';
import { Schedule } from '../types/schedules/schedule';

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

export const mockPatient: Patient = {
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

export const mockPatient2: Patient = {
  id: '2',
  login: 'patient22',
  password: '2222',
  mail: 'patient2@o2.pl',
  name: 'Alan',
  lastName: 'Rickman',
  street: 'Short Street',
  code: '21-22',
  city: 'London',
};

export const mockPatientsResults: Patient[] = [mockPatient, mockPatient2];

export const mockSchedulesData: Schedule[] = [
  { id: '1', idDr: '11', day: 'Friday', hour: '6:00' },
  { id: '2', idDr: '11', day: 'Monday', hour: '10:00' },
  { id: '3', idDr: '11', day: 'Tuesday', hour: '11:00' },
];
