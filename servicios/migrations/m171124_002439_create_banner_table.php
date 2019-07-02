<?php

use yii\db\Migration;

/**
 * Handles the creation of table `banner`.
 */
class m171124_002439_create_banner_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('banner', [
            'banner_id' => $this->primaryKey(),
            'banner_titulo' => $this->string(45),
            'banner_url' => $this->text()->notNull(),
            'banner_descripcion' => $this->string(80),
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('banner');
    }
}
