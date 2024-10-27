import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlCongif } from 'mysqlConfig';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [TypeOrmModule.forRoot(mysqlCongif), UserModule, ProfileModule, PostModule, StudentModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
