import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "flavors" ADD COLUMN "is_sold_out" boolean DEFAULT false;
  ALTER TABLE "flavors" DROP COLUMN "is_available_today";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "flavors" ADD COLUMN "is_available_today" boolean DEFAULT false;
  ALTER TABLE "flavors" DROP COLUMN "is_sold_out";`)
}
