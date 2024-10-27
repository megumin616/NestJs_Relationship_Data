import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = await this.courseRepository.create(createCourseDto);
    return await this.courseRepository.save(course);
  }

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
