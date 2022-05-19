import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitCreateTables1652954429923 implements MigrationInterface {
  name = 'InitCreateTables1652954429923'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "checkInDate" date NOT NULL, "checkOutDate" date NOT NULL, "numberOfGuests" integer NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "billingAddress" character varying NOT NULL, "postalCode" integer NOT NULL, "city" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "countryId" uuid NOT NULL, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_d45d3c2b821ff35b462773cafc5" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_d45d3c2b821ff35b462773cafc5"`
    )
    await queryRunner.query(`DROP TABLE "reservation"`)
    await queryRunner.query(`DROP TABLE "country"`)
  }
}
