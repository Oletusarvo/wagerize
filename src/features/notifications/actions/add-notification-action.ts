'use server';

import { z } from 'zod';
import { notificationSchema } from '../schemas/notifications-schema';
import db from 'betting_app/dbconfig';

const notificationSchemaWithoutId = notificationSchema.omit({ id: true });
export async function addNotificationAction(
  notification: z.infer<typeof notificationSchemaWithoutId>
) {
  const result: { code: number | string } = { code: 0 };
  try {
    notificationSchemaWithoutId.parse(notification);
    await db('notifications.notification').insert(notification);
    //Should send an update through socket.io to the user who received the notification.
  } catch (err) {
    console.log(err.message);
    result.code = -1;
  }
  return result;
}
