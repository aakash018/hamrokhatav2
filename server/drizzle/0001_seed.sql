
INSERT INTO members (id, name, profile_url) VALUES
(1, 'Rohan', "https://s3.tebi.io/hamrokhata/7818885229119875546_n.jpg"),
(2, 'Subash', "https://s3.tebi.io/hamrokhata/260146686_420226183037120_111588171150060438_n.jpg"),
(3, 'Aakash', "https://s3.tebi.io/hamrokhata/299711855_5932737596760051_2875542097038879218_n.jpg"),
(4, 'Bikash', "https://s3.tebi.io/hamrokhata/00100sPORTRAIT_00100_BURST20220624121738576_COVER.jpg");


INSERT INTO debts ("from", "to", amount) VALUES
((SELECT id FROM members WHERE name = 'Rohan'), (SELECT id FROM members WHERE name = 'Subash'), 0),
((SELECT id FROM members WHERE name = 'Rohan'), (SELECT id FROM members WHERE name = 'Aakash'), 0),
((SELECT id FROM members WHERE name = 'Rohan'), (SELECT id FROM members WHERE name = 'Bikash'), 0),
((SELECT id FROM members WHERE name = 'Subash'), (SELECT id FROM members WHERE name = 'Rohan'), 0),
((SELECT id FROM members WHERE name = 'Subash'), (SELECT id FROM members WHERE name = 'Aakash'), 0),
((SELECT id FROM members WHERE name = 'Subash'), (SELECT id FROM members WHERE name = 'Bikash'), 0),
((SELECT id FROM members WHERE name = 'Aakash'), (SELECT id FROM members WHERE name = 'Rohan'), 0),
((SELECT id FROM members WHERE name = 'Aakash'), (SELECT id FROM members WHERE name = 'Subash'), 0),
((SELECT id FROM members WHERE name = 'Aakash'), (SELECT id FROM members WHERE name = 'Bikash'), 0),
((SELECT id FROM members WHERE name = 'Bikash'), (SELECT id FROM members WHERE name = 'Rohan'), 0),
((SELECT id FROM members WHERE name = 'Bikash'), (SELECT id FROM members WHERE name = 'Subash'), 0),
((SELECT id FROM members WHERE name = 'Bikash'), (SELECT id FROM members WHERE name = 'Aakash'), 0);