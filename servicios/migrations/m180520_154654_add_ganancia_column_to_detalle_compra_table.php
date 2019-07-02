<?php

use yii\db\Migration;

/**
 * Handles adding ganancia to table `detalle_compra`.
 */
class m180520_154654_add_ganancia_column_to_detalle_compra_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->addColumn('detalle_compra', 'detalle_compra_ganancia', $this->decimal(7,2)->NotNull());
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropColumn('detalle_compra', 'detalle_compra_ganancia');
    }
}
