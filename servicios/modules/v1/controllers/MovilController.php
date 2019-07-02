<?php
namespace app\modules\v1\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\web\Response;

class MovilController extends ActiveController
{
    public $modelClass = 'app\models\User';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Access-Control-Allow-Origin' => ['*'],
                'Origin' => ['*'],
            ],
        ];
        $behaviors['contentNegotiator'] = [
            'class' => 'yii\filters\ContentNegotiator',
            'formats' => [
                'text/html' => Response::FORMAT_JSON,
                'application/json' => Response::FORMAT_JSON,
                'application/xml' => Response::FORMAT_XML,
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
                    // 'username' => $user->username,
                ];
            }
        }
        return $response;
    }

    public function actionRegister()
    {

        if (!empty($_POST['usuario'])) {
            $data = json_decode($_POST['usuario'], true);
            $username = $data['username'];
            $password = $data['password_hash'];
            $email = $data['email'];
            $date = date('Y-m-d H:i:s');
            $password_hash = Yii::$app->getSecurity()->generatePasswordHash($password);
            // return $_POST['usuario'];

            if (\app\models\User::findByUsername($username)) {
                return array('success' => false, 'status' => 405,
                    'data' => ['message' => $username . ' ya utilizado']);
            }

            $connection = Yii::$app->db->createCommand()->insert('user', [
                'username' => $username,
                'password_hash' => $password_hash,
                'email' => $email,
                'unconfirmed_email' => $email,
                'confirmed_at' => $date,
                'status' => 10,
                'role' => 10,
            ]);

            $connection->execute();

            return array('success' => true, 'status' => 200,
                'data' => ['message' => 'Usuario guardado con éxito']);

        } else {
            return 'Datos no válidos';
        }

        // $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }

    public function actionGetmarcas()
    {

        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT tab_marca_id, tab_marca_nombre
        FROM tab_marca
        WHERE tab_marca_status = 'activo'
	    ");
        $models = $command->queryAll();
        if ($models) {
            return array('error' => false, 'code' => '200', 'marcas' => $models);
        } else {
            return array('error' => true, 'code' => '404', 'message' => 'No se encontraron datos');
        }
    }

    public function actionGetcategories()
    {
        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT * FROM tab_categoria
        WHERE tab_categoria_status = 'activo'
	    ");
        $models = $command->queryAll();
        if ($models) {
            //return $models;
            return array('error' => false, 'code' => '200', 'categorias' => $models);
        } else {
            // return array('err' => 'NO SE ENCONTRARON COINCIDENCIAS.', 'code' => 'ERROR_NO_DATA_FOUND');
            return array('error' => true, 'code' => '404', 'message' => 'No hay datos disponibles');
        }
    }

    public function actionGetproductospag($pagina = 0)
    {
        $pagina = $pagina * 10;
        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT * FROM tab_producto
        LIMIT $pagina,10
	    ");
        $models = $command->queryAll();
        if ($models) {
            //return $models;
            return array('error' => false, 'code' => '200', 'productos' => $models);
        } else {
            //return array('err' => 'NO SE ENCONTRARON COINCIDENCIAS.', 'code' => 'ERROR_NO_DATA_FOUND');
            return array('error' => true, 'code' => '404', 'message' => 'No se encontraron registros en esta página');
        }
    }

    public function actionGetbuscarproducto($termino = "Término sin especificar")
    {
        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT p.*, c.tab_categoria_nombre FROM tab_producto p
        INNER JOIN tab_categoria c on p.fk_tab_marca_id = c.tab_categoria_id
        WHERE tab_producto_nombre LIKE '%$termino%' AND tab_producto_status = 'activo'
	    ");
        $models = $command->queryAll();
        if ($models) {
            return array('error' => false, 'code' => '200', 'productos' => $models);
        } else {
            return array('error' => true, 'code' => '404', 'message' => 'No hay coinsidencias con el parámetro ' . $termino);
        }
    }

    public function actionGetbuscarproductocategoria($categoria = 0, $termino, $pagina = 0)
    {
        $pagina = $pagina * 10;

        if ($categoria == 0) {
            return array('error' => true, 'code' => '404', 'message' => 'Falta el parámetro categoría');
        }

        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT p.*, c.tab_categoria_nombre FROM tab_producto p
        INNER JOIN tab_categoria c on p.fk_tab_marca_id = c.tab_categoria_id
        WHERE tab_producto_nombre LIKE '%$termino%'
        AND tab_producto_status = 'activo'
        AND tab_categoria_id = $categoria
        LIMIT $pagina, 10
	    ");
        $models = $command->queryAll();
        if ($models) {
            return array('error' => false, 'code' => '200', 'productos' => $models);
        } else {
            return array('err' => 'NO SE ENCONTRARON COINCIDENCIAS.', 'code' => 'ERROR_NO_DATA_FOUND');
        }
    }

    public function actionGetproductomarca($marca = 0)
    {
        if ($marca == 0) {
            return array('error' => true, 'code' => '404', 'message' => 'Falta el parámetro marca');
        }

        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT 
        tab_producto_id as producto_id,
        tab_producto_codigo as codigo,
        tab_producto_descripcion as descripcion,
        tab_producto_imagen as imagen,
        tab_producto_nombre as nombre
        FROM tab_producto
        WHERE tab_producto_status = 'activo'
        AND fk_tab_marca_id = $marca
	    ");
        $models = $command->queryAll();
        if ($models) {
            return array('error' => false, 'code' => '200', 'productos' => $models);
        } else {
            return array('error' => true, 'code' => '404', 'message' => 'NO SE ENCONTRARON COINCIDENCIAS EN ESTA PAGINA');
        }
    }

    public function actionGetbuscarproductomarca($termino = 0, $marca = 0, $pagina = 0)
    {
        $pagina = $pagina * 10;

        if ($marca == 0) {
            return array('error' => true, 'code' => '404', 'message' => 'Falta el parámetro marca');
        }

        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT p.*, m.tab_marca_nombre
        FROM tab_producto p
        INNER JOIN tab_marca m on p.fk_tab_marca_id = m.tab_marca_id
        WHERE tab_producto_nombre LIKE '%$termino%'
        AND tab_producto_status = 'activo'
        AND tab_marca_id = $marca
        LIMIT $pagina, 10
	    ");
        $models = $command->queryAll();
        if ($models) {
            return array('error' => false, 'code' => '200', 'productos' => $models);
        } else {
            return array('error' => true, 'code' => '404', 'message' => 'NO SE ENCONTRARON COINCIDENCIAS EN ESTA PAGINA');
        }
    }

    public function actionPostreserva($token = "0", $usuario_id = "0")
    {
        $data = $_POST['items'];
        // return $token ;
        if ($token == "0" || $usuario_id == "0") {
            return array('error' => true, 'code' => '404', 'message' => 'Token y/o usuario inválido.');
        }

        if (empty($_POST['items'])) {
            return array('error' => true, 'code' => '404', 'message' => 'Faltan los items en el post');
        }

        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT * FROM user
        WHERE id = '$usuario_id'
        AND auth_key = '$token'
        ");
        
        $models = $command->queryAll();
        if ($models) {
            $user_id = $models[0]['id'];
            $fecha = date("Y-m-d H:i:s");
            $connection = Yii::$app->db->createCommand()->insert('reserva', [
                'usuario_id' => $user_id,
                'reserva_fecha' => $fecha,
            ]);

            if ($connection->execute()) {
                $idReserva = Yii::$app->db->getLastInsertID();

                $items = explode(',', ($_POST['items']));

                foreach ($items as $producto_id) {
                    $connection = Yii::$app->db->createCommand()->insert('reserva_detalle', [
                        'fk_reserva_id' => $idReserva,
                        'fk_producto_id' => $producto_id
                    ]);
                    $connection->execute();
                }

                return array('error' => false, 'code' => '200', 'message' => 'Reserva con id: ' . $idReserva . ', creada exitosamente');
            }

        } else {
            return array('error' => true, 'code' => '404', 'message' => 'Usuario y/o Token incorrectos');
        }

    }

    public function actionGetreserva($token = "0", $usuario_id = "0")
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
            $user_id = $usuario[0]['id'];
            $connection = Yii::$app->getDb();
            $command = $connection->createCommand("
            SELECT * FROM reserva
            WHERE usuario_id = '$usuario_id'
            ");
            $reserva = $command->queryAll();

            $reservas = array();

            foreach ($reserva as $row) {

                $connection = Yii::$app->getDb();
                $command = $connection->createCommand("
                SELECT d.fk_reserva_id, p.*
                FROM reserva_detalle d
                INNER JOIN tab_producto p on d.fk_producto_id = p.tab_producto_id
                WHERE fk_reserva_id =
                " . $row['reserva_id'] . "");

                $detalle = $command->queryAll();

                $detalles = array(
                    'id' => $row['reserva_id'],
                    'creado_en' => $row['reserva_fecha'],
                    'detalle' => $detalle,
                );

                array_push($reservas, $detalles);

            }

            return array('error' => false, 'code' => '200', 'reserva' => $reservas);
        } else {
            return array('error' => true, 'code' => '404', 'message' => 'Error en el token y/o usuario.');
        }
    }

    public function actionGetreservaid($token = "0", $usuario_id = "0", $id = "0")
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
            $user_id = $usuario[0]['id'];
            $connection = Yii::$app->getDb();
            $command = $connection->createCommand("
            SELECT d.fk_reserva_id, p.*
                FROM reserva_detalle d
                INNER JOIN tab_producto p on d.fk_producto_id = p.tab_producto_id
                WHERE fk_reserva_id = $id
            ");
            $reserva = $command->queryAll();

            // $reservas = array();

            // foreach ($reserva as $row) {

            //     $connection = Yii::$app->getDb();
            //     $command = $connection->createCommand("
            //     SELECT d.fk_reserva_id, p.*
            //     FROM reserva_detalle d
            //     INNER JOIN tab_producto p on d.fk_producto_id = p.tab_producto_id
            //     WHERE fk_reserva_id =
            //     " . $row['reserva_id'] . "
            //     AND fk_reserva_id = $id
            //     ");

            //     $detalle = $command->queryAll();

            //     $detalles = array(
            //         'id' => $row['reserva_id'],
            //         'creado_en' => $row['reserva_fecha'],
            //         'detalle' => $detalle,
            //     );

            //     array_push($reservas, $detalles);

            // }

            return array('error' => false, 'code' => '200', 'reserva' => $reserva);
        } else {
            return array('error' => true, 'code' => '404', 'message' => 'Error en el token y/o usuario.');
        }
    }

    public function actionGetstock(){
    $connection = Yii::$app->getDb();
    $command = $connection->createCommand("
    SELECT
        s.* 
    FROM
        stock s 
    WHERE
        `stock` >= 3
    ");
    $models = $command->queryAll();
    if ($models) {
        return  $models;
    } else {
        return array('error' => true, 'code' => '404', 'message' => 'NO SE ENCONTRARON COINCIDENCIAS EN ESTA PAGINA');
    }

    }
    

    public function actionGetstockid($id = 0)
    {
        if ($id == 0) {
            return array('error' => true, 'code' => '404', 'message' => 'Falta el parámetro id');
        }

        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
        SELECT
        kardex.producto_id AS producto_id,
         	sum( kardex.kardex_stock ) AS stock,
         	count( kardex.producto_id ) AS filas,
         	p.tab_producto_nombre AS nombre,
         	p.tab_producto_codigo AS codigo,
         	max( kardex.kardex_precio ) AS precio,
         	kardex.kardex_movimiento AS movimiento,
         	p.tab_producto_imagen AS imagen 
         FROM
         	( kardex JOIN tab_producto p ON ( ( p.tab_producto_id = kardex.producto_id ) ) ) 
         WHERE
         	( kardex.kardex_movimiento = 'ENTRADA' ) 
         	AND p.tab_producto_id = $id
         GROUP BY
         	kardex.producto_id 
	    ");
        $models = $command->queryAll();
        if ($models) {
            return  $models;
        } else {
            return array('error' => true, 'code' => '404', 'message' => 'NO SE ENCONTRARON COINCIDENCIAS EN ESTA PAGINA');
        }
    }

    protected function verbs()
    {
        return ['login' => ['POST']];
    }
    
    public function actionGetreservasall()
    {
        $connection = Yii::$app->getDb();
        $command = $connection->createCommand("
            SELECT
            `kardex`.`producto_id` AS `producto_id`,
            sum( `kardex`.`kardex_stock` ) AS `stock`,
            count( `kardex`.`producto_id` ) AS `filas`,
            `p`.`tab_producto_nombre` AS `nombre`,
            `p`.`tab_producto_codigo` AS `codigo`,
            max( `kardex`.`kardex_precio` ) AS `precio`,
            `kardex`.`kardex_movimiento` AS `movimiento`,
            `p`.`tab_producto_imagen` AS `imagen` 
        FROM
            ( `kardex` JOIN `tab_producto` `p` ON ( ( `p`.`tab_producto_id` = `kardex`.`producto_id` ) ) ) 
        WHERE
            ( `kardex`.`kardex_movimiento` = 'RESERVA' ) 
        GROUP BY
            `kardex`.`producto_id`
	    ");
        $models = $command->queryAll();
        if ($models) {
            return  $models;
        } else {
            return array('error' => true, 'code' => '404', 'message' => 'NO SE ENCONTRARON COINCIDENCIAS EN ESTA PAGINA');
        }
    }
}
