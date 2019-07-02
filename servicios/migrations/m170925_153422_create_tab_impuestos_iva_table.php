<?php

use yii\db\Migration;

/**
 * Handles the creation of table `tab_impuestos_iva`.
 */
class m170925_153422_create_tab_impuestos_iva_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('tab_impuestos_iva', [
            'tab_impuestos_iva_id' => $this->primaryKey(),
            'tab_impuestos_iva_nombre' => $this->string(45)->notNull(),
            'tab_impuestos_iva_descripcion' => $this->string(45)->notNull(),
            'tab_impuestos_iva_valor' => $this->decimal(7,2)->notNull(),
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('tab_impuestos_iva');
    }
}
