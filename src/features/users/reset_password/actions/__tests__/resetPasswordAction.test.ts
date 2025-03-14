import { resetPasswordAction } from '../resetPasswordAction';
import db from 'betting_app/dbconfig';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('resetPasswordAction', () => {
  const mockToken = 'mockToken';
  const mockUserId = '550e8400-e29b-41d4-a716-446655440000'; // Example v4 UUID

  const mockNewPassword = 'newPassword123';
  const mockHashedPassword = 'hashedPassword123';

  beforeEach(async () => {
    //jest.clearAllMocks();
    // Clean up the database or set up test data if necessary
    await db('users.user').del();
    await db('users.user').insert({
      id: mockUserId,
      password: 'oldPassword',
      email: 'test@email.com',
    });
  });

  afterAll(async () => {
    await db('users.user').del();
  });

  it('should update the user password when token is valid', async () => {
    (jwt.verify as jest.Mock).mockReturnValueOnce({ userId: mockUserId });
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce(mockHashedPassword);

    const result = await resetPasswordAction(mockToken, { password: mockNewPassword });

    const updatedUser = await db('users.user').where({ id: mockUserId }).first();

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.TOKEN_SECRET);
    expect(bcrypt.hash).toHaveBeenCalledWith(mockNewPassword, 15);
    expect(updatedUser.password).toBe(mockHashedPassword);
    expect(result.code).toBe(0);
  }, 20000);

  it('should return code -1 when token verification fails', async () => {
    (jwt.verify as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Invalid token');
    });

    const result = await resetPasswordAction(mockToken, { password: mockNewPassword });

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.TOKEN_SECRET);
    expect(result.code).toBe(-1);
  }, 20000);

  /*
  it('should return code -1 when database update fails', async () => {
    (jwt.verify as jest.Mock).mockReturnValueOnce({ userId: mockUserId });
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce(mockHashedPassword);

    // Simulate a database failure by using a non-existent table or invalid query
    jest.spyOn(db, 'update').mockRejectedValueOnce(new Error('Database error'));

    const result = await resetPasswordAction(mockToken, { password: mockNewPassword });

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.TOKEN_SECRET);
    expect(bcrypt.hash).toHaveBeenCalledWith(mockNewPassword, 15);
    expect(result.code).toBe(-1);
  }, 20000);*/
});
