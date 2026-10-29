import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

console.log("DB CONFIG:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  passwordIsEmpty: !process.env.DB_PASSWORD,
});

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ]
}));
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 4000),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    minVersion: "TLSv1.2",
  },
  waitForConnections: true,
  connectionLimit: 5,
});

app.get("/api/health", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS connected");

    res.json({
      message: "TiDB Cloud connected!",
      result: rows,
    });
  } catch (error) {
    console.error("Full database error:", error);

    res.status(500).json({
      message: "Database connection failed",
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      details: error.message,
    });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(products);
   } catch (error) {
    console.error("Products error:", error.code, error.message);

    res.status(500).json({
      message: "Could not fetch products",
      code: error.code,
    });
  }
});

app.post("/api/orders", async (req, res) => {
  const { customer, items } = req.body;

  if (
    !customer?.name ||
    !customer?.phone ||
    !customer?.email ||
    !customer?.address ||
    !customer?.city ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res.status(400).json({
      message: "Missing customer or product information",
    });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const total = items.reduce(
      (sum, item) =>
        sum + Number(item.price) * Number(item.quantity),
      0
    );
    
    const [generated] = await connection.query(
  "INSERT INTO order_id_generator () VALUES ()"
);

const orderId = Number(generated.insertId);
console.log("Generated order ID:", orderId);

    const [order] = await connection.execute(
      `INSERT INTO orders
       (id,customer_name, phone, email, address, city, total_amount)
       VALUES (?,?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        customer.name,
        customer.phone,
        customer.email,
        customer.address,
        customer.city,
        total,
      ]
    );
    
    for (const item of items) {
                const [generatedItem] = await connection.query(
            "INSERT INTO order_item_id_generator () VALUES ()"
          );

          console.log("Generated item result:", generatedItem);
          console.log("Generated item ID:", generatedItem.insertId);

          const itemId = generatedItem.insertId;

          if (
            itemId == null ||
            !Number.isSafeInteger(Number(itemId)) ||
            Number(itemId) <= 0
          ) {
            throw new Error("TiDB did not return a valid item ID");
          }

    
      await connection.execute(
        `INSERT INTO order_items
         (id, order_id, product_id, product_name, price,
          quantity, color, size)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          itemId,
          orderId,
          item.productId ?? null,
          item.name,
          item.price,
          item.quantity,
          item.color || null,
          item.size || null,
        ]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: "Order saved successfully",
      orderId: order.insertId,
    });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({
      message: "Could not save order",
    });
  } finally {
    connection.release();
  }
});
app.get('/', (req, res) => {
  res.send('BellaFashion API is running!');
});

app.listen(process.env.PORT || 5000, () => {
  console.log("API running on http://localhost:5000");
});
