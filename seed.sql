COPY Products(id, name, slogan, description, category, default_price)
FROM '/Users/kylenissley/Coding/hack-reactor/senior-projects/system-design-capstone/sdc-data-download/product.csv'
DELIMITER ','
CSV HEADER;

COPY Features(id, product_id, feature, value)
FROM '/Users/kylenissley/Coding/hack-reactor/senior-projects/system-design-capstone/sdc-data-download/features.csv'
DELIMITER ','
CSV HEADER;

COPY Styles(id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/kylenissley/Coding/hack-reactor/senior-projects/system-design-capstone/sdc-data-download/styles.csv'
DELIMITER ','
CSV HEADER;

COPY Photos(id, style_id, url, thumbnail_url)
FROM '/Users/kylenissley/Coding/hack-reactor/senior-projects/system-design-capstone/sdc-data-download/photos.csv'
DELIMITER ','
CSV HEADER;

COPY Related_Products(id, curr_prod_id, related_prod_id)
FROM '/Users/kylenissley/Coding/hack-reactor/senior-projects/system-design-capstone/sdc-data-download/related.csv'
DELIMITER ','
CSV HEADER;

COPY Skus(id, style_id, size, quantity)
FROM '/Users/kylenissley/Coding/hack-reactor/senior-projects/system-design-capstone/sdc-data-download/skus.csv'
DELIMITER ','
CSV HEADER;