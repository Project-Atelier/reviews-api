# reviews-api
Implementing the reviews API from FEC 

<br>

# postgres functions:

## Importing data 
--------------------------
order must be kept otherwise errors involving foreign keys will occur

  >`copy "Products" FROM 'filepath/product.csv' WITH (FORMAT csv, HEADER TRUE);`<br><br>
  `copy "Reviews" FROM 'filepath/reviews.csv' WITH (FORMAT csv, HEADER TRUE);`<br><br>
  `copy "Characteristics" (id, product_id, name)  FROM 'filepath/characteristics.csv' WITH (FORMAT csv, HEADER TRUE);`<br><br>
  `copy "Characteristic_Reviews" FROM 'filepath/characteristic_reviews.csv' WITH (FORMAT csv, HEADER TRUE);`<br><br>
  `copy "Reviews_Photos" FROM 'filepath/reviews_photos.csv' WITH (FORMAT csv, HEADER TRUE);`<br>

<br>

--------------------------
## updating sequence numbers
--------------------------
auto increment numbers don't update when copying in data, run these adding new data fields will work.

  >`select setval('"Reviews_review_id_seq"', (select MAX(review_id) from "Reviews"));`<br><br>
  `select setval('"Reviews_Photos_id_seq"', (select MAX(id) from "Reviews_Photos"));`<br><br>
  `select setval('"Characteristic_Reviews_id_seq"', (select MAX(id) from "Characteristic_Reviews"));`

<br>

--------------------------
## characteristic review average
--------------------------
This command must be run when first importing data to precalculate and set the review averages in the "Characteristics" table.
Reviews api has function built in to update the value on individual characteristics when a review is added.
This command only needs to be run once.

  >`with char_avg AS (
  select "Characteristic_Reviews".characteristic_id as idc, cast(cast(sum("Characteristic_Reviews".value) as decimal)/ cast(count("Characteristic_Reviews".value) as decimal) as numeric(4,3)) AS avg 
  FROM "Characteristic_Reviews" group by "Characteristic_Reviews".characteristic_id
  ) 
  update "Characteristics" set value = char_avg.avg FROM char_avg where "Characteristics".id = char_avg.idc;`
