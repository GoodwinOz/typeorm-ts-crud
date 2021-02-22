import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Length, isNotEmpty, IsNotEmpty } from 'class-validator'
import * as bcrypt from 'bcryptjs'

import { Post } from './post'

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    @Length(4, 200)
    password!: string

    @Column()
    @Length(4, 20)
    email!: string

    @Column()
    @IsNotEmpty()
    role!: string

    @OneToMany((_type) => Post, (post: Post) => post.user)
    posts!: Array<Post>

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10)
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}