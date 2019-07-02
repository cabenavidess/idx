<?php

use yii\db\Migration;

/**
 * Handles the creation of table `tab_categoria`.
 */
class m171011_002951_create_tab_categoria_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('tab_categoria', [
            'tab_categoria_id' => $this->primaryKey(),
            'tab_categoria_nombre' => $this->string(45)->notNull()->unique(),
            'tab_categoria_descripcion' => $this->text()->notNull(),
            'tab_categoria_status' => "enum('activo','inactivo')",
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('tab_categoria');
    }
}
