<?php
namespace app\modules\v1\controllers;

use app\models\DetalleCompra;
use app\filters\auth\HttpBearerAuth;
use yii;
use yii\rest\ActiveController;
use yii\filters\AccessControl;
use yii\web\Response;
use yii\filters\auth\CompositeAuth;

class ComprasController extends ActiveController
{
    public $modelClass = 'app\models\User';

    public function behaviors()
    {
        $behaviors = parent::behaviors();

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


        return $behaviors;
    }







    public function actionGuardafactura()
    {

        if (!empty($_POST['compra'])) {
            // return $_POST['compra'];
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
                        $modelDetalleFactura->detalle_compra_valor_total = $index['detalle_compra_valor_total'] ;
                        $modelDetalleFactura->detalle_compra_valor_venta = $index['detalle_compra_valor_venta'];
                        $modelDetalleFactura->detalle_compra_costo = $index['detalle_compra_costo'] ;
                      }else {
                        $modelDetalleFactura->detalle_compra_valor_total = $index['detalle_compra_valor_total'];
                        $modelDetalleFactura->detalle_compra_valor_venta = $index['detalle_compra_valor_venta'];
                        $modelDetalleFactura->detalle_compra_costo = $index['detalle_compra_costo'];
                        $iva = $index['detalle_compra_cantidad'] * ($index['detalle_compra_valor_unit'] * 0.12);
                      }

                      $modelDetalleFactura->detalle_compra_ganancia = $index['detalle_compra_ganancia'];

                      $modelDetalleFactura->detalle_compra_iva = $index['detalle_compra_iva'] ;
                      $modelDetalleFactura->usuario_id = $index['usuario_id']  ;

                    if ($modelDetalleFactura->validate()) {
                        $modelDetalleFactura->save();
                        $subt += $modelDetalleFactura->detalle_compra_costo ;
                        $ivaTot += $iva ;
                        $suma += $modelDetalleFactura->detalle_compra_valor_total ;
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
                        'data' => ['datos_compra_id' => $idCompra, 'message' => 'Factura de compra guardada con éxito']);



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

    public function actionAnularcompra(){



        $curr_timestamp = date('Y-m-d');
        
        if (!empty($_POST['anulacion'])) {

            $data = json_decode($_POST['anulacion'], true);

            $id = $data['id'];
            $user_id = $data['user_id'];
            
            $datos_compra_fecha_ac = date('Y-m-d H:i:s');

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
                    usuario_id_modificacion = $user_id
                WHERE
                        fk_datos_compra_id = $id
                        AND kardex_movimiento = 'ENTRADA';
            ");

            $command->execute();

            return array('error' => false, 'code' => '200', 'message' => 'Anulación de compra exitosa!' );
        }
        return array('error' => false, 'code' => '200', 'message' => 'Error al anular la compra ' );



    }
}
