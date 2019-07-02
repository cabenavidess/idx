<?php
return [
    'ping' => 'site/ping',
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/user',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'OPTIONS {id}' => 'options',
            'POST login' => 'login',
            'OPTIONS login' => 'options',
            'POST signup' => 'signup',
            'OPTIONS signup' => 'options',
            'POST confirm' => 'confirm',
            'OPTIONS confirm' => 'options',
            'POST password-reset-request' => 'password-reset-request',
            'OPTIONS password-reset-request' => 'options',
            'POST password-reset-token-verification' => 'password-reset-token-verification',
            'OPTIONS password-reset-token-verification' => 'options',
            'POST password-reset' => 'password-reset',
            'OPTIONS password-reset' => 'options',
            'GET me' => 'me',
            'POST me' => 'me-update',
            'OPTIONS me' => 'options',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/staff',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'OPTIONS {id}' => 'options',
            'POST login' => 'login',
            'OPTIONS login' => 'options',
            'GET get-permissions' => 'get-permissions',
            'OPTIONS get-permissions' => 'options',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/setting',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'GET public' => 'public',
            'OPTIONS public' => 'options',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/login',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'POST auth' => 'auth',
            'POST register' => 'register',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/movil',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'POST auth' => 'auth',
            'POST register' => 'register',
            'GET marcas' => 'getmarcas',
            'GET marcasproducto/<marca:\w+>' => 'getproductomarca',
            'GET categorias' => 'getcategories',
            'GET stock' => 'getstock',
            'GET productos/<pagina:\w+>' => 'getproductospag',
            'GET productobuscar/<termino:\w+>' => 'getbuscarproducto',
            'GET productobuscarmarca/<termino:\w+>/<marca:\w+>/<pagina:\w+>' => 'getbuscarproductomarca',
            'GET productobuscarcategoria/<categoria:\w+>/<pagina:\w+>' => 'getbuscarproductocategoria',
            'POST reserva/<token:\w+>/<usuario_id:\w+>' => 'postreserva',
            'GET reserva/<token:\w+>/<usuario_id:\w+>' => 'getreserva',
            'GET reservaid/<token:\w+>/<usuario_id:\w+>/<id:\w+>' => 'getreservaid',
            'GET productoid/<id:\w+>' => 'getstockid',
            'GET reservas' => 'getreservasall',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/facturacion',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'POST guardafactura' => 'guardafactura',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/banner',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'POST banner' => 'banner',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/stock',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'GET stock_export'       =>  'stockexport',
            'OPTIONS stock_export' => 'options',
            'GET stock_exportadmin'       =>  'stockexportadmin',
            'OPTIONS stock_exportadmin' => 'options',
            'GET all'       =>  'stockall',
            'OPTIONS all' => 'options',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/movimientos',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'GET movimientos' => 'getmovimientos',
            'OPTIONS movimientos' => 'options',
        ],
    ],
    // configuracion Rest Cliente
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/cliente',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
    ],
    // configuracion Rest Impuestos
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/impuesto',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'GET public' => 'public',
            'OPTIONS public' => 'options',
        ],
    ],
    // configuracion Rest Ciudad
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/ciudad',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'GET public' => 'public',
            'OPTIONS public' => 'options',
        ],
    ],
    // Configuración Rest Representante Negocio
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/representantenegocio',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'GET public' => 'public',
            'OPTIONS public' => 'options',
        ],
    ],
    // Configuración Rest Sucursal
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/sucursal',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'OPTIONS {id}' => 'options',
            'GET getsucursal' => 'getsucursal',
            'OPTIONS getsucursal' => 'options',
            // 'OPTIONS <action:\w+>' => 'options'
        ],
    ],

    // configuracion Rest Categoria
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/categoria',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'GET estado' => 'getcategoria',
            'OPTIONS estado' => 'options',
        ],
    ],

    // configuracion Rest Marca
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/marca',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],

        'extraPatterns' => [
            'OPTIONS public' => 'options',
            'GET getmarca' => 'getmarca',
            'GET estado/<token:\w+>/<usuario_id:\w+>' => 'getmarcaestado',
        ],
    ],
    // configuracion Rest Producto
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/producto',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],

        'extraPatterns' => [
            'OPTIONS public' => 'options',
            'GET productos/<token:\w+>/<usuario_id:\w+>' => 'getproductoall',
            'GET getproducto/<token:\w+>/<usuario_id:\w+>' => 'getproducto',
            'GET productosprecio/<token:\w+>/<usuario_id:\w+>' => 'getproductoallprecio'
        ],
    ],
    // configuracion Rest Proveedor Mercadería
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/proveedor',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'GET public' => 'public',
            'OPTIONS public' => 'options',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/page',
        'pluralize' => false,
        'tokens' => [
        ],
        'extraPatterns' => [
            'GET sse' => 'sse',
            'OPTIONS sse' => 'sse',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/compra',
        'pluralize' => false,
        'tokens' => [
        ],
        'extraPatterns' => [
            'POST auth' => 'auth',
            'POST guardafact' => 'guardafactura',
            'GET guardafactura' => 'getfactura',
            'GET factura/<token:\w+>/<usuario_id:\w+>' => 'getcomprafactura',
            'GET facturaid/<id:\w+>' => 'getcomprafacturaid',
            'POST anularcompra' => 'anularcompra',
            'OPTIONS guardafactura' => 'options',
            'OPTIONS guardafact' => 'options',
            'OPTIONS facturaid/<id:\w+>' => 'options',
            'OPTIONS anularcompra' => 'options'
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/compras',
        'pluralize' => false,
        'tokens' => [
        ],
        'extraPatterns' => [
            'POST guardafact' => 'guardafactura',
            'POST anularcompra' => 'anularcompra',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/venta',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'POST auth' => 'auth',
            'POST guardafactura' => 'guardafactura',
            'GET guardafactura' => 'getfactura',
            'GET factura/<token:\w+>/<usuario_id:\w+>' => 'getcomprafactura',
            'GET facturaid/<id:\w+>' => 'getcomprafacturaid',
            'GET countfactura' => 'getcountfactura',
            'GET lista' => 'getfacturaventa',
            'POST anularventa' => 'anularventa',
            'OPTIONS guardafactura' => 'options',
            'OPTIONS lista' => 'options',
            'OPTIONS facturaid/<id:\w+>' => 'options',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/ventas',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'POST guardafactura' => 'guardafactura',
            'POST anularventa' => 'anularventa',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/formapago',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'GET pago' => 'getformap',
            'OPTIONS pago' => 'options',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/ventasd',
        'pluralize' => false,
        'tokens' => [
            '{id}' => '<id:\d+>',
        ],
        'extraPatterns' => [
            'GET totaldiario/<token:\w+>/<usuario_id:\w+>' => 'getcountfactura',
            'GET totaldiariog/<token:\w+>/<usuario_id:\w+>' => 'getcountfacturag',
            'GET countdiario' => 'getcountfacturas',
            'GET countdiarioc' => 'getcountfacturasc',
        ],
    ],
];
