<?php

use yii\db\Migration;

/**
 * Handles adding icono to table `tab_categoria`.
 */
class m180427_180854_add_icono_column_to_tab_categoria_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->addColumn('tab_categoria', 'tab_categoria_icono', $this->string(45));
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropColumn('tab_categoria', 'tab_categoria_icono');
    }
}
