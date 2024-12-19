# Requêtes SQL à faire

## Administrateur

- [ ] la liste de tout les comptes affilié à l'établissement
```sql
    SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.role,
        e.name,
        COUNT(r.id) AS reservation_count
    FROM user u
    JOIN establishment e ON u.establishment = e.id
    JOIN reservation r ON r.user = u.id
    ORDER BY u.last_name ASC;
```

- [ ] la liste de toutes les salles disponibles pour l'établissement
```sql
    SELECT 
        l.id,
        l.name,
        l.description,
        l.capacity,
        f.name,
        e.name,
        l.status
    FROM location l
    JOIN is_located il ON l.id = il.location
    JOIN establishment e ON il.establishment = e.id
    JOIN map_floor f ON l.floor = f.f
    ORDER BY l.name ASC;
```

- [ ] la liste de toutes les réservations dans l'établissement
```sql
    SELECT 
        r.id,
        lr.day_reservation,
        lr.start_time,
        lr.end_time,
        l.name,
        r.status,
    FROM reservation r
    JOIN location_reservation lr ON lr.reservation = r.id
    JOIN location l ON lr.location = l.id
    JOIN is_located il ON l.id = il.location
    JOIN establishment e ON il.establishment = e.id
    ORDER BY lr.day_reservation,lr.start_time ASC;
```

- [ ] la liste de toutes les signalements dans l'établissement
```sql
    SELECT 
        r.id,
        lr.day_reservation,
        CONCAT(u.first_name, ' ', u.last_name) AS user_name,
        l.name,
        c.comment
    FROM conflict c
    JOIN reservation r ON c.reservation = r.id
    JOIN user u ON c.user = u.id
    JOIN location_reservation lr ON lr.reservation = r.id
    JOIN location l ON lr.location = l.id
    JOIN is_located il ON il.location = l.id
    JOIN establishment e ON il.establishment = e.id
    ORDER BY lr.day_reservation ASC;
```

- [ ] la liste de toutes les étages avec leur plan pour l'établissement
```sql
SELECT 
    mf.id
    mf.number,
    mf.name,
    mf.photo_link,
FROM map_floor mf
JOIN map m ON mf.map = m.id
WHERE m.establishment = :establishment_id
ORDER BY mf.number ASC;
```

- [ ] les informations de l'établissement
```sql
SELECT 
    e.name,
    e.address,
    e.city,
    e.postal_code,
    e.phone,
    e.email
FROM establishment e
WHERE lt.establishment = :establishment_id;
```

- [ ] la liste de toutes les lieux de restauration affiliés à l'établissement
```sql
SELECT 
    rp.id,
    rp.name,
    rp.type,
    rp.location,
    rp.email,
    rp.status
FROM restauration_place rp
JOIN link_to lt ON lt.restaurant = rp.id
WHERE lt.establishment = :establishment_id AND lt.status = "Accepted"
ORDER BY rp.id ASC;
```

- [ ] la liste de toutes les demandes de lieux de restauration d'affilaition à l'établissement
```sql
SELECT 
    rp.id,
    rp.name,
    rp.type,
    rp.location,
    rp.email,
FROM restauration_place rp
JOIN link_to lt ON lt.restaurant = rp.id
WHERE lt.establishment = :establishment_id AND lt.status = "Pending"
ORDER BY rp.id ASC;
```


## Restaurateur

- [ ] la liste de toutes les plats pour le restaurant choisi avec leurs tags associés
```sql
SELECT 
    m.id AS meal_id,
    m.name AS meal_name,
    m.description AS meal_description,
    m.price AS meal_price,
    m.stock AS meal_stock,
    m.type AS meal_type,
    c.label,
    t.label AS tag_label
FROM meal m
LEFT JOIN category c ON c.id = m.category
LEFT JOIN tagging tg ON m.id = tg.meal
LEFT JOIN tag t ON tg.tag = t.id
WHERE m.restaurant = :restaurant_id
ORDER BY m.id DESC;
```

- [ ] la liste de toutes les menus pour le restaurant choisi
```sql
SELECT 
    m.id AS menu_id,
    m.name AS menu_name,
    m.description AS menu_description,
    m.price AS menu_price,
    c.label AS category_name,
FROM menu m
LEFT JOIN tagging t ON t.meal = m.id
LEFT JOIN tag g ON g.id = t.tag
LEFT JOIN tag_category c ON c.id = g.tag_category
WHERE m.restaurant = :restaurant_id
ORDER BY m.creation_date DESC, c.label ASC;
```

-  [ ] la liste de toutes les commandes pour le restaurant choisi
```sql
SELECT 
    c.id AS command_id,
    CONCAT(u.first_name, ' ', u.last_name) AS user_name,
    c.status AS command_status,
    c.creation_date
    c.total_amount,
    c.pickup_time,
    DATE_ADD(c.pickup_time, INTERVAL 1 HOUR) AS final_pickup_time,
    cl.id AS line_id,
    cl.quantity,
    m.name AS meal_name,
    me.name AS menu_name,
FROM command c
JOIN restauration_place rp ON c.restauration_place = rp.id
JOIN user_account u ON c.user = u.id
JOIN restauration_place rp ON c.restauration_place = rp.id
JOIN command_composition cc ON c.id = cc.command
JOIN command_line cl ON cc.line = cl.id
JOIN line_content lc ON cl.id = lc.line
JOIN meal m ON lc.meal = m.id
JOIN menu me ON lc.menu = me.id
WHERE rp.id = = :restaurant_id
ORDER BY c.id DESC;
```