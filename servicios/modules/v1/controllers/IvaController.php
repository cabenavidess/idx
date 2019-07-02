<?php
    namespace app\modules\v1\controllers;

    use yii\rest\ActiveController;
    use yii\web\Response;
    
class IvaController extends ActiveController
{
    public $modelClass = 'app\models\TabImpuestosIva';

    public function behaviors()
    {
        #$behaviors = parent::behaviors();
        #CORS
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                   'Access-Control-Allow-Origin' => ['*'],
                   'Origin' => ['*'],
                // 'Access-Control-Request-Method' => ['GET'],
                // 'Access-Control-Request-Headers' => ['*'],
                // 'Access-Control-Allow-Credentials' => true,
                //'Access-Control-Max-Age' => 86400,
            ],
        ];
        $behaviors['contentNegotiator'] = [
            'class'   => 'yii\filters\ContentNegotiator',
            'formats' => [
                'text/html'        => Response::FORMAT_JSON,
                'application/json' => Response::FORMAT_JSON,
                'application/xml'  => Response::FORMAT_XML,
            ],
        ];

        return $behaviors;
    }

}