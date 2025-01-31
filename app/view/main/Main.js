
Ext.define('Bitcoin.view.main.Main',{
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.button.Segmented', 'Ext.list.Tree'
    ],
    controller: 'main',
    viewModel: 'main',
    itemId: 'mainView',
    layout: {
        type: 'vbox',
        //子试图铺满容器
        align: 'stretch'
    },
    listeners: {
        render: 'onMainViewRender'
    },
    items:[
        {
            //上方容器
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 64,
            itemId: 'headerBar',
            title:'aa',
            hidden: true,
            bind: {
                hidden: '{isHideMain}'
            },
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo"><img src="resources/images/logo/company-logo.png">Sencha</div>',
                    //宽度与导航菜单栏宽度相同
                    width: 250
                },{
                    //菜单折叠/展开按钮
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls: 'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },'->', {
                    //帮助按钮
                    iconCls: 'x-fa fa-question',
                    ui: 'header',
                    //触发路由
                    href: '#view.faq',
                    //本页打开
                    hrefTarget: '_self',
                    tooltip: '帮助'
                },{
                    //退出登录按钮
                    iconCls: 'x-fa fa-sign-out',
                    ui: 'header',
                    tooltip: '退出登录',
                    handler: 'onLoginOut'
                },{
                    //相当于一个label
                    xtype: 'tbtext',
                    //动态绑定名称
                    bind: '{userData.fullName}'
                },{
                     //图片
                     xtype: 'image',
                     cls: 'header-right-profile-image',
                     height: 35,
                     width: 35,
                     alt: '当前用户图像',
                     //动态绑定头像
                     bind: {
                         src: '{userData.img}'
                     }
                }
            ]
        },{
            //下方容器
            xtype: 'container',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',   //别名，方便查询
            flex: 1,      
            hidden: true,
            bind: {
                hidden: '{isHideMain}'   //绑定数据
            },
            layout: {       //布局方式
                type: 'hbox',  //水平布局
                //是否支持动画效果
                //用于支持菜单栏折叠/展开动画效果
                animate: true,
                animatePolicy: {
                    x: true,
                    width: true
                }
            },
            items: [{
                    height: "100%",
                    scrollable: 'y',
                    reference: 'navigationContainer',
                    cls: 'navigationContainer',
                    xtype: 'container',
                    width: 250,
                    items: [{
                            xtype: 'treelist',
                            reference: 'navigationTreeList',
                            itemId: 'navigationTreeList',
                            ui: 'nav',
                            //注意第四章的时候这里需要去掉注释
                            //store: 'navigationTree',
                            width: 250,
                            //展开按钮显示在右侧
                            expanderFirst: false,
                            //点击父菜单任何区域都可展开子菜单
                            expanderOnly: false,
                            //只有一个节点能展开
                            singleExpand: true,
                            listeners: {
                                //监听导航菜单选中改变事件
                                selectionchange: 'onNavigationTreeSelectionChange'
                            }
                    }]
                },{
                    //内容展示模块  
                    xtype: 'container',     //这个容器作为主要展示区域
                    height: '100%',
                    flex: 1,
                    reference: 'mainCardPanel',
                    itemId: 'contentPanel',
                    //返回页面集合，自定义属性
                    backView: [],
                    layout: {
                        //跑马灯布局
                        type: 'card',
                        //暂时不知道用处
                        anchor: '100%'
                    },
                    //子item默认配置
                    defaults: {
                        padding: 20
                    }
                }]
        }
    ]
})