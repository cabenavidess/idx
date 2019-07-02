<?php

use yii\db\Migration;

/**
 * Handles the creation of table `detalle_compra`.
 * Has foreign keys to the tables:
 *
 * - `tab_producto`
 * - `datos_compra`
 */
class m180215_032046_create_detalle_compra_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('detalle_compra', [
            'detalle_compra_id' => $this->primaryKey(),
            'detalle_compra_cantidad' => $this->integer()->notNull(),
            'detalle_compra_valor_unit' => $this->decimal(8, 4)->notNull(),
            'detalle_compra_valor_total' => $this->decimal(8, 4)->notNull(),
            'fk_tap_producto_id' => $this->integer()->notNull(),
            'fk_datos_compra_id' => $this->integer()->notNull(),
            'detalle_compra_valor_venta' => $this->decimal(8, 2)->notNull(),
        ]);

        // creates index for column `fk_tap_producto_id`
        $this->createIndex(
            'idx-detalle_compra-fk_tap_producto_id',
            'detalle_compra',
            'fk_tap_producto_id'
        );

        // add foreign key for table `tab_producto`
        $this->addForeignKey(
            'fk-detalle_compra-fk_tap_producto_id',
            'detalle_compra',
            'fk_tap_producto_id',
            'tab_producto',
            'tab_producto_id',
            'CASCADE'
        );

        // creates index for column `fk_datos_compra_id`
        $this->createIndex(
            'idx-detalle_compra-fk_datos_compra_id',
            'detalle_compra',
            'fk_datos_compra_id'
        );

        // add foreign key for table `datos_compra`
        $this->addForeignKey(
            'fk-detalle_compra-fk_datos_compra_id',
            'detalle_compra',
            'fk_datos_compra_id',
            'datos_compra',
            'datos_compra_id',
            'CASCADE'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        // drops foreign key for table `tab_producto`
        $this->dropForeignKey(
            'fk-detalle_compra-fk_tap_producto_id',
            'detalle_compra'
        );

        // drops index for column `fk_tap_producto_id`
        $this->dropIndex(
            'idx-detalle_compra-fk_tap_producto_id',
            'detalle_compra'
        );

        // drops foreign key for table `datos_compra`
        $this->dropForeignKey(
            'fk-detalle_compra-fk_datos_compra_id',
            'detalle_compra'
        );

        // drops index for column `fk_datos_compra_id`
        $this->dropIndex(
            'idx-detalle_compra-fk_datos_compra_id',
            'detalle_compra'
        );

        $this->dropTable('detalle_compra');
    }
}
