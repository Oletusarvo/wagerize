'use server';
import db from 'betting_app/dbconfig';
import { verifyJWT } from '@/utils/jwt';
import { userService } from '@/features/users/services/user-service';
import { parseFormDataUsingSchema } from '@/utils/parse-form-data-using-schema';
import { passwordResetSchema } from '../schemas/password-reset-schema';

export async function resetPasswordAction(
  payload: FormData
): Promise<ActionResponse<void, string>> {
  try {
    const data = parseFormDataUsingSchema(payload, passwordResetSchema);
    const { userId } = verifyJWT(data.token) as { userId: string };
    await userService.updatePassword(userId, data.password1, db);
    return {
      success: true,
    };
  } catch (err) {
    console.log(err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}
