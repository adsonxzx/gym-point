import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const { title, duration, price } = req.body;
    /**
     * Validation
     */
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation Error!' });
    }

    /**
     * Validation plan name
     */
    const existPlan = await Plan.findOne({
      where: { title: title.toLowerCase() },
    });

    if (existPlan) {
      return res.status(401).json({ error: 'Plan name already extist!' });
    }

    const plan = await Plan.create({
      title: title.toLowerCase(),
      duration,
      price,
    });

    return res.json(plan);
  }
}

export default new PlanController();
