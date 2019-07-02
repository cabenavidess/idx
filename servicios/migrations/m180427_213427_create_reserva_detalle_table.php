<?php

use yii\db\Migration;

/**
 * Handles the creation of table `reserva_detalle`.
 * Has foreign keys to the tables:
 *
 * - `reserva`
 * - `tab_producto`
 */
class m180427_213427_create_reserva_detalle_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('reserva_detalle', [
            'reserva_detalle_id' => $this->primaryKey(),
            'fk_reserva_id' => $this->integer()->notNull(),
            'fk_producto_id' => $this->integer()->notNull(),
        ]);

        // creates index for column `fk_reserva_id`
        $this->createIndex(
            'idx-reserva_detalle-fk_reserva_id',
            'reserva_detalle',
            'fk_reserva_id'
        );

        // add foreign key for table `reserva`
        $this->addForeignKey(
            'fk-reserva_detalle-fk_reserva_id',
            'reserva_detalle',
            'fk_reserva_id',
            'reserva',
            'reserva_id',
            'CASCADE'
        );

        // creates index for column `fk_producto_id`
        $this->createIndex(
            'idx-reserva_detalle-fk_producto_id',
            'reserva_detalle',
            'fk_producto_id'
        );

        // add foreign key for table `tab_producto`
        $this->addForeignKey(
            'fk-reserva_detalle-fk_producto_id',
            'reserva_detalle',
            'fk_producto_id',
            'tab_producto',
            'tab_producto_id',
            'CASCADE'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        // drops foreign key for table `reserva`
        $this->dropForeignKey(
            'fk-reserva_detalle-fk_reserva_id',
            'reserva_detalle'
        );

        // drops index for column `fk_reserva_id`
        $this->dropIndex(
            'idx-reserva_detalle-fk_reserva_id',
            'reserva_detalle'
        );

        // drops foreign key for table `tab_producto`
        $this->dropForeignKey(
            'fk-reserva_detalle-fk_producto_id',
            'reserva_detalle'
        );

        // drops index for column `fk_producto_id`
        $this->dropIndex(
            'idx-reserva_detalle-fk_producto_id',
            'reserva_detalle'
        );

        $this->dropTable('reserva_detalle');
    }
}
