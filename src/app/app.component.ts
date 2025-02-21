import { Component, OnInit } from '@angular/core';
import { Appointment } from './modals/appointment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isEdit: boolean = false;
  appointment: Appointment = {
    id: -1,
    name: "",
    date: ""
  }
  appointmentList: Appointment[] = [];
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.apiService.getAllAppointments().subscribe((appointment) => {
      this.appointmentList = appointment.data
    })
  }
  private clearFormData = () => {
    this.appointment = {
      id: -1,
      date: "",
      name: ""
    }
    this.isEdit = false
  }
  submitAppointment = () => {
    if (this.isEdit) {
      this.apiService.updateAppointment(this.appointment).subscribe(_=>{
        const appointmentIndex = this.appointmentList.findIndex((ap) => ap.id = this.appointment.id);
        if (appointmentIndex != -1) {
          this.appointmentList[appointmentIndex] = this.appointment
        }
        this.appointment = {
          id: -1,
          date: "",
          name: ""
        }
        this.clearFormData()
      })
      return
    }
    this.appointmentList.push({ ...this.appointment, id: this.appointmentList.length + 1 });
    this.apiService.createAppointment(this.appointment).subscribe((_) => {
      this.clearFormData()
    });
  }

  deleteAppointment = (id: number) => {
    this.apiService.deleteAppointment(id).subscribe(_=>{
      let copyAppointment = [...this.appointmentList];
      copyAppointment = copyAppointment.filter((e) => e.id != id);
      this.appointmentList = copyAppointment;
    })
  }

  selectAppointment = (id: number) => {
    const appointmentData = this.appointmentList.find((ap) => ap.id = id);
    if (appointmentData) {
      this.appointment = {
        ...this.appointment,
        date: appointmentData.date,
        name: appointmentData.name,
        id: id
      }
      this.isEdit = true
    }
  }
}
