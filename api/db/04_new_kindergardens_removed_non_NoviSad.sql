UPDATE kindergarden
SET IsActive = 0
WHERE department NOT LIKE N'ПУ Радосно детињство'

INSERT INTO kindergarden (city, municipality, government, department, name, street, street_number, postal_code, location_type, IsActive, central) VALUES
(N'Нови Сад',N'Нови Сад',N'Нови Сад',N'ПУ Радосно детињство',N'СРНА',N'Радоја Домановића',N'24',21242,1, 1, 1),
(N'Нови Сад',N'Нови Сад',N'Нови Сад',N'ПУ Радосно детињство',N'МЕДА',N'Радничка',N'47',21242,1, 1, 1),
(N'Нови Сад',N'Нови Сад',N'Нови Сад',N'ПУ Радосно детињство',N'КРЦКО ОРАШЧИЋ',N'Орахова',N'3',21242,1, 1, 1)