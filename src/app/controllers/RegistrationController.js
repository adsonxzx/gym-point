import * as Yup from 'yup';
import { addMonths, fromUnixTime } from 'date-fns';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

class RegistrationController {
  async store(req, res) {
    const { start_date, student_id, plan_id } = req.body;

    /**
     * Validation
     */
    const schema = Yup.object().shape({
      // start_date: Yup.date().required(),
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation error!' });
    }

    /**
     * Verify if Student exist
     */
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).json({ error: 'Student not founded' });
    }

    /**
     * Verify if Plan exist
     */
    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan not founded' });
    }

    const end_date = addMonths(fromUnixTime(start_date), plan.duration);

    const registtration = await Registration.create({
      start_date: fromUnixTime(start_date),
      end_date,
      plan_id,
      price: plan.price,
      student_id,
    });

    return res.json(registtration);
  }

  async index(req, res) {
    const registrations = await Registration.findAll({
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'price', 'duration'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['nome', 'email'],
        },
      ],
    });

    return res.json(registrations);
  }

  async update(req, res) {
    /**
     * Validation
     */
    const schema = Yup.object().shape({
      // start_date: Yup.date().required(),
      student_id: Yup.number(),
      plan_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation error!' });
    }

    const plan = await Registration.findByPk(req.params.plan_id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan not founded' });
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const plan = await Registration.findByPk(req.params.plan_id);

    await plan.destroy();

    return res.json({ success: 'Plan deleted with success' });
  }
}

export default new RegistrationController();
