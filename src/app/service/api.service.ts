import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../modals/appointment';

@Injectable({
  providedIn: 'root', 
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; 
  constructor(private http: HttpClient) {}
  getAllAppointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }
  createAppointment(appointment: Appointment): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-appointment`, appointment);
  }

  updateAppointment(data:Appointment): Observable<any> {
    return this.http.post(`${this.baseUrl}/update-appointment`, data);
  }
  deleteAppointment(appointment_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-appointment`,{body:{
      appointment_id
    }});
  }
}
