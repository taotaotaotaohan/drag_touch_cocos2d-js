
var HelloWorldLayer = cc.Layer.extend({

      /*sprite_monkey_normal:null,
      sprite_monkey_fail:null,
      sprite_monkey_eat:null,
      sprite_monkey_full:null,
      sprite_monkey_success:null,
      banana_arry:null,
      //cur_game_index:null,
      arry_sprite_bananas:null,
      
      animation_banana_normal:null,//
      animation_peach_normal:null,//
      animation_monkey_nomarl:null,//
      animation_monkey_eatting:null,//
      animation_monkey_fail:null,//
      animation_monkey_full:null,
      animation_monkey_success:null,//
      cur_fruit_index:null,
      cur_eat_goals:null,
      sprite_number:null,
      sprite_progress:null,
      sprite_my_goal:null,
      round_num:null,
      
      volumeOn:null,
      volumeItem:null,
      
      restart_menu_item:null,
      
      target_array:null,
  */
      
      ctor:function () {
          //////////////////////////////
          // 1. super init first
          this._super();
          this.banana_arry = [1,2,3,4,5,6,7,8,9];
          this.round_num = 3;
          this.cur_game_index = -1;
          this.cur_fruit_index = -1;
          this.arry_sprite_bananas = [];
          this.target_array = [];
          this.volumeOn = true;
          cc.audioEngine.playEffect("res/background.mp3", true);
          this.reShuffleGame(true);
          var testArray3=[1,2,3,4,5,6,7,8,9,10,22,33,55,77,88,99];
          testArray3.sort(function(){return Math.random()>0.5?-1:1;});
          cc.log(testArray3);
          return true;
      },
      //数组随机全排列函数

      reShuffleArray:function (array) {
    	  var length = array.length;
    	  for (var i = 0; i < length; i++) {
    		  var sidx = Math.floor((Math.random()) * (length-1));
    		  if (sidx != i) {
    			  var tmp = array[i];
    			  array[i] = array[sidx];
    			  array[sidx] = tmp;
    		  }
    	  }
      },
      //初始化
      reShuffleGame:function (restart) {
          //****************刷新场景*******************//
          this.removeAllChildren();
          if (restart) {
              cc.log(this.banana_arry);
              this.banana_arry.sort(function(){return Math.random()>0.5?-1:1;});
              cc.log(this.banana_arry);
          }
          
          this.arry_sprite_bananas.length = 0;
          this.arry_sprite_bananas = [];
          this.cur_game_index++;
          var number_banana = this.banana_arry[this.cur_game_index];
          var size = cc.winSize;
          this.cur_fruit_index = -1;
          this.cur_eat_goals = 0;



          //****************香蕉动画*******************//
          //将相同频率的摇晃动画附加在6个png文件中备用，下面也是类似的作用//
          this.animation_banana_normal = new cc.Animation();
          //动画频率
          this.animation_banana_normal.setDelayPerUnit(0.5);
          this.animation_banana_normal.setRestoreOriginalFrame(true);
          for(var n_index = 1; n_index <6 ; ++n_index){
              this.animation_banana_normal.addSpriteFrameWithFile("res/banana0"+n_index+".png");
          }
          cc.log(this.animation_banana_normal);
          cc.log("香蕉动画");
          //****************桃子动画*******************//
          this.animation_peach_normal = new cc.Animation();
          this.animation_peach_normal.setDelayPerUnit(0.2);
          this.animation_peach_normal.setRestoreOriginalFrame(true);
          for(var n_index = 1; n_index < 10; ++n_index){
              this.animation_peach_normal.addSpriteFrameWithFile("res/peach"+n_index+".png");
          }
          cc.log("桃子动画");
          //****************猴子呼吸状态*******************//
          this.animation_monkey_nomarl = new cc.Animation();
          this.animation_monkey_nomarl.setDelayPerUnit(0.4);
          this.animation_monkey_nomarl.setRestoreOriginalFrame(false);
          for(var n_index = 1; n_index < 7; ++n_index){
              this.animation_monkey_nomarl.addSpriteFrameWithFile("res/monkey00"+n_index+".png");
          }
          cc.log("猴子呼吸动画");
          //****************猴子吃香蕉状态*******************//
          this.animation_monkey_eatting = new cc.Animation();
          //动画延迟
          this.animation_monkey_eatting.setDelayPerUnit(0.15);
          //动画完成后是否存储原始帧
          this.animation_monkey_eatting.setRestoreOriginalFrame(false);
          for(var n_index = 1; n_index < 33; ++n_index){
              this.animation_monkey_eatting.addSpriteFrameWithFile("res/monkey_eatting"+n_index+".png");
          }
          //****************猴子失败状态*******************//
          this.animation_monkey_fail = new cc.Animation();
          this.animation_monkey_fail.setDelayPerUnit(0.15);
          this.animation_monkey_fail.setRestoreOriginalFrame(false);
          for(var n_index = 1; n_index < 30; ++n_index){
              this.animation_monkey_fail.addSpriteFrameWithFile("res/fail/monkey_fail"+n_index+".png");
          }
          cc.log("猴子吃动画");
          //****************猴子欢呼状态*******************//
          this.animation_monkey_success = new cc.Animation();
          this.animation_monkey_success.setDelayPerUnit(0.15);
          this.animation_monkey_success.setRestoreOriginalFrame(false);
          for(var n_index = 1; n_index < 31; ++n_index){
              this.animation_monkey_success.addSpriteFrameWithFile("res/success/monkey_success"+n_index+".png");
          }
          cc.log("猴子欢呼");



          //************添加游戏背景******************//
          var background = new cc.Sprite("res/background.png");
          background.setPosition(size.width / 2, size.height / 2);//正中间放置
          this.addChild(background, 0);
          cc.log("添加背景");
          //************添加场景后面的树******************//
          var sprite_tree_back = new cc.Sprite("res/tree02.png");
          sprite_tree_back.setPosition(size.width * 6 / 7, size.height * 5 / 7);
          this.addChild(sprite_tree_back, 1);
          cc.log("添加树1");
          
          var sprite_cloud = new cc.Sprite("res/cloud_front.png");
          sprite_cloud.setPosition(cc.p(-110, size.height - 60));
          this.addChild(sprite_cloud, 2);
          cc.log("添加云1");
          
          var move = new cc.MoveBy(90.0, cc.p(size.width, 0));
          var moveOrig = new cc.MoveBy(0.0, cc.p(-size.width, 0));
          sprite_cloud.runAction(cc.RepeatForever.create(cc.Sequence.create(move, moveOrig)));
          
          var sprite_small_cloud = new cc.Sprite("res/small_cloud.png");
          sprite_small_cloud.setPosition(cc.p(0, size.height - 100));
          this.addChild(sprite_small_cloud, 3);
          cc.log("添加云2");
          //云的动画
          var move_small_cloud = new cc.MoveBy(90.0, cc.p(size.width, 0));
          var moveOrig_small_cloud = new cc.MoveBy(0.0, cc.p(-size.width, 0));
          sprite_small_cloud.runAction(cc.RepeatForever.create(cc.Sequence.create(move_small_cloud, moveOrig_small_cloud)));
          
          var sprite_tree_front = new cc.Sprite("res/tree01.png");
          sprite_tree_front.scale = 1;
          sprite_tree_front.setPosition(cc.p(size.width * 1 / 7, size.height * 2 / 3));
          this.addChild(sprite_tree_front, 4);
          cc.log("添加树2");

          //背景事物添加完毕
          //************正常猴子sprite******************//
          this.sprite_monkey_normal = new cc.Sprite("res/monkey001.png");
          this.sprite_monkey_normal.setPosition(size.width / 2, size.height / 2 + 70);
          this.addChild(this.sprite_monkey_normal, 5);
          //animation是一个数组，里面放的包含了动画的png，使用repeat来不停地轮换图片达到动画的效果
          this.sprite_monkey_normal.runAction(cc.RepeatForever.create(cc.Animate.create(this.animation_monkey_nomarl)));
          cc.log("添加正常猴子");
          //************返回按钮******************//
          var retItem = new cc.MenuItemImage(
        	 "res/btnRetNormal.png",
        	 "res/btnRetClicked.png",
             function () {
             cc.audioEngine.stopAllEffects();
             // cc.unregisterTouchDelegate(this);
                 this.removeAllChildren();
             //                cc.director.popScene();
             //                cc.director.purgeCachedData();
              //               cc.director.end();


                 //JS_POP_GAME(); 报错
                 //cc.director.pushScene(cc.TransitionFade.create(1, new PlayScene(), cc.color(100, 100, 100, 1)));报错
                 //cc.director.replaceScene( cc.TransitionPageTurn(1, new PlayScene(), false) );报错
                 cc.director.pushScene(new BabyBananaScene());
          }, this);
          retItem.setPosition(70, size.height - 70);
          
          var menu = new cc.Menu(retItem);
          menu.x = 0;
          menu.y = 0;
          this.addChild(menu, 6);
          cc.log("添加返回按钮");
          //************重新开始按钮，在返回任务之后才出现******************//
          this.restart_menu_item = new cc.MenuItemImage(
        		  "res/restart_normal.png",
        		  "res/restart_clicked.png",
        		  function () {
        			  this.cur_game_index = -1;
        			  this.reShuffleGame(true);
        			  //设置不可见
                      this.restart_menu_item.setVisible(false);
        		  }, this);
          this.restart_menu_item.setPosition(size.width / 2, size.height / 2 - 180);
          this.restart_menu_item.setVisible(false);

          var restart_menu = new cc.Menu(this.restart_menu_item);
          restart_menu.x = 0;
          restart_menu.y = 0;
          this.addChild(restart_menu, 6);
          cc.log("添加重新开始按钮");
          //************吃错物品时 猴子的动作 sprite ******************//
          this.sprite_monkey_fail = new cc.Sprite("res/fail/monkey_fail1.png");
          this.sprite_monkey_fail.setPosition(size.width / 2, size.height / 2 + 70);
          this.sprite_monkey_fail.setVisible(false);
          this.addChild(this.sprite_monkey_fail, 7);
          cc.log("添加吃错物品");
          //************正在吃东西的猴子 sprite ******************//
          this.sprite_monkey_eat = new cc.Sprite("res/monkey_eatting1.png");
          this.sprite_monkey_eat.setPosition(size.width / 2, size.height / 2 + 70);
          //设置不可见
          this.sprite_monkey_eat.setVisible(false);
          this.addChild(this.sprite_monkey_eat, 8);
          cc.log("添加正在吃");
          //************完成一个小关任务吃饱时 猴子的动作 sprite ******************//
          this.sprite_monkey_full = new cc.Sprite("res/full/full1.png");
          this.sprite_monkey_full.setTexture("res/full/full1.png");
          this.sprite_monkey_full.setPosition(size.width / 2 - 10, size.height / 2 + 70 - 2);
          this.sprite_monkey_full.setVisible(false);
          this.addChild(this.sprite_monkey_full, 8);
          //************吃正确物品时 猴子的动作 sprite ******************//
          this.sprite_monkey_success = new cc.Sprite("res/success/monkey_success1.png");
          this.sprite_monkey_success.setPosition(size.width / 2, size.height / 2 + 70);
          this.sprite_monkey_success.setVisible(false);
          this.addChild(this.sprite_monkey_success, 9);
          cc.log("添加成功猴子");
          this.sprite_my_goal = new cc.Sprite("res/goal/goal" + this.banana_arry[this.cur_game_index] + ".png");
          this.sprite_my_goal.setAnchorPoint(cc.p(0.5, 0.5));
          this.sprite_my_goal.setPosition(cc.p(size.width / 2 + 120, size.height / 2 + 180));
          this.sprite_my_goal.scale = 0.8;
          this.addChild(this.sprite_my_goal, 10);
          
          this.sprite_my_goal.runAction(cc.Sequence.create(cc.ScaleTo.create(0.5,2.2), cc.ScaleTo.create(0.5, 0.8), cc.CallFunc.create(function(){

          }.bind(this))));
          
          this.sprite_progress = new cc.Sprite("res/progress/progress" + this.cur_game_index + ".png");
          this.sprite_progress.setTexture("res/progress/progress" + this.cur_game_index + ".png");
          this.sprite_progress.setPosition(180, size.height - 70);
          this.addChild(this.sprite_progress, 12);
          cc.log("添加进度");
          //************音量按钮******************//
          this.volumeItem = new cc.MenuItemImage(
             (this.volumeOn ? "res/volumeOn.png" : "res/volumeOff.png"),
          "res/volumeSelected.png",
             function () {
             this.volumeOn = !this.volumeOn;
             if(this.volumeOn){
             var spriteNormal = new cc.Sprite("res/volumeOn.png");
             this.volumeItem.setNormalImage(spriteNormal);
             cc.audioEngine.setEffectsVolume(1.0);
             cc.log("volume on");
             }else{
             var spriteNormal = new cc.Sprite("res/volumeOff.png");
             this.volumeItem.setNormalImage(spriteNormal);
             cc.audioEngine.setEffectsVolume(0.0);
             cc.log("volume off");
             }
          }, this);
          this.volumeItem.setPosition(size.width - 70, size.height - 70);
          this.volumeItem.setScale(0.5);
          
          var volume_menu = new cc.Menu(this.volumeItem);
          volume_menu.x = 0;
          volume_menu.y = 0;
          this.addChild(volume_menu, 13);
          cc.log("添加音量");
         var self = this;
          //事件
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
                 cc.log("dfdf");
                 if((self.cur_eat_goals == self.banana_arry[self.cur_game_index])){
                     return true;
                 }
                 var touch_point = touch.getLocation();
                 for(var n_index = 0; n_index < 9; ++n_index){
                     if(self.arry_sprite_bananas[n_index] && (cc.rectContainsPoint(self.arry_sprite_bananas[n_index].getBoundingBox(), touch_point))){
                         if(self.target_array[n_index] == 1){
                             self.cur_eat_goals++;
                             self.showNumber();
                             var move_banana = new cc.MoveTo(0.1, cc.p(size.width / 2 - 30, size.height/ 2));
                             self.arry_sprite_bananas[n_index].runAction(cc.Sequence.create(move_banana));
                             self.cur_fruit_index = n_index;
                             self.scheduleOnce(self.monkeyEat, 0.1);
                             if((self.cur_eat_goals == self.banana_arry[self.cur_game_index])){
                                 cc.log("更新进度" + self.cur_game_index);
                                 self.sprite_progress.setTexture("res/progress/progress" + (self.cur_game_index + 1) + ".png");
                             }
                         }else{
                             self.cur_fruit_index = -1;
                             self.showFailMoneky();
                         }
                     }
                 }

                 return true;
             }
         });
         cc.eventManager.addListener(listener_sprite_click, this.sprite_monkey_normal);
         this.initTargets();
      },

      //事物描画
      initTargets:function () {
    	  var realTargetNum = this.banana_arry[this.cur_game_index];
    	  this.target_array = [];
    	  var size = cc.winSize;
    	  var row1Height = size.height / 3;
    	  var row2Height = size.height / 7;

          //###########分出苹果和香蕉#############//
    	  for (var idx = 0; idx < 9; idx++) {
    		  if (idx < realTargetNum) {
    			  this.target_array[idx] = 1;
    		  } else {
    			  this.target_array[idx] = 0;
    		  }
    	  }

    	  this.reShuffleArray(this.target_array);

    	  for(var idx = 0; idx < 9; idx++){
    		  if(this.target_array[idx] == 1){
    			  this.arry_sprite_bananas[idx] = new cc.Sprite("res/banana01.png");
    			  this.arry_sprite_bananas[idx].runAction(cc.RepeatForever.create(cc.Animate.create(this.animation_banana_normal)));
    			  cc.log("添加香蕉" + idx);
    		  }else{
    			  this.arry_sprite_bananas[idx] = new cc.Sprite("res/peach1.png");
    			  this.arry_sprite_bananas[idx].runAction(cc.RepeatForever.create(cc.Animate.create(this.animation_peach_normal)));
    			  cc.log("添加桃子" + idx);
    		  }
                //##############区分前后排###########//
    		  if(idx < 4){
    			  this.arry_sprite_bananas[idx].setPosition(size.width / 5 * (idx + 1), row1Height);
    			  this.arry_sprite_bananas[idx].scale = 0.7;
    		  }else{
    			  this.arry_sprite_bananas[idx].setPosition(size.width / 6 * (idx - 3), row2Height);
    		  }

    		  this.addChild(this.arry_sprite_bananas[idx], 20 + idx);
    	  }
      },


                                      
      monkeyEat:function(){
          if(this.cur_eat_goals <= this.banana_arry[this.cur_game_index]){
              this.arry_sprite_bananas[this.cur_fruit_index].setVisible(false);
              this.removeChild(this.arry_sprite_bananas[this.cur_fruit_index]);
              this.arry_sprite_bananas[this.cur_fruit_index] = null;
          }
          
          this.sprite_monkey_normal.setVisible(false);
          this.sprite_monkey_normal.stopAllActions();
          this.sprite_monkey_fail.setVisible(false);
          this.sprite_monkey_fail.stopAllActions();
          this.sprite_monkey_eat.stopAllActions();
          this.sprite_monkey_eat.setVisible(true);
          
          //****************猴子吃香蕉状态*******************//
          this.animation_monkey_eatting = new cc.Animation();
          this.animation_monkey_eatting.setDelayPerUnit(0.15);
          this.animation_monkey_eatting.setRestoreOriginalFrame(false);
          for(var n_index = 1; n_index < 33; ++n_index){
              this.animation_monkey_eatting.addSpriteFrameWithFile("res/monkey_eatting"+n_index+".png");
          }
      
          this.sprite_monkey_eat.runAction(cc.Sequence.create(cc.Animate.create(this.animation_monkey_eatting),cc.CallFunc.create(function(){
              if((this.cur_eat_goals == this.banana_arry[this.cur_game_index])){
                  if(this.cur_game_index == (this.round_num - 1)){
                      this.showCheerMonkey();
                      this.showHonorCup();
                      this.hideAllfruit();
                      this.restart_menu_item.setVisible(true);
                      cc.audioEngine.playEffect("res/success.mp3", false);
                  }else{
                      cc.log("current stage is" + this.cur_game_index);
                      
                      this.sprite_monkey_fail.setVisible(false);
                      this.sprite_monkey_normal.setVisible(false);
                      this.sprite_monkey_eat.setVisible(false);

                      this.sprite_monkey_full.stopAllActions();
                      this.sprite_monkey_full.setVisible(true);

                      //****************猴子吃饱状态*******************//
                      this.animation_monkey_full = new cc.Animation();
                      this.animation_monkey_full.setDelayPerUnit(0.09);
                      this.animation_monkey_full.setRestoreOriginalFrame(false);
                      for(var n_index = 1; n_index < 51; ++n_index){
                    	  this.animation_monkey_full.addSpriteFrameWithFile("res/full/full"+n_index+".png");
                      }

                      this.sprite_monkey_full.runAction(cc.Sequence.create(cc.Animate.create(this.animation_monkey_full), cc.CallFunc.create(function(){
                    	  this.reShuffleGame();
                      }.bind(this))));
                      cc.audioEngine.playEffect("res/audioEffect/great.mp3", false);
                  }
              }else{
                  this.showNormalMonkey();
              }
          }.bind(this))));
          this.banana_index = -1;
      },
      showNormalMonkey:function(){
          this.sprite_monkey_eat.setVisible(false);
          this.sprite_monkey_eat.stopAllActions();
          
          this.sprite_monkey_fail.setVisible(false);
          this.sprite_monkey_fail.stopAllActions();
          
          this.sprite_monkey_normal.stopAllActions();
          this.sprite_monkey_normal.setVisible(true);
          
          //****************猴子呼吸状态*******************//
          this.animation_monkey_nomarl = new cc.Animation();
          this.animation_monkey_nomarl.setDelayPerUnit(0.4);
          this.animation_monkey_nomarl.setRestoreOriginalFrame(false);
          for(var n_index = 1; n_index < 7; ++n_index){
              this.animation_monkey_nomarl.addSpriteFrameWithFile("res/monkey00"+n_index+".png");
          }
      
          this.sprite_monkey_normal.runAction(cc.RepeatForever.create(cc.Animate.create(this.animation_monkey_nomarl)));
      },
      showFailMoneky:function(){
          this.sprite_monkey_eat.stopAllActions();
          this.sprite_monkey_eat.setVisible(false);
          
          this.sprite_monkey_normal.stopAllActions();
          this.sprite_monkey_normal.setVisible(false);
          
          this.sprite_monkey_fail.stopAllActions();
          this.sprite_monkey_fail.setVisible(true);
          
          //****************猴子失败状态*******************//
          this.animation_monkey_fail = new cc.Animation();
          this.animation_monkey_fail.setDelayPerUnit(0.15);
          this.animation_monkey_fail.setRestoreOriginalFrame(false);
          for(var n_index = 1; n_index < 30; ++n_index){
              this.animation_monkey_fail.addSpriteFrameWithFile("res/fail/monkey_fail"+n_index+".png");
          }
          
          this.sprite_monkey_fail.runAction(cc.Sequence.create(cc.Animate.create(this.animation_monkey_fail), cc.CallFunc.create(function(){
              this.showNormalMonkey();
          }.bind(this))));
          
          cc.audioEngine.playEffect("res/audioEffect/fail.mp3", false);
      },

      showCheerMonkey:function(){
          this.sprite_monkey_fail.setVisible(false);
          this.sprite_monkey_normal.setVisible(false);
          this.sprite_monkey_eat.setVisible(false);
          this.sprite_monkey_full.setVisible(false);
          
          this.sprite_monkey_success.stopAllActions();
          this.sprite_monkey_success.setVisible(true);
          
          //****************猴子欢呼状态*******************//
          this.animation_monkey_success = new cc.Animation();
          this.animation_monkey_success.setDelayPerUnit(0.15);
          this.animation_monkey_success.setRestoreOriginalFrame(false);
          for(var n_index = 1; n_index < 31; ++n_index){
              this.animation_monkey_success.addSpriteFrameWithFile("res/success/monkey_success"+n_index+".png");
          }
      
          this.sprite_monkey_success.runAction(cc.RepeatForever.create(cc.Animate.create(this.animation_monkey_success)));
      },
      showNumber:function(){
          if(this.cur_eat_goals){
          cc.log("current banana number is " + this.cur_eat_goals);
          if(this.sprite_number){
               this.removeChild(this.sprite_number);
          }
          var size = cc.winSize;
          cc.audioEngine.playEffect("res/audioEffect/num/"+this.cur_eat_goals+".mp3", false);
          this.sprite_number = new cc.Sprite("res/"+this.cur_eat_goals+"Big.png");
          this.sprite_number.setAnchorPoint(cc.p(0.5, 0.5));
          this.sprite_number.scale = 0.7;
          this.sprite_number.setPosition(cc.p(size.width / 2 - 150, size.height / 2 + 50));
          this.addChild(this.sprite_number);
          this.sprite_number.runAction(cc.Sequence.create(cc.ScaleTo.create(0.5,1.4), cc.ScaleTo.create(0.5, 0.5), cc.CallFunc.create(function(){
                  this.sprite_number.setVisible(false);
                  this.removeChild(this.sprite_number);
                  this.sprite_number = null;
              }.bind(this))));
          }
      },
      showHonorCup:function(){
    	  var size = cc.winSize;
          var honor_cup_sprite = new cc.Sprite("res/HonorCup.png");
          honor_cup_sprite.setAnchorPoint(cc.p(0.5, 0.5));
          honor_cup_sprite.setPosition(cc.p(size.width / 2 - 130, size.height));
          this.addChild(honor_cup_sprite, 34);
          honor_cup_sprite.runAction(new cc.MoveTo(0.5, cc.p(size.width / 2 - 130, size.height / 2)));
      },
      hideAllfruit:function() {
    	  for (var n_index = 0; n_index < this.arry_sprite_bananas.length; ++n_index) {
    		  if (this.arry_sprite_bananas[n_index]) {
    			  this.arry_sprite_bananas[n_index].setVisible(false);
    			  this.removeChild(this.arry_sprite_bananas[n_index]);
    			  this.arry_sprite_bananas[n_index] = null;
    		  }
    	  }
    	  this.removeChild(this.sprite_my_goal);
      }
});

var BabyBananaScene = cc.Scene.extend({
       onEnter:function () {
         this._super();
         var layer = new HelloWorldLayer();
         this.addChild(layer);
       }
});

