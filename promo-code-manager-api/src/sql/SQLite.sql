-- SQLite
SELECT "promo_service"."id" AS "promo_service_id", 
    "promo_service"."name" AS "promo_service_name",
    "bonus"."id" AS "bonus_id", 
    "bonus"."userId" AS "bonus_userId",
    "user"."id" AS "user_id", 
    "user"."username" AS "user_username"
FROM "promo_service" "promo_service" 
    LEFT JOIN "user_bonus_entity" "bonus" ON "bonus"."promoServiceId"="promo_service"."id" AND ("bonus"."userId" = '74856c3b-d8d0-41f7-9888-3b9a6b62eb53')
    LEFT JOIN "user_entity" "user" ON "user"."id"="bonus"."userId" AND ("user"."id" = '74856c3b-d8d0-41f7-9888-3b9a6b62eb53')
WHERE "promo_service"."name" like '%Handmade Metal Shoes%'
ORDER BY "user"."username" DESC, "promo_service"."name" ASC