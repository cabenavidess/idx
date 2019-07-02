<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "venta_detalle".
 *
 * @property integer $venta_detalle_id
 * @property integer $fk_tab_producto_id
 * @property integer $fk_venta_id
 * @property integer $venta_detalle_cantidad
 * @property string $venta_detalle_valor_unit
 * @property integer $venta_detalle_descuento
 * @property string $venta_detalle_total
 *
 * @property TabProducto $fkTabProducto
 * @property VentaDatos $fkVenta
 */
class VentaDetalle extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'venta_detalle';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['fk_tab_producto_id', 'fk_venta_id', 'venta_detalle_cantidad', 'venta_detalle_valor_unit', 'venta_detalle_total'], 'required'],
            [['fk_tab_producto_id', 'fk_venta_id', 'venta_detalle_cantidad', 'venta_detalle_descuento'], 'integer'],
            [['venta_detalle_valor_unit', 'venta_detalle_total'], 'number'],
            [['fk_tab_producto_id'], 'exist', 'skipOnError' => true, 'targetClass' => TabProducto::className(), 'targetAttribute' => ['fk_tab_producto_id' => 'tab_producto_id']],
            [['fk_venta_id'], 'exist', 'skipOnError' => true, 'targetClass' => VentaDatos::className(), 'targetAttribute' => ['fk_venta_id' => 'venta_datos_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'venta_detalle_id' => 'Venta Detalle ID',
            'fk_tab_producto_id' => 'Fk Tab Producto ID',
            'fk_venta_id' => 'Fk Venta ID',
            'venta_detalle_cantidad' => 'Venta Detalle Cantidad',
            'venta_detalle_valor_unit' => 'Venta Detalle Valor Unit',
            'venta_detalle_descuento' => 'Venta Detalle Descuento',
            'venta_detalle_total' => 'Venta Detalle Total',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFkTabProducto()
    {
        return $this->hasOne(TabProducto::className(), ['tab_producto_id' => 'fk_tab_producto_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFkVenta()
    {
        return $this->hasOne(VentaDatos::className(), ['venta_datos_id' => 'fk_venta_id']);
    }

    /**
     * @inheritdoc
     * @return VentaDetalleQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new VentaDetalleQuery(get_called_class());
    }
}
