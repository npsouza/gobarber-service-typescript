import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('shoud be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12341234',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12341234');
  });

  it('shoud not be able to create two appointment on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointmentDate = new Date(2021, 1, 1, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12341234',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12341234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
