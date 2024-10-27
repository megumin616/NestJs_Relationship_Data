import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { CreateCourseDto } from 'src/course/dto/create-course.dto';
import { Course } from 'src/course/entities/course.entity';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  //หา course ของ student  (:id/ อันนี้คือไอดีของ student)
  @Get(':id/course')
  findOne(@Param('id') id: number): Promise<Student> {
    return this.studentService.findCoursesByStudentId(id);
  }

  //สร้างฟังก์ชันใน Controller เพื่อให้ Student สามารถเพิ่ม Course ได้  (:courseId/ อันนี้คือไอดีของ course)
  @Post(':id/course/:courseId')  // ตั้งชื่อ route สำหรับการเพิ่ม course ให้กับนักเรียน
  async addCourse(
    @Param('id') id: string,  // รับ id ของนักเรียนจาก URL
    @Param('courseId') courseId: string,
  ): Promise<Course> {
    return this.studentService.addCourseToStudent(+id, +courseId); // เรียก service เพื่อเพิ่ม course
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
