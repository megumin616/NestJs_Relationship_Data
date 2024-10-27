import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async createPostByUser(createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.userRepository.findOne({ where: {id: createPostDto.userId}}); //where คือการระบุเงื่อนไขที่จะหาข้อมุล
    if(!user) {
      throw new Error("User not found");
    }

    const post = await this.postRepository.create({
      ...createPostDto,
      user,
    });

    return await this.postRepository.save(post);
  }

  async findAll() {
    return await this.postRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
