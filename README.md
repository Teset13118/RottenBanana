# RottenBanana

# รายละเอียดโครงงาน


# เทคโนโลยีที่ใช้พัฒนา
## Frontend
- Next.js – เฟรมเวิร์กสำหรับสร้างเว็บแอปที่พัฒนาต่อยอดจาก React
- Tailwind CSS – เฟรมเวิร์กสำหรับการจัดการสไตล์
- TypeScript – ภาษาโปรแกรมที่ช่วยเพิ่มความปลอดภัยของโค้ด
## Backend
- Node.js – สภาพแวดล้อมสำหรับรัน JavaScript ฝั่งเซิร์ฟเวอร์
- Express.js – เฟรมเวิร์กสำหรับสร้าง API และจัดการเซิร์ฟเวอร์
- JWT (JSON Web Token) – กลไกสำหรับยืนยันตัวตนและกำหนดสิทธิ์การเข้าถึง
## Database
- MongoDB – เป็นฐานข้อมูล NoSQL ที่มีความยืดหยุ่นในการจัดการข้อมูล

# Dependencies
## Frontend Dependencies
- axios – ไลบรารีสำหรับทำ HTTP requests
- moment-timezone – ไลบรารีสำหรับจัดการข้อมูลเวลาในเขตเวลาต่างๆ
## Backend Dependencies
- express.js – เฟรมเวิร์กสำหรับสร้าง API และจัดการเซิร์ฟเวอร์
- JWT (JSON Web Token) – สำหรับยืนยันตัวตนและจัดการสิทธิ์การเข้าถึง
- mongoose – เชื่อมต่อและจัดการข้อมูลใน MongoDB
- bcryptjs – สำหรับการเข้ารหัสรหัสผ่าน
- dotenv – ใช้สำหรับจัดการคอนฟิกต่างๆ ที่เป็นความลับ
- moment – สำหรับการจัดการข้อมูลเวลา
- moment-timezone – สำหรับการจัดการเวลาในเขตเวลาต่างๆ
- axios – สำหรับทำ HTTP requests
- cors – สำหรับจัดการการเข้าถึงข้ามโดเมน (Cross-Origin Resource Sharing)
- nodemon – รีโหลดเซิร์ฟเวอร์อัตโนมัติระหว่างการพัฒนา

# การติดตั้งและตั้งค่า
## Frontend
1. **เข้าไปในโฟลเดอร์ Frontend**
   ```bash
   cd frontend
   ```

2. **ติดตั้ง dependencies สำหรับ Frontend จาก `package.json`**
   ```bash
   npm install
   ```

## Backend
1. **เข้าไปในโฟลเดอร์ Backend**
   ```cmd
   cd backend
   ```

2. **ติดตั้ง dependencies สำหรับ Backend จาก `package.json`**
   ```cmd
   npm install
   ```
### Environment Variables
**สร้างไฟล์ `.env` สำหรับเก็บค่าคอนฟิก ในโฟลเดอร์ Backend โดยทำการเพิ่มค่าต่อไปนี้**
   ```text
   PORT=8080
   MONGO_URL= mongodb+srv://Phum:TtpwgjO9MIl5aWZ3@database.esstt.mongodb.net/bananadb?retryWrites=true&w=majority&appName=Database
   JWT_SECRET=your_secret_key_here
   ```
   - **PORT**: กำหนดพอร์ตที่เซิร์ฟเวอร์จะรัน
   - **MONGO_URL**: URL สำหรับเชื่อมต่อ MongoDB Atlas
   - **JWT_SECRET**: รหัสที่ใช้ในกาเข้ารหัสและตรวจสอบ JWT

# API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint               | Description |
|--------|------------------------|-------------|
| POST   | `/register`   | สมัครสมาชิก |
| POST   | `h/login`      | เข้าสู่ระบบ |
| POST   | `/logout`     | ออกจากระบบ |

### 👤 Profile (`/api/user` )

| Method | Endpoint                     | Description |
|--------|------------------------------|-------------|
| GET    | `/profile`          | ดูโปรไฟล์ของตัวเอง |
| GET    | `/profile/:userId`  | ดูโปรไฟล์ของคนอื่น |
| PUT    | `/update/profile`   | แก้ไขหรือเพิ่มรายละเอียดของโปรไฟล์ |

### 🎬 Animes (`/api/anime` )

| Method | Endpoint                           | Description |
|--------|------------------------------------|-------------|
| GET    | `/season/now`           | ข้อมูลอนิเมะซีซั่นปัจจุบัน |
| GET    | `/season/2024/winter`   | ข้อมูลอนิเมะประจำปี 2024 ในฤดูหนาว |
| GET    | `/season/2024/summer`   | ข้อมูลอนิเมะประจำปี 2024 ในฤดูร้อน |
| GET    | `/season/2024/fall`     | ข้อมูลอนิเมะประจำปี 2024 ในฤดูใบไม้ร่วง |
| GET    | `/season/2024/spring`   | ข้อมูลอนิเมะประจำปี 2024 ในฤดูใบไม้ผลิ |
| GET    | `/season/upcoming`      | ข้อมูลอนิเมะที่กำลังจะมาถึงในซีซั่นต่อไป |
| GET    | `/search/:searchquery`  | หาข้อมูลของอนิเมะที่ต้องการ|
| GET    | `/:id`                  | รายละเอียดของอนิเมะเรื่องนั้นๆ |

### 📝 Reviews (`/api/review`)

| Method | Endpoint                          | Description |
|--------|-----------------------------------|-------------|
| GET    | `/getReviewList/:id`  | รีวิวทั้งหมดในอนิเมะเรื่องนั้นๆ |
| GET    | `/getUserReview/:id`  | รีวิวทั้งหมดของผู้ใช้ |
| POST   | `/postReview`         | แสดงความคิดเห็น |
| PUT    | `/updateReview/:id`   | แก้ไขความคิดเห็น |
| DELETE | `/deleteReview/:id`   | ลบความคิดเห็น |


## หน้าแรก
![image](frontend\public\bananaScore\หน้าแรก.png)

## หน้ารายละเอียดอนิเมะ
![image](frontend\public\bananaScore\หน้ารายละเอียดอนิเมะ.png)

## หน้าส่วนรีวิวอนิเมะ
![image](frontend\public\bananaScore\หน้าส่วนรีวิวอนิเมะ.png)

## หน้าโปรไฟล์
![image](frontend\public\bananaScore\หน้าโปรไฟล์.png)

## ส่วน search
![image](frontend\public\bananaScore\ส่วนsearch.png)

## หน้า login
![image](frontend\public\bananaScore\หน้าlogin.png)

## หน้า register
![image](frontend\public\bananaScore\หน้าregister.png)
