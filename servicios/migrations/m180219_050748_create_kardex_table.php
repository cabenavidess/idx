<?php

use yii\db\Migration;

/**
 * Handles the creation of table `kardex`.
 */
class m180219_050748_create_kardex_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('kardex', [
            'kardex_id' => $this->primaryKey(),
            'kardex_movimiento' => "ENUM('ENTRADA','SALIDA')",
            'kardex_fecha' => $this->dateTime()->notNull(),
            'kardex_detalle' => $this->text()->notNull(),
            'kardex_cantidad' => $this->integer()->notNull(),
            'kardex_precio' => $this->decimal(8,2)->notNull(),
            'kardex_stock' => $this->integer(),
            'producto_id' => $this->integer()->notNull(),
            'negocio_id' => $this->integer()->notNull(),
            'usuario_id' => $this->integer()->notNull(),
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('kardex');
    }
}
