<?php
    namespace app\modules\v1\controllers;
    
    use app\filters\auth\HttpBearerAuth;
    
    use Yii;
    use yii\rest\ActiveController;
    use yii\filters\AccessControl;
    use yii\web\Response;
    use yii\filters\auth\CompositeAuth;
    use app\models\TabProducto;

class ProductoController extends ActiveController
{
    public $modelClass = 'app\models\TabProducto';


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
        $behaviors['authenticator']['except'] = ['getproducto','getproductoall','getproductoallprecio','options', 'login', 'signup', 'confirm', 'password-reset-request', 'password-reset-token-verification', 'password-reset'];


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


    public function actionGetproducto($token = "0", $usuario_id = "0")
    {
         if ($token == "0" || $usuario_id == "0") {
            return array('error' => true, 'code' => '404', 'message' => 'Token y/o usuario inválido.');
        }
        
    $connection = Yii::$app->getDb();
	$command = $connection->createCommand("
    SELECT
	tab_producto_id,
	tab_producto_codigo,
	tab_producto_nombre,
	tab_producto_descripcion,
	tab_producto_imagen,
	tab_producto_status,
	tab_marca.tab_marca_nombre AS tab_marca_nombre,
	tab_producto_iva,
CASE
		WHEN tab_producto_iva = 0 THEN
		'SIN IVA' ELSE 'CON IVA' 
	END  AS iva
	FROM
	tab_producto
    INNER JOIN tab_marca ON tab_producto.fk_tab_marca_id = tab_marca.tab_marca_id
    WHERE tab_producto.tab_producto_status = 'activo'
        ");
        
        $models = $command->queryAll(); 
        if ($models) {
            return $models;
        } else {
            return array('err' => 'NO SE ENCONTRARON COINCIDENCIAS.', 'code' => 'ERROR_NO_DATA_FOUND');
        }
    }

    public function actionGetproductoall($token = "0", $usuario_id = "0")
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
                    tab_producto_id,
                    tab_producto_codigo,
                    tab_producto_nombre,
                    tab_producto_descripcion,
                    tab_marca.tab_marca_nombre AS tab_marca_nombre,
                    tab_categoria.tab_categoria_nombre,
                CASE
                        
                        WHEN tab_producto_iva = 0 THEN
                        'SIN IVA' ELSE 'CON IVA' 
                    END AS iva,
                    tab_producto_imagen,
                    tab_producto_status,
                    tab_producto_iva
                FROM
                    tab_producto
                    INNER JOIN tab_marca ON tab_producto.fk_tab_marca_id = tab_marca.tab_marca_id
                    join tab_categoria on tab_marca.fk_tab_categoria_id = tab_categoria.tab_categoria_id
                ");
                
                $models = $command->queryAll(); 
                if ($models) {
                    return $models;
                } else {
                    return array('err' => 'NO SE ENCONTRARON COINCIDENCIAS.', 'code' => 'ERROR_NO_DATA_FOUND');
                }
            }
    }

    public function actionGetproductoallprecio($token = "0", $usuario_id = "0")
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
            `p`.`tab_producto_id` AS `tab_producto_id`,
            `p`.`tab_producto_codigo` AS `tab_producto_codigo`,
            `p`.`tab_producto_nombre` AS `tab_producto_nombre`,
            `p`.`tab_producto_descripcion` AS `tab_producto_descripcion`,
            `p`.`tab_producto_imagen` AS `tab_producto_imagen`,
            `p`.`tab_producto_status` AS `tab_producto_status`,
            `p`.`fk_tab_marca_id` AS `fk_tab_marca_id`,
            `p`.`tab_producto_iva` AS `tab_producto_iva`,
            `s`.`precio` AS `precio`,
            ( CASE WHEN ( `p`.`tab_producto_iva` = 0 ) THEN 'SIN IVA' ELSE 'CON IVA' END ) AS `iva`,
            1 AS `quantity`,
            100 AS `utility`
        FROM
            ( `tab_producto` `p` LEFT JOIN `stock` `s` ON ( ( `s`.`producto_id` = `p`.`tab_producto_id` ) ) ) 
        WHERE
            ( `p`.`tab_producto_status` = 1 )
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