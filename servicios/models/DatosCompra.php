<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "datos_compra".
 *
 * @property integer $datos_compra_id
 * @property string $datos_compra_guia
 * @property string $datos_compra_fecha
 * @property string $datos_compra_subtotal
 * @property string $datos_compra_iva
 * @property string $datos_compra_total
 * @property integer $fk_tab_proveedor_mercaderia_id
 *
 * @property TabProveedorMercaderia $fkTabProveedorMercaderia
 * @property DetalleCompra[] $detalleCompras
 */
class DatosCompra extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'datos_compra';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['datos_compra_guia', 'datos_compra_fecha', 'datos_compra_subtotal', 'datos_compra_iva', 'datos_compra_total', 'fk_tab_proveedor_mercaderia_id'], 'required'],
            [['datos_compra_fecha'], 'safe'],
            [['datos_compra_subtotal', 'datos_compra_iva', 'datos_compra_total'], 'number'],
            [['fk_tab_proveedor_mercaderia_id'], 'integer'],
            [['datos_compra_guia'], 'string', 'max' => 12],
            [['fk_tab_proveedor_mercaderia_id'], 'exist', 'skipOnError' => true, 'targetClass' => TabProveedorMercaderia::className(), 'targetAttribute' => ['fk_tab_proveedor_mercaderia_id' => 'tab_proveedor_mercaderia_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'datos_compra_id' => 'Datos Compra ID',
            'datos_compra_guia' => 'Datos Compra Guia',
            'datos_compra_fecha' => 'Datos Compra Fecha',
            'datos_compra_subtotal' => 'Datos Compra Subtotal',
            'datos_compra_iva' => 'Datos Compra Iva',
            'datos_compra_total' => 'Datos Compra Total',
            'fk_tab_proveedor_mercaderia_id' => 'Fk Tab Proveedor Mercaderia ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFkTabProveedorMercaderia()
    {
        return $this->hasOne(TabProveedorMercaderia::className(), ['tab_proveedor_mercaderia_id' => 'fk_tab_proveedor_mercaderia_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDetalleCompras()
    {
        return $this->hasMany(DetalleCompra::className(), ['fk_datos_compra_id' => 'datos_compra_id']);
    }
}
