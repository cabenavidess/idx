<?php

use yii\db\Migration;

/**
 * Handles the creation of table `forma_pago`.
 */
class m180606_023627_create_forma_pago_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('forma_pago', [
            'forma_pago_id' => $this->primaryKey(),
            'forma_pago_nombre' => $this->string(40)->notNull(),
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('forma_pago');
    }
}
