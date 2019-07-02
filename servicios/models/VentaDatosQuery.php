<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[VentaDatos]].
 *
 * @see VentaDatos
 */
class VentaDatosQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * @inheritdoc
     * @return VentaDatos[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * @inheritdoc
     * @return VentaDatos|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
