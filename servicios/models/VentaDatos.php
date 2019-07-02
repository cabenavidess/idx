<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "venta_datos".
 *
 * @property integer $venta_datos_id
 * @property integer $fk_sucursal_id
 * @property integer $fk_tab_cliente_id
 * @property integer $venta_datos_nro_factura
 * @property string $venta_datos_fecha
 * @property integer $fk_forma_pago_id
 * @property string $venta_datos_subtotal
 * @property string $venta_datos_subtotal_cero
 * @property string $venta_datos_iva
 * @property string $venta_datos_total
 *
 * @property FormaPago $fkFormaPago
 * @property TabNegocioSucursal $fkSucursal
 * @property TabCliente $fkTabCliente
 * @property VentaDetalle[] $ventaDetalles
 */
class VentaDatos extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'venta_datos';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['fk_sucursal_id', 'fk_tab_cliente_id', 'venta_datos_nro_factura', 'venta_datos_fecha', 'fk_forma_pago_id', 'venta_datos_total'], 'required'],
            [['fk_sucursal_id', 'fk_tab_cliente_id', 'venta_datos_nro_factura', 'fk_forma_pago_id'], 'integer'],
            [['venta_datos_fecha'], 'safe'],
            [['venta_datos_subtotal', 'venta_datos_subtotal_cero', 'venta_datos_iva', 'venta_datos_total'], 'number'],
            [['fk_forma_pago_id'], 'exist', 'skipOnError' => true, 'targetClass' => FormaPago::className(), 'targetAttribute' => ['fk_forma_pago_id' => 'forma_pago_id']],
            [['fk_sucursal_id'], 'exist', 'skipOnError' => true, 'targetClass' => TabNegocioSucursal::className(), 'targetAttribute' => ['fk_sucursal_id' => 'tab_negocio_sucursal_id']],
            [['fk_tab_cliente_id'], 'exist', 'skipOnError' => true, 'targetClass' => TabCliente::className(), 'targetAttribute' => ['fk_tab_cliente_id' => 'tab_cliente_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'venta_datos_id' => 'Venta Datos ID',
            'fk_sucursal_id' => 'Fk Sucursal ID',
            'fk_tab_cliente_id' => 'Fk Tab Cliente ID',
            'venta_datos_nro_factura' => 'Venta Datos Nro Factura',
            'venta_datos_fecha' => 'Venta Datos Fecha',
            'fk_forma_pago_id' => 'Fk Forma Pago ID',
            'venta_datos_subtotal' => 'Venta Datos Subtotal',
            'venta_datos_subtotal_cero' => 'Venta Datos Subtotal Cero',
            'venta_datos_iva' => 'Venta Datos Iva',
            'venta_datos_total' => 'Venta Datos Total',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFkFormaPago()
    {
        return $this->hasOne(FormaPago::className(), ['forma_pago_id' => 'fk_forma_pago_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFkSucursal()
    {
        return $this->hasOne(TabNegocioSucursal::className(), ['tab_negocio_sucursal_id' => 'fk_sucursal_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFkTabCliente()
    {
        return $this->hasOne(TabCliente::className(), ['tab_cliente_id' => 'fk_tab_cliente_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVentaDetalles()
    {
        return $this->hasMany(VentaDetalle::className(), ['fk_venta_id' => 'venta_datos_id']);
    }

    /**
     * @inheritdoc
     * @return VentaDatosQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new VentaDatosQuery(get_called_class());
    }
}
