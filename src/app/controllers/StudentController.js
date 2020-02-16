import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { page } = req.params;
    const limit = 10;

    const students = await Student.findAll({
      limit,
      offset: page * limit,
      order: [['created_at', 'DESC']],
    });

    return res.json(students);
  }

  // Show
  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Studant not founded!' });
    }

    return res.json(student);
  }

  // Store
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    // Validation
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error!' });
    }

    try {
      const { id, nome, email, peso, idade, altura } = await Student.create(
        req.body
      );
      return res.json({
        id,
        nome,
        email,
        peso,
        idade,
        altura,
      });
    } catch (e) {
      return res.status(400).json({ error: 'Error ao cadastrar!' });
    }
  }

  // Update
  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
    });

    // Validation
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error!' });
    }

    const { nome, email, peso, idade, altura } = req.body;

    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Studant not founded!' });
    }

    console.log(idade);
    const data = await student.update({
      nome,
      email,
      peso: Number(peso),
      idade: Number(idade),
      altura: Number(altura),
    });

    return res.json({
      id: data.id,
      nome: data.nome,
      email: data.email,
      peso: data.peso,
      idade: data.idade,
      altura: data.altura,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student not founded!' });
    }

    await student.destroy();

    return res.json({ success: 'Studant deleted with success' });
  }
}

export default new StudentController();
