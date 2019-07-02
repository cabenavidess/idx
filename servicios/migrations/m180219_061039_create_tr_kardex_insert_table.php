<?php

use yii\db\Migration;

/**
 * Handles the creation of table `tr_kardex_insert`.
 */
class m180219_061039_create_tr_kardex_insert_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->execute("
        DROP TRIGGER IF EXISTS tr_kardex_insert;
        delimiter //
        CREATE TRIGGER tr_kardex_insert AFTER INSERT ON detalle_compra
        FOR EACH ROW
        BEGIN
        INSERT INTO kardex VALUES (default , 'ENTRADA', CURDATE(),
        CONCAT_WS(' ','Nuevo producto ', NEW.fk_tap_producto_id ),
         NEW.detalle_compra_cantidad, NEW.detalle_compra_valor_venta,NEW.detalle_compra_cantidad, NEW.fk_tap_producto_id , 1, 1);
        END;//
        delimiter ;");
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->execute("
        DROP tr_kardex_insert;");
    }
}
