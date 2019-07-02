<?php
namespace app\controllers;
use Yii;
 
class AuthController extends \yii\rest\Controller
{
    public function actionLogin(){
        // Tangkap data login dari client (username & password)
        $username = !empty($_POST['username'])?$_POST['username']:'';
        $password = !empty($_POST['password'])?$_POST['password']:'';
        $response = [];
        // validasi jika kosong
        if(empty($username) || empty($password)){
          $response = [
            'status' => 'error',
            'message' => 'username & password tidak boleh kosong!',
            'data' => '',
          ];
        }
        else{
            // cari di database, ada nggak username dimaksud
            $user = \app\models\User::findByUsername($username);
            // jika username ada maka
            if(!empty($user)){
              // check, valid nggak passwordnya, jika valid maka bikin response success
              if($user->validatePassword($password)){
                $response = [
                  'status' => 'success',
                  'message' => 'login berhasil!',
                  'data' => [
                      'id' => $user->id,
                      'username' => $user->username,
                      // token diambil dari field auth_key
                      'token' => $user->auth_key,
                  ]
                ];
              }
              // Jika password salah maka bikin response seperti ini
              else{
                $response = [
                  'status' => 'error',
                  'message' => 'password salah!',
                  'data' => '',
                ];
              }
            }
            // Jika username tidak ditemukan bikin response kek gini
            else{
              $response = [
                'status' => 'error',
                'message' => 'username tidak ditemukan dalam database!',
                'data' => '',
              ];
            }
        }
     
        return $response;
    }

    protected function verbs()
    {
    return [
        'login' => ['POST'],
    ];
    }
}