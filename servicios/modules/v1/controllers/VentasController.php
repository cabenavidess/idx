<?php
namespace app\modules\v1\controllers;

use app\models\DetalleCompra;
use app\filters\auth\HttpBearerAuth;
use yii;
use yii\rest\ActiveController;
use yii\filters\AccessControl;
use yii\web\Response;
use yii\filters\auth\CompositeAuth;
use app\models\VentaDetalle;
use app\models\FormaPago;
use app\models\TabCliente;
use app\models\TabNegocioSucursal;
use app\models\TabProducto;
use app\models\Stock;

class VentasController extends ActiveController
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

        if (!empty($_POST['venta'])) {
            //  return $_POST['venta'];
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
                    $modelDetalleFactura->usuario_id = $index['usuario_id'];

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
                        'data' => ['venta_datos_id' => $idCompra, 'message' => 'Factura de venta guardada con éxito']);


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

    public function actionAnularventa(){

        if (!empty($_POST['anulacion'])) {

            $data = json_decode($_POST['anulacion'], true);

            $id = $data['id'];
            $user_id = $data['user_id'];
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
                kardex_precio = 0,
                usuario_id_modificacion = $user_id 
                WHERE
                    fk_datos_compra_id = $id 
                    AND kardex_movimiento = 'SALIDA';
            ");
        
            $command->execute();
        
            return array('error' => false, 'code' => '200', 'message' => 'Anulación de venta exitosa' );
        }
        return array('error' => false, 'code' => '200', 'message' => 'Error al anular la venta ' );
    
   

    }

}
