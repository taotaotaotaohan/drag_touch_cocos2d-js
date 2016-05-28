/**
 * Created by taohan on 16/5/24.
 */
var helloworld=cc.Layer.extend({
    ctor:function(){
        this._super();
        var size=cc.winSize;
        //资源项
        var res={
            bgsprite:"res/bg.jpg",
            sprite3:"res/3.png",
            sprite5:"res/5.png",
            sprite7:"res/7.png",
            sprite_girl:"res/figure1.png",
            home:"res/image 164.png"
        };
        //定位信息

        var location={
            bgsprite:[size.width/2,size.height/2],
            sprite3:[size.width/3,size.height/2],
            sprite5:[size.width/3*1.5,size.height/2],
            sprite7:[size.width/3*2,size.height/2],
            sprite_girl:[size.width/3*2.6,size.height/2],
        };
        //sprite名称数组
        var sprite=["bgsprite","sprite3","sprite5","sprite7","sprite_girl"];
        //图片数组
        var pic_sprite=[res.bg,res.three,res.five,res.seven,res.girl,res.home];
        self=this;
        //创建精灵函数封装（精灵名称，定位信息，图片来源）
        //testing
        var create_sprite=function(name,location,pic){
            self[name]=new cc.Sprite(pic);
            self[name].setPosition(location[0],location[1]);
            if(name!="bgsprite" && name!="sprite_girl"){
                self[name].runAction(cc.Sequence.create(cc.ScaleTo.create(0.5,2.2), cc.ScaleTo.create(0.5, 0.8), cc.CallFunc.create(function(){
                }.bind(self))));
            }
            else if(name=="sprite_girl") {
                self[name].runAction(cc.Sequence.create(cc.ScaleTo.create(0.5,2.2), cc.ScaleTo.create(0.1, 0.3), cc.CallFunc.create(function(){
                }.bind(self))));
            }
            self.addChild(self[name]);
        };
        //执行
        for(var i=0;i<sprite.length;i++) {
            create_sprite(sprite[i],location[[sprite[i]]],res[[sprite[i]]]);
        }
        var listener_sprite_click = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch, event){
                cc.log("touch begin my sprite");
                return true;
            },
            onTouchMoved:function(touch, event){
                return true;
            },
            onTouchEnded:function(touch, event){
                var touch_point = touch.getLocation();
                cc.log(touch_point);
                if((cc.rectContainsPoint(self.sprite3.getBoundingBox(), touch_point))){
                    self.sprite3.runAction(cc.Sequence.create(cc.ScaleTo.create(0.5,2.2), cc.ScaleTo.create(0.5, 0.8), cc.CallFunc.create(function(){
                    }.bind(self))));
                }
                return true;
            }
        });
        cc.eventManager.addListener(listener_sprite_click, this.sprite3);
    },
});
var StartScene = cc.Scene.extend({
    onEnter:function () {
        //cc.log(this._super());
        this._super();
        var layer = new helloworld();
        //cc.log(layer);
        this.addChild(layer);

    }
});