CREATE TABLE "tasks" (
   "id" SERIAL PRIMARY KEY,
   "instructions" VARCHAR(250) NOT NULL,
   "complete" BOOLEAN DEFAULT FALSE 
);