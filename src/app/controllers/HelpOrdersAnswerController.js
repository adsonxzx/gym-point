import HelpOrders from '../models/HelpOrders';
import Student from '../models/Student';

class HelpOrdersAnswerController {
  async store(req, res) {
    const { answer_id } = req.params;

    const helpOrders = await HelpOrders.findOne({ where: { id: answer_id } });

    if (!helpOrders) {
      return res.json({ error: 'Help orders not founded' });
    }

    await helpOrders.update({ answer: req.body.answer, answer_at: new Date() });

    return res.json(helpOrders);
  }

  /**
   * List all help orders without answer
   */
  async index(req, res) {
    const helpOrders = await HelpOrders.findAll({
      where: { answer: null },
      include: {
        model: Student,
        as: 'student',
        attributes: ['nome', 'email'],
      },
    });

    return res.json(helpOrders);
  }
}

export default new HelpOrdersAnswerController();
