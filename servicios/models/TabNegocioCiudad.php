<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tab_negocio_ciudad".
 *
 * @property integer $tab_negocio_ciudad_id
 * @property string $tab_negocio_ciudad_nombre
 *
 * @property TabNegocioSucursal[] $tabNegocioSucursals
 */
class TabNegocioCiudad extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tab_negocio_ciudad';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['tab_negocio_ciudad_nombre'], 'required'],
            [['tab_negocio_ciudad_nombre'], 'string', 'max' => 45],
            [['tab_negocio_ciudad_nombre'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'tab_negocio_ciudad_id' => 'Tab Negocio Ciudad ID',
            'tab_negocio_ciudad_nombre' => 'Tab Negocio Ciudad Nombre',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTabNegocioSucursals()
    {
        return $this->hasMany(TabNegocioSucursal::className(), ['fk_tab_negocio_ciudad_id' => 'tab_negocio_ciudad_id']);
    }
}
