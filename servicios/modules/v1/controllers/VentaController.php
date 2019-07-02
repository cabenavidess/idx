<?php
namespace app\modules\v1\controllers;

use app\models\VentaDetalle;
use app\models\FormaPago;
use app\models\TabCliente;
use app\models\TabNegocioSucursal;
use app\models\TabProducto;
use app\models\Stock;
use Yii;
use yii\rest\ActiveController;
use yii\web\Response;

use app\filters\auth\HttpBearerAuth;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;

class VentaController extends ActiveController
{
    public $modelClass = 'app\models\User';
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
                'guardafactura' => ['get','post'],
                'lista' => ['get'],
                'facturaid' => ['get']
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
                    'actions'   => ['me','guardafactura', 'lista','facturaid'],
                    'roles' => ['user']
                ]
            ],
        ];

        return $behaviors;
    }



    public function actionGuardafactura()
    {

        if (!empty($_POST['venta'])) {
            // return $_POST['venta'];
            $data = json_decode($_POST['venta'], true);
            $fk_sucursal_id = $data['fk_sucursal_id'];
            $fk_tab_cliente_id = $data['fk_tab_cliente_id'];
            $venta_datos_nro_factura = $data['venta_datos_nro_factura'];
            $venta_datos_fecha = date('Y-m-d H:i:s');
            $fk_forma_pago_id = $data['fk_forma_pago_id'];
            $venta_datos_subtotal = $data['venta_datos_subtotal'];
            $venta_datos_subtotal_cero = $data['venta_datos_subtotal_cero'];
            $venta_datos_iva = $data['venta_datos_iva'];
            $venta_datos_total = $data['venta_datos_total'];

            if(!TabNegocioSucursal::findOne($fk_sucursal_id)){
                return array('success' => false, 'status' => 405,
                'data' => ['message' => 'No existe sucursal', 'data' => $fk_sucursal_id]);
            }

            if(!TabCliente::findOne($fk_tab_cliente_id)){
                return array('success' => false, 'status' => 405,
                'data' => ['message' => 'No existe cliente', 'data' => $fk_tab_cliente_id]);
            }
            if(!FormaPago::findOne($fk_forma_pago_id)){
                return array('success' => false, 'status' => 405,
                'data' => ['message' => 'No existe forma de pago', 'data' => $fk_forma_pago_id]);
            }

            $connection = Yii::$app->db->createCommand()->insert('venta_datos', [
                'fk_sucursal_id' => $fk_sucursal_id,
                'fk_tab_cliente_id' => $fk_tab_cliente_id,
                'venta_datos_nro_factura' => $venta_datos_nro_factura,
                'venta_datos_fecha' => $venta_datos_fecha,
                'fk_forma_pago_id' => $fk_forma_pago_id,
                'venta_datos_subtotal' => $venta_datos_subtotal,
                'venta_datos_subtotal_cero' => $venta_datos_subtotal_cero,
                'venta_datos_iva' => $venta_datos_iva,
                'venta_datos_total' => $venta_datos_total
            ]);

            if ($connection->execute()) {
                $idCompra = Yii::$app->db->getLastInsertID();

                $contador = 0;
                $suma = 0;

                $arrayDetalle = $data['detalles'];
                foreach ($arrayDetalle as $modelDetalle => $index) {
                    $modelDetalleFactura = new VentaDetalle();
                    // venta_detalle_total = '';
                    $modelDetalleFactura->fk_tab_producto_id = $index['fk_tab_producto_id'];
                    $modelDetalleFactura->fk_venta_id = $idCompra;
                    $modelDetalleFactura->venta_detalle_cantidad = $index['venta_detalle_cantidad'];
                    $modelDetalleFactura->venta_detalle_valor_unit = $index['venta_detalle_valor_unit'];
                    $modelDetalleFactura->venta_detalle_descuento = $index['venta_detalle_descuento'];
                    $modelDetalleFactura->venta_detalle_total = $index['venta_detalle_total'];

                    if ($modelDetalleFactura->validate()) {
                        $modelDetalleFactura->save();
                        $contador = $contador + 1;
                    } else {
                        return array('success' => false, 'status' => 400,
                            'data' => ['datos_compra_id' => $modelDetalleFactura->fk_tab_producto_id, 'message' => 'Datos no válidos para guardar']);
                    }
                }
                if (count($arrayDetalle) === $contador) {
                    
                    \Yii::$app->db->createCommand("UPDATE count_fact SET count_fact_num = count_fact_num +1 WHERE count_fact_id=1")
                        ->execute();

                    return array('success' => true, 'status' => 200,
                        'data' => ['venta_datos_id' => $idCompra, 'message' => 'Factura de compra guardar con éxito']);


                } else {
                    return 'Factura no guardada';
                }

            } else {
                return array('code' => 405, 'message' => 'Error al guardar');
            }
        } else {
            return array('code' => 400, 'message' => 'LA SOLICITUD CONTIENE DATOS ERRONEOS', 'super' => $_POST['compra']);
        }
    }

    public function actionGetfactura()
    {
        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT c.*, p.* FROM datos_compra c
            INNER JOIN tab_proveedor_mercaderia p ON c.fk_tab_proveedor_mercaderia_id = p.tab_proveedor_mercaderia_id
        ");
        $compras = $command->queryAll();

        return array('error' => false, 'code' => '200', 'compras' => $compras);
    }

    public function actionGetcountfactura()
    {
        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT * FROM count_fact
        ");
        $compras = $command->queryAll();

        return array('error' => false, 'code' => '200', 'compras' => $compras);
    }

    public function actionGetcomprafactura($token = "0", $usuario_id = "0")
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
        $usuario = $command->queryAll();
        // SELECT * FROM ordenes where usuario_id =  $id_usuario
        if ($usuario) {
            $connection = Yii::$app->getDb();
            $command = $connection->createCommand("
            SELECT * FROM datos_compra
            ");
            $compra = $command->queryAll();

            $compras = array();

            foreach ($compra as $row) {

                $connection = Yii::$app->getDb();
                $command = $connection->createCommand("
                SELECT d.*, p.tab_producto_nombre, p.tab_producto_codigo
                FROM detalle_compra d
                INNER JOIN tab_producto p on d.fk_tap_producto_id = p.tab_producto_id
                WHERE fk_datos_compra_id =
                " . $row['datos_compra_id'] . "");

                $detalle = $command->queryAll();

                $detalles = array(
                    'id' => $row['datos_compra_id'],
                    'guia' => $row['datos_compra_guia'],
                    'creado_en' => $row['datos_compra_fecha'],
                    'detalle' => $detalle,
                );

                array_push($compras, $detalles);

            }

            return array('error' => false, 'code' => '200', 'compras' => $compras);
        } else {
            return array('error' => true, 'code' => '404', 'message' => 'Error en el token y/o usuario.');
        }
    }

    public function actionGetcomprafacturaid($id = "0")
    {
        if ($id == "0") {
            return array('error' => true, 'code' => '404', 'message' => 'Se necesita id de la compra.');
        } else {
            $connection = Yii::$app->getDb();
            $command = $connection->createCommand("
            SELECT
                v.*,
                c.*,
                f.forma_pago_nombre,
            CASE
                    
                    WHEN k.kardex_estado = 'Saliida Compra' THEN
                    'REGISTRADA' ELSE 'ANULADA' 
                END AS estado,
                u.username 
            FROM
                venta_datos v
                JOIN tab_cliente c ON c.tab_cliente_id = v.fk_tab_cliente_id
                JOIN forma_pago f ON v.fk_forma_pago_id = f.forma_pago_id
                LEFT JOIN kardex k ON k.fk_datos_compra_id = v.venta_datos_id
                JOIN user u ON k.usuario_id = u.id 
            WHERE
                venta_datos_id = $id 
                AND k.kardex_movimiento = 'SALIDA';
            ");
            $compra = $command->queryAll();

            $compras = array();

            foreach ($compra as $row) {

                $connection = Yii::$app->getDb();
                $command = $connection->createCommand("
                SELECT
                    d.*,
                    p.tab_producto_nombre,
                    p.tab_producto_codigo,
                    v.* 
                FROM
                    venta_detalle d
                    INNER JOIN tab_producto p ON d.fk_tab_producto_id = p.tab_producto_id
                    INNER JOIN venta_datos v ON d.fk_venta_id = v.venta_datos_id 
                WHERE
                    fk_venta_id =
                " . $row['venta_datos_id'] . "");

                $detalle = $command->queryAll();

                $detalles = array(
                    'id' => $row['venta_datos_id'],
                    'nro' => $row['venta_datos_nro_factura'],
                    'creado_en' => $row['venta_datos_fecha'],
                    // 'detalle' => $detalle,
                    'cedula' => $row['tab_cliente_ruc_ci'],
                    'cliente' => $row['tab_cliente_nombre_empresa'],
                    'telefono' => $row['tab_cliente_telefono'],
                    'direccion' => $row['tab_cliente_direccion'],
                    'tipo' => $row['forma_pago_nombre'],
                    'total' => $row['venta_datos_total'],
                    'estado' => $row['estado'],
                    'iva' => $row['venta_datos_iva'],
                    'subtotal' => $row['venta_datos_subtotal'],
                    'subtotal0' => $row['venta_datos_subtotal_cero'],
                    'username' => $row['username']
                );

                // array_push($compras, $detalles);

            }

            return array('error' => false, 'code' => '200', 'ventas' => $detalles, 'detalles' => $detalle);
        }
    }

    public function actionGetfacturaventa()
    {
        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT
            v.venta_datos_id AS id,
            v.venta_datos_nro_factura AS nro,
            v.venta_datos_fecha AS fecha,
            c.tab_cliente_ruc_ci AS cedula,
            c.tab_cliente_nombre_empresa AS nombre,
            f.forma_pago_nombre AS tipo,
            k.fk_datos_compra_id,
            v.venta_datos_total AS total,
        CASE
                
                WHEN k.kardex_estado = 'Saliida Compra' THEN
                'REGISTRADA' ELSE 'ANULADA' 
            END AS estado,
            u.username,
						DATE_SUB( k.kardex_fecha_actualizacion, INTERVAL + 1 HOUR ) AS kardex_fecha_actualizacion,
            ( SELECT username FROM `user` AS u WHERE usuario_id_modificacion = u.id ) AS usuario_modificacion 
        FROM
            venta_datos v
            JOIN tab_cliente c ON c.tab_cliente_id = v.fk_tab_cliente_id
            JOIN forma_pago f ON v.fk_forma_pago_id = f.forma_pago_id
            LEFT JOIN kardex k ON k.fk_datos_compra_id = v.venta_datos_id
            JOIN `user` u ON u.id = k.usuario_id 
        WHERE
            k.kardex_movimiento = 'SALIDA' 
        GROUP BY
            k.fk_datos_compra_id,
            kardex_estado,
            u.username,
            k.kardex_fecha_actualizacion,
            k.usuario_id_modificacion 
        ORDER BY
            v.venta_datos_fecha DESC;
	
        ");
        $compras = $command->queryAll();

        return array('error' => false, 'code' => '200', 'compras' => $compras);
    }


    public function actionAnularventa(){

        if (!empty($_POST['id'])) {
            $id = $_POST['id'];
            // return $id;
            $connection = Yii::$app->getDb();
            $command = $connection->createCommand("
            INSERT INTO kardex ( kardex_fecha, kardex_detalle, kardex_cantidad, kardex_precio, kardex_stock, producto_id, negocio_id, usuario_id, fk_datos_compra_id ) SELECT
                k.kardex_fecha,
                k.kardex_detalle,
                k.kardex_cantidad,
                k.kardex_precio,
                k.kardex_stock,
                k.producto_id,
                k.negocio_id,
                k.usuario_id,
                k.fk_datos_compra_id 
                FROM
                    kardex AS k 
                WHERE
                    fk_datos_compra_id = $id 
                    AND kardex_movimiento = 'SALIDA';
                UPDATE kardex 
                SET kardex_cantidad = 0,
                kardex_stock = 0,
                kardex_estado = 'Anulacion venta',
                kardex_precio = 0 
                WHERE
                    fk_datos_compra_id = $id 
                    AND kardex_movimiento = 'SALIDA';
            ");
        
            $command->execute();
        
            return array('error' => false, 'code' => '200', 'message' => 'Anulacion de venta exitosa nro: '.$id );
        }
        return array('error' => false, 'code' => '200', 'message' => 'Error al anular la venta ' );
    
   

    }
}
