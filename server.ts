import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const db = new Database("database.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed initial settings if empty
const settingsCount = db.prepare("SELECT COUNT(*) as count FROM settings").get() as { count: number };
if (settingsCount.count === 0) {
  const stmt = db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)");
  stmt.run("site_name", "에이치제이스틸 주식회사");
  stmt.run("hero_title", "엘리베이터 가이드 레일");
  stmt.run("hero_subtitle", "최고 품질의 가이드레일과 철강 솔루션을 제공하는 신뢰의 파트너");
  stmt.run("hero_image_url", "https://search.pstatic.net/common/?src=https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F5938_000_1%2F20210115122534197_4TJWPILP5.png%2Fdh2_h_298_i1.png%3Ftype%3Dm4500_4500_fst_n&type=sc960_832");
  stmt.run("phone_number", "010-3305-4211");
  stmt.run("contact_email", "trap4211@naver.com");
  stmt.run("office_address", "경기도 고양시 일산동구 백석로175");
  stmt.run("primary_color", "#8B5CF6"); // Purple
  stmt.run("product_img_1", "http://www.taejongsteel.co.kr/images/img-product-0601.png");
  stmt.run("product_img_2", "http://www.taejongsteel.co.kr/images/img-product-0601.png");
  stmt.run("product_img_3", "http://www.taejongsteel.co.kr/images/img-product-0601.png");
  stmt.run("banner_image_url", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600");
}

// Seed initial posts if empty
const postsCount = db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number };
if (postsCount.count === 0) {
  const stmt = db.prepare("INSERT INTO posts (title, content, category, image_url) VALUES (?, ?, ?, ?)");
  stmt.run(
    "대량 생산 및 공급 시스템",
    "체계적인 생산 라인과 엄격한 품질 관리를 통해 대규모 프로젝트에도 안정적인 제품 공급이 가능합니다.",
    "Supply",
    "http://www.taejongsteel.co.kr/images/img-product-0601.png"
  );
  stmt.run(
    "고정밀 가이드레일 (T-Type)",
    "최고의 정밀도와 내구성을 자랑하는 표준 T형 가이드레일입니다. 엘리베이터의 부드러운 주행을 보장합니다.",
    "Product",
    "http://www.daejooent.co.kr/images/sub/business/e01.jpg"
  );
  stmt.run(
    "오메가(Ω) 타입 가이드레일",
    "특수 용도 및 균형추(Counter Weight)용으로 사용되는 고품질 오메가 타입 레일입니다.",
    "Product",
    "http://www.taejongsteel.co.kr/images/img-product-0601.png"
  );
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // API Routes
  app.get("/api/posts", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();
    res.json(posts);
  });

  app.post("/api/posts", (req, res) => {
    const { title, content, category, image_url } = req.body;
    const stmt = db.prepare("INSERT INTO posts (title, content, category, image_url) VALUES (?, ?, ?, ?)");
    const info = stmt.run(title, content, category, image_url);
    res.json({ id: info.lastInsertRowid });
  });

  app.put("/api/posts/:id", (req, res) => {
    const { title, content, category, image_url } = req.body;
    const { id } = req.params;
    const stmt = db.prepare("UPDATE posts SET title = ?, content = ?, category = ?, image_url = ? WHERE id = ?");
    stmt.run(title, content, category, image_url, id);
    res.json({ success: true });
  });

  app.delete("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM posts WHERE id = ?").run(id);
    res.json({ success: true });
  });

  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  });

  app.use("/uploads", express.static(uploadsDir));

  app.get("/api/settings", (req, res) => {
    const rows = db.prepare("SELECT * FROM settings").all() as { key: string, value: string }[];
    const settings = rows.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
    res.json(settings);
  });

  app.post("/api/settings", (req, res) => {
    const settings = req.body;
    const stmt = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    for (const [key, value] of Object.entries(settings)) {
      stmt.run(key, value);
    }
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
