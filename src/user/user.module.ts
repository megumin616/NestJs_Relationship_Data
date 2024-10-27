import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Post } from 'src/post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post])], // นำเข้า Entities ที่ต้องใช้ใน Module 
  //ในที่นี้ Profile มีการใข้ในไฟล์ใน user.service.ts จึงต้องมานำเข้าจากตรงนี้ก่อน

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]  // ส่งออก Service เผื่อใช้งานใน Module อื่น
})
export class UserModule {}
