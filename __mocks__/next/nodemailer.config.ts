export const transport = {
  sendMail: jest.fn(() => console.log('Mocking a call to nodemailer sendMail...')),
};
