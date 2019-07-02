<?php

namespace app\modules\v1\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\web\Response;
use app\models\DatosCompra;
use app\models\DetalleCompra;

class FacturacionController extends ActiveController {

    public $modelClass = 'app\models\DatosCompra';

    public function behaviors() {
        #$behaviors = parent::behaviors();
        #CORS
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Access-Control-Allow-Origin' => ['*'],
                'Origin' => ['*'],
                'Content-Type' => 'application/x-www-form-urlencoded',
               // 'Access-Control-Request-Headers' => ['*'],
               //'Access-Control-Request-Method' => [ 'POST'],
               // 'Allow' => ['POST'],
            ],
        ];
        $behaviors['contentNegotiator'] = [
            'class' => 'yii\filters\ContentNegotiator',
            'formats' => [
                'text/html' => Response::FORMAT_JSON,
                'application/json' => Response::FORMAT_JSON,
                'application/xml'  => Response::FORMAT_XML,
            ],
        ];

        return $behaviors;
    }


    public function actionGuardafactura() {
       
            if (!empty($_POST['compra']) ) {  
            
                $data = json_decode($_POST['compra'], TRUE);
                // $worker_stats = $data['detalles'];
                 //return $data['datos_compra_guia'];
                //  return $_POST['compra'];
                    $datos_compra_guia = $data['datos_compra_guia'];
                    $datos_compra_fecha = date('Y-m-d H:i:s');
                    $datos_compra_iva = $data['datos_compra_iva'];
                    $datos_compra_subtotal = $data['datos_compra_subtotal'];
                    $datos_compra_total = $data['datos_compra_total'];
                    $fk_tab_proveedor_mercaderia_id = $data['fk_tab_proveedor_mercaderia_id'];
               //COMPRUEBA SI EXISTE PROVEEDOR
                if (!\app\models\TabProveedorMercaderia::findOne($fk_tab_proveedor_mercaderia_id)) {
                    return array('success' => false, 'status'=> 405, 'data' => [ 'message' => 'No existe proveedor', 'data' => $fk_tab_proveedor_mercaderia_id]);
                }

                $connection = Yii::$app->db->createCommand()->insert('datos_compra', [                    
                    'datos_compra_guia' => $datos_compra_guia,
                    'datos_compra_fecha' => $datos_compra_fecha,
                    'datos_compra_iva' => $datos_compra_iva*1,
                    'datos_compra_subtotal' => $datos_compra_subtotal*1,
                    'datos_compra_total' => $datos_compra_total*1,
                    'fk_tab_proveedor_mercaderia_id' => $fk_tab_proveedor_mercaderia_id
                ]);
                  
                
                if ($connection->execute()) {
                    $idCompra = Yii::$app->db->getLastInsertID();

                    $contador= 0;

                    $arrayDetalle = $data['detalles'];
                    // return $arrayDetalle[1]['detalle_compra_cantidad'];
                    foreach($arrayDetalle as $modelDetalle => $index ){
                        $modelDetalleFactura = new DetalleCompra();
                        $modelDetalleFactura->detalle_compra_cantidad = $index['detalle_compra_cantidad'];
                       
                        $modelDetalleFactura->detalle_compra_valor_unit = $index['detalle_compra_valor_unit'];
                        $modelDetalleFactura->detalle_compra_valor_total = $index['detalle_compra_valor_total'];
                        $modelDetalleFactura->fk_tap_producto_id =$index['fk_tap_producto_id'] ;
                        $modelDetalleFactura->fk_datos_compra_id = $idCompra;
                        $modelDetalleFactura->detalle_compra_valor_venta = $index['detalle_compra_valor_venta'];
                        if($modelDetalleFactura->validate()){
                            $modelDetalleFactura->save();
                            $contador = $contador +1;
                        }else{
                            return $modelDetalleFactura->fk_tap_producto_id. 'no valido';
                        }
                    }
                    if(count($arrayDetalle) ===$contador ){
                        return $idCompra;
                    }else{
                        return 'Factura no guardada';
                    }
                     
                } else {
                    return array('code' => 405, 'message' => 'Error al guardar');
                }
            } else {
                return array('code' => 400, 'message' => 'LA SOLICITUD CONTIENE DATOS ERRONEOS' );
            }
      
    }


    // public function actionGuardafactura() {
    //     if (!empty($_POST['datos_compra_guia']) || !empty($_POST['datos_compra_fecha']) ||
    //      !empty($_POST['datos_compra_iva']) ||  !empty($_POST['datos_compra_subtotal']) || 
    //      !empty($_POST['datos_compra_total']) || !empty($_POST['fk_tab_proveedor_mercaderia_id'])) {  
        
    //             $datos_compra_guia = $_POST['datos_compra_guia'];
    //             $datos_compra_fecha =$_POST['datos_compra_fecha'];
    //             $datos_compra_iva = $_POST['datos_compra_iva'];
    //             $datos_compra_subtotal = $_POST['datos_compra_subtotal'];
    //             $datos_compra_total = $_POST['datos_compra_total'];
    //             $fk_tab_proveedor_mercaderia_id = $_POST['fk_tab_proveedor_mercaderia_id'];
    //        //COMPRUEBA SI EXISTE PROVEEDOR
    //         if (!\app\models\TabProveedorMercaderia::findOne($fk_tab_proveedor_mercaderia_id)) {
    //             return array('suucess' => false, 'status'=> 405, 'data' => [ 'message' => 'No existe proveedor', 'data' => $fk_tab_proveedor_mercaderia_id]);
    //         }

            
    //         $modeloFactura = new DatosCompra();
    //         $modeloFactura->datos_compra_guia = $datos_compra_guia;
    //         $modeloFactura->datos_compra_fecha = $datos_compra_fecha;
    //         $modeloFactura->datos_compra_iva = $datos_compra_iva*1;
    //         $modeloFactura->datos_compra_subtotal = $datos_compra_subtotal*1;
    //         $modeloFactura->datos_compra_total = $datos_compra_total*1;
    //         $modeloFactura->fk_tab_proveedor_mercaderia_id = $fk_tab_proveedor_mercaderia_id;

    //         // \yii\helpers\VarDumper::dump($modeloFactura,10,true);
    //         // die();
    //         if ($modeloFactura->save()) {
    //             //return $model;
    //             return $modeloFactura;
    //         } else {
    //             return array('code' => 405, 'message' => 'Error al guardar');
    //         }
    //     } else {
    //         return array('code' => 400, 'message' => 'LA SOLICITUD CONTIENE DATOS ERRONEOS' );
    //     }
  
    // }


}
