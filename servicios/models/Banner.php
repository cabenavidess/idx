<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "banner".
 *
 * @property integer $banner_id
 * @property string $banner_titulo
 * @property string $banner_url
 * @property string $banner_descripcion
 */
class Banner extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'banner';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['banner_url'], 'required'],
            [['banner_url'], 'string'],
            [['banner_titulo'], 'string', 'max' => 45],
            [['banner_descripcion'], 'string', 'max' => 80],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'banner_id' => 'Banner ID',
            'banner_titulo' => 'Banner Titulo',
            'banner_url' => 'Banner Url',
            'banner_descripcion' => 'Banner Descripcion',
        ];
    }
}
