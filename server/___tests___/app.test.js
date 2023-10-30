const { app } = require("../app");
const { sequelize } = require("../models/index");
const { hash } = require("../helpers/hash");
const request = require("supertest");

let access_token;
let access_token_admin;

beforeAll(async () => {
  const users = require("../data/user.json").map((user) => {
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.password = hash(user.password);
    return user;
  });

  const companies = require("../data/company.json").map((company) => {
    company.createdAt = new Date();
    company.updatedAt = new Date();
    return company;
  });

  const jobs = require("../data/job.json").map((job) => {
    job.createdAt = new Date();
    job.updatedAt = new Date();
    return job;
  });

  const pubUsers = require("../data/pubuser.json").map((pubUser) => {
    pubUser.createdAt = new Date();
    pubUser.updatedAt = new Date();
    return pubUser;
  });

  await sequelize.queryInterface.bulkInsert("Users", users);
  await sequelize.queryInterface.bulkInsert("Companies", companies);
  await sequelize.queryInterface.bulkInsert("Jobs", jobs);
  await sequelize.queryInterface.bulkInsert("PubUsers", pubUsers);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  await sequelize.queryInterface.bulkDelete("Companies", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  await sequelize.queryInterface.bulkDelete("Jobs", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  await sequelize.queryInterface.bulkDelete("PubUsers", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe("# Register Customer, perlu melakukan pengecekan pada status dan response ketika", () => {
  test("[ ] Berhasil register (role customer)", async () => {
    const body = {
      email: "yusuf@gmail.com",
      password: "hahahehe",
      role: "customer",
    };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("role", expect.any(String));
    expect(response.body).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("token", expect.any(String));
  });

  test("[ ] Email tidak diberikan / tidak diinput", async () => {
    const body = { password: "hahahehe" };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required !");
  });

  test("[ ] Password tidak diberikan / tidak diinput", async () => {
    const body = { email: "yusuf@gmail.com" };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required !");
  });

  test("[ ] Email diberikan string kosong", async () => {
    const body = { email: "", password: "hahahehe" };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required !");
  });

  test("[ ] Password diberikan string kosong", async () => {
    const body = { email: "yusuf@gmail.com", password: "" };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required !");
  });

  test("[ ] Format Email salah / invalid", async () => {
    const body = {
      email: "yusuf.com",
      password: "hahahehe",
    };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid email !");
  });

  test("[ ] Email sudah terdaftar", async () => {
    const body = {
      email: "yusuf@gmail.com",
      password: "hahahehe",
    };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Email already register !");
  });
});

describe("Login Customer, perlu melakukan pengecekan pada status dan response ketika", () => {
  test("[ ] Berhasil login role customer", async () => {
    const body = {
      email: "yusuf@gmail.com",
      password: "hahahehe",
    };
    const response = await request(app).post("/public/login").send(body);

    access_token = response.body.token;

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("role", expect.any(String));
    expect(response.body).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("token", expect.any(String));
  });

  test("[ ] Memberikan password yang salah", async () => {
    const body = {
      email: "yusuf@gmail.com",
      password: "hahaheheSALAH",
    };
    const response = await request(app).post("/public/login").send(body);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password !"
    );
  });

  test("[ ] Email yang diinput tidak terdaftar di database", async () => {
    const body = {
      email: "yusufSalah@gmail.com",
      password: "hahaheheSALAH",
    };
    const response = await request(app).post("/public/login").send(body);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password !"
    );
  });
});

describe("# GET Entity", () => {
  test("[ ] Berhasil mendapatkan Entitas Utama (tanpa access_token) tanpa menggunakan query filter parameter", async () => {
    const response = await request(app).get("/public/jobs");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.data[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body.data[0]).toHaveProperty("title", expect.any(String));
    expect(response.body.data[0]).toHaveProperty(
      "description",
      expect.any(String)
    );
    expect(response.body.data[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body.data[0]).toHaveProperty(
      "companyId",
      expect.any(Number)
    );
    expect(response.body.data[0]).toHaveProperty(
      "authorId",
      expect.any(Number)
    );
    expect(response.body.data[0]).toHaveProperty("jobType", expect.any(String));
    expect(response.body.data[0]).toHaveProperty("status", expect.any(String));
  });

  test("[ ] Berhasil mendapatkan Entitas Utama (tanpa access_token) dengan 1 query filter parameter", async () => {
    const response = await request(app).get("/public/jobs?search=nurse");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.data[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body.data[0]).toHaveProperty("title", expect.any(String));
    expect(response.body.data[0]).toHaveProperty(
      "description",
      expect.any(String)
    );
    expect(response.body.data[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body.data[0]).toHaveProperty(
      "companyId",
      expect.any(Number)
    );
    expect(response.body.data[0]).toHaveProperty(
      "authorId",
      expect.any(Number)
    );
    expect(response.body.data[0]).toHaveProperty("jobType", expect.any(String));
    expect(response.body.data[0]).toHaveProperty("status", expect.any(String));
  });

  test("[ ] Berhasil mendapatkan  Entitas Utama serta panjang yang sesuai (tanpa access_token) ketika memberikan page tertentu (cek paginationnya)", async () => {
    const response = await request(app).get("/public/jobs?page=2");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.data.length).toBe(6);
    expect(response.body.data[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body.data[0]).toHaveProperty("title", expect.any(String));
    expect(response.body.data[0]).toHaveProperty(
      "description",
      expect.any(String)
    );
    expect(response.body.data[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body.data[0]).toHaveProperty(
      "companyId",
      expect.any(Number)
    );
    expect(response.body.data[0]).toHaveProperty(
      "authorId",
      expect.any(Number)
    );
    expect(response.body.data[0]).toHaveProperty("jobType", expect.any(String));
    expect(response.body.data[0]).toHaveProperty("status", expect.any(String));
  });

  test("[ ] Berhasil mendapatkan 1  Entitas Utama sesuai dengan params id yang diberikan", async () => {
    const response = await request(app).get("/public/jobs/2");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("title", expect.any(String));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body).toHaveProperty("companyId", expect.any(Number));
    expect(response.body).toHaveProperty("authorId", expect.any(Number));
    expect(response.body).toHaveProperty("jobType", expect.any(String));
    expect(response.body).toHaveProperty("status", expect.any(String));
  });

  test("[ ] Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid", async () => {
    const response = await request(app).get("/public/jobs/100");
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "404 Data Not Found");
  });
});

describe("# Bookmark", () => {
  test("[ ] Berhasil menambahkan bookmark dengan id yang sesuai", async () => {
    const response = await request(app)
      .post("/public/bookmark/2")
      .set("access_token", access_token);
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("PubUserId", expect.any(Number));
    expect(response.body).toHaveProperty("JobId", expect.any(Number));
  });

  test("[ ] Gagal menambahkan bookmark karena id entity yang dikirim tidak terdapat di database", async () => {
    const response = await request(app)
      .post("/public/bookmark/10000")
      .set("access_token", access_token);
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "Job not found");
  });

  test("[ ] Berhasil mendapatkan list bookmark / favorite sesuai dengan user yang login", async () => {
    const response = await request(app)
      .get("/public/bookmark")
      .set("access_token", access_token);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("PubUserId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("JobId", expect.any(Number));
  });

  test("[ ] Gagal mendapatkan list bookmark / favorite karena belum login", async () => {
    const response = await request(app).get("/public/bookmark");
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("[ ] Gagal mendapatkan list bookmark / favorite karena token yang diberikan tidak valid (random string)", async () => {
    const response = await request(app)
      .post("/public/bookmark/2")
      .set("access_token", "abc");
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });
});
