<?php

use yii\db\Migration;

/**
 * Handles the creation of table `tab_negocio_representante`.
 */
class m170929_180355_create_tab_negocio_representante_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('tab_negocio_representante', [
            'tab_negocio_representante_id' => $this->primaryKey(),
            'tab_negocio_representante_ruc_ci' => $this->string(13)->notNull()->unique(),
            'tab_negocio_representante_nombre' => $this->string(45)->notNull(),
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('tab_negocio_representante');
    }
}
