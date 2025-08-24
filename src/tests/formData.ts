export const validFormData = {
  name: 'John',
  age: '25',
  email: 'john.doe@example.com',
  gender: 'male',
  'accept Terms and Conditions': true,
  country: 'United States',
  password: 'Password123!',
  'password confirmation': 'Password123!',
};
export const createTestFile = (
  type: 'image/png' | 'image/jpeg' = 'image/png',
  size: number = 1024
) => {
  const file = new File(['test'], 'test.png', { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

export const testFile = createTestFile('image/png', 1048576);
