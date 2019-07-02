<?php

use yii\db\Migration;

/**
 * Handles the creation of table `reserva`.
 * Has foreign keys to the tables:
 *
 * - `user`
 */
class m180427_212805_create_reserva_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('reserva', [
            'reserva_id' => $this->primaryKey(),
            'usuario_id' => $this->integer()->notNull(),
            'reserva_fecha' => $this->dateTime()->notNull(),
        ]);

        // creates index for column `usuario_id`
        $this->createIndex(
            'idx-reserva-usuario_id',
            'reserva',
            'usuario_id'
        );

        // add foreign key for table `user`
        $this->addForeignKey(
            'fk-reserva-usuario_id',
            'reserva',
            'usuario_id',
            'user',
            'id',
            'CASCADE'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        // drops foreign key for table `user`
        $this->dropForeignKey(
            'fk-reserva-usuario_id',
            'reserva'
        );

        // drops index for column `usuario_id`
        $this->dropIndex(
            'idx-reserva-usuario_id',
            'reserva'
        );

        $this->dropTable('reserva');
    }
}
