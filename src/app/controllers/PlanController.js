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

  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async show(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.json({ error: 'Plan not founded!' });
    }

    return res.json(plan);
  }

  async update(req, res) {
    /**
     * Validation
     */
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation Error!' });
    }

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.json({ error: 'Plan not founded!' });
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan not founded!' });
    }

    await plan.destroy();

    return res.json({ success: 'Plan deleted with success' });
  }
}

export default new PlanController();
