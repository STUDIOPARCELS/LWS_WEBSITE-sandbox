const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const editsDir = path.join(root, "edits");
const latestEditsPath = path.join(editsDir, "latest-edits.json");
const port = Number(process.env.PORT || 4174);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 5_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function safeStaticPath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const relativePath = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
  const filePath = path.resolve(root, relativePath);
  return filePath.startsWith(root) ? filePath : null;
}

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET" && requestUrl.pathname === "/api/latest-edits") {
      if (!fs.existsSync(latestEditsPath)) {
        return send(res, 404, "{}", "application/json; charset=utf-8");
      }
      return send(res, 200, fs.readFileSync(latestEditsPath), "application/json; charset=utf-8");
    }

    if (req.method === "POST" && requestUrl.pathname === "/api/save-edits") {
      const body = await readBody(req);
      const snapshot = JSON.parse(body);
      fs.mkdirSync(editsDir, { recursive: true });
      fs.writeFileSync(latestEditsPath, JSON.stringify(snapshot, null, 2));
      return send(res, 200, JSON.stringify({ ok: true }), "application/json; charset=utf-8");
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      return send(res, 405, "Method not allowed");
    }

    const filePath = safeStaticPath(requestUrl.pathname);
    if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      return send(res, 404, "Not found");
    }

    const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    send(res, 500, error.message || "Server error");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Local editor running at http://127.0.0.1:${port}/?edit=1&import-edits=1`);
});
