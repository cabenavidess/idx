<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[FormaPago]].
 *
 * @see FormaPago
 */
class FormaPagoQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * @inheritdoc
     * @return FormaPago[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * @inheritdoc
     * @return FormaPago|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
