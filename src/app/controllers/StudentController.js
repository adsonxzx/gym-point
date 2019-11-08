import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  // Index
  async index(req, res) {
    const students = await Student.findAll();

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
      peso: Yup.number(),
      idade: Yup.number(),
      altura: Yup.number(),
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
      peso: Yup.number(),
      idade: Yup.number(),
      altura: Yup.number(),
    });

    // Validation
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error!' });
    }

    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Studant not founded!' });
    }

    const { nome, email, peso, idade, altura } = await student.update(req.body);

    return res.json({
      nome,
      email,
      peso,
      idade,
      altura,
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
