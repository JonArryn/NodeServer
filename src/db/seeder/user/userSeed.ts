import {PrismaClient} from '@prisma/generated/client';

const prisma = new PrismaClient();

export const seedUsers = async () => {
    await prisma.user.upsert({
        where: {email: 'alice@prisma.io'},
        update: {},
        create: {
            email: 'alice@prisma.io',
            first_name: 'Alice',
            password_hash: '12345678',
            posts: {
                create: {
                    title: 'Check out Prisma with Next.js',
                    content: 'https://www.prisma.io/nextjs',
                    published: true,
                },
            },
        },
    })

    await prisma.user.upsert({
        where: {email: 'bob@prisma.io'},
        update: {},
        create: {
            email: 'bob@prisma.io',
            first_name: 'Bob',
            password_hash: '12345678',
            posts: {
                create: [
                    {
                        title: 'Follow Prisma on Twitter',
                        content: 'https://twitter.com/prisma',
                        published: true,
                    },
                    {
                        title: 'Follow Nexus on Twitter',
                        content: 'https://twitter.com/nexusgql',
                        published: true,
                    },
                ],
            },
        },
    })
};
