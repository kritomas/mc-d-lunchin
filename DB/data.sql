start transaction;
-- Vložení dat do tabulky category
INSERT INTO category (name, description) VALUES
('Slané', 'Jídla s výraznou slanou chutí'),
('Sladké', 'Jídla s cukrem nebo sladkými ingrediencemi'),
('Pálivé', 'Pikantní a ostrá jídla'),
('Kyselé', 'Jídla s kyselou chutí'),
('Hořké', 'Jídla s hořkou chutí'),
('Umami', 'Jídla s plnou chutí umami');

-- Vložení dat do tabulky food
INSERT INTO food (name, type, is_vegetarian) VALUES
('Česnečka', 'polévká', 1),
('Hovězí guláš', 'hlavní jídlo', 0),
('Smažený sýr', 'hlavní jídlo', 1),
('Jablečný štrúdl', 'dezert', 1),
('Margherita pizza', 'hlavní jídlo', 1),
('Kuřecí nugety', 'jiný', 0),
('Tiramisu', 'dezert', 1),
('Dýňová polévka', 'polévká', 1),
('Chilli con carne', 'hlavní jídlo', 0),
('Kimchi', 'jiný', 1),
('Citrónový koláč', 'dezert', 1),
('Bryndzové halušky', 'hlavní jídlo', 1);

-- Vložení dat do tabulky food_category
INSERT INTO food_category (food_id, category_id) VALUES
(1, 1), -- Česnečka je slaná
(2, 1), -- Hovězí guláš je slaný
(3, 1), -- Smažený sýr je slaný
(4, 2), -- Jablečný štrúdl je sladký
(5, 1), -- Margherita pizza je slaná
(6, 1), -- Kuřecí nugety jsou slané
(7, 2), -- Tiramisu je sladké
(8, 1), -- Dýňová polévka je slaná
(8, 4), -- Dýňová polévka má také kyselý nádech (dýně)
(9, 3), -- Chilli con carne je pálivé
(10, 3), -- Kimchi je pálivé
(10, 4), -- Kimchi má také kyselou chuť
(11, 2), -- Citrónový koláč je sladký
(11, 4), -- Citrónový koláč je kyselý
(12, 1), -- Slané
(12, 6); -- Umami

COMMIT;
rollback;