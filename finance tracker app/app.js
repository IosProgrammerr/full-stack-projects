const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const app = express();
/* -------------------- MIDDLEWARE -------------------- */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
/* -------------------- EJS SETUP -------------------- */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
/* -------------------- MYSQL CONNECTION -------------------- */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Intel@12345",
  database: "expence-tracker",
});
db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("MySQL connected");
  }
});
/* -------------------- ROUTES -------------------- */
// Home (static HTML)------------------ 
app.get("/home", (req, res) => {
  const sql1 = `
    SELECT 
      SUM(total_amo) AS total_expense
    FROM transactions_record
    WHERE form_type = 'expense'
  `;

  const sql2 = `
    SELECT 
      SUM(total_amo) AS total_income
    FROM transactions_record
    WHERE form_type = 'income'
  `;
  const sql3 = `
    SELECT 
      id,
      transaction_name,
      total_amo
    FROM transactions_record
    ORDER BY id DESC
    LIMIT 3;
    `;
  db.query(sql1, (err, totalResultExpence) => {
    if (err) {
      console.error("Total expense error:", err);
      return res.status(500).send("Database error");
    }

    db.query(sql2, (err, totalResultIncome) => {
      if (err) {
        console.error("Total income error:", err);
        return res.status(500).send("Database error");
      }
      db.query(sql3, (err, recentTransactions) => {
        if (err) {
          console.error("Recent transactions error:", err);
          return res.status(500).send("Database error");
        }

        res.render("index", {
          total_income: totalResultIncome[0].total_income || 0,
          total_expense: totalResultExpence[0].total_expense || 0,
          recent_transactions: recentTransactions,
        });
      });
    });
  });
});
// Transaction form page
app.get("/transaction_page", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "transaction_page.html"));
});
/* -------------------- INSERT DATA -------------------- */
app.post("/submit-form", (req, res) => {
  const {
    form_type,
    transaction_name,
    transaction_date,
    total_amo,
    currency_type,
    category,
    description,
    user,
  } = req.body;

  const sql = `
    INSERT INTO transactions_record
    (form_type, transaction_name, transaction_date, total_amo, currency_type, category, description, user)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.execute(
    sql,
    [
      form_type,
      transaction_name,
      transaction_date,
      total_amo,
      currency_type,
      category,
      description,
      user ?? null,
    ],
    (err, result) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).send("Database error");
      }

      console.log("Inserted ID:", result.insertId);
      res.redirect("/home");
    },
  );
});
/* --------------------  INCOME -------------------- */
app.get("/income", (req, res) => {
  const sql1 = `
    SELECT 
    id,
      transaction_name AS type,
      total_amo AS amount,
      DATE_FORMAT(transaction_date, '%Y-%m-%d') AS date,
      description,
      category
    FROM transactions_record
    WHERE form_type = 'income'
    ORDER BY transaction_date DESC
  `;

  const sql2 = `
    SELECT 
      SUM(total_amo) AS total_income
    FROM transactions_record
    WHERE form_type = 'income'
  `;

  const sql3 = `
    SELECT 
      category,
      SUM(total_amo) AS category_total
    FROM transactions_record
    WHERE form_type = 'income'
    GROUP BY category
  `;

  db.query(sql1, (err, incomeRows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    db.query(sql2, (err, totalResult) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Database error");
      }

      db.query(sql3, (err, categoryResult) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Database error");
        }

        //  ONE render, all data passed together
        res.render("income", {
          all_income: incomeRows,
          total_income: totalResult[0].total_income,
          group_income: categoryResult,
        });
      });
    });
  });
});
/* -------------------- expence PAGE -------------------- */
app.get("/expence", (req, res) => {
  const sql1 = `
    SELECT 
      id,
      transaction_name AS etype,
      total_amo AS eamount,
      DATE_FORMAT(transaction_date, '%Y-%m-%d') AS edate,
      description AS edescription,
      category AS ecategory
    FROM transactions_record
    WHERE form_type = 'expense'
    ORDER BY transaction_date DESC
  `;

  const sql2 = `
    SELECT 
      SUM(total_amo) AS total_expense
    FROM transactions_record
    WHERE form_type = 'expense'
  `;

  const sql3 = `
    SELECT 
      category AS ecategory,
      SUM(total_amo) AS ecategory_total
    FROM transactions_record
    WHERE form_type = 'expense'
    GROUP BY category
  `;
  db.query(sql1, (err, expenseRows) => {
    if (err) {
      console.error("Expense list error:", err);
      return res.status(500).send("Database error");
    }

    db.query(sql2, (err, totalResult) => {
      if (err) {
        console.error("Total expense error:", err);
        return res.status(500).send("Database error");
      }

      db.query(sql3, (err, categoryResult) => {
        if (err) {
          console.error("Category expense error:", err);
          return res.status(500).send("Database error");
        }

        res.render("expence", {
          all_expence: expenseRows,
          total_expence: totalResult[0].total_expense || 0,
          group_expence: categoryResult,
        });
      });
    });
  });
});
/* -------------------------------------------------------- */
/* -------------------- calender PAGE -------------------- */
app.get("/calender", (req, res) => {
  const selectedDate = req.query.inpt_cdate;

  // 🚫 No date selected → show empty page
  if (!selectedDate) {
    return res.render("calender", {
      transactions: [],
      selectedDate: null,
    });
  }

  // ✅ Date selected → fetch ONLY matching rows
  const sql = `
    SELECT
      form_type,
      transaction_name,
      DATE_FORMAT(transaction_date, '%Y-%m-%d') AS transaction_date,
      total_amo,
      category,
      description
    FROM transactions_record
    WHERE DATE(transaction_date) = ?
    ORDER BY transaction_date DESC
  `;

  db.query(sql, [selectedDate], (err, rows) => {
    if (err) {
      console.error("Calender date filter error:", err);
      return res.status(500).send("Database error");
    }

    res.render("calender", {
      transactions: rows,
      selectedDate,
    });
  });


  });
  // Delete transaction by id
  app.delete("/transactions/:id", (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    const delSql = `DELETE FROM transactions_record WHERE id = ?`;
    db.execute(delSql, [id], (err, result) => {
      if (err) {
        console.error("Delete error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      return res.json({ deletedId: id });
    });
  });
/* -------------------- SERVER -------------------- */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
