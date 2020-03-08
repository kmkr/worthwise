CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE surveys (
    id UUID NOT NULL DEFAULT uuid_generate_v4(), 
    owner_email text,
    PRIMARY KEY (id)
);

CREATE TABLE responses (
    id UUID NOT NULL DEFAULT uuid_generate_v4(), 
    survey_id UUID,
    salary int,
    email text,
    PRIMARY KEY (id),
    FOREIGN KEY (survey_id) REFERENCES surveys(id)
);