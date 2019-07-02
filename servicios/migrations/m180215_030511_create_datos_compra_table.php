<?php

use yii\db\Migration;

/**
 * Handles the creation of table `datos_compra`.
 * Has foreign keys to the tables:
 *
 * - `tab_proveedor_mercaderia`
 */
class m180215_030511_create_datos_compra_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('datos_compra', [
            'datos_compra_id' => $this->primaryKey(),
            'datos_compra_guia' => $this->string(12)->notNull(),
            'datos_compra_fecha' => $this->dateTime()->notNull(),
            'datos_compra_subtotal' => $this->decimal(8, 2)->notNull(),
            'datos_compra_iva' => $this->decimal(8, 2)->notNull(),
            'datos_compra_total' => $this->decimal(8, 2)->notNull(),
            'fk_tab_proveedor_mercaderia_id' => $this->integer()->notNull(),
        ]);

        // creates index for column `fk_tab_proveedor_mercaderia_id`
        $this->createIndex(
            'idx-datos_compra-fk_tab_proveedor_mercaderia_id',
            'datos_compra',
            'fk_tab_proveedor_mercaderia_id'
        );

        // add foreign key for table `tab_proveedor_mercaderia`
        $this->addForeignKey(
            'fk-datos_compra-fk_tab_proveedor_mercaderia_id',
            'datos_compra',
            'fk_tab_proveedor_mercaderia_id',
            'tab_proveedor_mercaderia',
            'tab_proveedor_mercaderia_id',
            'CASCADE'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        // drops foreign key for table `tab_proveedor_mercaderia`
        $this->dropForeignKey(
            'fk-datos_compra-fk_tab_proveedor_mercaderia_id',
            'datos_compra'
        );

        // drops index for column `fk_tab_proveedor_mercaderia_id`
        $this->dropIndex(
            'idx-datos_compra-fk_tab_proveedor_mercaderia_id',
            'datos_compra'
        );

        $this->dropTable('datos_compra');
    }
}
