<?php

use yii\db\Migration;

/**
 * Handles the creation of table `tab_proveedor_mercaderia`.
 */
class m171108_000459_create_tab_proveedor_mercaderia_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('tab_proveedor_mercaderia', [
            'tab_proveedor_mercaderia_id' => $this->primaryKey(),
            'tab_proveedor_mercaderia_ruc' => $this->string(13)->notNull()->unique(),
            'tab_proveedor_mercaderia_nombre' => $this->string(65)->notNull(),
            'tab_proveedor_mercaderia_empresa' => $this->string(65)->notNull(),
            'tab_proveedor_mercaderia_responsable' => $this->string(45)->notNull(),
            'tab_proveedor_mercaderia_telefono' => $this->string(15)->notNull(),
            'tab_proveedor_mercaderia_direccion' => $this->text()->notNull(),
            'tab_proveedor_mercaderia_email' => $this->string(80)->notNull(),
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('tab_proveedor_mercaderia');
    }
}
