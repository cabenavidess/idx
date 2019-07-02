<?php

use yii\db\Migration;

/**
 * Handles adding costo to table `detalle_compra`.
 */
class m180520_160959_add_costo_column_to_detalle_compra_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->addColumn('detalle_compra', 'detalle_compra_costo', $this->decimal(7,2)->NotNull());
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropColumn('detalle_compra', 'detalle_compra_costo');
    }
}
