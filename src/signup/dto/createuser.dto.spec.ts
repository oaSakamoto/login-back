import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "./createuser.dto"
import { validate } from "class-validator";

describe('CreateUserDto', () => {
  const createAndValidateDto =  async (data: Partial<CreateUserDto>) => {
    const dto = plainToInstance(CreateUserDto, {
      name: 'any name',
      email: 'any_email@example.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      ...data
    });
    return validate(dto);
  }  
  it('deve passar na validação com os dados válidos', async () => {
    const errors = await createAndValidateDto({});
    expect(errors.length).toBe(0)
  })
  describe('deve falhar na validação se o field é invalido', () => {
    const invalidCases = [
      { field: 'name', value: '', expectedError: 'isNotEmpty' },
      { field: 'email', value: 'invalid-email', expectedError: 'isEmail' },
      { field: 'password', value: '', expectedError: 'isNotEmpty' },
      { field: 'passwordConfirmation', value: '', expectedError: 'isNotEmpty' }
    ];  
    it.each(invalidCases)(
      'deve falhar na validação se o $field é invalido',
      async ({ field, value, expectedError }) => {
        const errors = await createAndValidateDto({ [field]: value });
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe(field);
        expect(errors[0].constraints).toHaveProperty(expectedError);
      }
    );
  })
  describe('validação de name', () => {
    it('deve falhar se name não for uma string', async () => {
      const errors = await createAndValidateDto({name: 123 as any})
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('name');
      expect(errors[0].constraints).toHaveProperty('isString');
    })
    it('deve falhar se o nome tiver menos que 2 caracteres', async () => {
      const errors = await createAndValidateDto({name: 'a'})
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('name');
      expect(errors[0].constraints).toHaveProperty('minLength');
    })
    it('deve falhar se o nome tiver mais que 50 caracteres', async () => {
      const errors = await createAndValidateDto({name: 'A'.repeat(51)})
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('name');
      expect(errors[0].constraints).toHaveProperty('maxLength');
    })  
  })
  
  describe('validação de email', () => {
    it('deve falhor se o email não for valido', async () => {
      const errors = await createAndValidateDto({email : 'invalid_email'});
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('email');
      expect(errors[0].constraints).toHaveProperty('isEmail');
    })  
    it('deve falhar se email for muito grande', async () => {
      const errors = await createAndValidateDto({email : `${'a'.repeat(247)}@example.com`});
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('email');
      expect(errors[0].constraints).toHaveProperty('maxLength');
    })
  })
  describe('validação de senha', () => {
    it('deve falhar se a senha tiver menos que 8 caracteres',async () => {
      const errors = await createAndValidateDto({password: 'aaaaaaa'})
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('password');
      expect(errors[0].constraints).toHaveProperty('minLength');
    })
    it('deve falhar se a senha tiver mais que 50 caracteres', async () => {
      const errors = await createAndValidateDto({password : `${'a'.repeat(247)}@example.com`});
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('password');
      expect(errors[0].constraints).toHaveProperty('maxLength');
    })
    it('deve falhar na validação se a confirmação de password falhar', async () => {
      const errors = await createAndValidateDto({ password: 'any_password', passwordConfirmation: 'invalid_password' });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('passwordConfirmation');
      expect(errors[0].constraints).toHaveProperty('passwordMatch');
    })
  })
})

