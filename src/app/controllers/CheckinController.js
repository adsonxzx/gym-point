import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const { student_id } = req.params;

    /**
     * Verify if student exists
     */
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.json({ error: 'Student does not exists' });
    }

    /**
     * Verify if students exceeded the limit of checkins
     */
    const dataBefore = subDays(new Date(), 7);

    const numCheckin = await Checkin.count({
      where: {
        student_id,
        created_at: { [Op.between]: [dataBefore, new Date()] },
      },
    });

    if (numCheckin >= 5) {
      return res.json({ error: 'You exceeded the limit of checkins!' });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }

  async index(req, res) {
    const { student_id } = req.params;

    /**
     * Verify if student exists
     */
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.json({ error: 'Student does not exists' });
    }

    const checkins = await Checkin.findAll({
      where: { student_id },
    });

    return res.json(checkins);
  }
}

export default new CheckinController();
