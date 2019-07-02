<?php

use yii\db\Migration;

/**
 * Handles the creation of table `tab_negocio_sucursal`.
 * Has foreign keys to the tables:
 *
 * - `tab_negocio_representante`
 * - `tab_negocio_ciudad`
 */
class m171003_031930_create_tab_negocio_sucursal_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('tab_negocio_sucursal', [
            'tab_negocio_sucursal_id' => $this->primaryKey(),
            'tab_negocio_sucursal_nombre' => $this->string(45)->notNull()->unique(),
            'tab_negocio_sucursal_direccion' => $this->text()->notNull(),
            'tab_negocio_sucursal_telefono' => $this->string(15)->notNull(),
            'tab_negocio_sucursal_email' => $this->string(45)->notNull(),
            'fk_tab_negocio_representante_id' => $this->integer()->notNull(),
            'fk_tab_negocio_ciudad_id' => $this->integer()->notNull(),
        ]);

        // creates index for column `fk_tab_negocio_representante_id`
        $this->createIndex(
            'idx-tab_negocio_sucursal-fk_tab_negocio_representante_id',
            'tab_negocio_sucursal',
            'fk_tab_negocio_representante_id'
        );

        // add foreign key for table `tab_negocio_representante`
        $this->addForeignKey(
            'fk-tab_negocio_sucursal-fk_tab_negocio_representante_id',
            'tab_negocio_sucursal',
            'fk_tab_negocio_representante_id',
            'tab_negocio_representante',
            'tab_negocio_representante_id',
            'CASCADE'
        );

        // creates index for column `fk_tab_negocio_ciudad_id`
        $this->createIndex(
            'idx-tab_negocio_sucursal-fk_tab_negocio_ciudad_id',
            'tab_negocio_sucursal',
            'fk_tab_negocio_ciudad_id'
        );

        // add foreign key for table `tab_negocio_ciudad`
        $this->addForeignKey(
            'fk-tab_negocio_sucursal-fk_tab_negocio_ciudad_id',
            'tab_negocio_sucursal',
            'fk_tab_negocio_ciudad_id',
            'tab_negocio_ciudad',
            'tab_negocio_ciudad_id',
            'CASCADE'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        // drops foreign key for table `tab_negocio_representante`
        $this->dropForeignKey(
            'fk-tab_negocio_sucursal-fk_tab_negocio_representante_id',
            'tab_negocio_sucursal'
        );

        // drops index for column `fk_tab_negocio_representante_id`
        $this->dropIndex(
            'idx-tab_negocio_sucursal-fk_tab_negocio_representante_id',
            'tab_negocio_sucursal'
        );

        // drops foreign key for table `tab_negocio_ciudad`
        $this->dropForeignKey(
            'fk-tab_negocio_sucursal-fk_tab_negocio_ciudad_id',
            'tab_negocio_sucursal'
        );

        // drops index for column `fk_tab_negocio_ciudad_id`
        $this->dropIndex(
            'idx-tab_negocio_sucursal-fk_tab_negocio_ciudad_id',
            'tab_negocio_sucursal'
        );

        $this->dropTable('tab_negocio_sucursal');
    }
}
