-- SQLite
SELECT 
    "promo_service"."id" AS "promo_service_id", 
    "promo_service"."name" AS "promo_service_name", 
    "promo_service"."description" AS "promo_service_description", 
    "promo_service"."promoCode" AS "promo_service_promoCode", 
    "bonus"."id" AS "bonus_id",
     "bonus"."userId" AS "bonus_userId", 
     "bonus"."promoServiceId" AS "bonus_promoServiceId", 
     "user"."id" AS "user_id", 
     "user"."username" AS "user_username", 
     "user"."password" AS "user_password", 
     "user"."email" AS "user_email" 
FROM "promo_service" "promo_service" 
    LEFT JOIN "user_bonus_entity" "bonus" ON "bonus"."promoServiceId"="promo_service"."id" AND ("bonus"."userId" = '74856c3b-d8d0-41f7-9888-3b9a6b62eb53')  
    LEFT JOIN "user_entity" "user" ON "user"."id"="bonus"."userId" AND ("user"."id" = '74856c3b-d8d0-41f7-9888-3b9a6b62eb53') 
WHERE "promo_service"."name" like '%Handmade Metal Shoes%'  ORDER BY "user"."username" DESC