<?php

use yii\db\Migration;

/**
 * Handles the creation of table `tab_negocio_ciudad`.
 */
class m170925_154210_create_tab_negocio_ciudad_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('tab_negocio_ciudad', [
            'tab_negocio_ciudad_id' => $this->primaryKey(),
            'tab_negocio_ciudad_nombre' => $this->string(45)->notNull(),
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('tab_negocio_ciudad');
    }
}
