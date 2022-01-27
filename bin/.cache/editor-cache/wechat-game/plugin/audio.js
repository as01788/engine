System.register(["./json-asset-7bb011fd.js","./index-07e0e256.js","./spot-light-44c8b89f.js","./deprecated-229f0693.js","./renderable-component-0ffd84e0.js","./transform-utils-ec8404a7.js"],(function(t){"use strict";var e,n,o,i,r,u,a,s,c,d,h,f,l,_,p,y,v,g,m,T,N,E,P,I,A,O,S;return{setters:[function(t){e=t.cn,n=t.ej,o=t.eK,i=t.er,r=t.db,u=t.h5,a=t.co,s=t.l,c=t.eq,d=t.ew,h=t.dd,f=t.gF,l=t.es,_=t.ey,p=t.et,y=t.hf,v=t.ev,g=t.fV,m=t.fW,T=t.fS,N=t.gx,E=t.dO,P=t.cQ,I=t.cS,A=t.fj},function(t){O=t.w,S=t.x},function(){},function(){},function(){},function(){}],execute:function(){var w,D,C;!function(t){t.PLAYED="play",t.PAUSED="pause",t.STOPPED="stop",t.SEEKED="seeked",t.ENDED="ended",t.INTERRUPTION_BEGIN="interruptionBegin",t.INTERRUPTION_END="interruptionEnd",t.USER_GESTURE="on_gesture"}(w||(w={})),function(t){t[t.DOM_AUDIO=0]="DOM_AUDIO",t[t.WEB_AUDIO=1]="WEB_AUDIO",t[t.MINIGAME_AUDIO=2]="MINIGAME_AUDIO",t[t.NATIVE_AUDIO=3]="NATIVE_AUDIO",t[t.UNKNOWN_AUDIO=4]="UNKNOWN_AUDIO"}(D||(D={})),function(t){t[t.INIT=0]="INIT",t[t.PLAYING=1]="PLAYING",t[t.PAUSED=2]="PAUSED",t[t.STOPPED=3]="STOPPED",t[t.INTERRUPTED=4]="INTERRUPTED"}(C||(C={}));var k=0;function b(t,e){var n;e.invoking||(e.invoking=!0,(n=e.func).call.apply(n,[t].concat(e.args)).then((function(){e.invoking=!1,t._operationQueue.shift(),t._eventTarget.emit(e.id.toString());var n=t._operationQueue[0];n&&b(t,n)})).catch((function(){})))}function R(t,e,n){var o=n.value;n.value=function(){for(var t=this,e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];return new Promise((function(e){var i=k++,r=t;r._operationQueue.push({id:i,func:o,args:n,invoking:!1}),r._eventTarget.once(i.toString(),e),b(r,r._operationQueue[0])}))}}var U,B,L,x,M,j,G,H,Y,K,W,Q=function(){function t(t){this._nativeAudio=void 0,this._startTime=0,this._startOffset=0,this._isPaused=!0,this._nativeAudio=t}var o=t.prototype;return o.destroy=function(){this._nativeAudio=void 0},o._now=function(){return performance.now()/1e3},o._calculateCurrentTime=function(){var t=this._now()-this._startTime,e=this._startOffset+t;return e>=this.duration&&(this._startTime=this._now(),this._startOffset=0),e%this.duration},o.start=function(){this._isPaused=!1,this._startTime=this._now()},o.pause=function(){this._isPaused||(this._isPaused=!0,this._startOffset=this._calculateCurrentTime())},o.stop=function(){this._isPaused=!0,this._startOffset=0},o.seek=function(t){this._startTime=this._now(),this._startOffset=e(t,0,this.duration)},n(t,[{key:"duration",get:function(){return this._nativeAudio.duration}},{key:"currentTime",get:function(){return this._isPaused?this._startOffset:this._calculateCurrentTime()}}]),t}(),V=function(){function t(t,e){var n=this;this._innerAudioContext=void 0,this._onPlayCb=void 0,this._onEndCb=void 0,this._innerAudioContext=t,t.volume=e,t.onPlay((function(){var t;null===(t=n._onPlayCb)||void 0===t||t.call(n)})),t.onEnded((function(){var e;null===(e=n._onEndCb)||void 0===e||e.call(n),t.destroy()}))}var e=t.prototype;return e.play=function(){this._innerAudioContext.play()},e.stop=function(){this._innerAudioContext.stop()},n(t,[{key:"onPlay",get:function(){return this._onPlayCb},set:function(t){this._onPlayCb=t}},{key:"onEnd",get:function(){return this._onEndCb},set:function(t){this._onEndCb=t}}]),t}(),z=(B=function(){function t(t){var e=this;this._innerAudioContext=void 0,this._state=C.INIT,this._onPlay=void 0,this._onPause=void 0,this._onStop=void 0,this._onSeeked=void 0,this._onEnded=void 0,this._audioTimer=void 0,this._readyToHandleOnShow=!1,this._eventTarget=new r,this._operationQueue=[],this._innerAudioContext=t,this._audioTimer=new Q(t),this._eventTarget=new r,o.on("hide",this._onHide,this),o.on("show",this._onShow,this);var n=this._eventTarget;this._onPlay=function(){e._state=C.PLAYING,n.emit(w.PLAYED)},t.onPlay(this._onPlay),this._onPause=function(){e._state=C.PAUSED,n.emit(w.PAUSED)},t.onPause(this._onPause),this._onStop=function(){e._state=C.STOPPED,n.emit(w.STOPPED)},t.onStop(this._onStop),this._onSeeked=function(){n.emit(w.SEEKED)},t.onSeeked(this._onSeeked),this._onEnded=function(){e._audioTimer.stop(),e._state=C.INIT,n.emit(w.ENDED)},t.onEnded(this._onEnded)}var i=t.prototype;return i.destroy=function(){var t=this;this._audioTimer.destroy(),o.off("hide",this._onHide,this),o.off("show",this._onShow,this),this._innerAudioContext&&(["Play","Pause","Stop","Seeked","Ended"].forEach((function(e){t._offEvent(e)})),this._innerAudioContext.destroy(),this._innerAudioContext=null)},i._onHide=function(){var t=this;this._state===C.PLAYING&&this.pause().then((function(){t._state=C.INTERRUPTED,t._readyToHandleOnShow=!0,t._eventTarget.emit(w.INTERRUPTION_BEGIN)})).catch((function(){}))},i._onShow=function(){var t=this;this._readyToHandleOnShow?(this._state===C.INTERRUPTED&&this.play().then((function(){t._eventTarget.emit(w.INTERRUPTION_END)})).catch((function(){})),this._readyToHandleOnShow=!1):this._eventTarget.once(w.INTERRUPTION_BEGIN,this._onShow,this)},i._offEvent=function(t){this["_on"+t]&&(this._innerAudioContext["off"+t](this["_on"+t]),this["_on"+t]=null)},t.load=function(e){return new Promise((function(n){t.loadNative(e).then((function(e){n(new t(e))})).catch((function(){}))}))},t.loadNative=function(t){return new Promise((function(e,n){var o=u.createInnerAudioContext(),i=setTimeout((function(){r(),e(o)}),8e3);function r(){o.offCanplay(a),o.offError(s)}function a(){r(),clearTimeout(i),e(o)}function s(t){r(),clearTimeout(i),console.error("failed to load innerAudioContext"),n(new Error(t))}o.onCanplay(a),o.onError(s),o.src=t}))},t.loadOneShotAudio=function(e,n){return new Promise((function(o,i){t.loadNative(e).then((function(t){o(new V(t,n))})).catch(i)}))},i.seek=function(t){var n=this;return new Promise((function(o){t=e(t,0,n.duration),n._eventTarget.once(w.SEEKED,o),n._innerAudioContext.seek(t),n._audioTimer.seek(t)}))},i.play=function(){var t=this;return new Promise((function(e){t._eventTarget.once(w.PLAYED,e),t._innerAudioContext.play(),t._audioTimer.start()}))},i.pause=function(){var t=this;return new Promise((function(e){t._eventTarget.once(w.PAUSED,e),t._innerAudioContext.pause(),t._audioTimer.pause()}))},i.stop=function(){var t=this;return new Promise((function(e){t._eventTarget.once(w.STOPPED,e),t._innerAudioContext.stop(),t._audioTimer.stop()}))},i.onInterruptionBegin=function(t){this._eventTarget.on(w.INTERRUPTION_BEGIN,t)},i.offInterruptionBegin=function(t){this._eventTarget.off(w.INTERRUPTION_BEGIN,t)},i.onInterruptionEnd=function(t){this._eventTarget.on(w.INTERRUPTION_END,t)},i.offInterruptionEnd=function(t){this._eventTarget.off(w.INTERRUPTION_END,t)},i.onEnded=function(t){this._eventTarget.on(w.ENDED,t)},i.offEnded=function(t){this._eventTarget.off(w.ENDED,t)},n(t,[{key:"src",get:function(){return this._innerAudioContext?this._innerAudioContext.src:""}},{key:"type",get:function(){return D.MINIGAME_AUDIO}},{key:"state",get:function(){return this._state}},{key:"loop",get:function(){return this._innerAudioContext.loop},set:function(t){this._innerAudioContext.loop=t}},{key:"volume",get:function(){return this._innerAudioContext.volume},set:function(t){t=a(t),this._innerAudioContext.volume=t}},{key:"duration",get:function(){return this._innerAudioContext.duration}},{key:"currentTime",get:function(){return this._audioTimer?this._audioTimer.currentTime:0}}]),t}(),i((U=B).prototype,"seek",[R],Object.getOwnPropertyDescriptor(U.prototype,"seek"),U.prototype),i(U.prototype,"play",[R],Object.getOwnPropertyDescriptor(U.prototype,"play"),U.prototype),i(U.prototype,"pause",[R],Object.getOwnPropertyDescriptor(U.prototype,"pause"),U.prototype),i(U.prototype,"stop",[R],Object.getOwnPropertyDescriptor(U.prototype,"stop"),U.prototype),U),q=new(function(){function t(){this._audioBufferDataMap={}}var e=t.prototype;return e.addCache=function(t,e){this._audioBufferDataMap[t]?console.warn("Audio buffer "+t+" has been cached"):this._audioBufferDataMap[t]={usedCount:1,audioBuffer:e}},e.retainCache=function(t){var e=this._audioBufferDataMap[t];e?e.usedCount++:console.warn("Audio buffer cache "+t+" has not been added.")},e.getCache=function(t){var e=this._audioBufferDataMap[t];return null==e?void 0:e.audioBuffer},e.tryReleasingCache=function(t){var e=this._audioBufferDataMap[t];e?--e.usedCount<=0&&delete this._audioBufferDataMap[t]:console.warn("Audio buffer cache "+t+" has not been added.")},t}()),F=null===(L=u.tt)||void 0===L||null===(x=L.getAudioContext)||void 0===x?void 0:x.call(L),J=function(){function t(t,e,n){this._bufferSourceNode=void 0,this._onPlayCb=void 0,this._url=void 0,this._onEndCb=void 0,this._bufferSourceNode=F.createBufferSource(),this._bufferSourceNode.buffer=t,this._bufferSourceNode.loop=!1,this._url=n;var o=F.createGain();o.gain.value=e,this._bufferSourceNode.connect(o),o.connect(F.destination)}var e=t.prototype;return e.play=function(){var t,e=this;this._bufferSourceNode.start(),null===(t=this.onPlay)||void 0===t||t.call(this),this._bufferSourceNode.onended=function(){var t;q.tryReleasingCache(e._url),null===(t=e._onEndCb)||void 0===t||t.call(e)}},e.stop=function(){this._bufferSourceNode.onended=null,q.tryReleasingCache(this._url),this._bufferSourceNode.stop()},n(t,[{key:"onPlay",get:function(){return this._onPlayCb},set:function(t){this._onPlayCb=t}},{key:"onEnd",get:function(){return this._onEndCb},set:function(t){this._onEndCb=t}}]),t}(),X=(j=function(){function t(t,e){this._src=void 0,this._audioBuffer=void 0,this._sourceNode=void 0,this._gainNode=void 0,this._volume=1,this._loop=!1,this._state=C.INIT,this._audioTimer=void 0,this._readyToHandleOnShow=!1,this._eventTarget=new r,this._operationQueue=[],this._audioBuffer=t,this._audioTimer=new Q(t),this._gainNode=F.createGain(),this._gainNode.connect(F.destination),this._src=e,o.on("hide",this._onHide,this),o.on("show",this._onShow,this)}var e=t.prototype;return e.destroy=function(){this._audioTimer.destroy(),this._audioBuffer&&(this._audioBuffer=null),q.tryReleasingCache(this._src),o.off("hide",this._onHide,this),o.off("show",this._onShow,this)},e._onHide=function(){var t=this;this._state===C.PLAYING&&this.pause().then((function(){t._state=C.INTERRUPTED,t._readyToHandleOnShow=!0,t._eventTarget.emit(w.INTERRUPTION_BEGIN)})).catch((function(){}))},e._onShow=function(){var t=this;this._readyToHandleOnShow?(this._state===C.INTERRUPTED&&this.play().then((function(){t._eventTarget.emit(w.INTERRUPTION_END)})).catch((function(){})),this._readyToHandleOnShow=!1):this._eventTarget.once(w.INTERRUPTION_BEGIN,this._onShow,this)},t.load=function(e){return new Promise((function(n){t.loadNative(e).then((function(o){n(new t(o,e))})).catch((function(){}))}))},t.loadNative=function(t){return new Promise((function(e,n){var o=q.getCache(t);if(o)return q.retainCache(t),void e(o);fsUtils.readArrayBuffer(t,(function(o,i){o?n(o):F.decodeAudioData(i).then((function(n){q.addCache(t,n),e(n)})).catch((function(){}))}))}))},t.loadOneShotAudio=function(e,n){return new Promise((function(o,i){t.loadNative(e).then((function(t){var i=new J(t,n,e);o(i)})).catch(i)}))},e.seek=function(t){var e=this;return new Promise((function(n){e._audioTimer.seek(t),e._state===C.PLAYING?e._doPlay().then(n).catch((function(){})):n()}))},e.play=function(){return this._doPlay()},e._doPlay=function(){var t=this;return new Promise((function(e){t._stopSourceNode(),t._sourceNode=F.createBufferSource(),t._sourceNode.buffer=t._audioBuffer,t._sourceNode.loop=t._loop,t._sourceNode.connect(t._gainNode),t._sourceNode.start(0,t._audioTimer.currentTime),t._state=C.PLAYING,t._audioTimer.start(),t._sourceNode.onended=function(){t._audioTimer.stop(),t._eventTarget.emit(w.ENDED),t._state=C.INIT},e()}))},e._stopSourceNode=function(){try{this._sourceNode&&(this._sourceNode.onended=null,this._sourceNode.stop())}catch(t){}},e.pause=function(){return this._state===C.PLAYING&&this._sourceNode?(this._audioTimer.pause(),this._state=C.PAUSED,this._stopSourceNode(),Promise.resolve()):Promise.resolve()},e.stop=function(){return this._sourceNode?(this._audioTimer.stop(),this._state=C.STOPPED,this._stopSourceNode(),Promise.resolve()):Promise.resolve()},e.onInterruptionBegin=function(t){this._eventTarget.on(w.INTERRUPTION_BEGIN,t)},e.offInterruptionBegin=function(t){this._eventTarget.off(w.INTERRUPTION_BEGIN,t)},e.onInterruptionEnd=function(t){this._eventTarget.on(w.INTERRUPTION_END,t)},e.offInterruptionEnd=function(t){this._eventTarget.off(w.INTERRUPTION_END,t)},e.onEnded=function(t){this._eventTarget.on(w.ENDED,t)},e.offEnded=function(t){this._eventTarget.off(w.ENDED,t)},n(t,[{key:"src",get:function(){return this._src}},{key:"type",get:function(){return D.WEB_AUDIO}},{key:"state",get:function(){return this._state}},{key:"loop",get:function(){return this._loop},set:function(t){this._loop=t,this._sourceNode&&(this._sourceNode.loop=t)}},{key:"volume",get:function(){return this._volume},set:function(t){t=a(t),this._volume=t,this._gainNode.gain.value=t}},{key:"duration",get:function(){return this._audioBuffer.duration}},{key:"currentTime",get:function(){return this._audioTimer.currentTime}}]),t}(),i((M=j).prototype,"seek",[R],Object.getOwnPropertyDescriptor(M.prototype,"seek"),M.prototype),i(M.prototype,"play",[R],Object.getOwnPropertyDescriptor(M.prototype,"play"),M.prototype),i(M.prototype,"pause",[R],Object.getOwnPropertyDescriptor(M.prototype,"pause"),M.prototype),i(M.prototype,"stop",[R],Object.getOwnPropertyDescriptor(M.prototype,"stop"),M.prototype),M),Z=function(){function t(t){this._audio=void 0,this._audio=t}var e=t.prototype;return e.play=function(){this._audio.play()},e.stop=function(){this._audio.stop()},n(t,[{key:"onPlay",get:function(){return this._audio.onPlay},set:function(t){this._audio.onPlay=t}},{key:"onEnd",get:function(){return this._audio.onEnd},set:function(t){this._audio.onEnd=t}}]),t}(),$=function(){function t(t){this._player=void 0,this._player=t}t.load=function(e){return new Promise((function(n){"object"==typeof u.tt&&void 0!==u.tt.getAudioContext?X.load(e).then((function(e){n(new t(e))})).catch((function(){})):z.load(e).then((function(e){n(new t(e))})).catch((function(){}))}))};var e=t.prototype;return e.destroy=function(){this._player.destroy()},t.loadNative=function(t){return"object"==typeof u.tt&&void 0!==u.tt.getAudioContext?X.loadNative(t):z.loadNative(t)},t.loadOneShotAudio=function(t,e){return new Promise((function(n,o){"object"==typeof u.tt&&void 0!==u.tt.getAudioContext?X.loadOneShotAudio(t,e).then((function(t){n(new Z(t))})).catch(o):z.loadOneShotAudio(t,e).then((function(t){n(new Z(t))})).catch(o)}))},e.seek=function(t){return this._player.seek(t)},e.play=function(){return this._player.play()},e.pause=function(){return this._player.pause()},e.stop=function(){return this._player.stop()},e.onInterruptionBegin=function(t){this._player.onInterruptionBegin(t)},e.offInterruptionBegin=function(t){this._player.offInterruptionBegin(t)},e.onInterruptionEnd=function(t){this._player.onInterruptionEnd(t)},e.offInterruptionEnd=function(t){this._player.offInterruptionEnd(t)},e.onEnded=function(t){this._player.onEnded(t)},e.offEnded=function(t){this._player.offEnded(t)},n(t,[{key:"src",get:function(){return this._player.src}},{key:"type",get:function(){return this._player.type}},{key:"state",get:function(){return this._player.state}},{key:"loop",get:function(){return this._player.loop},set:function(t){this._player.loop=t}},{key:"volume",get:function(){return this._player.volume},set:function(t){this._player.volume=t}},{key:"duration",get:function(){return this._player.duration}},{key:"currentTime",get:function(){return this._player.currentTime}}]),t}();$.maxAudioChannel=10,s.AudioPlayer=$;var tt=t("AudioClip",c("cc.AudioClip")((W=K=function(t){function e(){var e;return e=t.call(this)||this,l(e,"_duration",Y,_(e)),e._loadMode=D.UNKNOWN_AUDIO,e._meta=null,e._player=void 0,e}d(e,t);var o=e.prototype;return o.destroy=function(){var e,n=t.prototype.destroy.call(this);return null===(e=this._player)||void 0===e||e.destroy(),n},o.validate=function(){return!!this._meta},o.getDuration=function(){return this._duration?this._duration:this._meta?this._meta.duration:0},o.getCurrentTime=function(){return this._player?this._player.currentTime:0},o.getVolume=function(){return this._player?this._player.volume:0},o.getLoop=function(){return!!this._player&&this._player.loop},o.setCurrentTime=function(t){var e;null===(e=this._player)||void 0===e||e.seek(t).catch((function(){}))},o.setVolume=function(t){this._player&&(this._player.volume=t)},o.setLoop=function(t){this._player&&(this._player.loop=t)},o.play=function(){var t;null===(t=this._player)||void 0===t||t.play().catch((function(){}))},o.pause=function(){var t;null===(t=this._player)||void 0===t||t.pause().catch((function(){}))},o.stop=function(){var t;null===(t=this._player)||void 0===t||t.stop().catch((function(){}))},o.playOneShot=function(t){void 0===t&&(t=1),this._nativeAsset&&$.loadOneShotAudio(this._nativeAsset.url,t).then((function(t){t.play()})).catch((function(){}))},n(e,[{key:"_nativeAsset",get:function(){return this._meta},set:function(t){this._meta=t,t?(this._loadMode=t.type,this._player=t.player):(this._meta=null,this._loadMode=D.UNKNOWN_AUDIO,this._duration=0)}},{key:"_nativeDep",get:function(){return{uuid:this._uuid,audioLoadMode:this.loadMode,ext:this._native,__isNative__:!0}}},{key:"loadMode",get:function(){return this._loadMode}},{key:"state",get:function(){return this._player?this._player.state:C.INIT}}]),e}(h),K.AudioType=D,Y=i((H=W).prototype,"_duration",[p],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),i(H.prototype,"_nativeDep",[f],Object.getOwnPropertyDescriptor(H.prototype,"_nativeDep"),H.prototype),G=H))||G);function et(t,e,n){$.load(t,{audioLoadMode:e.audioLoadMode}).then((function(e){var o={player:e,url:t,duration:e.duration,type:e.type};n(null,o)})).catch((function(t){n(t)}))}function nt(t,e,n,o){var i=new tt;i._nativeUrl=t,i._nativeAsset=e,i._duration=e.duration,o(null,i)}s.AudioClip=tt,O.register({".mp3":et,".ogg":et,".wav":et,".m4a":et}),S.register({".mp3":nt,".ogg":nt,".wav":nt,".m4a":nt});var ot,it,rt,ut,at,st,ct,dt,ht,ft,lt,_t,pt,yt,vt,gt,mt,Tt,Nt,Et=new(function(){function t(){this._oneShotAudioInfoList=[],this._audioPlayerInfoList=[]}var e=t.prototype;return e._findIndex=function(t,e){return t.findIndex((function(t){return t.audio===e}))},e._tryAddPlaying=function(t,e){var n=this._findIndex(t,e);return n>-1?(t[n].playTime=performance.now(),!1):(t.push({audio:e,playTime:performance.now()}),!0)},e.addPlaying=function(t){if(t instanceof $){if(this._tryAddPlaying(this._audioPlayerInfoList,t))return}else this._tryAddPlaying(this._oneShotAudioInfoList,t)},e._tryRemovePlaying=function(t,e){var n=this._findIndex(t,e);return-1!==n&&(y(t,n),!0)},e.removePlaying=function(t){if(t instanceof $){if(this._tryRemovePlaying(this._audioPlayerInfoList,t))return}else this._tryRemovePlaying(this._oneShotAudioInfoList,t)},e.discardOnePlayingIfNeeded=function(){var t;this._audioPlayerInfoList.length+this._oneShotAudioInfoList.length<$.maxAudioChannel||(this._oneShotAudioInfoList.length>0?this._oneShotAudioInfoList.forEach((function(e){(!t||e.playTime<t.playTime)&&(t=e)})):this._audioPlayerInfoList.forEach((function(e){(!t||e.playTime<t.playTime)&&(t=e)})),t&&(t.audio.stop(),this.removePlaying(t.audio)))},t}());!function(t){t.STARTED="started",t.ENDED="ended"}(Nt||(Nt={}));var Pt,It=(ot=c("cc.AudioSource"),it=g(),rt=m(),ut=v(tt),at=v(tt),st=T(),ct=T(),dt=T(),ht=N(),ft=T(),Pt=ot(lt=it(lt=rt((Tt=mt=function(t){function o(){for(var e,n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return e=t.call.apply(t,[this].concat(o))||this,l(e,"_clip",pt,_(e)),e._player=null,l(e,"_loop",yt,_(e)),l(e,"_playOnAwake",vt,_(e)),l(e,"_volume",gt,_(e)),e._cachedCurrentTime=0,e._operationsBeforeLoading=[],e._isLoaded=!1,e._lastSetClip=void 0,e}d(o,t);var i=o.prototype;return i._syncPlayer=function(){var t=this,e=this._clip;this._isLoaded=!1,e&&this._lastSetClip!==e&&(e._nativeAsset?(this._lastSetClip=e,$.load(e._nativeAsset.url,{audioLoadMode:e.loadMode}).then((function(n){t._lastSetClip===e&&(t._isLoaded=!0,t._player&&(t._player.offEnded(),t._player.offInterruptionBegin(),t._player.offInterruptionEnd(),t._player.destroy()),t._player=n,n.onEnded((function(){Et.removePlaying(n),t.node.emit(Nt.ENDED,t)})),n.onInterruptionBegin((function(){Et.removePlaying(n)})),n.onInterruptionEnd((function(){Et.addPlaying(n)})),t._syncStates())})).catch((function(){}))):console.error("Invalid audio clip"))},i.onLoad=function(){this._syncPlayer()},i.onEnable=function(){this._playOnAwake&&!this.playing&&this.play()},i.onDisable=function(){var t=this._getRootNode();(null==t?void 0:t._persistNode)||this.pause()},i.onDestroy=function(){var t;this.stop(),null===(t=this._player)||void 0===t||t.destroy()},i._getRootNode=function(){for(var t,e,n=this.node,o=null===(t=n)||void 0===t||null===(e=t.parent)||void 0===e?void 0:e.parent;o;){var i,r,u;o=null===(r=n=null===(i=n)||void 0===i?void 0:i.parent)||void 0===r||null===(u=r.parent)||void 0===u?void 0:u.parent}return n},i.play=function(){var t,e,n=this;this._isLoaded?(Et.discardOnePlayingIfNeeded(),this.state===C.PLAYING&&(null===(e=this._player)||void 0===e||e.stop().catch((function(){}))),null===(t=this._player)||void 0===t||t.play().then((function(){Et.addPlaying(n._player),n.node.emit(Nt.STARTED,n)})).catch((function(){}))):this._operationsBeforeLoading.push("play")},i.pause=function(){var t,e=this;this._isLoaded?null===(t=this._player)||void 0===t||t.pause().then((function(){Et.removePlaying(e._player)})).catch((function(){})):this._operationsBeforeLoading.push("pause")},i.stop=function(){var t,e=this;this._isLoaded?null===(t=this._player)||void 0===t||t.stop().then((function(){Et.removePlaying(e._player)})).catch((function(){})):this._operationsBeforeLoading.push("stop")},i.playOneShot=function(t,e){void 0===e&&(e=1),t._nativeAsset?$.loadOneShotAudio(t._nativeAsset.url,this._volume*e,{audioLoadMode:t.loadMode}).then((function(t){Et.discardOnePlayingIfNeeded(),t.onPlay=function(){Et.addPlaying(t)},t.onEnd=function(){Et.removePlaying(t)},t.play()})).catch((function(){})):console.error("Invalid audio clip")},i._syncStates=function(){var t=this;this._player&&this._player.seek(this._cachedCurrentTime).then((function(){t._player&&(t._player.loop=t._loop,t._player.volume=t._volume,t._operationsBeforeLoading.forEach((function(e){var n;null===(n=t[e])||void 0===n||n.call(t)})),t._operationsBeforeLoading.length=0)})).catch((function(){}))},n(o,[{key:"clip",get:function(){return this._clip},set:function(t){t!==this._clip&&(this._clip=t,this._syncPlayer())}},{key:"loop",get:function(){return this._loop},set:function(t){this._loop=t,this._player&&(this._player.loop=t)}},{key:"playOnAwake",get:function(){return this._playOnAwake},set:function(t){this._playOnAwake=t}},{key:"volume",get:function(){return this._volume},set:function(t){Number.isNaN(t)?console.warn("illegal audio volume!"):(t=e(t,0,1),this._player?(this._player.volume=t,this._volume=this._player.volume):this._volume=t)}},{key:"currentTime",get:function(){return this._player?this._player.currentTime:this._cachedCurrentTime},set:function(t){var n;Number.isNaN(t)?console.warn("illegal audio time!"):(t=e(t,0,this.duration),this._cachedCurrentTime=t,null===(n=this._player)||void 0===n||n.seek(this._cachedCurrentTime).catch((function(){})))}},{key:"duration",get:function(){var t,e;return null!==(t=null===(e=this._clip)||void 0===e?void 0:e.getDuration())&&void 0!==t?t:this._player?this._player.currentTime:0}},{key:"state",get:function(){return this._player?this._player.state:C.INIT}},{key:"playing",get:function(){return this.state===o.AudioState.PLAYING}}],[{key:"maxAudioChannel",get:function(){return $.maxAudioChannel}}]),o}(E),mt.AudioState=C,mt.EventType=Nt,pt=i((_t=Tt).prototype,"_clip",[ut],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),yt=i(_t.prototype,"_loop",[p],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),vt=i(_t.prototype,"_playOnAwake",[p],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),gt=i(_t.prototype,"_volume",[p],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),i(_t.prototype,"clip",[at,st],Object.getOwnPropertyDescriptor(_t.prototype,"clip"),_t.prototype),i(_t.prototype,"loop",[ct],Object.getOwnPropertyDescriptor(_t.prototype,"loop"),_t.prototype),i(_t.prototype,"playOnAwake",[dt],Object.getOwnPropertyDescriptor(_t.prototype,"playOnAwake"),_t.prototype),i(_t.prototype,"volume",[ht,ft],Object.getOwnPropertyDescriptor(_t.prototype,"volume"),_t.prototype),lt=_t))||lt)||lt)||lt,t({AudioSource:Pt,AudioSourceComponent:Pt}),Pt);P(tt,"AudioClip",[{name:"PlayingState",newName:"AudioState",target:It,targetName:"AudioSource"}]),I(tt.prototype,"AudioClip.prototype",["state","play","pause","stop","playOneShot","setCurrentTime","setVolume","setLoop","getCurrentTime","getVolume","getLoop"].map((function(t){return{name:t,suggest:"please use AudioSource.prototype."+t+" instead"}}))),s.AudioSourceComponent=It,A.setClassAlias(It,"cc.AudioSourceComponent")}}}));
