CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE surveys (
    id UUID NOT NULL DEFAULT uuid_generate_v4(), 
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    owner_email text,
    owner_notified boolean DEFAULT FALSE,
    PRIMARY KEY (id)
);

CREATE TABLE responses (
    id UUID NOT NULL DEFAULT uuid_generate_v4(), 
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    survey_id UUID,
    salary int,
    email text,
    user_notified boolean DEFAULT FALSE,
    PRIMARY KEY (id),
    FOREIGN KEY (survey_id) REFERENCES surveys(id)
);