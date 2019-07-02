<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "movimientos".
 *
 * @property string $kardex_movimiento
 * @property string $kardex_fecha
 * @property string $tab_producto_nombre
 * @property string $tab_producto_descripcion
 * @property string $tab_producto_imagen
 * @property integer $kardex_cantidad
 * @property string $kardex_precio
 */
class Movimientos extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'movimientos';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['kardex_movimiento', 'tab_producto_descripcion', 'tab_producto_imagen'], 'string'],
            [['kardex_fecha', 'tab_producto_nombre', 'tab_producto_descripcion', 'tab_producto_imagen', 'kardex_cantidad', 'kardex_precio'], 'required'],
            [['kardex_fecha'], 'safe'],
            [['kardex_cantidad'], 'integer'],
            [['kardex_precio'], 'number'],
            [['tab_producto_nombre'], 'string', 'max' => 45],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'kardex_movimiento' => 'Kardex Movimiento',
            'kardex_fecha' => 'Kardex Fecha',
            'tab_producto_nombre' => 'Tab Producto Nombre',
            'tab_producto_descripcion' => 'Tab Producto Descripcion',
            'tab_producto_imagen' => 'Tab Producto Imagen',
            'kardex_cantidad' => 'Kardex Cantidad',
            'kardex_precio' => 'Kardex Precio',
        ];
    }
}
