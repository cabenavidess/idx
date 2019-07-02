<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tab_cliente".
 *
 * @property integer $tab_cliente_id
 * @property string $tab_cliente_ruc_ci
 * @property string $tab_cliente_nombre_empresa
 * @property string $tab_cliente_direccion
 * @property string $tab_cliente_telefono
 * @property string $tab_cliente_email
 */
class TabCliente extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tab_cliente';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['tab_cliente_ruc_ci', 'tab_cliente_nombre_empresa', 'tab_cliente_direccion', 'tab_cliente_telefono'], 'required'],
            [['tab_cliente_direccion'], 'string'],
            [['tab_cliente_ruc_ci'], 'string', 'max' => 13],
            [['tab_cliente_nombre_empresa'], 'string', 'max' => 65],
            [['tab_cliente_telefono'], 'string', 'max' => 15],
            [['tab_cliente_email'], 'string', 'max' => 80],
            [['tab_cliente_ruc_ci'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'tab_cliente_id' => 'Tab Cliente ID',
            'tab_cliente_ruc_ci' => 'Tab Cliente Ruc Ci',
            'tab_cliente_nombre_empresa' => 'Tab Cliente Nombre Empresa',
            'tab_cliente_direccion' => 'Tab Cliente Direccion',
            'tab_cliente_telefono' => 'Tab Cliente Telefono',
            'tab_cliente_email' => 'Tab Cliente Email',
        ];
    }
}
