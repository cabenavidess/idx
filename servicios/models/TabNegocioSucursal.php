<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tab_negocio_sucursal".
 *
 * @property integer $tab_negocio_sucursal_id
 * @property string $tab_negocio_sucursal_nombre
 * @property string $tab_negocio_sucursal_direccion
 * @property string $tab_negocio_sucursal_telefono
 * @property string $tab_negocio_sucursal_email
 * @property integer $fk_tab_negocio_representante_id
 * @property integer $fk_tab_negocio_ciudad_id
 *
 * @property TabNegocioCiudad $fkTabNegocioCiudad
 * @property TabNegocioRepresentante $fkTabNegocioRepresentante
 * @property VentaDatos[] $ventaDatos
 */
class TabNegocioSucursal extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tab_negocio_sucursal';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['tab_negocio_sucursal_nombre', 'tab_negocio_sucursal_direccion', 'tab_negocio_sucursal_telefono', 'tab_negocio_sucursal_email', 'fk_tab_negocio_representante_id', 'fk_tab_negocio_ciudad_id'], 'required'],
            [['tab_negocio_sucursal_direccion'], 'string'],
            [['fk_tab_negocio_representante_id', 'fk_tab_negocio_ciudad_id'], 'integer'],
            [['tab_negocio_sucursal_nombre', 'tab_negocio_sucursal_email'], 'string', 'max' => 45],
            [['tab_negocio_sucursal_telefono'], 'string', 'max' => 15],
            [['tab_negocio_sucursal_nombre'], 'unique'],
            [['fk_tab_negocio_ciudad_id'], 'exist', 'skipOnError' => true, 'targetClass' => TabNegocioCiudad::className(), 'targetAttribute' => ['fk_tab_negocio_ciudad_id' => 'tab_negocio_ciudad_id']],
            [['fk_tab_negocio_representante_id'], 'exist', 'skipOnError' => true, 'targetClass' => TabNegocioRepresentante::className(), 'targetAttribute' => ['fk_tab_negocio_representante_id' => 'tab_negocio_representante_id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'tab_negocio_sucursal_id' => 'Tab Negocio Sucursal ID',
            'tab_negocio_sucursal_nombre' => 'Tab Negocio Sucursal Nombre',
            'tab_negocio_sucursal_direccion' => 'Tab Negocio Sucursal Direccion',
            'tab_negocio_sucursal_telefono' => 'Tab Negocio Sucursal Telefono',
            'tab_negocio_sucursal_email' => 'Tab Negocio Sucursal Email',
            'fk_tab_negocio_representante_id' => 'Fk Tab Negocio Representante ID',
            'fk_tab_negocio_ciudad_id' => 'Fk Tab Negocio Ciudad ID',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFkTabNegocioCiudad()
    {
        return $this->hasOne(TabNegocioCiudad::className(), ['tab_negocio_ciudad_id' => 'fk_tab_negocio_ciudad_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFkTabNegocioRepresentante()
    {
        return $this->hasOne(TabNegocioRepresentante::className(), ['tab_negocio_representante_id' => 'fk_tab_negocio_representante_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVentaDatos()
    {
        return $this->hasMany(VentaDatos::className(), ['fk_sucursal_id' => 'tab_negocio_sucursal_id']);
    }
}
