<?php
    namespace app\modules\v1\controllers;

    use app\models\DetalleCompra;
    use app\filters\auth\HttpBearerAuth;
    use yii;
    use yii\rest\ActiveController;
    use yii\filters\AccessControl;
    use yii\web\Response;
    use yii\filters\auth\CompositeAuth;
    
class MovimientosController extends ActiveController
{
    public $modelClass = 'app\models\Movimientos';

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
                'movimientos' => ['movimientos']
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
                    'actions'   => ['me','movimientos'],
                    'roles' => ['user']
                ]
            ],
        ];

        return $behaviors;
    }

    public function actionGetmovimientos(){
            $connection = Yii::$app->getDb();
            $command = $connection->createCommand("
            SELECT
                k.kardex_nro_fact,
                `k`.`kardex_movimiento` AS `kardex_movimiento`,
                DATE_SUB( k.kardex_fecha, INTERVAL + 1 HOUR ) AS fecha,
                p.tab_producto_codigo AS codigo,
                `p`.`tab_producto_nombre` AS `tab_producto_nombre`,
                `p`.`tab_producto_descripcion` AS `tab_producto_descripcion`,
                `p`.`tab_producto_imagen` AS `tab_producto_imagen`,
                `k`.`kardex_cantidad` AS `kardex_cantidad`,
                `k`.`kardex_precio` AS `kardex_precio`,
            CASE
                    
                    WHEN k.kardex_estado = 'Entrada Compra' THEN
                    'Entrada Compra' 
                    WHEN k.kardex_estado = 'Saliida Compra' THEN
                    'Salida Compra' 
                    WHEN k.kardex_estado = 'Anulacion compra' THEN
                    'Anulacion compra' 
                    WHEN k.kardex_estado = 'Anulacion venta' THEN
                    'Anulacion venta' 
                    WHEN k.kardex_estado = 'Reserva sin confirmar' THEN
                    'Reserva sin confirmar' 
                END AS estado,
                u.username,
                ( SELECT username FROM `user` AS u WHERE usuario_id_modificacion = u.id ) AS usuario_modificacion,
                DATE_SUB( k.kardex_fecha_actualizacion, INTERVAL + 1 HOUR ) AS kardex_fecha_actualizacion
            FROM
                ( `kardex` `k` JOIN `tab_producto` `p` ON ( ( `p`.`tab_producto_id` = `k`.`producto_id` ) ) JOIN `user` u ON u.id = k.usuario_id ) 
            WHERE
                k.kardex_estado <> '' 
            ORDER BY
                kardex_fecha DESC                                           
            ");
            $movimientos = $command->queryAll();
            return array('error' => false, 'code' => '200', 'movimientos' => $movimientos);
    }

}