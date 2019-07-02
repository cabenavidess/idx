<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tab_producto".
 *
 * @property integer $tab_producto_id
 * @property string $tab_producto_codigo
 * @property string $tab_producto_nombre
 * @property string $tab_producto_descripcion
 * @property string $tab_producto_imagen
 * @property integer $tab_producto_status
 * @property integer $fk_tab_marca_id
 * @property boolean $tab_producto_iva
 *
 * @property DetalleCompra[] $detalleCompras
 * @property ReservaDetalle[] $reservaDetalles
 * @property TabMarca $fkTabMarca
 * @property VentaDetalle[] $ventaDetalles
 */
class TabProducto extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tab_producto';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['tab_producto_codigo', 'tab_producto_nombre', 'tab_producto_descripcion', 'fk_tab_marca_id'], 'required'],
            [['tab_producto_descripcion', 'tab_producto_imagen'], 'string'],
            [['tab_producto_status', 'fk_tab_marca_id'], 'integer'],
            [['tab_producto_iva'], 'boolean'],
            [['tab_producto_codigo'], 'string', 'max' => 128],
            [['tab_producto_nombre'], 'string', 'max' => 45],
            [['tab_producto_codigo'], 'unique'],
            [['tab_producto_nombre'], 'unique'],
            [['fk_tab_marca_id'], 'exist', 'skipOnError' => true, 'targetClass' => TabMarca::className(), 'targetAttribute' => ['fk_tab_marca_id' => 'tab_marca_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'tab_producto_id' => 'Tab Producto ID',
            'tab_producto_codigo' => 'Tab Producto Codigo',
            'tab_producto_nombre' => 'Tab Producto Nombre',
            'tab_producto_descripcion' => 'Tab Producto Descripcion',
            'tab_producto_imagen' => 'Tab Producto Imagen',
            'tab_producto_status' => 'Tab Producto Status',
            'fk_tab_marca_id' => 'Fk Tab Marca ID',
            'tab_producto_iva' => 'Tab Producto Iva',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDetalleCompras()
    {
        return $this->hasMany(DetalleCompra::className(), ['fk_tap_producto_id' => 'tab_producto_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getReservaDetalles()
    {
        return $this->hasMany(ReservaDetalle::className(), ['fk_producto_id' => 'tab_producto_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFkTabMarca()
    {
        return $this->hasOne(TabMarca::className(), ['tab_marca_id' => 'fk_tab_marca_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVentaDetalles()
    {
        return $this->hasMany(VentaDetalle::className(), ['fk_tab_producto_id' => 'tab_producto_id']);
    }
}
