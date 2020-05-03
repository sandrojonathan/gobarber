// import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointments';

/**
 * Data Transfer Object

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}
*/
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // private appointments: Appointment[];

  // constructor() {
  //   this.appointments = [];
  // }

  /**
   * all
   */
  // public all(): Appointment[] {
  //   return this.appointments;
  // }

  /**
   * findByDate
   */
  public async findByDate(date: Date): Promise<Appointment | null> {
    // const findAppoint = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );
    const findAppointment = await this.findOne({
      where: { date: date },
    });
    return findAppointment || null;
  }

  /**
   * create
   * provider: string, date: Date
   */
  // public create({ provider, date }: CreateAppointmentDTO): Appointment {
  //   const appointment = new Appointment({ provider, date });
  //   this.appointments.push(appointment);
  //   return appointment;
  // }
}

export default AppointmentsRepository;
