<?php
namespace app\modules\v1\controllers;

use app\models\DetalleCompra;
use app\filters\auth\HttpBearerAuth;
use yii;
use yii\rest\ActiveController;
use yii\filters\AccessControl;
use yii\web\Response;
use yii\filters\auth\CompositeAuth;

class CompraController extends ActiveController
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
                'guardafactura' => ['get'],
                'guardafact' => ['post'],
                'facturaid' => ['get'],
                'anularcompra' => ['post']
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
                    'actions'   => ['me','guardafactura','facturaid','guardafact','anularcompra'],
                    'roles' => ['user']
                ]
            ],
        ];

        return $behaviors;
    }

    

   

    public function actionAuth()
    {
        $username = !empty($_POST['username']) ? $_POST['username'] : '';
        $password = !empty($_POST['password']) ? $_POST['password'] : '';
        $response = [];
        if (empty($username) || empty($password)) {
            $response = [
                'status' => 'error',
                'message' => 'Nombre de usuario y contraseña no pueden estar vacíos!',
                'data' => '',
            ];
        } else {
            $user = \app\models\User::findByUsername($username);
            if (!empty($user)) {
                if ($user->validatePassword($password)) {
                    $response = [
                        'status' => 'success',
                        'message' => 'Inicio de sesión exitoso!',
                        'data' => [
                            'id' => $user->id,
                            'username' => $user->username,
                            'token' => $user->auth_key,
                            'role' => $user->role,
                        ],
                    ];
                } else {
                    $response = [
                        'status' => 'error',
                        'message' => 'Contraseña incorrecta',
                        'data' => '',
                    ];
                }
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Usuario no encontrado en la base de datos!',
                    'data' => '',
                ];
            }
        }
        return $response;
    }

    // protected function verbs()
    // {
    //     return ['login' => ['POST']];
    // }

    public function actionGuardafactura()
    {

        if (!empty($_POST['compra'])) {
            return $_POST['compra'];
            $data = json_decode($_POST['compra'], true);
            $datos_compra_guia = $data['datos_compra_guia'];
            $datos_compra_fecha = date('Y-m-d H:i:s');
            $datos_compra_iva = $data['datos_compra_iva'];
            $datos_compra_subtotal = $data['datos_compra_subtotal'];
            $datos_compra_total = $data['datos_compra_total'];
            $fk_tab_proveedor_mercaderia_id = $data['fk_tab_proveedor_mercaderia_id'];
            //COMPRUEBA SI EXISTE PROVEEDOR
            if (!\app\models\TabProveedorMercaderia::findOne($fk_tab_proveedor_mercaderia_id)) {
                return array('success' => false, 'status' => 405,
                    'data' => ['message' => 'No existe proveedor', 'data' => $fk_tab_proveedor_mercaderia_id]);
            }

            $connection = Yii::$app->db->createCommand()->insert('datos_compra', [
                'datos_compra_guia' => $datos_compra_guia,
                'datos_compra_fecha' => $datos_compra_fecha,
                'datos_compra_iva' => $datos_compra_iva * 1,
                'datos_compra_subtotal' => $datos_compra_subtotal * 1,
                'datos_compra_total' => $datos_compra_total * 1,
                'fk_tab_proveedor_mercaderia_id' => $fk_tab_proveedor_mercaderia_id,
            ]);

            if ($connection->execute()) {
                $idCompra = Yii::$app->db->getLastInsertID();

                $contador = 0;
                $suma = 0;
                $iva = 0;
                $ivaTot = 0;
                $subt = 0;

                $arrayDetalle = $data['detalles'];
                foreach ($arrayDetalle as $modelDetalle => $index) {
                    $modelDetalleFactura = new DetalleCompra();

                      $modelDetalleFactura->detalle_compra_cantidad = $index['detalle_compra_cantidad'];
                      $modelDetalleFactura->detalle_compra_valor_unit = $index['detalle_compra_valor_unit'];

                      $modelDetalleFactura->fk_tap_producto_id = $index['fk_tap_producto_id'];
                      $modelDetalleFactura->fk_datos_compra_id = $idCompra;

                      if ($index['detalle_compra_iva'] == 0) {
                        $modelDetalleFactura->detalle_compra_valor_total = $index['detalle_compra_cantidad'] * ( $index['detalle_compra_valor_unit']);
                        $modelDetalleFactura->detalle_compra_valor_venta = (($index['detalle_compra_valor_unit']) * $index['detalle_compra_ganancia']) / 100;
                        $modelDetalleFactura->detalle_compra_costo = $index['detalle_compra_valor_unit'] ;
                      }else {
                        $modelDetalleFactura->detalle_compra_valor_total = $index['detalle_compra_cantidad'] * (($index['detalle_compra_valor_unit'] * 0.12) + $index['detalle_compra_valor_unit']);
                        $modelDetalleFactura->detalle_compra_valor_venta = ((($index['detalle_compra_valor_unit'] * 0.12) + $index['detalle_compra_valor_unit']) * $index['detalle_compra_ganancia']) / 100;
                        $modelDetalleFactura->detalle_compra_costo = ($index['detalle_compra_valor_unit'] * 0.12) + $index['detalle_compra_valor_unit'];
                        $iva = $index['detalle_compra_cantidad'] * ($index['detalle_compra_valor_unit'] * 0.12);
                      }

                      $modelDetalleFactura->detalle_compra_ganancia = $index['detalle_compra_ganancia'];

                      $modelDetalleFactura->detalle_compra_iva = $index['detalle_compra_iva'] ;
                      // $modelDetalleFactura->detalle_compra_costo = $index['detalle_compra_costo']  ;

                    if ($modelDetalleFactura->validate()) {
                        $modelDetalleFactura->save();
                        $subt += $modelDetalleFactura->detalle_compra_costo ;
                        $ivaTot += $iva ;
                        $suma += $modelDetalleFactura->detalle_compra_costo ;
                        $contador = $contador + 1;
                    } else {
                        return array('success' => false, 'status' => 400,
                            'data' => ['datos_compra_id' => $modelDetalleFactura->fk_tap_producto_id , 'message' => 'Datos no válidos']);
                    }
                }
                if (count($arrayDetalle) === $contador) {
                    
                    \Yii::$app->db->createCommand("UPDATE datos_compra SET datos_compra_subtotal=$subt, datos_compra_iva=$iva , datos_compra_total=$suma WHERE datos_compra_id=".$idCompra)
                    ->execute();

                    return array('success' => true, 'status' => 200,
                        'data' => ['datos_compra_id' => $idCompra, 'message' => 'Factura de compra guardar con éxito']);

                     

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
SELECT
	c.datos_compra_id,
	c.datos_compra_guia,
	c.datos_compra_fecha,
	k.fk_datos_compra_id,
	p.tab_proveedor_mercaderia_nombre,
	c.datos_compra_total,
CASE
		
		WHEN k.kardex_estado = 'Entrada Compra' THEN
		'REGISTRADA' ELSE 'ANULADA' 
	END AS estado,
	u.username,
	DATE_SUB(k.kardex_fecha_actualizacion, INTERVAL +1 HOUR) as kardex_fecha_actualizacion,
	( SELECT username FROM `user` AS u WHERE usuario_id_modificacion = u.id ) AS usuario_modificacion 
FROM
	datos_compra c
	JOIN kardex k ON k.fk_datos_compra_id = c.datos_compra_id
	JOIN tab_proveedor_mercaderia p ON p.tab_proveedor_mercaderia_id = c.fk_tab_proveedor_mercaderia_id
	JOIN `user` u ON u.id = k.usuario_id 
WHERE
	k.kardex_movimiento = 'ENTRADA' 
GROUP BY
	k.fk_datos_compra_id,
	kardex_estado,
	u.username,
	k.kardex_fecha_actualizacion,
	k.usuario_id_modificacion 
ORDER BY
	c.datos_compra_fecha DESC;
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
                c.*,
                p.*,
            CASE
                    
                    WHEN k.kardex_estado = 'Entrada Compra' THEN
                    'REGISTRADA' ELSE 'ANULADA' 
                END AS estado ,
                u.username 
            FROM
                datos_compra c
                INNER JOIN tab_proveedor_mercaderia p ON c.fk_tab_proveedor_mercaderia_id = p.tab_proveedor_mercaderia_id
                JOIN kardex k ON k.fk_datos_compra_id = c.datos_compra_id 
                    JOIN `user` u ON u.id = k.usuario_id 
            WHERE
                datos_compra_id = $id 
                AND k.kardex_movimiento = 'ENTRADA' 
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
                    // 'detalle' => $detalle,
                    'proveedor_ruc' => $row['tab_proveedor_mercaderia_ruc'],
                    'proveedor_empresa' => $row['tab_proveedor_mercaderia_empresa'],
                    'proveedor_telefono' => $row['tab_proveedor_mercaderia_telefono'],
                    'proveedor_email' => $row['tab_proveedor_mercaderia_email'],
                    'estado' => $row['estado'],
                    'username' => $row['username']
                );

                // array_push($compras, $detalles);

            }

            return array('error' => false, 'code' => '200', 'compras' => $detalles, 'detalles' => $detalle);
        }
    }

    public function actionAnularcompra(){
        $curr_timestamp = date('Y-m-d');
        if (!empty($_POST['id'])) {
            $id = $_POST['id'];
            // return $id;
            $connection = Yii::$app->getDb();
            $command = $connection->createCommand("
            INSERT INTO kardex ( kardex_fecha, kardex_detalle, kardex_cantidad, kardex_precio, kardex_stock,producto_id, negocio_id, usuario_id, fk_datos_compra_id ) SELECT
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
                        fk_datos_compra_id = $id AND kardex_movimiento = 'ENTRADA';
        
                UPDATE kardex 
                    SET kardex_cantidad = 0,
                    kardex_stock = 0,
                    kardex_estado = 'Anulacion compra',
                    kardex_precio = 0,
                    kardex_fecha_actualizacion = $curr_timestamp,
                    usuario_id_modificacion = 16 
                WHERE
                        fk_datos_compra_id = $id 
                        AND kardex_movimiento = 'ENTRADA';
            ");
        
            $command->execute();
        
            return array('error' => false, 'code' => '200', 'message' => 'Anulacion de compra exitosa nro: '.$id );
        }
        return array('error' => false, 'code' => '200', 'message' => 'Error al anular la compra ' );
    
   

    }
}
