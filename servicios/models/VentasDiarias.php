<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "ventas_diarias".
 *
 * @property integer $forma_pago_id
 * @property string $forma_pago_nombre
 * @property string $total
 */
class VentasDiarias extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'ventas_diarias';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['forma_pago_id'], 'integer'],
            [['forma_pago_nombre'], 'required'],
            [['total'], 'number'],
            [['forma_pago_nombre'], 'string', 'max' => 40],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'forma_pago_id' => 'Forma Pago ID',
            'forma_pago_nombre' => 'Forma Pago Nombre',
            'total' => 'Total',
        ];
    }
}
