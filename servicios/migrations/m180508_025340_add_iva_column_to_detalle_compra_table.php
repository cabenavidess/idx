<?php

use yii\db\Migration;

/**
 * Handles adding iva to table `detalle_compra`.
 */
class m180508_025340_add_iva_column_to_detalle_compra_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->addColumn('detalle_compra', 'detalle_compra_iva', $this->boolean());
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropColumn('detalle_compra', 'detalle_compra_iva');
    }
}
