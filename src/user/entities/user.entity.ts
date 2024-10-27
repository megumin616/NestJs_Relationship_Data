import { Post } from "src/post/entities/post.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => Profile)
    @JoinColumn() // บอกว่าให้เก็บ id ของ Profile ในตาราง User
    profile: Profile;

    @OneToMany(() => Post, (post) => post.user)
    //1) บอก TypeORM ว่าผู้ใช้ (User) สามารถมีโพสต์ (Post) ได้หลายโพสต์
    //2) () => Post แจ้งให้ TypeORM รู้ว่าเราจะเชื่อมโยงกับ Entity Post
    //3) post => post.user บอกว่าใน Post แต่ละโพสต์มีความสัมพันธ์กลับไปยัง User ที่สร้างโพสต์นั้น
    //เปรียบเทียบ: เหมือนกับบอกว่า "ผู้ใช้ทุกคน (User) สามารถเขียนโพสต์หลายโพสต์ (Post) ได้"
    posts: Post[];
    //มีฟิลด์ posts ที่เชื่อมโยงไปยัง Post Entity โดยใช้ @OneToMany ซึ่งบอกว่าผู้ใช้แต่ละคนสามารถมีโพสต์ได้หลายโพสต์
}
