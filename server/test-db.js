import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

console.log("Host:", process.env.DB_HOST);
console.log("Port:", process.env.DB_PORT);
console.log("User:", JSON.stringify(process.env.DB_USER));
console.log("Database:", process.env.DB_NAME);
console.log(
  "Password empty:",
  !process.env.DB_PASSWORD
);

try {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
  });

  console.log("SUCCESS: Node.js connected to MariaDB!");

  const [rows] = await connection.query(
    "SELECT USER() AS connected_user, CURRENT_USER() AS authenticated_user"
  );

  console.log(rows);

  await connection.end();
} catch (error) {
  console.error("ERROR CODE:", error.code);
  console.error("ERROR MESSAGE:", error.message);
}