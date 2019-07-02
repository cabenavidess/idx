<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tab_impuestos_iva".
 *
 * @property integer $tab_impuestos_iva_id
 * @property string $tab_impuestos_iva_nombre
 * @property string $tab_impuestos_iva_descripcion
 * @property string $tab_impuestos_iva_valor
 */
class TabImpuestosIva extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tab_impuestos_iva';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['tab_impuestos_iva_nombre', 'tab_impuestos_iva_descripcion', 'tab_impuestos_iva_valor'], 'required'],
            [['tab_impuestos_iva_valor'], 'number'],
            [['tab_impuestos_iva_nombre', 'tab_impuestos_iva_descripcion'], 'string', 'max' => 45],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'tab_impuestos_iva_id' => 'Tab Impuestos Iva ID',
            'tab_impuestos_iva_nombre' => 'Tab Impuestos Iva Nombre',
            'tab_impuestos_iva_descripcion' => 'Tab Impuestos Iva Descripcion',
            'tab_impuestos_iva_valor' => 'Tab Impuestos Iva Valor',
        ];
    }
}
