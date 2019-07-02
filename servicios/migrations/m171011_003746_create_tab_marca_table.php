<?php

use yii\db\Migration;

/**
 * Handles the creation of table `tab_marca`.
 * Has foreign keys to the tables:
 *
 * - `tab_categoria`
 */
class m171011_003746_create_tab_marca_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('tab_marca', [
            'tab_marca_id' => $this->primaryKey(),
            'tab_marca_nombre' => $this->string(45)->notNull()->unique(),
            'tab_marca_descripcion' => $this->text()->notNull(),
            'tab_marca_status' => "enum('activo','inactivo')",
            'fk_tab_categoria_id' => $this->integer()->notNull(),
        ]);

        // creates index for column `fk_tab_categoria_id`
        $this->createIndex(
            'idx-tab_marca-fk_tab_categoria_id',
            'tab_marca',
            'fk_tab_categoria_id'
        );

        // add foreign key for table `tab_categoria`
        $this->addForeignKey(
            'fk-tab_marca-fk_tab_categoria_id',
            'tab_marca',
            'fk_tab_categoria_id',
            'tab_categoria',
            'tab_categoria_id',
            'CASCADE'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        // drops foreign key for table `tab_categoria`
        $this->dropForeignKey(
            'fk-tab_marca-fk_tab_categoria_id',
            'tab_marca'
        );

        // drops index for column `fk_tab_categoria_id`
        $this->dropIndex(
            'idx-tab_marca-fk_tab_categoria_id',
            'tab_marca'
        );

        $this->dropTable('tab_marca');
    }
}
