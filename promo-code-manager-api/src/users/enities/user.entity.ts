import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hashSync } from 'bcrypt';
import { Exclude } from "class-transformer";
import { UserBonusEntity } from "src/user-bonuses/entities/user-bonus.entity";

/**
 * 
 */
@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid') 
    public id: string;
    
    @Column({ 
        nullable: false, 
        unique: true 
    }) 
    public username: string;

    @Exclude()
    @Column({ 
        nullable: false,
        unique: true
    }) 
    public password: string;
    
    @Column({ 
        nullable: false,
        unique: true
    }) 
    public email: string;

    @OneToMany(() => UserBonusEntity, bonus => bonus.user)
    public bonuses: UserBonusEntity[];

    /**
     * 
     */
    @Exclude()
    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = hashSync(this.password, 10);  
    }
}