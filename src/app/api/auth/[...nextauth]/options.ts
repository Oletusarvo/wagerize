import db from 'betting_app/dbconfig';
import { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';

export const options: NextAuthOptions = {
  providers: [
    {
      id: 'Credentials',
      type: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize({ email, password }) {
        console.log(email, password);

        const user = await db('users.user as u')
          .join(db.raw('users.user_status as us on us.id = u.user_status_id'))
          .where({ email })
          .select('password as encryptedPassword', 'email', 'u.id', 'us.label as status')
          .first();

        if (!user) {
          throw new Error('invalid_email');
        }

        if (!(await bcrypt.compare(password, user.encryptedPassword))) {
          throw new Error('invalid_password');
        }

        //Update the last logged in-column of the user.
        await db('users.user').where({ id: user.id }).update({ last_logged_in: db.fn.now() });
        return { email: user.email, status: user.status, id: user.id };
      },
    },
  ],

  jwt: {
    maxAge: 60 * 60 * 24,
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.status = user.status;
      }
      return token;
    },
  },
};
