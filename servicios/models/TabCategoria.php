<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tab_categoria".
 *
 * @property integer $tab_categoria_id
 * @property string $tab_categoria_nombre
 * @property string $tab_categoria_descripcion
 * @property integer $tab_categoria_status
 * @property string $tab_categoria_icono
 *
 * @property TabMarca[] $tabMarcas
 */
class TabCategoria extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tab_categoria';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['tab_categoria_nombre', 'tab_categoria_descripcion'], 'required'],
            [['tab_categoria_descripcion'], 'string'],
            [['tab_categoria_status'], 'integer'],
            [['tab_categoria_nombre', 'tab_categoria_icono'], 'string', 'max' => 45],
            [['tab_categoria_nombre'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'tab_categoria_id' => 'Tab Categoria ID',
            'tab_categoria_nombre' => 'Tab Categoria Nombre',
            'tab_categoria_descripcion' => 'Tab Categoria Descripcion',
            'tab_categoria_status' => 'Tab Categoria Status',
            'tab_categoria_icono' => 'Tab Categoria Icono',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTabMarcas()
    {
        return $this->hasMany(TabMarca::className(), ['fk_tab_categoria_id' => 'tab_categoria_id']);
    }
}
