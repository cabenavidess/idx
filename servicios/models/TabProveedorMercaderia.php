<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tab_proveedor_mercaderia".
 *
 * @property integer $tab_proveedor_mercaderia_id
 * @property string $tab_proveedor_mercaderia_ruc
 * @property string $tab_proveedor_mercaderia_nombre
 * @property string $tab_proveedor_mercaderia_empresa
 * @property string $tab_proveedor_mercaderia_responsable
 * @property string $tab_proveedor_mercaderia_telefono
 * @property string $tab_proveedor_mercaderia_direccion
 * @property string $tab_proveedor_mercaderia_email
 */
class TabProveedorMercaderia extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tab_proveedor_mercaderia';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['tab_proveedor_mercaderia_ruc', 'tab_proveedor_mercaderia_nombre', 'tab_proveedor_mercaderia_empresa', 'tab_proveedor_mercaderia_responsable', 'tab_proveedor_mercaderia_telefono', 'tab_proveedor_mercaderia_direccion', 'tab_proveedor_mercaderia_email'], 'required'],
            [['tab_proveedor_mercaderia_direccion'], 'string'],
            [['tab_proveedor_mercaderia_ruc'], 'string', 'max' => 13],
            [['tab_proveedor_mercaderia_nombre', 'tab_proveedor_mercaderia_empresa'], 'string', 'max' => 65],
            [['tab_proveedor_mercaderia_responsable'], 'string', 'max' => 45],
            [['tab_proveedor_mercaderia_telefono'], 'string', 'max' => 15],
            [['tab_proveedor_mercaderia_email'], 'string', 'max' => 80],
            [['tab_proveedor_mercaderia_ruc'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'tab_proveedor_mercaderia_id' => 'Tab Proveedor Mercaderia ID',
            'tab_proveedor_mercaderia_ruc' => 'Tab Proveedor Mercaderia Ruc',
            'tab_proveedor_mercaderia_nombre' => 'Tab Proveedor Mercaderia Nombre',
            'tab_proveedor_mercaderia_empresa' => 'Tab Proveedor Mercaderia Empresa',
            'tab_proveedor_mercaderia_responsable' => 'Tab Proveedor Mercaderia Responsable',
            'tab_proveedor_mercaderia_telefono' => 'Tab Proveedor Mercaderia Telefono',
            'tab_proveedor_mercaderia_direccion' => 'Tab Proveedor Mercaderia Direccion',
            'tab_proveedor_mercaderia_email' => 'Tab Proveedor Mercaderia Email',
        ];
    }
}
