DROP TABLE IF EXISTS giggers cascade;

CREATE TABLE giggers(
    id serial primary key,
    type VARCHAR(11),
    name VARCHAR(15),
    username VARCHAR(50),
    speciality VARCHAR(255),
    description VARCHAR(255)
)WITH (OIDS = FALSE);


INSERT INTO giggers
VALUES
(default, 'employee', 'Donald Crentsil', 'dcrentsil', 'Keyboard', 'looking for a gospel piano gig'),
(default, 'employer', 'Shawn Connery', 'kshawn', 'Drummer', 'In search of a drummer'),
(default, 'employer', 'Nat King Cole', 'ACoco', 'Bassist', 'Church in need of Bassist'),
(default, 'employee', '9VISIONS ENT', '9V', 'drums' ,'Been playing drums for 5 years. Hire me!');

