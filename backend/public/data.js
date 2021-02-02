var bcrypt = require("bcryptjs");

const data = {
  users: [
    {
      name: "Rafid",
      email: "admin@example.com",
      password: bcrypt.hashSync("password", 8),
      isAdmin: true,
    },
    {
      name: "Kathy",
      email: "user@example.com",
      password: bcrypt.hashSync("password", 8),
      isAdmin: false,
    },
  ],

  products: [
    {
      title: "Nike slim shirt",
      category: "Shirts",
      image: "/images/p1.jpg",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quality shirt",
    },
    {
      title: "Adidas shirt",
      category: "Shirts",
      image: "/images/p2.jpg",
      price: 100,
      countInStock: 20,
      brand: "Adidas",
      rating: 4,
      numReviews: 8,
      description: "high quality shirt",
    },
    {
      title: "Lacoste shirt",
      category: "Shirts",
      image: "/images/p3.jpg",
      price: 150,
      countInStock: 0,
      brand: "Nike",
      rating: 5,
      numReviews: 17,
      description: "high quality shirt",
    },
    {
      title: "Nike slim pants",
      category: "Pants",
      image: "/images/p4.jpg",
      price: 79.99,
      countInStock: 25,
      brand: "Nike",
      rating: 4.5,
      numReviews: 11,
      description: "high quality pants",
    },
    {
      title: "Adidas pants",
      category: "pants",
      image: "/images/p5.jpg",
      price: 100,
      countInStock: 15,
      brand: "Adidas",
      rating: 4,
      numReviews: 8,
      description: "high quality pants",
    },
    {
      title: "Lacoste pants",
      category: "pants",
      image: "/images/p6.jpg",
      price: 150,
      countInStock: 10,
      brand: "Nike",
      rating: 5,
      numReviews: 17,
      description: "high quality pants",
    },
  ],
};

module.exports = { data };
