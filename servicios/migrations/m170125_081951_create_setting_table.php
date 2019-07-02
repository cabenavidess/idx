<?php

use yii\db\Migration;
use yii\db\Schema;

/**
 * Handles the creation of table `setting`.
 */
class m170125_081951_create_setting_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('setting', [
            'id'            => $this->primaryKey(),
            'meta_key'      => $this->string(255),
            'meta_name'     => $this->string(255),
            'meta_type'     => $this->string(50),
            'meta_desc'     => $this->text(),
            'meta_attribute'=> $this->text(),

            'meta_value'    => 'LONGTEXT',
            'is_public'     => $this->boolean(),
            'status'        => $this->boolean(),
            'created_at'    => Schema::TYPE_TIMESTAMP. ' DEFAULT CURRENT_TIMESTAMP',
            'updated_at'    => Schema::TYPE_TIMESTAMP. ' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ]);

        // creates index for table `setting`
        $this->createIndex(
            'idx-setting',
            'setting',
            ['meta_key', 'meta_type', 'is_public', 'status', 'created_at', 'updated_at']
        );



        $this->insert('setting', [
            'id'            =>  1,
            'meta_key'      =>  'timezone',
            'meta_name'     =>  'Timezone',
            'meta_type'     =>  'select',
            'meta_desc'     =>  'Set the time zone of the application',
            'meta_attribute'    =>  '{"list": [{"value":"America/Guayaquil","label":"America/Guayaquil"}]}',
            'meta_value'    =>  'America/Guayaquil',
            'is_public'     =>  1,
            'status'        =>  1,
        ]);

    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropIndex('idx-setting', 'setting');
        $this->dropTable('setting');
    }
}
