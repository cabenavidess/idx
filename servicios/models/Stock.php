<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "stock".
 *
 * @property integer $producto_id
 * @property string $codigo
 * @property string $nombre
 * @property string $precio
 * @property string $entradas
 * @property string $salidas
 * @property string $stock
 * @property string $imagen
 * @property string $iva
 * @property string $descripcion
 * @property string $marca
 * @property string $categoria
 * @property integer $quantity
 * @property integer $descuento
 */
class Stock extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'stock';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['producto_id', 'codigo', 'nombre', 'imagen', 'descripcion', 'marca', 'categoria'], 'required'],
            [['producto_id', 'quantity', 'descuento'], 'integer'],
            [['precio', 'entradas', 'salidas', 'stock'], 'number'],
            [['imagen', 'descripcion'], 'string'],
            [['codigo'], 'string', 'max' => 128],
            [['nombre', 'marca', 'categoria'], 'string', 'max' => 45],
            [['iva'], 'string', 'max' => 2],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'producto_id' => 'Producto ID',
            'codigo' => 'Codigo',
            'nombre' => 'Nombre',
            'precio' => 'Precio',
            'entradas' => 'Entradas',
            'salidas' => 'Salidas',
            'stock' => 'Stock',
            'imagen' => 'Imagen',
            'iva' => 'Iva',
            'descripcion' => 'Descripcion',
            'marca' => 'Marca',
            'categoria' => 'Categoria',
            'quantity' => 'Quantity',
            'descuento' => 'Descuento',
        ];
    }
}
