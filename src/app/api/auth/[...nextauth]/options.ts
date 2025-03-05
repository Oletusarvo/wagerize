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
          .leftJoin(db.raw('users.wallet as wallet on wallet.user_id = u.id'))
          .where({ email })
          .select(
            'password as encryptedPassword',
            'email',
            'u.id',
            'us.label as status',
            db.raw("json_build_object('balance', wallet.balance) as wallet")
          )
          .first();

        if (!user) {
          throw new Error('invalid_email');
        }

        if (!(await bcrypt.compare(password, user.encryptedPassword))) {
          throw new Error('invalid_password');
        }

        //Update the last logged in-column of the user.
        await db('users.user').where({ id: user.id }).update({ last_logged_in: db.fn.now() });
        return { email: user.email, status: user.status, id: user.id, wallet: user.wallet };
      },
    },
  ],

  jwt: {
    maxAge: 60 * 60 * 24,
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user, trigger }: any) {
      if (trigger === 'update' && token.id) {
        const wallet = await db('users.wallet')
          .where({ user_id: token.id })
          .select('balance')
          .first();
        console.log('New wallet: ', wallet);
        token.wallet = wallet;
      } else if (user) {
        token.id = user.id;
        token.status = user.status;
        token.wallet = user.wallet;
      }

      return token;
    },

    async session({ token, session }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.status = token.status;
        session.user.wallet = token.wallet;
      }

      return session;
    },
  },
};
