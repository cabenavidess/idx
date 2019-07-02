<?php
namespace app\modules\v1\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\web\Response;

class LoginController extends ActiveController
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
                    'data' => ['message' => $username.' ya utilizado']);
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
    protected function verbs()
    {
        return ['login' => ['POST']];
    }
}
