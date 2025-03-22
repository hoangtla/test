import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Clean the database
    await prisma.review.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    // Create admin user
    const adminPassword = await hash('admin123', 12);
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'ADMIN',
      },
    });

    // Create regular user
    const userPassword = await hash('user123', 12);
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: userPassword,
        role: 'USER',
      },
    });

    // Create categories
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'T-Shirts',
          products: {
            create: [
              {
                name: 'Classic White T-Shirt',
                description: 'A comfortable classic white t-shirt made from 100% cotton',
                price: 29.99,
                stock: 50,
                images: ['/images/p11-1.jpg', '/images/p11-2.jpg'],
              },
              {
                name: 'Black Graphic T-Shirt',
                description: 'Stylish black t-shirt with modern graphic design',
                price: 34.99,
                stock: 30,
                images: ['/images/p12-1.jpg', '/images/p12-2.jpg'],
              },
            ],
          },
        },
      }),
      prisma.category.create({
        data: {
          name: 'Jeans',
          products: {
            create: [
              {
                name: 'Classic Blue Jeans',
                description: 'Classic fit blue jeans perfect for any occasion',
                price: 79.99,
                stock: 40,
                images: ['/images/p21-1.jpg', '/images/p21-2.jpg'],
              },
              {
                name: 'Slim Fit Black Jeans',
                description: 'Modern slim fit black jeans with stretch comfort',
                price: 89.99,
                stock: 35,
                images: ['/images/p22-1.jpg', '/images/p22-2.jpg'],
              },
            ],
          },
        },
      }),
      prisma.category.create({
        data: {
          name: 'Shoes',
          products: {
            create: [
              {
                name: 'Classic Sneakers',
                description: 'Comfortable everyday sneakers with great support',
                price: 99.99,
                stock: 25,
                images: ['/images/p31-1.jpg', '/images/p31-2.jpg'],
              },
              {
                name: 'Running Shoes',
                description: 'High-performance running shoes with advanced cushioning',
                price: 129.99,
                stock: 20,
                images: ['/images/p32-1.jpg', '/images/p32-2.jpg'],
              },
            ],
          },
        },
      }),
    ]);

    console.log('Seed data created successfully');
    console.log('Admin user:', admin.email);
    console.log('Regular user:', user.email);
    console.log('Categories:', categories.map(c => c.name).join(', '));
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 