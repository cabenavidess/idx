<?php

use yii\db\Migration;

/**
 * Handles the creation of table `venta_detalle`.
 * Has foreign keys to the tables:
 *
 * - `tab_producto`
 * - `venta_datos`
 */
class m180615_184541_create_venta_detalle_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('venta_detalle', [
            'venta_detalle_id' => $this->primaryKey(),
            'fk_tab_producto_id' => $this->integer()->notNull(),
            'fk_venta_id' => $this->integer()->notNull(),
            'venta_detalle_cantidad' => $this->integer()->notNull(),
            'venta_detalle_valor_unit' => $this->decimal(7,2)->notNull(),
            'venta_detalle_descuento' => $this->integer(3),
            'venta_detalle_total' => $this->decimal(7,2)->notNull(),
        ]);

        // creates index for column `fk_tab_producto_id`
        $this->createIndex(
            'idx-venta_detalle-fk_tab_producto_id',
            'venta_detalle',
            'fk_tab_producto_id'
        );

        // add foreign key for table `tab_producto`
        $this->addForeignKey(
            'fk-venta_detalle-fk_tab_producto_id',
            'venta_detalle',
            'fk_tab_producto_id',
            'tab_producto',
            'tab_producto_id',
            'CASCADE'
        );

        // creates index for column `fk_venta_id`
        $this->createIndex(
            'idx-venta_detalle-fk_venta_id',
            'venta_detalle',
            'fk_venta_id'
        );

        // add foreign key for table `venta_datos`
        $this->addForeignKey(
            'fk-venta_detalle-fk_venta_id',
            'venta_detalle',
            'fk_venta_id',
            'venta_datos',
            'venta_datos_id',
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
            'fk-venta_detalle-fk_tab_producto_id',
            'venta_detalle'
        );

        // drops index for column `fk_tab_producto_id`
        $this->dropIndex(
            'idx-venta_detalle-fk_tab_producto_id',
            'venta_detalle'
        );

        // drops foreign key for table `venta_datos`
        $this->dropForeignKey(
            'fk-venta_detalle-fk_venta_id',
            'venta_detalle'
        );

        // drops index for column `fk_venta_id`
        $this->dropIndex(
            'idx-venta_detalle-fk_venta_id',
            'venta_detalle'
        );

        $this->dropTable('venta_detalle');
    }
}
