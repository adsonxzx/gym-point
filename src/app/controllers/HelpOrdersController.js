import * as Yup from 'yup';
import HelpOrders from '../models/HelpOrders';
import Student from '../models/Student';

class HelpOrdersController {
  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const student = await Student.findByPk(id);

    /**
     * Verify id Student exists
     */
    if (!student) {
      return res.status(401).json({ error: 'Student not exists' });
    }

    // Validation
    const schema = Yup.object().shape({
      question: Yup.string().required(),
      answer: Yup.string(),
      answer_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation error!' });
    }

    const helpOrder = await HelpOrders.create({ student_id: id, question });

    return res.json(helpOrder);
  }

  async index(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    /**
     * Verify id Student exists
     */
    if (!student) {
      return res.status(401).json({ error: 'Student not exists' });
    }

    const myHelpOrders = await HelpOrders.findAll({
      where: { student_id: id },
    });

    return res.json(myHelpOrders);
  }
}

export default new HelpOrdersController();
