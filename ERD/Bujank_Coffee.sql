CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY not null,
  "email" varchar unique NOT NULL,
  "password" varchar NOT NULL,
  "phone_number" varchar NOT NULL,
  "role" varchar default 'user',
  "create_at" timestamp with time zone default current_timestamp,
  "update_at" timestamp with time zone default current_timestamp
);
CREATE TYPE gender_list AS ENUM ('MALE', 'FEMALE')
CREATE TABLE "userdata" (
  "user_id" int4 NOT NULL,
  "displayname" varchar not null,
  "firstname" varchar,
  "lastname" varchar,
  "birthday" date,
  "gender" gender_list not null,
  "address" varchar not null,
  "image" varchar default 'user_profile.jpg'
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY not null,
  "category_id" int NOT NULL,
  "product_name" varchar NOT NULL,
  "price" int NOT NULL,
  "stok" int NOT NULL,
  "image" varchar NOT NULL,
  "description" varchar NOT NULL,
  "create_at" timestamp with time zone default current_timestamp,
  "update_at" timestamp with time zone default current_timestamp
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY not null,
  "category_name" varchar NOT NULL
);

CREATE TABLE "promos" (
  "id" SERIAL PRIMARY KEY not null,
  "product_id" int NOT NULL,
  "code" varchar NOT NULL,
  "discount" int NOT NULL,
  "valid" date NOT NULL,
  "create_at" timestamp with time zone default current_timestamp,
  "update_at" timestamp with time zone default current_timestamp
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY not null,
  "user_id" int NOT NULL,
  "product_id" int NOT NULL,
  "promo_id" int,
  "payment_id" int NOT NULL,
  "delivery_id" int NOT NULL,
  "tax" int NOT NULL,
  "status" varchar default 'process',
  "create_at" timestamp with time zone default current_timestamp,
  "update_at" timestamp with time zone default current_timestamp
);

CREATE TABLE "transactions_products_sizes" (
  "transaction_id" int NOT NULL,
  "product_id" int NOT NULL,
  "size_id" int NOT NULL,
  "qty" int NOT NULL,
  "subtotal" int NOT NULL
);

CREATE TABLE "size" (
  "id" SERIAL PRIMARY KEY not null,
  "size" varchar NOT NULL,
  "cost" int NOT NULL,
  "create_at" timestamp with time zone default current_timestamp,
  "update_at" timestamp with time zone default current_timestamp
);

CREATE TABLE "payment" (
  "id" SERIAL PRIMARY KEY not null,
  "method" varchar NOT NULL
);

CREATE TABLE "deliveries" (
  "id" SERIAL PRIMARY KEY not null,
  "method" varchar NOT NULL,
  "shipping" int NOT NULL,
  "minimum_distance" int NOT NULL,
  "charge_cost" int default 0,
  "create_at" timestamp with time zone default current_timestamp,
  "update_at" timestamp with time zone default current_timestamp
);

ALTER TABLE "userdata" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "promos" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "transactions_products_sizes" ADD FOREIGN KEY ("size_id") REFERENCES "size" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("promo_id") REFERENCES "promos" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("payment_id") REFERENCES "payment" ("id");

ALTER TABLE "transactions_products_sizes" ADD FOREIGN KEY ("transaction_id") REFERENCES "transactions" ("id");

ALTER TABLE "transactions_products_sizes" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("delivery_id") REFERENCES "deliveries" ("id");
