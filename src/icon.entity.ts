import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('icon')
export class IconEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "char", length: 6, nullable: false, unique: true })
    htmlCode: string;
    @Column({ type: "text", nullable: false })
    name: string;
    @Column({ type: "datetime", default: Date.now() })
    @CreateDateColumn()
    created_at: Date;
}