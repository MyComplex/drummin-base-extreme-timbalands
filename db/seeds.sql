INSERT INTO department (id, name)
VALUES  (1, 'Executive'),
        (2, 'Human Resources'),
        (3, 'Marketing'),
        (4, 'Accounting'),
        (5, 'Information Technology');

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, 'Chief Executive Officer', 250000000.00, 1),
        (2, 'Chief Human Resources Officer', 125000000.00, 2),
        (3, 'Chief Marketing Officer', 150000000.00, 3),
        (4, 'Chief Financial Officer', 200000000.00, 4),
        (5, 'Chief Technology Officer', 200000000.00, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'Ximena', 'Ordonez', 1),
        (2, 'Chiranjivi', 'Chand', 2, 1),
        (3, 'Nakahara', 'Mayumi', 3, 1),
        (4, 'Aaminah', 'Hameed', 4, 1),
        (5, 'Mwatabu', 'Akerele', 5, 1);