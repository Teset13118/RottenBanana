# RottenBanana

# รายละเอียดโครงงาน
### ความเป็นมาของโครงงาน
ปัจจุบันการรีวิวภาพยนตร์เป็นสิ่งที่ได้รับความนิยมอย่างแพร่หลาย ไม่ว่าจะเป็นบนเว็บไซต์รีวิวหรือแพลตฟอร์มโซเชียลมีเดียต่าง ๆ ซึ่งช่วยให้ผู้ชมสามารถตัดสินใจเลือกชมภาพยนตร์ได้ง่ายขึ้นจากความคิดเห็นและคะแนนของผู้ที่เคยรับชม อย่างไรก็ตาม อนิเมะซึ่งเป็นอีกหนึ่งสื่อบันเทิงที่ได้รับความนิยม กลับพบว่ามีแพลตฟอร์มหรือระบบรีวิวที่เข้าถึงได้น้อยกว่าภาพยนตร์ทั่วไป

โครงงานนี้มีเป้าหมายเพื่อรวบรวมความคิดเห็นจากผู้ชมที่มีต่ออนิเมะในแต่ละเรื่อง ทำให้ผู้ที่สนใจสามารถเข้ามาดูความคิดเห็นของผู้ชมทั่วไปได้ง่ายขึ้น อีกทั้งยังช่วยให้ผู้ที่กำลังมองหาอนิเมะใหม่ ๆ สามารถใช้รีวิวและคะแนนเป็นแนวทางในการตัดสินใจเลือกชมเรื่องที่ตรงกับความสนใจของตนเองมากที่สุด นอกจากนี้ ระบบรีวิวยังสามารถเป็นช่องทางในการแลกเปลี่ยนความคิดเห็นระหว่างผู้ชมที่มีความชอบคล้ายกันได้อีกด้วย



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
- MongoDB Atlas – บริการฐานข้อมูล NoSQL บน Cloud ที่ยืดหยุ่น ปลอดภัย และจัดการง่าย
## API Integration
- Jikan API – API ที่ใช้ในการดึงข้อมูลอนิเมะจาก MyAnimeList ถูกนำมาใช้ในโปรเจกต์นี้เพื่อให้ผู้ใช้สามารถค้นหาข้อมูลและรีวิวอนิเมะได้.

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
1. **เปิด Command Prompt แล้วเข้าไปในโฟลเดอร์ Frontend**
   ```bash
   cd frontend
   ```

2. **ติดตั้ง dependencies สำหรับ Frontend จาก `package.json`**
   ```bash
   npm install
   ```

## Backend
1. **เปิด Commmand Prompt อีกอันแล้วเข้าไปในโฟลเดอร์ Backend**
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
## Run application
1. **หากยังไม่ได้เข้าไปยังโฟลเดอร์ของ Frontend และ Backend ให้ทำการเปิด Command Prompt ขึ้นมาสองอันแล้วทำการ `cd` เข้าไปทั้งสองโฟลเดอร์**
```cmd
   cd frontend
```
```cmd
   cd backend
```
2. **เขียนคำสั่งนี้ใน Command Prompt ทั้งส่วนของ Frontend และ Backend เพื่อเริ่มใช้งาน**
```cmd
   npm run dev
```
3. หาก Backend เชื่อมกัยฐานข้อมูลสำเร็จจะขึ้นข้อความแบบนี้
```cmd
   Database connection is Ready and Server is Listening on Port  8080
```
4. หาก Fronnted รันสำเร็จให้เข้าไปที่
```cmd
   http://localhost:3000/
```
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
![image](https://github.com/Teset13118/RottenBanana/blob/b6c34b18b0dcb42c3d0556cf68efbd2c3f6ae3af/frontend/public/bananaScore/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%81%E0%B8%A3%E0%B8%81.png)

## หน้ารายละเอียดอนิเมะ
![image](https://github.com/Teset13118/RottenBanana/blob/b6c34b18b0dcb42c3d0556cf68efbd2c3f6ae3af/frontend/public/bananaScore/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%B0%E0%B9%80%E0%B8%AD%E0%B8%B5%E0%B8%A2%E0%B8%94%E0%B8%AD%E0%B8%99%E0%B8%B4%E0%B9%80%E0%B8%A1%E0%B8%B0.png)

## หน้าส่วนรีวิวอนิเมะ
![image](https://github.com/Teset13118/RottenBanana/blob/00465f9b18bac5c0046a8406d80a734de56dfc5b/frontend/public/bananaScore/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%A3%E0%B8%B5%E0%B8%A7%E0%B8%B4%E0%B8%A7%E0%B8%AD%E0%B8%99%E0%B8%B4%E0%B9%80%E0%B8%A1%E0%B8%B0.png)

## หน้าโปรไฟล์
![image](https://github.com/Teset13118/RottenBanana/blob/b6c34b18b0dcb42c3d0556cf68efbd2c3f6ae3af/frontend/public/bananaScore/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C.png)

## ส่วน search
![image](https://github.com/Teset13118/RottenBanana/blob/b6c34b18b0dcb42c3d0556cf68efbd2c3f6ae3af/frontend/public/bananaScore/%E0%B8%AA%E0%B9%88%E0%B8%A7%E0%B8%99search.png)

## หน้า login
![image](https://github.com/Teset13118/RottenBanana/blob/b6c34b18b0dcb42c3d0556cf68efbd2c3f6ae3af/frontend/public/bananaScore/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2login.png)

## หน้า register
![image](https://github.com/Teset13118/RottenBanana/blob/b6c34b18b0dcb42c3d0556cf68efbd2c3f6ae3af/frontend/public/bananaScore/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2register.png)
