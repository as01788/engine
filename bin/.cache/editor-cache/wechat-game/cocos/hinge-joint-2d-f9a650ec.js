System.register(["./json-asset-7bb011fd.js","./index-07e0e256.js","./deprecated-229f0693.js","./collision-matrix-c53e6e00.js"],(function(t){"use strict";var e,o,i,n,r,a,p,s,c,u,l,y,f,_,h,g,b,d,m,w,D,O,S,j,P,L,C;return{setters:[function(t){e=t.cI,o=t.l,i=t.ew,n=t.ej,r=t.dc,a=t.eN,p=t.c2,s=t.eq,c=t.er,u=t.g5,l=t.ev,y=t.es,f=t.ey,_=t.dO,h=t.fW,g=t.cg,b=t.ez,d=t.ce,m=t.c4,w=t.c8,D=t.cr},function(t){O=t.d,S=t.D,j=t.j},function(t){P=t.g},function(t){L=t.C,C=t.P}],execute:function(){var A,x,E,T,k,I;t({E:void 0,P:void 0,a:void 0,b:void 0,c:void 0,d:void 0,g:void 0,s:function(t,e){z=t,o._global.CC_PHYSICS_2D_BUILTIN="builtin"==t,o._global.CC_PHYSICS_2D_BOX2D="box2d"==t,M=e}}),function(t){t[t.Static=0]="Static",t[t.Kinematic=1]="Kinematic",t[t.Dynamic=2]="Dynamic",t[t.Animated=3]="Animated"}(A||(A=t("E",{}))),e(A),function(t){t[t.None=0]="None",t[t.BOX=1]="BOX",t[t.CIRCLE=2]="CIRCLE",t[t.POLYGON=3]="POLYGON"}(x||(x=t("a",{}))),e(x),function(t){t[t.None=0]="None",t[t.DISTANCE=1]="DISTANCE",t[t.SPRING=2]="SPRING",t[t.WHEEL=3]="WHEEL",t[t.MOUSE=4]="MOUSE",t[t.FIXED=5]="FIXED",t[t.SLIDER=6]="SLIDER",t[t.RELATIVE=7]="RELATIVE",t[t.HINGE=8]="HINGE"}(E||(E=t("b",{}))),e(E),function(t){t[t.DEFAULT=1]="DEFAULT"}(T||(T=t("P",{}))),e(T),function(t){t[t.Closest=0]="Closest",t[t.Any=1]="Any",t[t.AllClosest=2]="AllClosest",t[t.All=3]="All"}(k||(k=t("c",{}))),t("C",{None:"none-contact",BEGIN_CONTACT:"begin-contact",END_CONTACT:"end-contact",PRE_SOLVE:"pre-solve",POST_SOLVE:"post-solve"}),function(t){t[t.None=0]="None",t[t.Shape=1]="Shape",t[t.Joint=2]="Joint",t[t.Aabb=4]="Aabb",t[t.Pair=8]="Pair",t[t.CenterOfMass=16]="CenterOfMass",t[t.Particle=32]="Particle",t[t.Controller=64]="Controller",t[t.All=63]="All"}(I||(I=t("d",{})));var M,z,v=t("e",32),F=function(){return 0},R={impl:null,rigidBody:null,isAwake:!1,isSleeping:!1,initialize:F,setType:F,setLinearDamping:F,setAngularDamping:F,setGravityScale:F,setFixedRotation:F,setAllowSleep:F,isActive:F,setActive:F,wakeUp:F,sleep:F,getMass:F,getInertia:F,getLinearVelocity:F,setLinearVelocity:F,getLinearVelocityFromWorldPoint:F,getAngularVelocity:F,setAngularVelocity:F,getLocalVector:F,getWorldVector:F,getLocalPoint:F,getWorldPoint:F,getLocalCenter:F,getWorldCenter:F,applyForce:F,applyForceToCenter:F,applyTorque:F,applyLinearImpulse:F,applyLinearImpulseToCenter:F,applyAngularImpulse:F,onEnable:F,onDisable:F,onDestroy:F},q={INITED:!1};var N={INITED:!1},V={impl:null,initialize:F,setDampingRatio:F,setFrequency:F,setMaxForce:F,setTarget:F,setDistance:F,setAngularOffset:F,setCorrectionFactor:F,setLinearOffset:F,setMaxLength:F,setMaxTorque:F,setLowerLimit:F,setUpperLimit:F,setMaxMotorForce:F,setMaxMotorTorque:F,setMotorSpeed:F,enableLimit:F,enableMotor:F,setLowerAngle:F,setUpperAngle:F};var B,W,Y,H,G,J,U,X,K,Q,Z,$,tt,et,ot,it,nt,rt,at,pt,st=null,ct=t("f",function(t){function o(){var o;(o=t.call(this)||this).velocityIterations=10,o.positionIterations=10,o.physicsWorld=void 0,o.collisionMatrix=new L,o._enable=!0,o._allowSleep=!0,o._maxSubSteps=1,o._fixedTimeStep=1/60,o._autoSimulation=!0,o._accumulator=0,o._steping=!1,o._gravity=new p(0,-10*v),o._delayEvents=[];var i=P.config?P.config.physics:null;if(i){if(p.copy(o._gravity,i.gravity),o._gravity.multiplyScalar(v),o._allowSleep=i.allowSleep,o._fixedTimeStep=i.fixedTimeStep,o._maxSubSteps=i.maxSubSteps,o._autoSimulation=i.autoSimulation,i.collisionMatrix)for(var n in i.collisionMatrix){var r=parseInt(n),a=1<<parseInt(n);o.collisionMatrix[""+a]=i.collisionMatrix[r]}if(i.collisionGroups){var s=i.collisionGroups;s instanceof Array&&(s.forEach((function(t){T[t.name]=1<<t.index})),e.update(T))}}return o.physicsWorld=new M.PhysicsWorld,o.gravity=o._gravity,o.allowSleep=o._allowSleep,o}i(o,t);var r=o.prototype;return r.postUpdate=function(t){if(this._enable&&this._autoSimulation){O.emit(S.EVENT_BEFORE_PHYSICS),this._steping=!0;var e=this._fixedTimeStep,o=this.velocityIterations,i=this.positionIterations;this._accumulator+=t;for(var n=0;n++<this._maxSubSteps&&this._accumulator>e;)this.physicsWorld.step(e,o,i),this._accumulator-=e;for(var r=this._delayEvents,a=0,p=r.length;a<p;a++){var s=r[a];s.func.call(s.target)}r.length=0,this.physicsWorld.syncPhysicsToScene(),this.debugDrawFlags&&this.physicsWorld.drawDebug(),this._steping=!1,O.emit(S.EVENT_AFTER_PHYSICS)}},r._callAfterStep=function(t,e){this._steping?this._delayEvents.push({target:t,func:e}):e.call(t)},r.resetAccumulator=function(t){void 0===t&&(t=0),this._accumulator=t},r.step=function(t){this.physicsWorld.step(t,this.velocityIterations,this.positionIterations)},r.raycast=function(t,e,o,i){return void 0===o&&(o=k.Closest),void 0===i&&(i=4294967295),this.physicsWorld.raycast(t,e,o,i)},r.testPoint=function(t){return this.physicsWorld.testPoint(t)},r.testAABB=function(t){return this.physicsWorld.testAABB(t)},n(o,[{key:"enable",get:function(){return this._enable},set:function(t){this._enable=t}},{key:"allowSleep",get:function(){return this._allowSleep},set:function(t){this._allowSleep=t,this.physicsWorld.setAllowSleep(t)}},{key:"gravity",get:function(){return this._gravity},set:function(t){this._gravity.set(t),this.physicsWorld.setGravity(new p(t.x/v,t.y/v))}},{key:"maxSubSteps",get:function(){return this._maxSubSteps},set:function(t){this._maxSubSteps=t}},{key:"fixedTimeStep",get:function(){return this._fixedTimeStep},set:function(t){this._fixedTimeStep=t}},{key:"autoSimulation",get:function(){return this._autoSimulation},set:function(t){this._autoSimulation=t}},{key:"debugDrawFlags",get:function(){return this.physicsWorld.debugDrawFlags},set:function(t){this.physicsWorld.debugDrawFlags=t}},{key:"stepping",get:function(){return this._steping}}],[{key:"PHYSICS_NONE",get:function(){return!z}},{key:"PHYSICS_BUILTIN",get:function(){return"builtin"===z}},{key:"PHYSICS_BOX2D",get:function(){return"box2d"===z}},{key:"PhysicsGroup",get:function(){return T}},{key:"instance",get:function(){return st||(st=new o),st}}]),o}(r(j)));ct.ID="PHYSICS_2D",O.once(S.EVENT_INIT,(function(){ct.PHYSICS_NONE||a||O.registerSystem(ct.ID,ct.instance,j.Priority.LOW)})),function(t){t[t.Circles=0]="Circles",t[t.FaceA=1]="FaceA",t[t.FaceB=2]="FaceB"}(B||(B=t("g",{})));var ut,lt,yt,ft,_t,ht,gt,bt,dt,mt,wt,Dt,Ot,St,jt,Pt,Lt,Ct,At,xt,Et,Tt,kt,It,Mt,zt,vt,Ft,Rt,qt,Nt,Vt,Bt,Wt,Yt,Ht,Gt,Jt,Ut,Xt,Kt,Qt,Zt,$t,te,ee,oe,ie,ne,re,ae,pe,se,ce,ue,le,ye,fe,_e,he,ge,be,de,me,we,De,Oe,Se,je,Pe,Le,Ce,Ae,xe,Ee,Te,ke,Ie,Me,ze,ve,Fe,Re,qe,Ne,Ve,Be,We,Ye,He,Ge,Je,Ue,Xe,Ke,Qe,Ze,$e,to,eo,oo=u,io=l,no=h,ro=t("R",(W=s("cc.RigidBody2D"),Y=no(),H=io(C),G=io(A),W(J=Y((pt=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return e=t.call.apply(t,[this].concat(i))||this,y(e,"enabledContactListener",X,f(e)),y(e,"bullet",K,f(e)),y(e,"awakeOnLoad",Q,f(e)),e._body=null,y(e,"_group",Z,f(e)),y(e,"_type",$,f(e)),y(e,"_allowSleep",tt,f(e)),y(e,"_gravityScale",et,f(e)),y(e,"_linearDamping",ot,f(e)),y(e,"_angularDamping",it,f(e)),y(e,"_linearVelocity",nt,f(e)),y(e,"_angularVelocity",rt,f(e)),y(e,"_fixedRotation",at,f(e)),e}i(e,t);var r=e.prototype;return r.isAwake=function(){return!!this._body&&this._body.isAwake},r.wakeUp=function(){this._body&&this._body.wakeUp()},r.sleep=function(){this._body&&this._body.sleep()},r.getMass=function(){return this._body?this._body.getMass():0},r.applyForce=function(t,e,o){this._body&&this._body.applyForce(t,e,o)},r.applyForceToCenter=function(t,e){this._body&&this._body.applyForceToCenter(t,e)},r.applyTorque=function(t,e){this._body&&this._body.applyTorque(t,e)},r.applyLinearImpulse=function(t,e,o){this._body&&this._body.applyLinearImpulse(t,e,o)},r.applyLinearImpulseToCenter=function(t,e){this._body&&this._body.applyLinearImpulseToCenter(t,e)},r.applyAngularImpulse=function(t,e){this._body&&this._body.applyAngularImpulse(t,e)},r.getLinearVelocityFromWorldPoint=function(t,e){return this._body?this._body.getLinearVelocityFromWorldPoint(t,e):e},r.getLocalVector=function(t,e){return this._body?this._body.getLocalVector(t,e):e},r.getWorldVector=function(t,e){return this._body?this._body.getWorldVector(t,e):e},r.getLocalPoint=function(t,e){return this._body?this._body.getLocalPoint(t,e):e},r.getWorldPoint=function(t,e){return this._body?this._body.getWorldPoint(t,e):e},r.getLocalCenter=function(t){return this._body?this._body.getLocalCenter(t):t},r.getWorldCenter=function(t){return this._body?this._body.getWorldCenter(t):t},r.getInertia=function(){return this._body&&this._body.getInertia(),0},r.onLoad=function(){this._body=o._global.CC_PHYSICS_2D_BUILTIN?R:new M.RigidBody,this._body.initialize(this)},r.onEnable=function(){this._body&&this._body.onEnable()},r.onDisable=function(){this._body&&this._body.onDisable()},r.onDestroy=function(){this._body&&this._body.onDestroy()},n(e,[{key:"group",get:function(){return this._group},set:function(t){this._group=t}},{key:"type",get:function(){return this._type},set:function(t){this._type=t,this._body&&(t===A.Animated?this._body.setType(A.Kinematic):this._body.setType(t))}},{key:"allowSleep",get:function(){return this._allowSleep},set:function(t){this._allowSleep=t,this._body&&this._body.setAllowSleep(t)}},{key:"gravityScale",get:function(){return this._gravityScale},set:function(t){this._gravityScale=t,this._body&&this._body.setGravityScale(t)}},{key:"linearDamping",get:function(){return this._linearDamping},set:function(t){this._linearDamping=t,this._body&&this._body.setLinearDamping(t)}},{key:"angularDamping",get:function(){return this._angularDamping},set:function(t){this._angularDamping=t,this._body&&this._body.setAngularDamping(t)}},{key:"linearVelocity",get:function(){return this._body&&this._body.getLinearVelocity(this._linearVelocity),this._linearVelocity},set:function(t){this._linearVelocity=t,this._body&&this._body.setLinearVelocity(t)}},{key:"angularVelocity",get:function(){return this._body&&(this._angularVelocity=this._body.getAngularVelocity()),this._angularVelocity},set:function(t){this._angularVelocity=t,this._body&&this._body.setAngularVelocity(t)}},{key:"fixedRotation",get:function(){return this._fixedRotation},set:function(t){this._fixedRotation=t,this._body&&this._body.setFixedRotation(t)}},{key:"impl",get:function(){return this._body}}]),e}(_),c((U=pt).prototype,"group",[H],Object.getOwnPropertyDescriptor(U.prototype,"group"),U.prototype),X=c(U.prototype,"enabledContactListener",[oo],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),K=c(U.prototype,"bullet",[oo],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),c(U.prototype,"type",[G],Object.getOwnPropertyDescriptor(U.prototype,"type"),U.prototype),c(U.prototype,"allowSleep",[oo],Object.getOwnPropertyDescriptor(U.prototype,"allowSleep"),U.prototype),c(U.prototype,"gravityScale",[oo],Object.getOwnPropertyDescriptor(U.prototype,"gravityScale"),U.prototype),c(U.prototype,"linearDamping",[oo],Object.getOwnPropertyDescriptor(U.prototype,"linearDamping"),U.prototype),c(U.prototype,"angularDamping",[oo],Object.getOwnPropertyDescriptor(U.prototype,"angularDamping"),U.prototype),c(U.prototype,"linearVelocity",[oo],Object.getOwnPropertyDescriptor(U.prototype,"linearVelocity"),U.prototype),c(U.prototype,"angularVelocity",[oo],Object.getOwnPropertyDescriptor(U.prototype,"angularVelocity"),U.prototype),c(U.prototype,"fixedRotation",[oo],Object.getOwnPropertyDescriptor(U.prototype,"fixedRotation"),U.prototype),Q=c(U.prototype,"awakeOnLoad",[oo],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),Z=c(U.prototype,"_group",[oo],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return C.DEFAULT}}),$=c(U.prototype,"_type",[oo],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return A.Dynamic}}),tt=c(U.prototype,"_allowSleep",[oo],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),et=c(U.prototype,"_gravityScale",[oo],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),ot=c(U.prototype,"_linearDamping",[oo],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),it=c(U.prototype,"_angularDamping",[oo],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),nt=c(U.prototype,"_linearVelocity",[oo],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new p}}),rt=c(U.prototype,"_angularVelocity",[oo],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),at=c(U.prototype,"_fixedRotation",[oo],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),J=U))||J)||J)),ao=t("h",(ut=s("cc.Collider2D"),lt=l(C),ut((Ot=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return e=t.call.apply(t,[this].concat(i))||this,y(e,"editing",_t,f(e)),y(e,"tag",ht,f(e)),e.TYPE=x.None,e._shape=null,e._body=null,y(e,"_group",gt,f(e)),y(e,"_density",bt,f(e)),y(e,"_sensor",dt,f(e)),y(e,"_friction",mt,f(e)),y(e,"_restitution",wt,f(e)),y(e,"_offset",Dt,f(e)),e}i(e,t);var o=e.prototype;return o.onLoad=function(){this._shape=function(t){return q.INITED||(q.INITED=!0,q[x.BOX]=function(){return new M.BoxShape},q[x.CIRCLE]=function(){return new M.CircleShape},q[x.POLYGON]=function(){return new M.PolygonShape}),q[t]()}(this.TYPE),this._shape.initialize(this),this._shape.onLoad&&this._shape.onLoad(),this._body=this.getComponent(ro)},o.onEnable=function(){this._shape&&this._shape.onEnable()},o.onDisable=function(){this._shape&&this._shape.onDisable&&this._shape.onDisable()},o.onDestroy=function(){this._shape&&this._shape.onDestroy&&this._shape.onDestroy()},o.apply=function(){this._shape&&this._shape.apply&&this._shape.apply()},n(e,[{key:"group",get:function(){return this._group},set:function(t){this._group=t,this._shape&&this._shape.onGroupChanged&&this._shape.onGroupChanged()}},{key:"density",get:function(){return this._density},set:function(t){this._density=t}},{key:"sensor",get:function(){return this._sensor},set:function(t){this._sensor=t}},{key:"friction",get:function(){return this._friction},set:function(t){this._friction=t}},{key:"restitution",get:function(){return this._restitution},set:function(t){this._restitution=t}},{key:"offset",get:function(){return this._offset},set:function(t){this._offset=t}},{key:"body",get:function(){return this._body}},{key:"impl",get:function(){return this._shape}},{key:"worldAABB",get:function(){return this._shape?this._shape.worldAABB:new g}}]),e}(r(_)),_t=c((ft=Ot).prototype,"editing",[b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),ht=c(ft.prototype,"tag",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),c(ft.prototype,"group",[lt],Object.getOwnPropertyDescriptor(ft.prototype,"group"),ft.prototype),c(ft.prototype,"density",[u],Object.getOwnPropertyDescriptor(ft.prototype,"density"),ft.prototype),c(ft.prototype,"sensor",[u],Object.getOwnPropertyDescriptor(ft.prototype,"sensor"),ft.prototype),c(ft.prototype,"friction",[u],Object.getOwnPropertyDescriptor(ft.prototype,"friction"),ft.prototype),c(ft.prototype,"restitution",[u],Object.getOwnPropertyDescriptor(ft.prototype,"restitution"),ft.prototype),c(ft.prototype,"offset",[u],Object.getOwnPropertyDescriptor(ft.prototype,"offset"),ft.prototype),gt=c(ft.prototype,"_group",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return C.DEFAULT}}),bt=c(ft.prototype,"_density",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),dt=c(ft.prototype,"_sensor",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),mt=c(ft.prototype,"_friction",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.2}}),wt=c(ft.prototype,"_restitution",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),Dt=c(ft.prototype,"_offset",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new p}}),yt=ft))||yt)),po=(t("B",s("cc.BoxCollider2D")(St=h()((Lt=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return e=t.call.apply(t,[this].concat(i))||this,y(e,"_size",Pt,f(e)),e.TYPE=x.BOX,e}return i(e,t),n(e,[{key:"size",get:function(){return this._size},set:function(t){this._size=t}},{key:"worldPoints",get:function(){return this._shape?this._shape.worldPoints:[]}}]),e}(ao),Pt=c((jt=Lt).prototype,"_size",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new d(1,1)}}),c(jt.prototype,"size",[u],Object.getOwnPropertyDescriptor(jt.prototype,"size"),jt.prototype),St=jt))||St)||St),t("i",s("cc.CircleCollider2D")(Ct=h()((Et=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return e=t.call.apply(t,[this].concat(i))||this,y(e,"_radius",xt,f(e)),e.TYPE=x.CIRCLE,e}return i(e,t),n(e,[{key:"radius",get:function(){return this._radius},set:function(t){this._radius=t<0?0:t}},{key:"worldPosition",get:function(){return this._shape?this._shape.worldPosition:new p}},{key:"worldRadius",get:function(){return this._shape?this._shape.worldRadius:0}}]),e}(ao),xt=c((At=Et).prototype,"_radius",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),c(At.prototype,"radius",[u],Object.getOwnPropertyDescriptor(At.prototype,"radius"),At.prototype),Ct=At))||Ct)||Ct),t("j",(Tt=s("cc.PolygonCollider2D"),kt=h(),It=u({serializable:!1}),Mt=u({type:p}),Tt(zt=kt((qt=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return e=t.call.apply(t,[this].concat(i))||this,y(e,"threshold",Ft,f(e)),y(e,"_points",Rt,f(e)),e.TYPE=x.POLYGON,e}return i(e,t),n(e,[{key:"points",get:function(){return this._points},set:function(t){this._points=t}},{key:"worldPoints",get:function(){return this._shape?this._shape.worldPoints:[]}}]),e}(ao),Ft=c((vt=qt).prototype,"threshold",[It],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),Rt=c(vt.prototype,"_points",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[new p(-1,-1),new p(1,-1),new p(1,1),new p(-1,1)]}}),c(vt.prototype,"points",[Mt],Object.getOwnPropertyDescriptor(vt.prototype,"points"),vt.prototype),zt=vt))||zt)||zt)),t("J",(Nt=s("cc.Joint2D"),Vt=l(ro),Nt((Ut=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return e=t.call.apply(t,[this].concat(i))||this,y(e,"anchor",Yt,f(e)),y(e,"connectedAnchor",Ht,f(e)),y(e,"collideConnected",Gt,f(e)),y(e,"connectedBody",Jt,f(e)),e._body=null,e._joint=null,e.TYPE=E.None,e}i(e,t);var r=e.prototype;return r.onLoad=function(){this._joint=function(t){return function(){if(!N.INITED){N.INITED=!0;var t=o._global.CC_PHYSICS_2D_BUILTIN;N[E.SPRING]=function(){return t?V:new M.SpringJoint},N[E.DISTANCE]=function(){return t?V:new M.DistanceJoint},N[E.FIXED]=function(){return t?V:new M.FixedJoint},N[E.MOUSE]=function(){return t?V:new M.MouseJoint},N[E.RELATIVE]=function(){return t?V:new M.RelativeJoint},N[E.SLIDER]=function(){return t?V:new M.SliderJoint},N[E.WHEEL]=function(){return t?V:new M.WheelJoint},N[E.HINGE]=function(){return t?V:new M.HingeJoint}}}(),N[t]()}(this.TYPE),this._joint.initialize(this),this._body=this.getComponent(ro)},r.onEnable=function(){this._joint&&this._joint.onEnable&&this._joint.onEnable()},r.onDisable=function(){this._joint&&this._joint.onDisable&&this._joint.onDisable()},r.start=function(){this._joint&&this._joint.start&&this._joint.start()},r.onDestroy=function(){this._joint&&this._joint.onDestroy&&this._joint.onDestroy()},n(e,[{key:"body",get:function(){return this._body}},{key:"impl",get:function(){return this._joint}}]),e}(_),Yt=c((Wt=Ut).prototype,"anchor",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new p}}),Ht=c(Wt.prototype,"connectedAnchor",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new p}}),Gt=c(Wt.prototype,"collideConnected",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),Jt=c(Wt.prototype,"connectedBody",[Vt],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),Bt=Wt))||Bt))),so=(t("D",s("cc.DistanceJoint2D")(Xt=h()(($t=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))||this).TYPE=E.DISTANCE,y(e,"_maxLength",Qt,f(e)),y(e,"_autoCalcDistance",Zt,f(e)),e}return i(e,t),n(e,[{key:"maxLength",get:function(){return this._autoCalcDistance&&this.connectedBody?m.distance(this.node.worldPosition,this.connectedBody.node.worldPosition):this._maxLength},set:function(t){this._maxLength=t,this._joint&&this._joint.setMaxLength(t)}},{key:"autoCalcDistance",get:function(){return this._autoCalcDistance},set:function(t){this._autoCalcDistance=t}}]),e}(po),c((Kt=$t).prototype,"maxLength",[u],Object.getOwnPropertyDescriptor(Kt.prototype,"maxLength"),Kt.prototype),c(Kt.prototype,"autoCalcDistance",[u],Object.getOwnPropertyDescriptor(Kt.prototype,"autoCalcDistance"),Kt.prototype),Qt=c(Kt.prototype,"_maxLength",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 5}}),Zt=c(Kt.prototype,"_autoCalcDistance",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),Xt=Kt))||Xt)||Xt),t("S",s("cc.SpringJoint2D")(te=h()((ae=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))||this).TYPE=E.SPRING,y(e,"_frequency",oe,f(e)),y(e,"_dampingRatio",ie,f(e)),y(e,"_distance",ne,f(e)),y(e,"_autoCalcDistance",re,f(e)),e}return i(e,t),n(e,[{key:"frequency",get:function(){return this._frequency},set:function(t){this._frequency=t,this._joint&&this._joint.setFrequency(t)}},{key:"dampingRatio",get:function(){return this._dampingRatio},set:function(t){this._dampingRatio=t,this._joint&&this._joint.setDampingRatio(t)}},{key:"distance",get:function(){return this._autoCalcDistance&&this.connectedBody?m.distance(this.node.worldPosition,this.connectedBody.node.worldPosition):this._distance},set:function(t){this._distance=t,this._joint&&this._joint.setDistance(t)}},{key:"autoCalcDistance",get:function(){return this._autoCalcDistance},set:function(t){this._autoCalcDistance=t}}]),e}(po),c((ee=ae).prototype,"frequency",[u],Object.getOwnPropertyDescriptor(ee.prototype,"frequency"),ee.prototype),c(ee.prototype,"dampingRatio",[u],Object.getOwnPropertyDescriptor(ee.prototype,"dampingRatio"),ee.prototype),c(ee.prototype,"distance",[u],Object.getOwnPropertyDescriptor(ee.prototype,"distance"),ee.prototype),c(ee.prototype,"autoCalcDistance",[u],Object.getOwnPropertyDescriptor(ee.prototype,"autoCalcDistance"),ee.prototype),oe=c(ee.prototype,"_frequency",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 5}}),ie=c(ee.prototype,"_dampingRatio",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.7}}),ne=c(ee.prototype,"_distance",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 10}}),re=c(ee.prototype,"_autoCalcDistance",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),te=ee))||te)||te),t("M",s("cc.MouseJoint2D")(pe=h()((ye=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))||this).TYPE=E.MOUSE,y(e,"_maxForce",ce,f(e)),y(e,"_dampingRatio",ue,f(e)),y(e,"_frequency",le,f(e)),e._target=new p,e}return i(e,t),e.prototype.update=function(t){this._joint.update(t)},n(e,[{key:"target",get:function(){return this._target},set:function(t){this._target=t,this._joint&&this._joint.setTarget(t)}},{key:"frequency",get:function(){return this._frequency},set:function(t){this._frequency=t,this._joint&&this._joint.setFrequency(t)}},{key:"dampingRatio",get:function(){return this._dampingRatio},set:function(t){this._dampingRatio=t,this._joint&&this._joint.setDampingRatio(t)}},{key:"maxForce",get:function(){return this._maxForce},set:function(t){this._maxForce=t,this._joint&&this._joint.setMaxForce(t)}}]),e}(po),c((se=ye).prototype,"frequency",[u],Object.getOwnPropertyDescriptor(se.prototype,"frequency"),se.prototype),c(se.prototype,"dampingRatio",[u],Object.getOwnPropertyDescriptor(se.prototype,"dampingRatio"),se.prototype),c(se.prototype,"maxForce",[u],Object.getOwnPropertyDescriptor(se.prototype,"maxForce"),se.prototype),ce=c(se.prototype,"_maxForce",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1e3}}),ue=c(se.prototype,"_dampingRatio",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.7}}),le=c(se.prototype,"_frequency",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 5}}),pe=se))||pe)||pe),new m),co=new m,uo=(t("k",s("cc.RelativeJoint2D")(fe=h()((De=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))||this).TYPE=E.RELATIVE,y(e,"_maxForce",he,f(e)),y(e,"_maxTorque",ge,f(e)),y(e,"_correctionFactor",be,f(e)),y(e,"_angularOffset",de,f(e)),y(e,"_linearOffset",me,f(e)),y(e,"_autoCalcOffset",we,f(e)),e}return i(e,t),n(e,[{key:"maxForce",get:function(){return this._maxForce},set:function(t){this._maxForce=t,this._joint&&this._joint.setMaxForce(t)}},{key:"maxTorque",get:function(){return this._maxTorque},set:function(t){this._maxTorque=t,this._joint&&this._joint.setMaxTorque(t)}},{key:"correctionFactor",get:function(){return this._correctionFactor},set:function(t){this._correctionFactor=t,this._joint&&this._joint.setCorrectionFactor(t)}},{key:"linearOffset",get:function(){return this._autoCalcOffset&&this.connectedBody?p.subtract(this._linearOffset,this.connectedBody.node.worldPosition,this.node.worldPosition):this._linearOffset},set:function(t){this._linearOffset.set(t),this._joint&&this._joint.setLinearOffset(t)}},{key:"angularOffset",get:function(){return this._autoCalcOffset&&this.connectedBody&&(w.toEuler(so,this.node.worldRotation),w.toEuler(co,this.connectedBody.node.worldRotation),this._angularOffset=co.z-so.z),this._angularOffset},set:function(t){this._angularOffset=t,this._joint&&this._joint.setAngularOffset(t)}},{key:"autoCalcOffset",get:function(){return this._autoCalcOffset},set:function(t){this._autoCalcOffset=t}}]),e}(po),c((_e=De).prototype,"maxForce",[u],Object.getOwnPropertyDescriptor(_e.prototype,"maxForce"),_e.prototype),c(_e.prototype,"maxTorque",[u],Object.getOwnPropertyDescriptor(_e.prototype,"maxTorque"),_e.prototype),c(_e.prototype,"correctionFactor",[u],Object.getOwnPropertyDescriptor(_e.prototype,"correctionFactor"),_e.prototype),c(_e.prototype,"linearOffset",[u],Object.getOwnPropertyDescriptor(_e.prototype,"linearOffset"),_e.prototype),c(_e.prototype,"angularOffset",[u],Object.getOwnPropertyDescriptor(_e.prototype,"angularOffset"),_e.prototype),c(_e.prototype,"autoCalcOffset",[u],Object.getOwnPropertyDescriptor(_e.prototype,"autoCalcOffset"),_e.prototype),he=c(_e.prototype,"_maxForce",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 5}}),ge=c(_e.prototype,"_maxTorque",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.7}}),be=c(_e.prototype,"_correctionFactor",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.3}}),de=c(_e.prototype,"_angularOffset",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),me=c(_e.prototype,"_linearOffset",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new p}}),we=c(_e.prototype,"_autoCalcOffset",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),fe=_e))||fe)||fe),new p);t("l",s("cc.SliderJoint2D")(Oe=h()((ke=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))||this).TYPE=E.SLIDER,y(e,"_angle",je,f(e)),y(e,"_autoCalcAngle",Pe,f(e)),y(e,"_enableMotor",Le,f(e)),y(e,"_maxMotorForce",Ce,f(e)),y(e,"_motorSpeed",Ae,f(e)),y(e,"_enableLimit",xe,f(e)),y(e,"_lowerLimit",Ee,f(e)),y(e,"_upperLimit",Te,f(e)),e}return i(e,t),n(e,[{key:"angle",get:function(){return this._autoCalcAngle&&this.connectedBody&&(p.subtract(uo,this.connectedBody.node.worldPosition,this.node.worldPosition),this._angle=D(Math.atan2(uo.y,uo.x))),this._angle},set:function(t){this._angle=t}},{key:"autoCalcAngle",get:function(){return this._autoCalcAngle},set:function(t){this._autoCalcAngle=t}},{key:"enableMotor",get:function(){return this._enableMotor},set:function(t){this._enableMotor=t}},{key:"maxMotorForce",get:function(){return this._maxMotorForce},set:function(t){this._maxMotorForce=t,this._joint&&this._joint.setMaxMotorForce(t)}},{key:"motorSpeed",get:function(){return this._motorSpeed},set:function(t){this._motorSpeed=t,this._joint&&this._joint.setMotorSpeed(t)}},{key:"enableLimit",get:function(){return this._enableLimit},set:function(t){this._enableLimit=t}},{key:"lowerLimit",get:function(){return this._lowerLimit},set:function(t){this._lowerLimit=t,this._joint&&this._joint.setLowerLimit(t)}},{key:"upperLimit",get:function(){return this._upperLimit},set:function(t){this._upperLimit=t,this._joint&&this._joint.setUpperLimit(t)}}]),e}(po),c((Se=ke).prototype,"angle",[u],Object.getOwnPropertyDescriptor(Se.prototype,"angle"),Se.prototype),c(Se.prototype,"autoCalcAngle",[u],Object.getOwnPropertyDescriptor(Se.prototype,"autoCalcAngle"),Se.prototype),c(Se.prototype,"enableMotor",[u],Object.getOwnPropertyDescriptor(Se.prototype,"enableMotor"),Se.prototype),c(Se.prototype,"maxMotorForce",[u],Object.getOwnPropertyDescriptor(Se.prototype,"maxMotorForce"),Se.prototype),c(Se.prototype,"motorSpeed",[u],Object.getOwnPropertyDescriptor(Se.prototype,"motorSpeed"),Se.prototype),c(Se.prototype,"enableLimit",[u],Object.getOwnPropertyDescriptor(Se.prototype,"enableLimit"),Se.prototype),c(Se.prototype,"lowerLimit",[u],Object.getOwnPropertyDescriptor(Se.prototype,"lowerLimit"),Se.prototype),c(Se.prototype,"upperLimit",[u],Object.getOwnPropertyDescriptor(Se.prototype,"upperLimit"),Se.prototype),je=c(Se.prototype,"_angle",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),Pe=c(Se.prototype,"_autoCalcAngle",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),Le=c(Se.prototype,"_enableMotor",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),Ce=c(Se.prototype,"_maxMotorForce",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1e3}}),Ae=c(Se.prototype,"_motorSpeed",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1e3}}),xe=c(Se.prototype,"_enableLimit",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),Ee=c(Se.prototype,"_lowerLimit",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),Te=c(Se.prototype,"_upperLimit",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),Oe=Se))||Oe)||Oe),t("F",s("cc.FixedJoint2D")(Ie=h()((Fe=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))||this).TYPE=E.FIXED,y(e,"_frequency",ze,f(e)),y(e,"_dampingRatio",ve,f(e)),e}return i(e,t),n(e,[{key:"frequency",get:function(){return this._frequency},set:function(t){this._frequency=t,this._joint&&this._joint.setFrequency(t)}},{key:"dampingRatio",get:function(){return this._dampingRatio},set:function(t){this._dampingRatio=t,this._joint&&this._joint.setDampingRatio(t)}}]),e}(po),c((Me=Fe).prototype,"frequency",[u],Object.getOwnPropertyDescriptor(Me.prototype,"frequency"),Me.prototype),c(Me.prototype,"dampingRatio",[u],Object.getOwnPropertyDescriptor(Me.prototype,"dampingRatio"),Me.prototype),ze=c(Me.prototype,"_frequency",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.7}}),ve=c(Me.prototype,"_dampingRatio",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.5}}),Ie=Me))||Ie)||Ie),t("W",s("cc.WheelJoint2D")(Re=h()((Ge=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))||this).TYPE=E.WHEEL,y(e,"_angle",Ne,f(e)),y(e,"_enableMotor",Ve,f(e)),y(e,"_maxMotorTorque",Be,f(e)),y(e,"_motorSpeed",We,f(e)),y(e,"_frequency",Ye,f(e)),y(e,"_dampingRatio",He,f(e)),e}return i(e,t),n(e,[{key:"angle",get:function(){return this._angle},set:function(t){this._angle=t}},{key:"enableMotor",get:function(){return this._enableMotor},set:function(t){this._enableMotor=t,this._joint&&this._joint.enableMotor(t)}},{key:"maxMotorTorque",get:function(){return this._maxMotorTorque},set:function(t){this._maxMotorTorque=t,this._joint&&this._joint.setMaxMotorTorque(t)}},{key:"motorSpeed",get:function(){return this._motorSpeed},set:function(t){this._motorSpeed=t,this._joint&&this._joint.setMotorSpeed(t)}},{key:"frequency",get:function(){return this._frequency},set:function(t){this._frequency=t,this._joint&&this._joint.setFrequency(t)}},{key:"dampingRatio",get:function(){return this._dampingRatio},set:function(t){this._dampingRatio=t,this._joint&&this._joint.setDampingRatio(t)}}]),e}(po),c((qe=Ge).prototype,"angle",[u],Object.getOwnPropertyDescriptor(qe.prototype,"angle"),qe.prototype),c(qe.prototype,"enableMotor",[u],Object.getOwnPropertyDescriptor(qe.prototype,"enableMotor"),qe.prototype),c(qe.prototype,"maxMotorTorque",[u],Object.getOwnPropertyDescriptor(qe.prototype,"maxMotorTorque"),qe.prototype),c(qe.prototype,"motorSpeed",[u],Object.getOwnPropertyDescriptor(qe.prototype,"motorSpeed"),qe.prototype),c(qe.prototype,"frequency",[u],Object.getOwnPropertyDescriptor(qe.prototype,"frequency"),qe.prototype),c(qe.prototype,"dampingRatio",[u],Object.getOwnPropertyDescriptor(qe.prototype,"dampingRatio"),qe.prototype),Ne=c(qe.prototype,"_angle",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 90}}),Ve=c(qe.prototype,"_enableMotor",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),Be=c(qe.prototype,"_maxMotorTorque",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1e3}}),We=c(qe.prototype,"_motorSpeed",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),Ye=c(qe.prototype,"_frequency",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 5}}),He=c(qe.prototype,"_dampingRatio",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.7}}),Re=qe))||Re)||Re),t("H",s("cc.HingeJoint2D")(Je=h()((eo=function(t){function e(){for(var e,o=arguments.length,i=new Array(o),n=0;n<o;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))||this).TYPE=E.HINGE,y(e,"_enableLimit",Xe,f(e)),y(e,"_lowerAngle",Ke,f(e)),y(e,"_upperAngle",Qe,f(e)),y(e,"_enableMotor",Ze,f(e)),y(e,"_maxMotorTorque",$e,f(e)),y(e,"_motorSpeed",to,f(e)),e}return i(e,t),n(e,[{key:"enableLimit",get:function(){return this._enableLimit},set:function(t){this._enableLimit=t}},{key:"lowerAngle",get:function(){return this._lowerAngle},set:function(t){this._lowerAngle=t,this._joint&&this._joint.setLowerAngle(t)}},{key:"upperAngle",get:function(){return this._upperAngle},set:function(t){this._upperAngle=t,this._joint&&this._joint.setUpperAngle(t)}},{key:"enableMotor",get:function(){return this._enableMotor},set:function(t){this._enableMotor=t,this._joint&&this._joint.enableMotor(t)}},{key:"maxMotorTorque",get:function(){return this._maxMotorTorque},set:function(t){this._maxMotorTorque=t,this._joint&&this._joint.setMaxMotorTorque(t)}},{key:"motorSpeed",get:function(){return this._motorSpeed},set:function(t){this._motorSpeed=t,this._joint&&this._joint.setMotorSpeed(t)}}]),e}(po),c((Ue=eo).prototype,"enableLimit",[u],Object.getOwnPropertyDescriptor(Ue.prototype,"enableLimit"),Ue.prototype),c(Ue.prototype,"lowerAngle",[u],Object.getOwnPropertyDescriptor(Ue.prototype,"lowerAngle"),Ue.prototype),c(Ue.prototype,"upperAngle",[u],Object.getOwnPropertyDescriptor(Ue.prototype,"upperAngle"),Ue.prototype),c(Ue.prototype,"enableMotor",[u],Object.getOwnPropertyDescriptor(Ue.prototype,"enableMotor"),Ue.prototype),c(Ue.prototype,"maxMotorTorque",[u],Object.getOwnPropertyDescriptor(Ue.prototype,"maxMotorTorque"),Ue.prototype),c(Ue.prototype,"motorSpeed",[u],Object.getOwnPropertyDescriptor(Ue.prototype,"motorSpeed"),Ue.prototype),Xe=c(Ue.prototype,"_enableLimit",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),Ke=c(Ue.prototype,"_lowerAngle",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),Qe=c(Ue.prototype,"_upperAngle",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),Ze=c(Ue.prototype,"_enableMotor",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),$e=c(Ue.prototype,"_maxMotorTorque",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1e3}}),to=c(Ue.prototype,"_motorSpeed",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),Je=Ue))||Je)||Je)}}}));
