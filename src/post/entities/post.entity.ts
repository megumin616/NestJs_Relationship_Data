import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.posts)
    //1) บอก TypeORM ว่าโพสต์ (Post) แต่ละโพสต์จะมีผู้ใช้ (User) เพียงคนเดียวที่สร้างโพสต์นั้น
    //2) () => User แจ้งให้ TypeORM รู้ว่าเราจะเชื่อมโยงกับ Entity User
    //3) user => user.posts บอกว่าใน User มีโพสต์ (Posts) ที่เชื่อมโยงอยู่
    //เปรียบเทียบ: เหมือนกับบอกว่า "โพสต์แต่ละโพสต์ (Post) มีผู้ใช้ (User) เพียงคนเดียวที่เขียน"
    user: User;
    //มีฟิลด์ user ที่เชื่อมโยงไปยัง User Entity โดยใช้ @ManyToOne ซึ่งบอกว่าโพสต์หนึ่งโพสต์จะมีผู้ใช้เพียงคนเดียวที่สร้างโพสต์นั้น
}
