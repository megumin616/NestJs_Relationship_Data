import { Course } from "src/course/entities/course.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    
    //นักเรียนหลายคนสามารถเรียนหลายวิชา และวิชาหนึ่งสามารถมีนักเรียนหลายคนเรียนได้เช่นกัน
    @ManyToMany(() => Course, (course) => course.students, {cascade: true})
    //เมื่อตั้งค่า cascade: true ไว้ มันหมายความว่าเมื่อคุณบันทึก (create หรือ update) เอนทิตีหลัก (เช่น นักเรียน) 
    //ถ้ามีการอ้างอิงถึงเอนทิตีที่เชื่อมโยง (เช่น วิชา) ก็จะทำให้ข้อมูลในเอนทิตีที่เชื่อมโยงนั้นถูกบันทึกไปด้วยโดยอัตโนมัติ

    // (course) => course.students สื่อว่าในเอนทิตี Course จะมีคุณสมบัติที่เรียกว่า students ซึ่งเก็บนักเรียนที่เรียนในวิชานั้นๆ

    @JoinTable() // สร้างตารางเชื่อมโยง
    /* เมื่อเราใช้ @JoinTable ในเอนทิตีหนึ่ง (เช่น Student), TypeORM 
    จะทำการสร้างตารางใหม่ในฐานข้อมูลที่ใช้เก็บข้อมูลความสัมพันธ์ระหว่างเอนทิตีทั้งสอง */
    // /ตาราง students_courses (ชื่อสามารถตั้งได้ตามต้องการ) จะมีคอลัมน์สองคอลัมน์แบบนี้
        //     studentId: รหัสของนักเรียน
        //     courseId: รหัสของวิชา

    courses: Course[];
    // courses: Course[]; ตัวแปรนี้เก็บรายการของวิชาที่นักเรียนเรียนอยู่ โดยใช้ชนิดข้อมูลเป็นอาร์เรย์ของ Course 
    //หมายความว่านักเรียนสามารถมีวิชาหลายวิชาได้
}
