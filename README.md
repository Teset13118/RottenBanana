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
   MONGO_URL=mongodb://localhost:27017/bananadb
   JWT_SECRET=your_secret_key_here
   ```
   - **PORT**: กำหนดพอร์ตที่เซิร์ฟเวอร์จะรัน
   - **MONGO_URL**: URL สำหรับเชื่อมต่อ MongoDB
   - **JWT_SECRET**: รหัสที่ใช้ในกาเข้ารหัสและตรวจสอบ JWT

