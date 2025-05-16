# ใช้ Node.js base image
FROM node:18

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์โปรเจกต์ทั้งหมด
COPY . .

# ตั้งค่า port ที่ Railway จะใช้
EXPOSE 3002

# คำสั่งรันโปรเจกต์
CMD ["npm", "start"]