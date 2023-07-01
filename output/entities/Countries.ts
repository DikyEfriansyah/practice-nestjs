import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Regions } from "./Regions";
import { Locations } from "./Locations";

@Index("country_pk", ["countryId"], { unique: true })
@Index("countries_pkey", ["countryId"], { unique: true })
@Entity("countries", { schema: "public" })
export class Countries {
  @Column("char", { primary: true, name: "country_id", length: 2})
  countryId: string;

  @Column("character varying", {
    name: "country_name",
    nullable: true,
    length: 40,
  })
  countryName: string | null;

  @ManyToOne(() => Regions, (regions) => regions.countries)
  @JoinColumn([{ name: "region_id", referencedColumnName: "regionId" }])
  region: Regions;

  @OneToMany(() => Locations, (locations) => locations.country)
  locations: Locations[];
}
