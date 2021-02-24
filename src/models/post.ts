import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './user'

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column({
        type: 'text',
    })
    content!: string

    @Column({ nullable: true })
    userId!: number
    
    @ManyToOne((_type) => User, (user: User) => user.posts)
    @JoinColumn()
    user!: User

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}