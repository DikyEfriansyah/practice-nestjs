import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Departments } from "./Departments";
import { Jobs } from "./Jobs";

@Index("employees_pkey", ["employeeId"], { unique: true })
@Index("employee_pk", ["employeeId"], { unique: true })
@Entity("employees", { schema: "public" })
export class Employees {
  @PrimaryGeneratedColumn({ type: "integer", name: "employee_id" })
  employeeId: number;

  @Column("character varying", {
    name: "first_name",
    nullable: true,
    length: 20,
  })
  firstName: string | null;

  @Column("character varying", {
    name: "last_name",
    nullable: true,
    length: 25,
  })
  lastName: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 25 })
  email: string | null;

  @Column("character varying", {
    name: "phone_number",
    nullable: true,
    length: 20,
  })
  phoneNumber: string | null;

  @Column("timestamp without time zone", { name: "hire_date", nullable: true })
  hireDate: Date | null;

  @Column("numeric", { name: "salary", nullable: true, precision: 8, scale: 2 })
  salary: string | null;

  @Column("numeric", {
    name: "commision_pct",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  commisionPct: string | null;

  @Column("integer", { name: "xemp_id", nullable: true })
  xempId: number | null;

  @OneToMany(() => Departments, (departments) => departments.manager)
  departments: Departments[];

  @ManyToOne(() => Departments, (departments) => departments.employees)
  @JoinColumn([{ name: "department_id", referencedColumnName: "departmentId" }])
  department: Departments;

  @ManyToOne(() => Jobs, (jobs) => jobs.employees)
  @JoinColumn([{ name: "job_id", referencedColumnName: "jobId" }])
  job: Jobs;

  @ManyToOne(() => Employees, (employees) => employees.employees)
  @JoinColumn([{ name: "manager_id", referencedColumnName: "employeeId" }])
  manager: Employees;

  @OneToMany(() => Employees, (employees) => employees.manager)
  employees: Employees[];
}
