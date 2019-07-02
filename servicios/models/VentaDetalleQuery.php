<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[VentaDetalle]].
 *
 * @see VentaDetalle
 */
class VentaDetalleQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * @inheritdoc
     * @return VentaDetalle[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * @inheritdoc
     * @return VentaDetalle|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
