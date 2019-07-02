<?php

use yii\db\Migration;

/**
 * Handles the creation of table `tab_producto`.
 * Has foreign keys to the tables:
 *
 * - `tab_marca`
 */
class m171011_004928_create_tab_producto_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('tab_producto', [
            'tab_producto_id' => $this->primaryKey(),
            'tab_producto_codigo' => $this->string(128)->notNull()->unique(),
            'tab_producto_nombre' => $this->string(45)->notNull()->unique(),
            'tab_producto_descripcion' => $this->text()->notNull(),
            'tab_producto_imagen' => $this->text()->notNull(),
            'tab_producto_status' => "enum('activo','inactivo')",
            'fk_tab_marca_id' => $this->integer()->notNull(),
        ]);

        // creates index for column `fk_tab_marca_id`
        $this->createIndex(
            'idx-tab_producto-fk_tab_marca_id',
            'tab_producto',
            'fk_tab_marca_id'
        );

        // add foreign key for table `tab_marca`
        $this->addForeignKey(
            'fk-tab_producto-fk_tab_marca_id',
            'tab_producto',
            'fk_tab_marca_id',
            'tab_marca',
            'tab_marca_id',
            'CASCADE'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        // drops foreign key for table `tab_marca`
        $this->dropForeignKey(
            'fk-tab_producto-fk_tab_marca_id',
            'tab_producto'
        );

        // drops index for column `fk_tab_marca_id`
        $this->dropIndex(
            'idx-tab_producto-fk_tab_marca_id',
            'tab_producto'
        );

        $this->dropTable('tab_producto');
    }
}
