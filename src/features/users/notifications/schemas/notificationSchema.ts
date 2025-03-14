import { z } from 'zod';

export const notificationSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  notification_type_id: z.number().int(),
  message: z.string(),
  content: z.any(),
});
