import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Countries } from "./Countries";

@Index("region_pk", ["regionId"], { unique: true })
@Index("regions_pkey", ["regionId"], { unique: true })
@Entity("regions", { schema: "public" })
export class Regions {
  @PrimaryGeneratedColumn({ type: "integer", name: "region_id" })
  regionId: number;

  @Column("character varying", {
    name: "region_name",
    nullable: true,
    length: 25,
  })
  regionName: string | null;

  @Column("character varying", { name: "photo", nullable: true })
  photo: string | null;

  @OneToMany(() => Countries, (countries) => countries.region)
  countries: Countries[];
}
