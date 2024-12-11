# Requêtes SQL à faire

- [ ] Liens de réseaux selon l'établissment de l'étudiant connecté - nécéssite l'user_id
```sql
SELECT n.type, n.link_network
FROM network n
JOIN user_account u ON u.establishment = n.establishment
WHERE u.id = :user_id ;
```

- [ ] FAQ selon l'établissment de l'étudiant connecté - nécéssite l'user_id
```sql
SELECT 
    f.category,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'question', f.question,
            'answer', f.answer
        )
    ) AS faq_details
FROM faq f
JOIN user_account u ON u.establishment = f.establishment
WHERE f.establishment = :establishment_id 
  AND u.id = :user_id
GROUP BY f.category
ORDER BY f.category ASC;
```

- [ ] Notifications de l'utilisateur par ordre décroissant de date ("le plus récent avant") - nécéssite l'user_id
```sql
SELECT n.title, n.description, n.date
FROM notification n
JOIN notification_center nc ON n.id = nc.notification
WHERE nc.user = :user_id
ORDER BY n.date DESC;
```

- [ ] la liste de tous les restauration_places affiliées à l'établissement du user - nécéssite l'user_id
```sql
SELECT r.id, r.name, r.description, r.location, r.type, r.opening_time, r.closing_time, 
       r.status, r.photo_link
FROM restauration_place r
JOIN link_to lt ON r.id = lt.restaurant
JOIN user_account u ON lt.establishment = u.establishment
WHERE u.id = :user_id;
```

-  [ ] la liste de toutes les réservations de l'étudiant par le plus récent - nécéssite l'user_id
```sql
SELECT 
    r.id AS reservation_id,
    r.status AS reservation_status,
    lr.start_time,
    lr.end_time,
    lr.day_reservation,
    l.id AS location_id,
    l.name AS location_name,
    l.position_x,
    l.position_y,
    f.name,
    e.address,
    e.city,
    e.postal_code
FROM reservation r
JOIN location_reservation lr ON r.id = lr.reservation
JOIN location l ON lr.location = l.id
JOIN is_located il ON l.id = il.location
JOIN establishment e ON il.establishment = e.id
JOIN map_floor f ON l.floor = f.id
WHERE r.user = :user_id
ORDER BY lr.day_reservation DESC, lr.start_time DESC;
```

-  [ ] la liste de toutes les commandes de l'étudiant - nécéssite l'user_id
```sql
SELECT 
    c.id AS command_id,
    c.payment_method,
    c.total_amount,
    c.status AS command_status,
    c.qrcode_link,
    c.pickup_time,
    DATE_ADD(c.pickup_time, INTERVAL 1 HOUR) AS final_pickup_time,
    c.creation_date,
    rp.name AS restauration_place_name
FROM command c
JOIN restauration_place rp ON c.restauration_place = rp.id
WHERE c.user = :user_id
ORDER BY c.creation_date DESC;
```

- [ ] la liste de toutes les salles disponibles pour l'établissement
```sql
    SELECT 
        l.id AS location_id,
        l.name AS location_name,
        l.photo_link AS location_photo,
        l.description AS location_description,
        l.capacity AS location_capacity,
        l.position_x,
        l.position_y
    FROM location l
    JOIN is_located il ON l.id = il.location
    JOIN establishment e ON il.establishment = e.id
    JOIN map m ON m.establishment = e.id
    WHERE e.id = :establishment_id AND l.status = TRUE
    ORDER BY l.name ASC;
```


- [ ] la liste de toutes les étages avec leur plan pour l'établissement
```sql
SELECT 
    mf.number AS floor_number,
    mf.name AS floor_name,
    mf.photo_link AS floor_plan
FROM map_floor mf
JOIN map m ON mf.map = m.id
WHERE m.establishment = :establishment_id
ORDER BY mf.number ASC;
```

- [ ] la liste de toutes les plats pour le restaurant choisi avec leurs tags associés
```sql
SELECT 
    m.id AS meal_id,
    m.name AS meal_name,
    m.description AS meal_description,
    m.type AS meal_type,
    m.photo_link AS meal_photo,
    m.price AS meal_price,
    t.label AS tag_label
FROM meal m
LEFT JOIN tagging tg ON m.id = tg.meal
LEFT JOIN tag t ON tg.tag = t.id
WHERE m.restaurant = :restaurant_id
  AND m.stock < 1
ORDER BY m.creation_date DESC;
```

- [ ] la liste de toutes les menus pour le restaurant choisi
```sql
SELECT 
    m.id AS menu_id,
    m.name AS menu_name,
    m.description AS menu_description,
    m.photo_link AS menu_photo,
    m.price AS menu_price
FROM menu m
WHERE m.restaurant = :restaurant_id
ORDER BY m.creation_date DESC;
```

- [ ] la liste de toutes les plat possibles pour le menu
```sql
SELECT 
    m.id AS meal_id,
    m.name AS meal_name,
    m.description AS meal_description,
    m.price AS meal_price,
    m.photo_link AS meal_photo,
    c.id AS category_id,
    c.label AS category_label
FROM meal m
JOIN category c ON m.category = c.id
JOIN associate a ON c.id = a.category
WHERE a.menu = :menu_id
ORDER BY m.creation_date DESC;
```

- [ ] merge des deux requets ci dessus 
```sql
SELECT 
    m.id AS menu_id,
    m.name AS menu_name,
    m.description AS menu_description,
    m.photo_link AS menu_photo,
    m.price AS menu_price,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'meal_id', meal.id,
            'meal_name', meal.name,
            'meal_description', meal.description,
            'meal_price', meal.price,
            'meal_photo', meal.photo_link,
            'category_label', category.label
        )
    ) AS meals
FROM menu m
JOIN associate a ON m.id = a.menu
JOIN meal meal ON a.category = meal.category
JOIN category category ON meal.category = category.id
WHERE m.restaurant = :restaurant_id
GROUP BY m.id
ORDER BY m.creation_date DESC;
```