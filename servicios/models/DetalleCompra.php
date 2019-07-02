<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "detalle_compra".
 *
 * @property integer $detalle_compra_id
 * @property integer $detalle_compra_cantidad
 * @property string $detalle_compra_valor_unit
 * @property string $detalle_compra_valor_total
 * @property integer $fk_tap_producto_id
 * @property integer $fk_datos_compra_id
 * @property string $detalle_compra_valor_venta
 * @property integer $detalle_compra_iva
 * @property string $detalle_compra_ganancia
 * @property string $detalle_compra_costo
 * @property integer $usuario_id
 *
 * @property DatosCompra $fkDatosCompra
 * @property TabProducto $fkTapProducto
 */
class DetalleCompra extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'detalle_compra';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['detalle_compra_cantidad', 'detalle_compra_valor_unit', 'detalle_compra_valor_total', 'fk_tap_producto_id', 'fk_datos_compra_id', 'detalle_compra_valor_venta', 'detalle_compra_ganancia', 'detalle_compra_costo'], 'required'],
            [['detalle_compra_cantidad', 'fk_tap_producto_id', 'fk_datos_compra_id', 'detalle_compra_iva', 'usuario_id'], 'integer'],
            [['detalle_compra_valor_unit', 'detalle_compra_valor_total', 'detalle_compra_valor_venta', 'detalle_compra_ganancia', 'detalle_compra_costo'], 'number'],
            [['fk_datos_compra_id'], 'exist', 'skipOnError' => true, 'targetClass' => DatosCompra::className(), 'targetAttribute' => ['fk_datos_compra_id' => 'datos_compra_id']],
            [['fk_tap_producto_id'], 'exist', 'skipOnError' => true, 'targetClass' => TabProducto::className(), 'targetAttribute' => ['fk_tap_producto_id' => 'tab_producto_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'detalle_compra_id' => 'Detalle Compra ID',
            'detalle_compra_cantidad' => 'Detalle Compra Cantidad',
            'detalle_compra_valor_unit' => 'Detalle Compra Valor Unit',
            'detalle_compra_valor_total' => 'Detalle Compra Valor Total',
            'fk_tap_producto_id' => 'Fk Tap Producto ID',
            'fk_datos_compra_id' => 'Fk Datos Compra ID',
            'detalle_compra_valor_venta' => 'Detalle Compra Valor Venta',
            'detalle_compra_iva' => 'Detalle Compra Iva',
            'detalle_compra_ganancia' => 'Detalle Compra Ganancia',
            'detalle_compra_costo' => 'Detalle Compra Costo',
            'usuario_id' => 'Usuario ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFkDatosCompra()
    {
        return $this->hasOne(DatosCompra::className(), ['datos_compra_id' => 'fk_datos_compra_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFkTapProducto()
    {
        return $this->hasOne(TabProducto::className(), ['tab_producto_id' => 'fk_tap_producto_id']);
    }
}
