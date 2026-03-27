# 2-oy imtixon

## 📝 Blog Platform API 

---

## 🎯 Maqsad

Quyidagilarni mavzularni ishlatish kerak:

* Express.js yordamida API yozish
* PostgreSQL bilan ishlash
* Tablelar orasida bog‘lanish qilish
* CRUD amallarini bajarish
* Filter, search, sort va pagination ishlatish

---

## 🧑‍💻 1. Users (Foydalanuvchilar)

### Endpointlar:

* POST /users → yangi user qo‘shish
* GET /users → barcha userlar
* GET /users/:id → bitta user

### Fieldlar:

* name
* email (**unique bo‘lishi shart**)

---

## 📝 2. Posts (Maqolalar)

### Endpointlar:

* POST /posts
* GET /posts
* GET /posts/:id
* PUT /posts/:id
* DELETE /posts/:id

### Fieldlar:

* title
* content
* user_id (post egasi)

---

## 💬 3. Comments (Izohlar)

### Endpointlar:

* POST /comments
* GET /posts/:id/comments
* DELETE /comments/:id

### Fieldlar:

* text
* post_id
* user_id

---

## ❤️ 4. Likes (Layklar)

### Endpointlar:

* POST /posts/:id/like
* DELETE /posts/:id/like

### Qoidalar:

* 1 user 1 ta postga faqat 1 marta like bosishi mumkin

---

## 🔗 5. Bog‘lanishlar (Relation)

* 1 user → ko‘p post
* 1 post → ko‘p comment
* comment → userga tegishli

### Qo'shimcha Endpointlar:

* GET /users/:id/posts
* GET /posts/:id/comments
* GET /posts/:id/likes-count
* GET /users/:id/posts-count

---

## 🔍 6. Qidiruv va Filter

* GET /posts?page=1&limit=10
* GET /posts?search=word
* GET /posts?author=1
* GET /posts?sortOrder=desc&sortBy=title

---

## 🗄 Database Structure

### users

```
id SERIAL PRIMARY KEY
name VARCHAR(100)
email VARCHAR(100) UNIQUE
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### posts

```
id SERIAL PRIMARY KEY
title VARCHAR(255)
content TEXT
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### comments

```
id SERIAL PRIMARY KEY
text TEXT
post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE
user_id INTEGER REFERENCES users(id)
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### likes

```
user_id INTEGER
post_id INTEGER
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
PRIMARY KEY(user_id, post_id)
```


---

## 🧮 Baholash mezoni (100 ball)

### 1. CRUD ishlashi – 30 ball

* Posts → 15
* Comments → 15

---

### 2. Relation ishlashi – 25 ball

* user-post → 10
* post-comment → 10
* like relation → 5

---

### 3. Database design – 15 ball

* foreign key → 10
* unique constraint → 5

---

### 4. Filter / Search / Pagination / Sort – 10 ball

* search va pagination → 5
* filter va sort → 5

---

### 5. Code sifati – 10 ball

* structure → 5
* readable code → 5

---

### 6. Validation va Error handling – 10 ball

* validation → 5
* error handling → 5

---

🔥 Barchaga Omad!