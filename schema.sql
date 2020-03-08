CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE surveys (
    id UUID NOT NULL DEFAULT uuid_generate_v4(), 
    owner_email text
);