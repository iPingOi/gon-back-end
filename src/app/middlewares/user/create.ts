import { type Context, type Next } from 'hono'

import z from 'zod'

class Create {
  async Create (c: Context, next: Next): Promise<void> {
    const schema = z.object({
      enrollment: z.string({
        required_error: 'Preencha o campo Matrícula.',
        invalid_type_error: 'Este não é um formato de matrícula valido.'
      }),
      password: z.string({
        required_error: 'Preencha o campo Senha.',
        invalid_type_error: 'Este não é um formato de senha valido.'
      })
    })

    const { enrollment, password } = schema.parse(await c.req.json())

    if (enrollment.length === 0 || password.length === 0) {
      throw new Error('Oops, the enrolment and password fields are wrong!')
    }

    await next()
  }
}

export default new Create()
