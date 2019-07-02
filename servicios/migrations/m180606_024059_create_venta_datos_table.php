<?php

use yii\db\Migration;

/**
 * Handles the creation of table `venta_datos`.
 * Has foreign keys to the tables:
 *
 * - `tab_negocio_sucursal`
 * - `tab_cliente`
 * - `forma_pago`
 */
class m180606_024059_create_venta_datos_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('venta_datos', [
            'venta_datos_id' => $this->primaryKey(),
            'fk_sucursal_id' => $this->integer()->notNull(),
            'fk_tab_cliente_id' => $this->integer()->notNull(),
            'venta_datos_nro_factura' => $this->integer(10)->notNull(),
            'venta_datos_fecha' => $this->datetime()->notNull(),
            'fk_forma_pago_id' => $this->integer()->notNull(),
            'venta_datos_subtotal' => $this->decimal(7,2),
            'venta_datos_subtotal_cero' => $this->decimal(7,2),
            'venta_datos_iva' => $this->decimal(7,2),
            'venta_datos_total' => $this->decimal(7,2)->notNull(),
        ]);

        // creates index for column `fk_sucursal_id`
        $this->createIndex(
            'idx-venta_datos-fk_sucursal_id',
            'venta_datos',
            'fk_sucursal_id'
        );

        // add foreign key for table `tab_negocio_sucursal`
        $this->addForeignKey(
            'fk-venta_datos-fk_sucursal_id',
            'venta_datos',
            'fk_sucursal_id',
            'tab_negocio_sucursal',
            'tab_negocio_sucursal_id',
            'CASCADE'
        );

        // creates index for column `fk_tab_cliente_id`
        $this->createIndex(
            'idx-venta_datos-fk_tab_cliente_id',
            'venta_datos',
            'fk_tab_cliente_id'
        );

        // add foreign key for table `tab_cliente`
        $this->addForeignKey(
            'fk-venta_datos-fk_tab_cliente_id',
            'venta_datos',
            'fk_tab_cliente_id',
            'tab_cliente',
            'tab_cliente_id',
            'CASCADE'
        );

        // creates index for column `fk_forma_pago_id`
        $this->createIndex(
            'idx-venta_datos-fk_forma_pago_id',
            'venta_datos',
            'fk_forma_pago_id'
        );

        // add foreign key for table `forma_pago`
        $this->addForeignKey(
            'fk-venta_datos-fk_forma_pago_id',
            'venta_datos',
            'fk_forma_pago_id',
            'forma_pago',
            'forma_pago_id',
            'CASCADE'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        // drops foreign key for table `tab_negocio_sucursal`
        $this->dropForeignKey(
            'fk-venta_datos-fk_sucursal_id',
            'venta_datos'
        );

        // drops index for column `fk_sucursal_id`
        $this->dropIndex(
            'idx-venta_datos-fk_sucursal_id',
            'venta_datos'
        );

        // drops foreign key for table `tab_cliente`
        $this->dropForeignKey(
            'fk-venta_datos-fk_tab_cliente_id',
            'venta_datos'
        );

        // drops index for column `fk_tab_cliente_id`
        $this->dropIndex(
            'idx-venta_datos-fk_tab_cliente_id',
            'venta_datos'
        );

        // drops foreign key for table `forma_pago`
        $this->dropForeignKey(
            'fk-venta_datos-fk_forma_pago_id',
            'venta_datos'
        );

        // drops index for column `fk_forma_pago_id`
        $this->dropIndex(
            'idx-venta_datos-fk_forma_pago_id',
            'venta_datos'
        );

        $this->dropTable('venta_datos');
    }
}
