-- CREATE VIEW stock AS select producto_id, sum(kardex.kardex_stock) as stock,
--  count(producto_id) as filas, p.tab_producto_nombre as nombre, p.tab_producto_codigo as codigo,
--  MAX(kardex_precio) as precio, kardex_movimiento as movimiento, p.tab_producto_imagen as imagen
--   from kardex 
--   inner join tab_producto p on p.tab_producto_id = kardex.producto_id 
-- 	WHERE kardex_movimiento = "ENTRADA"
--   GROUP BY producto_id;




  SELECT
	`kardex`.`producto_id` AS `producto_id`,
	sum( `kardex`.`kardex_stock` ) AS `stock`,
	count( `kardex`.`producto_id` ) AS `filas`,
	`p`.`tab_producto_nombre` AS `nombre`,
	`p`.`tab_producto_codigo` AS `codigo`,
	max( `kardex`.`kardex_precio` ) AS `precio`,
	`kardex`.`kardex_movimiento` AS `movimiento`,
	`p`.`tab_producto_imagen` AS `imagen` 
FROM
	( `kardex` JOIN `tab_producto` `p` ON ( ( `p`.`tab_producto_id` = `kardex`.`producto_id` ) ) ) 
WHERE
	( `kardex`.`kardex_movimiento` = 'ENTRADA' ) 
GROUP BY
	`kardex`.`producto_id`




SELECT
	`kardex`.`producto_id` AS `producto_id`,
	sum( `kardex`.`kardex_stock` ) AS `stock`,
	count( `kardex`.`producto_id` ) AS `filas`,
	`p`.`tab_producto_nombre` AS `nombre`,
	`p`.`tab_producto_codigo` AS `codigo`,
	max( `kardex`.`kardex_precio` ) AS `precio`,
	`kardex`.`kardex_movimiento` AS `movimiento`,
	`p`.`tab_producto_imagen` AS `imagen` 
FROM
	( `kardex` JOIN `tab_producto` `p` ON ( ( `p`.`tab_producto_id` = `kardex`.`producto_id` ) ) ) 
WHERE
	( `kardex`.`kardex_movimiento` = 'SALIDA' ) 
GROUP BY
	`kardex`.`producto_id`





  SELECT
	`inv_entradas`.`producto_id` AS `producto_id`,
	`inv_entradas`.`codigo` AS `codigo`,
	`inv_entradas`.`nombre` AS `nombre`,
	`inv_entradas`.`precio` AS `precio`,
	`inv_entradas`.`stock` AS `entradas`,
	`inv_salidas`.`stock` AS `salidas`,
	( CASE WHEN isnull( `inv_salidas`.`stock` ) THEN `inv_entradas`.`stock` ELSE ( `inv_entradas`.`stock` - `inv_salidas`.`stock` ) END ) AS `stock` 
FROM
	( `inv_entradas` LEFT JOIN `inv_salidas` ON ( ( `inv_entradas`.`producto_id` = `inv_salidas`.`producto_id` ) ) )



  
