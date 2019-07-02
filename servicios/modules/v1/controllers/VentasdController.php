<?php
    namespace app\modules\v1\controllers;

    use Yii;
    use yii\rest\ActiveController;
    use yii\web\Response;
    
class VentasdController extends ActiveController
{
    public $modelClass = 'app\models\VentasDiarias';

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

    public function actionGetcountfactura($token = "0", $usuario_id = "0")
    {
        // return $token;

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
                DATE_FORMAT( vd.venta_datos_fecha, '%Y-%m-%d' ) AS mes,
                SUM( CASE WHEN f.forma_pago_id = 1 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) AS efectivo,
                SUM( CASE WHEN f.forma_pago_id = 2 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) AS tarjetas,
                SUM( CASE WHEN f.forma_pago_id = 3 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) AS dinero_elec,
                SUM( CASE WHEN f.forma_pago_id = 4 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) AS otros,
                (
                    SUM( CASE WHEN f.forma_pago_id = 1 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) 
                    + SUM( CASE WHEN f.forma_pago_id = 2 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) 
                    + SUM( CASE WHEN f.forma_pago_id = 3 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) 
                    + SUM( CASE WHEN f.forma_pago_id = 4 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) 
                ) AS total 
            FROM
                forma_pago AS f
                JOIN venta_datos AS vd ON f.forma_pago_id = vd.fk_forma_pago_id
                JOIN kardex AS k ON k.fk_datos_compra_id = vd.venta_datos_id 
            WHERE
                k.kardex_estado = 'Saliida Compra' 
            GROUP BY
                DATE_FORMAT( vd.venta_datos_fecha, '%Y-%m-%d' ) 
            ORDER BY
                DATE_FORMAT( vd.venta_datos_fecha, '%Y-%m-%d' ) DESC;
            ");
            $compras = $command->queryAll();

            return array('error' => false, 'code' => '200', 'ventas' => $compras);
        }
    }


    public function actionGetcountfacturag($token = "0", $usuario_id = "0")
    {
        // return $token;

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
            curdate( ) AS fecha,
            SUM( CASE WHEN fp.forma_pago_id = 1 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) AS efectivo,
            SUM( CASE WHEN fp.forma_pago_id = 2 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) AS tarjetas,
            SUM( CASE WHEN fp.forma_pago_id = 3 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) AS dinero_elec,
            SUM( CASE WHEN fp.forma_pago_id = 4 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) AS otros,
            (
                SUM( CASE WHEN fp.forma_pago_id = 1 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) + SUM( CASE WHEN fp.forma_pago_id = 2 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) 
                + SUM( CASE WHEN fp.forma_pago_id = 3 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) + SUM( CASE WHEN fp.forma_pago_id = 4 THEN (k.kardex_cantidad * k.kardex_precio) ELSE 0 END ) 
            ) AS total 
            FROM
            `venta_datos` `vd`
            JOIN `forma_pago` `fp` ON `fp`.`forma_pago_id` = `vd`.`fk_forma_pago_id`
            JOIN kardex AS k ON k.fk_datos_compra_id = vd.venta_datos_id 
            WHERE
            (
                `vd`.`venta_datos_fecha` BETWEEN cast( curdate( ) AS datetime ) 
                AND ( curdate( ) + INTERVAL 23 HOUR ) 
                AND ( k.kardex_estado = 'Saliida Compra' ) 
            )

        ");
        $compras = $command->queryAll();

        return array('error' => false, 'code' => '200', 'ventas' => $compras);
            }
    }


    public function actionGetcountfacturas()
    {
        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("

        SELECT
        -- 	`fp`.`forma_pago_id` AS `forma_pago_id`,
        -- 	`fp`.`forma_pago_nombre` AS `forma_pago_nombre`,
            count( `vd`.`venta_datos_total` ) AS `total` 
        FROM
            (
                ( `venta_datos` `vd` JOIN `forma_pago` `fp` ON ( ( `fp`.`forma_pago_id` = `vd`.`fk_forma_pago_id` ) ) )
                JOIN `kardex` `k` ON ( ( `k`.`fk_datos_compra_id` = `vd`.`venta_datos_id` ) ) 
            ) 
        WHERE
            (
                ( `vd`.`venta_datos_fecha` BETWEEN cast( curdate( ) AS datetime ) AND ( curdate( ) + INTERVAL 23 HOUR ) ) 
                AND ( `k`.`kardex_estado` = 'Saliida Compra' ) 
            ) 

        ");
        $compras = $command->queryAll();

        return array('error' => false, 'code' => '200', 'ventas' => $compras);
    }

    public function actionGetcountfacturasc()
    {
        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT
            count( vd.datos_compra_total ) AS `total` 
        FROM
            `datos_compra` `vd`
            JOIN `kardex` `k` ON `k`.`fk_datos_compra_id` = vd.datos_compra_id 
        WHERE
            (
                ( vd.datos_compra_fecha BETWEEN cast( curdate( ) AS datetime ) AND ( curdate( ) + INTERVAL 23 HOUR ) ) 
            AND ( `k`.`kardex_estado` = 'Entrada Compra' ) 
            )

        ");
        $compras = $command->queryAll();

        return array('error' => false, 'code' => '200', 'ventas' => $compras);
    }

}