import { Student } from "src/student/entities/student.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    
    @ManyToMany(() => Student, (student) => student.courses)
    students: Student[];
}
