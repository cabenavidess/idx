<?php

namespace app\modules\v1\models;

use Yii;

/**
 * This is the model class for table "user".
 *
 * @property integer $id
 * @property string $username
 * @property string $auth_key
 * @property string $access_token_expired_at
 * @property string $password_hash
 * @property string $password_reset_token
 * @property string $email
 * @property string $unconfirmed_email
 * @property string $confirmed_at
 * @property string $registration_ip
 * @property string $last_login_at
 * @property string $last_login_ip
 * @property string $blocked_at
 * @property integer $status
 * @property integer $role
 * @property string $created_at
 * @property string $updated_at
 */
class User extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['access_token_expired_at', 'confirmed_at', 'last_login_at', 'blocked_at', 'created_at', 'updated_at'], 'safe'],
            [['status', 'role'], 'integer'],
            [['username'], 'string', 'max' => 200],
            [['auth_key', 'password_hash', 'password_reset_token', 'email', 'unconfirmed_email'], 'string', 'max' => 255],
            [['registration_ip', 'last_login_ip'], 'string', 'max' => 20],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'username' => 'Username',
            'auth_key' => 'Auth Key',
            'access_token_expired_at' => 'Access Token Expired At',
            'password_hash' => 'Password Hash',
            'password_reset_token' => 'Password Reset Token',
            'email' => 'Email',
            'unconfirmed_email' => 'Unconfirmed Email',
            'confirmed_at' => 'Confirmed At',
            'registration_ip' => 'Registration Ip',
            'last_login_at' => 'Last Login At',
            'last_login_ip' => 'Last Login Ip',
            'blocked_at' => 'Blocked At',
            'status' => 'Status',
            'role' => 'Role',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}
