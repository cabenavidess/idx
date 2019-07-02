<?php
    namespace app\modules\v1\controllers;
    
    use app\filters\auth\HttpBearerAuth;
    use yii;
    use yii\rest\ActiveController;
    use yii\filters\AccessControl;
    use yii\web\Response;
    use yii\filters\auth\CompositeAuth;


class CategoriaController extends ActiveController
{
    public $modelClass = 'app\models\TabCategoria';


    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['authenticator'] = [
            'class' => CompositeAuth::className(),
            'authMethods' => [
                HttpBearerAuth::className(),
            ],

        ];

        $behaviors['verbs'] = [
            'class' => \yii\filters\VerbFilter::className(),
            'actions' => [
                'index'  => ['get'],
                'view'   => ['get'],
                'create' => ['post'],
                'update' => ['put'],
                'delete' => ['delete'],
                'login'  => ['post'],
                'me'    =>  ['get', 'post'],
                'estado' => ['get']
            ],
        ];

        // remove authentication filter
        $auth = $behaviors['authenticator'];
        unset($behaviors['authenticator']);

        // add CORS filter
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
            ],
        ];

        //Negociator
        $behaviors['contentNegotiator'] = [
            'class'   => 'yii\filters\ContentNegotiator',
            'formats' => [
                'text/html'        => Response::FORMAT_JSON,
                'application/json' => Response::FORMAT_JSON,
                'application/xml'  => Response::FORMAT_XML,
            ],
        ];


        // re-add authentication filter
        $behaviors['authenticator'] = $auth;
        // avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
        $behaviors['authenticator']['except'] = ['options', 'login', 'signup', 'confirm', 'password-reset-request', 'password-reset-token-verification', 'password-reset'];


        // setup access
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'only' => ['index', 'view', 'create', 'update', 'delete'], //only be applied to
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ['index', 'view', 'create', 'update', 'delete'],
                    'roles' => ['admin', 'manageUsers'],
                ],
                [
                    'allow' => true,
                    'actions'   => ['me','estado'],
                    'roles' => ['user']
                ]
            ],
        ];

        return $behaviors;
    }



    public function actionGetcategoria()
    {
        
    $connection = Yii::$app->getDb();
	$command = $connection->createCommand("
    SELECT
        * 
    FROM
        tab_categoria c 
    WHERE
        c.tab_categoria_status = 1
	    ");
        $models = $command->queryAll(); 
        if ($models) {
            return $models;
        } else {
            return array('err' => 'NO SE ENCONTRARON COINCIDENCIAS.', 'code' => 'ERROR_NO_DATA_FOUND');
        }
    }


}
