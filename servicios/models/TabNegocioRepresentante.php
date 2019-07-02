<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tab_negocio_representante".
 *
 * @property integer $tab_negocio_representante_id
 * @property string $tab_negocio_representante_ruc_ci
 * @property string $tab_negocio_representante_nombre
 *
 * @property TabNegocioSucursal[] $tabNegocioSucursals
 */
class TabNegocioRepresentante extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tab_negocio_representante';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['tab_negocio_representante_ruc_ci', 'tab_negocio_representante_nombre'], 'required'],
            [['tab_negocio_representante_ruc_ci'], 'string', 'max' => 13],
            [['tab_negocio_representante_nombre'], 'string', 'max' => 45],
            [['tab_negocio_representante_ruc_ci'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'tab_negocio_representante_id' => 'Tab Negocio Representante ID',
            'tab_negocio_representante_ruc_ci' => 'Tab Negocio Representante Ruc Ci',
            'tab_negocio_representante_nombre' => 'Tab Negocio Representante Nombre',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTabNegocioSucursals()
    {
        return $this->hasMany(TabNegocioSucursal::className(), ['fk_tab_negocio_representante_id' => 'tab_negocio_representante_id']);
    }
}
