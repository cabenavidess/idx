<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "forma_pago".
 *
 * @property integer $forma_pago_id
 * @property string $forma_pago_nombre
 *
 * @property VentaDatos[] $ventaDatos
 */
class FormaPago extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'forma_pago';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['forma_pago_nombre'], 'required'],
            [['forma_pago_nombre'], 'string', 'max' => 40],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'forma_pago_id' => Yii::t('app', 'Forma Pago ID'),
            'forma_pago_nombre' => Yii::t('app', 'Forma Pago Nombre'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVentaDatos()
    {
        return $this->hasMany(VentaDatos::className(), ['fk_forma_pago_id' => 'forma_pago_id']);
    }

    /**
     * @inheritdoc
     * @return FormaPagoQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new FormaPagoQuery(get_called_class());
    }
}
