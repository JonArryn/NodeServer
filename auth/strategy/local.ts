import passport = require('passport');
import {Strategy} from 'passport-local';
import {PrismaClient} from '../../prisma/generated/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

passport.use(new Strategy(
    async function verify(email: string, password: string, done) {
        // check if user exists by email
        const user = await prisma.user.findUnique({where: {email: email}});

        if (!user) {
            return done(null, false, {message: 'Could not log in'});
        }

        // if user is found, check password match
        const passwordMatches = await bcrypt.compare(password, user.password_hash)
        if (!passwordMatches) done(null, false, {message: 'Could not log in'});
        return done(null, user);
    }))
