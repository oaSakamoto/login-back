import { plainToInstance } from "class-transformer"
import { LoginDto } from "./login.dto"
import { validate } from "class-validator"

describe('LoginDto', () => {
  const createAndValidateDto = async (data: Partial<LoginDto>) => {
    const dto = plainToInstance(LoginDto, {
      email: 'any_email@example.com',
      password: 'any_password',
      ...data,
    })
    return validate(dto)
  }
  it('deve passar na validação com os dados válidos', async () => {
    const errors = await createAndValidateDto({});
    expect(errors.length).toBe(0);
  });
  describe('deve falhar na validação se o field é invalido', () => {
    const invalidCases = [
      { field: 'email', value: 'invalid-email', expectedError: 'isEmail' },
      { field: 'password', value: '', expectedError: 'isNotEmpty' },
    ];
    it.each(invalidCases)(
      'deve falhar na validação se o $field é invalido',
      async ({ field, value, expectedError }) => {
        const errors = await createAndValidateDto({ [field]: value });
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe(field);
        expect(errors[0].constraints).toHaveProperty(expectedError);
      },
    );
  });
  describe('validação de email', () => {
    it('deve falhor se o email não for valido', async () => {
      const errors = await createAndValidateDto({ email: 'invalid_email' });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('email');
      expect(errors[0].constraints).toHaveProperty('isEmail');
    });
    it('deve falhar se email for muito grande', async () => {
      const errors = await createAndValidateDto({
        email: `${'a'.repeat(247)}@example.com`,
      });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('email');
      expect(errors[0].constraints).toHaveProperty('maxLength');
    });
  });
  describe('validação de senha', () => {
    it('deve falhar se a senha tiver menos que 8 caracteres', async () => {
      const errors = await createAndValidateDto({ password: 'aaaaaaa' });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('password');
      expect(errors[0].constraints).toHaveProperty('minLength');
    });
    it('deve falhar se a senha tiver mais que 50 caracteres', async () => {
      const errors = await createAndValidateDto({
        password: `${'a'.repeat(247)}@example.com`,
      });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('password');
      expect(errors[0].constraints).toHaveProperty('maxLength');
    });
  });
})
