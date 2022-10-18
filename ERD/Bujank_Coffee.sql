CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY not null,
  "email" varchar unique NOT NULL,
  "password" varchar NOT NULL,
  "role" varchar default 'user',
  "phone_number" varchar NOT NULL,
  "create_at" timestamp with time zone default current_timestamp,
  "update_at" timestamp with time zone default current_timestamp
);

CREATE TYPE gender_list as enum ('MALE','FEMALE')

CREATE TABLE "profiles" (
  "user_id" int NOT NULL,
  "firstname" varchar,
  "lastname" varchar,
  "displayname" varchar,
  "gender" gender_list null,
  "birthday" date,
  "address" TEXT,
  "image" varchar null
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY not null,
  "name" varchar not null,
  "category" varchar not null,
  "size" varchar not null,
  "price" int not null,
  "stock" int not null,
  "image" varchar default 'image_product.jpg',
  "description" text,
  "create_at" timestamp with time zone default current_timestamp,
  "update_at" timestamp with time zone default current_timestamp
);

CREATE TABLE "promos" (
  "id" SERIAL PRIMARY KEY not null,
  "product_id" int NOT NULL,
  "code" varchar NOT NULL,
  "discount" int NOT NULL,
  "valid" date not null,
  "create_at" timestamp with time zone default current_timestamp,
  "update_at" timestamp with time zone default current_timestamp
);

CREATE TABLE "delivery" (
  "id" SERIAL PRIMARY KEY not null,
  "method" varchar not null,
  "shipping" int not null,
  "create_at" timestamp with time zone default current_timestamp,
  "update_at" timestamp with time zone default current_timestamp
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY not null,
  "user_id" int not null,
  "product_id" int not null,
  "promo_id" int null,
  "delivery_id" int not null,
  "method_payment" varchar not null,
  "qty" int not null,
  "tax" int not null,
  "total" int not null,
  "status" varchar DEFAULT 'pending' not null,
  "create_at" timestamp with time zone default current_timestamp,
  "update_at" timestamp with time zone default current_timestamp
);

ALTER TABLE "profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("promo_id") REFERENCES "promos" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("delivery_id") REFERENCES "delivery" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "promos" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
