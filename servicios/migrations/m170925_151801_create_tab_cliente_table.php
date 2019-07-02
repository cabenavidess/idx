<?php

use yii\db\Migration;

/**
 * Handles the creation of table `tab_cliente`.
 */
class m170925_151801_create_tab_cliente_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('tab_cliente', [
            'tab_cliente_id' => $this->primaryKey(),
            'tab_cliente_ruc_ci' => $this->string(13)->unique()->notNull(),
            'tab_cliente_nombre_empresa' => $this->string(65)->notNull(),
            'tab_cliente_direccion' => $this->text()->notNull(),
            'tab_cliente_telefono' => $this->string(15)->notNull(),
            'tab_cliente_email' => $this->string(80),
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('tab_cliente');
    }
}
