<?php
    namespace app\modules\v1\controllers;
    
    use app\filters\auth\HttpBearerAuth;
    
    use Yii;
    use yii\rest\ActiveController;
    use yii\filters\AccessControl;
    use yii\web\Response;
    use yii\filters\auth\CompositeAuth;


class MarcaController extends ActiveController
{
    public $modelClass = 'app\models\TabMarca';


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
                'Access-Control-Allow-Origin' => ['*'],
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
        $behaviors['authenticator']['except'] = ['getmarcaestado','getmarca','options', 'login', 'signup', 'confirm', 'password-reset-request', 'password-reset-token-verification', 'password-reset'];


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
                    'actions'   => ['me'],
                    'roles' => ['user']
                ]
            ],
        ];

        return $behaviors;
    }


    public function actionGetmarca()
    {
        
    $connection = Yii::$app->getDb();
	$command = $connection->createCommand("
    SELECT 
    tab_marca_id,
    tab_marca_nombre,
    tab_marca_descripcion,
    tab_marca_status,
    tab_categoria.tab_categoria_nombre as tab_categoria_nombre
    
    FROM tab_marca
    inner join tab_categoria on tab_marca.fk_tab_categoria_id = tab_categoria.tab_categoria_id
        ");
        
        $models = $command->queryAll(); 
        if ($models) {
            return $models;
        } else {
            return array('err' => 'NO SE ENCONTRARON COINCIDENCIAS.', 'code' => 'ERROR_NO_DATA_FOUND');
        }
    }

    public function actionGetmarcaestado($token = "0", $usuario_id = "0")
    {
        if ($token == "0" || $usuario_id == "0") {
            return array('error' => true, 'code' => '404', 'message' => 'Token y/o usuario inválido.');
        }

        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT * FROM user
        WHERE id = '$usuario_id'
        AND auth_key = '$token'
        ");

        $models = $command->queryAll();


        if ($models) {
            $connection = Yii::$app->getDb();
            $command = $connection->createCommand("
            SELECT
                * 
            FROM
                tab_marca m
            WHERE
                m.tab_marca_status = 1
                ");
                $models = $command->queryAll(); 
                if ($models) {
                    return $models;
                } else {
                    return array('err' => 'NO SE ENCONTRARON COINCIDENCIAS.', 'code' => 'ERROR_NO_DATA_FOUND');
                }
            }
     }
}