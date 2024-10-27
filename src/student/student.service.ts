import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = await this.studentRepository.create(createStudentDto);
    return await this.studentRepository.save(student);
  }

  findAll() {
    return this.studentRepository.find();
  }

  async findCoursesByStudentId(id: number): Promise<Student> {
    return await this.studentRepository.findOne({where: {id}, relations: ['courses']});
  }

  //เพิ่ม course ไปยัง student
  async addCourseToStudent(id: number, courseId: number): Promise<Course> {
    // ค้นหานักเรียน
    const student = await this.studentRepository.findOne({where: {id: id}, relations: ['courses'] });
    if (!student) {
      throw new NotFoundException('Student not found'); // ถ้านักเรียนไม่พบให้โยน Exception
    }

    // ค้นหาคอร์สที่ต้องการเพิ่ม
    const course = await this.courseRepository.findOne({where: {id: courseId}});
    if (!course) {
      throw new NotFoundException('Course not found'); // ถ้าคอร์สไม่พบให้โยน Exception
    }

    // เพิ่มคอร์สให้กับนักเรียน
    student.courses.push(course); // เพิ่มคอร์สใน array courses ของนักเรียน

    // บันทึกการเปลี่ยนแปลง
    await this.studentRepository.save(student); 

    return course; // คืนค่าคอร์สที่ถูกเพิ่ม
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
