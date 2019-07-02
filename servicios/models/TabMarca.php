<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tab_marca".
 *
 * @property integer $tab_marca_id
 * @property string $tab_marca_nombre
 * @property string $tab_marca_descripcion
 * @property integer $tab_marca_status
 * @property integer $fk_tab_categoria_id
 *
 * @property TabCategoria $fkTabCategoria
 * @property TabProducto[] $tabProductos
 */
class TabMarca extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tab_marca';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['tab_marca_nombre', 'tab_marca_descripcion', 'fk_tab_categoria_id'], 'required'],
            [['tab_marca_descripcion'], 'string'],
            [['tab_marca_status', 'fk_tab_categoria_id'], 'integer'],
            [['tab_marca_nombre'], 'string', 'max' => 45],
            [['tab_marca_nombre'], 'unique'],
            [['fk_tab_categoria_id'], 'exist', 'skipOnError' => true, 'targetClass' => TabCategoria::className(), 'targetAttribute' => ['fk_tab_categoria_id' => 'tab_categoria_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'tab_marca_id' => 'Tab Marca ID',
            'tab_marca_nombre' => 'Tab Marca Nombre',
            'tab_marca_descripcion' => 'Tab Marca Descripcion',
            'tab_marca_status' => 'Tab Marca Status',
            'fk_tab_categoria_id' => 'Fk Tab Categoria ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFkTabCategoria()
    {
        return $this->hasOne(TabCategoria::className(), ['tab_categoria_id' => 'fk_tab_categoria_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTabProductos()
    {
        return $this->hasMany(TabProducto::className(), ['fk_tab_marca_id' => 'tab_marca_id']);
    }
}
