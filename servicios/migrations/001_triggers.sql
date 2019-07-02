-- TRIGER INSERTAR NUEVOS PRODUCTOS

DROP TRIGGER IF EXISTS tr_kardex_insert;
delimiter //
CREATE TRIGGER tr_kardex_insert AFTER
INSERT ON
detalle_compra
FOR
EACH
ROW
BEGIN
	INSERT INTO kardex
	VALUES
		(default , 'ENTRADA', CURDATE(),
			CONCAT_WS(' ','Nuevo producto ', NEW.fk_tap_producto_id ),
			NEW.detalle_compra_cantidad, NEW.detalle_compra_valor_venta, NEW.detalle_compra_cantidad, NEW.fk_tap_producto_id , 1, 1);
END;//
delimiter ;


CREATE DEFINER = `root` @`localhost` TRIGGER `tr_kardex_insert_venta` AFTER
INSERT ON `
venta_detalle`
FOR
EACH
ROW
BEGIN
	INSERT INTO kardex
	VALUES
		(
			DEFAULT,
			'SALIDA',
			CURDATE( ),
			CONCAT_WS( ' ', 'Salida producto ', NEW.fk_tab_producto_id ),
			NEW.venta_detalle_cantidad,
			NEW.venta_detalle_total,
			NEW.venta_detalle_cantidad,
			NEW.fk_tab_producto_id,
			1,
			1 
		);

	INSERT INTO kardex
	VALUES
		(default , 'ENTRADA', CURDATE(),
			CONCAT_WS(' ','Nuevo producto ', NEW.fk_tap_producto_id ),
			NEW.detalle_compra_cantidad, NEW.detalle_compra_valor_venta, NEW.detalle_compra_cantidad, NEW.fk_tap_producto_id , 1, 1, NEW.fk_datos_compra_id, 'Entrada Compra', NEW.fk_datos_compra_id);
END







DROP TRIGGER IF EXISTS tr_kardex_insert_vent;
delimiter //
CREATE TRIGGER tr_kardex_insert_vent AFTER
INSERT ON
venta_detalle
FOR EACH ROW
BEGIN
	INSERT INTO kardex
	VALUES
		(default , 'SALIDA', CURDATE(),
			CONCAT_WS(' ','Salida producto ', NEW.fk_tab_producto_id ),
			NEW.venta_detalle_cantidad,
			NEW.venta_detalle_valor_unit,
			NEW.venta_detalle_cantidad,
			NEW.fk_tab_producto_id , 1, 1,
			NEW.fk_venta_id,
			'Saliida Compra',
			NEW.fk_venta_id);
END;//
delimiter ;

