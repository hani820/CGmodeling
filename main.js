/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");



class ThreeJSContainer {
    scene;
    light;
    cloud;
    blackHoleGroup;
    constructor() { }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_2__.Color(0x000000));
        renderer.shadowMap.enabled = true; // シャドウマップを有効化
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.update(time);
            if (this.blackHoleGroup.visible) {
                this.blackHoleGroup.rotation.y += 0.005;
            }
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene();
        // 白い閃光（ビッグバンの爆発の中心光）
        const flashMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
        const flashSphere = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.5, 32, 32), flashMaterial);
        this.scene.add(flashSphere); // シーンに追加
        // ブラックホールのグループ作成
        this.blackHoleGroup = new three__WEBPACK_IMPORTED_MODULE_2__.Group();
        this.scene.add(this.blackHoleGroup); // シーンにブラックホールのグループを追加
        // ブラックホールの中心部分
        const coreMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({ color: 0x000000, transparent: true });
        const blackHoleCore = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(1, 32, 32), coreMaterial);
        this.blackHoleGroup.add(blackHoleCore);
        // ブラックホールの回転する光の円盤
        const generateDiskTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const context = canvas.getContext('2d');
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            // 放射状グラデーション（内側は白、外側は透明）
            const gradient = context.createRadialGradient(centerX, centerY, 20, centerX, centerY, centerX);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.3, 'rgba(255, 220, 120, 1)');
            gradient.addColorStop(0.6, 'rgba(255, 120, 0, 0.8)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            const texture = new three__WEBPACK_IMPORTED_MODULE_2__.Texture(canvas);
            texture.needsUpdate = true; // テクスチャの更新を通知
            return texture;
        };
        // テクスチャをマテリアルに設定
        const diskMaterial = new three__WEBPACK_IMPORTED_MODULE_2__.MeshBasicMaterial({
            map: generateDiskTexture(),
            side: three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide,
            transparent: true,
            blending: three__WEBPACK_IMPORTED_MODULE_2__.AdditiveBlending,
            depthWrite: false,
        });
        // ブラックホールの回転円盤メッシュ
        const horizontalDisk = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.RingGeometry(1.2, 4.5, 64), diskMaterial);
        horizontalDisk.rotation.x = -Math.PI / 2; // 回転して水平に配置
        this.blackHoleGroup.add(horizontalDisk);
        this.blackHoleGroup.visible = false; // 最初は非表示
        // 星々の作成
        const particleNum = 3000; // 星の数
        const geometry = new three__WEBPACK_IMPORTED_MODULE_2__.BufferGeometry();
        const positions = new Float32Array(particleNum * 3); // 星の位置座標配列
        const colorsAttribute = new Float32Array(particleNum * 3); // 星の色配列
        geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(positions, 3)); // 位置属性をジオメトリにセット
        geometry.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(colorsAttribute, 3)); // 色属性をセット
        // 星の描画用マテリアル
        const material = new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({
            size: 0.08,
            transparent: true,
            blending: three__WEBPACK_IMPORTED_MODULE_2__.AdditiveBlending,
            depthWrite: false,
            vertexColors: true
        });
        // 星群の作成
        this.cloud = new three__WEBPACK_IMPORTED_MODULE_2__.Points(geometry, material);
        this.scene.add(this.cloud);
        // BufferGeometryの属性の参照を取得
        const geometryAttribute = this.cloud.geometry.getAttribute('position');
        const colorAttribute = this.cloud.geometry.getAttribute('color');
        // 星の色のパターンを複数用意
        const starColors = [
            new three__WEBPACK_IMPORTED_MODULE_2__.Color(0xfff5c4), new three__WEBPACK_IMPORTED_MODULE_2__.Color(0xffffff),
            new three__WEBPACK_IMPORTED_MODULE_2__.Color(0xfff5c4), new three__WEBPACK_IMPORTED_MODULE_2__.Color(0xffffff),
            new three__WEBPACK_IMPORTED_MODULE_2__.Color(0xfff5c4), new three__WEBPACK_IMPORTED_MODULE_2__.Color(0xffffff),
            new three__WEBPACK_IMPORTED_MODULE_2__.Color(0xa7c7ff), new three__WEBPACK_IMPORTED_MODULE_2__.Color(0xffa6a6)
        ];
        // 星の最終的な拡散位置をランダムに計算し配列に保存
        const spherePositions = [];
        for (let i = 0; i < particleNum; i++) {
            const sphereRadius = 12 + Math.random() * 6; // 拡散の半径ランダム
            const phi = Math.acos(2 * Math.random() - 1); // 球面座標の角度phi
            const theta = Math.random() * 2 * Math.PI; // 球面座標の角度theta
            spherePositions.push(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(sphereRadius * Math.sin(phi) * Math.cos(theta), sphereRadius * Math.sin(phi) * Math.sin(theta), sphereRadius * Math.cos(phi)));
            // 星の色をランダムに割り当てる
            const color = starColors[Math.floor(Math.random() * starColors.length)];
            colorAttribute.setXYZ(i, color.r, color.g, color.b);
        }
        // アニメーション各フェーズの定義
        const masterTweenInfo = { t: 0, opacity: 0 }; // アニメーション進行度・透明度管理用オブジェクト
        const rotationAxis = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0.3, 1, 0).clone().normalize(); // ブラックホール回転軸
        const origin = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 0); // 原点ベクトル（中心）
        // ブラックホールが星を吸い込むアニメーション
        const animateCollapse = () => {
            this.blackHoleGroup.scale.set(0.01, 0.01, 0.01); // スケール初期化（小さく）
            this.blackHoleGroup.visible = true; // ブラックホール表示
            masterTweenInfo.t = 0;
            masterTweenInfo.opacity = 0;
            // ブラックホールの黒球と円盤を徐々に不透明に
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(masterTweenInfo).to({ opacity: 1 }, 1500)
                .onUpdate(() => {
                coreMaterial.opacity = masterTweenInfo.opacity;
                diskMaterial.opacity = masterTweenInfo.opacity;
            }).start();
            // ブラックホール本体のスケールを大きくして現す
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(this.blackHoleGroup.scale)
                .to({ x: 1, y: 1, z: 1 }, 1500)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Exponential.Out)
                .start();
            // ブラックホールの吸い込み
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(masterTweenInfo).to({ t: 1 }, 5000)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quintic.InOut)
                // 星の回転と収縮を同時に進行
                .onUpdate(() => {
                const currentAngle = masterTweenInfo.t * 10; // 回転角度
                for (let i = 0; i < particleNum; i++) {
                    const startPos = spherePositions[i];
                    const rotatedStartPos = startPos.clone().clone().applyAxisAngle(rotationAxis, currentAngle);
                    const newPos = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3().clone().lerpVectors(rotatedStartPos, origin, masterTweenInfo.t);
                    geometryAttribute.setXYZ(i, newPos.x, newPos.y, newPos.z);
                }
                geometryAttribute.needsUpdate = true; // 更新通知
            })
                .onComplete(animateShrink).start(); // 収縮完了後、次のアニメーションへ
        };
        // ブラックホール縮小アニメーション
        const animateShrink = () => {
            masterTweenInfo.opacity = 1;
            // ブラックホールの黒球・円盤を徐々に透明化
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(masterTweenInfo).to({ opacity: 0 }, 1500)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Exponential.In)
                .onUpdate(() => {
                diskMaterial.opacity = masterTweenInfo.opacity;
                coreMaterial.opacity = masterTweenInfo.opacity;
            })
                .onComplete(() => {
                this.blackHoleGroup.visible = false; // 非表示にする
                setTimeout(() => {
                    animateBigBang();
                }, 2000);
            }).start();
            // ブラックホールのスケールを小さく縮める
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(this.blackHoleGroup.scale)
                .to({ x: 0.01, y: 0.01, z: 0.01 }, 1500)
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Exponential.In)
                .start();
        };
        // ビッグバンの閃光＆星々の拡散アニメーション
        const animateBigBang = () => {
            masterTweenInfo.t = 0;
            // 白い閃光出現
            flashSphere.scale.set(0.01, 0.01, 0.01); // 最初は小さく
            flashMaterial.opacity = 1; // 不透明に
            flashSphere.visible = true; // 表示する
            // 閃光を大きく
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(flashSphere.scale)
                .to({ x: 5, y: 5, z: 5 }, 300) // 300msで拡大
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.Out)
                .start();
            // 閃光を消す
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(flashMaterial)
                .to({ opacity: 0 }, 300) // 300msでフェードアウト
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Quadratic.In)
                .onComplete(() => {
                flashSphere.visible = false; // 閃光を非表示に
                // 1秒待ってから星の拡散アニメーションを開始
                setTimeout(() => {
                    // 星を原点から最終位置まで広げる
                    new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(masterTweenInfo).to({ t: 1 }, 4000)
                        .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Exponential.Out)
                        .onUpdate(() => {
                        for (let i = 0; i < particleNum; i++) {
                            const targetPos = spherePositions[i];
                            const newPos = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3().clone().lerpVectors(origin, targetPos, masterTweenInfo.t);
                            geometryAttribute.setXYZ(i, newPos.x, newPos.y, newPos.z);
                        }
                        geometryAttribute.needsUpdate = true;
                    })
                        .onComplete(animateCollapse) // 拡散後に収縮へループ
                        .start();
                }, 500); // 500msの待機
            })
                .start();
        };
        // 最初にビッグバン開始
        animateBigBang();
        // // 環境光の追加（シーン全体を均一に明るくする）
        // this.light = new THREE.AmbientLight(0xffffff, 0.5);
        // this.scene.add(this.light);
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 8, 18));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-78d392"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzXCI7XG5pbXBvcnQgKiBhcyBUV0VFTiBmcm9tIFwiQHR3ZWVuanMvdHdlZW4uanNcIjtcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG4gICAgcHJpdmF0ZSBjbG91ZDogVEhSRUUuUG9pbnRzO1xuICAgIHByaXZhdGUgYmxhY2tIb2xlR3JvdXA6IFRIUkVFLkdyb3VwO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIC8vIOeUu+mdoumDqOWIhuOBruS9nOaIkCjooajnpLrjgZnjgovmnqDjgZTjgajjgaspKlxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY2FtZXJhUG9zOiBUSFJFRS5WZWN0b3IzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoMHgwMDAwMDApKTtcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlOyAgICAgICAgICAgICAgICAvLyDjgrfjg6Pjg4njgqbjg57jg4Pjg5fjgpLmnInlirnljJZcblxuICAgICAgICAvL+OCq+ODoeODqeOBruioreWumlxuICAgICAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xuICAgICAgICBjYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcblxuICAgICAgICBjb25zdCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jHJlbmRlclxuICAgICAgICAvLyByZXFlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcbiAgICAgICAgY29uc3QgcmVuZGVyOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgVFdFRU4udXBkYXRlKHRpbWUpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5ibGFja0hvbGVHcm91cC52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibGFja0hvbGVHcm91cC5yb3RhdGlvbi55ICs9IDAuMDA1O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8g44K344O844Oz44Gu5L2c5oiQKOWFqOS9k+OBpzHlm54pXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgICAgIC8vIOeZveOBhOmWg+WFie+8iOODk+ODg+OCsOODkOODs+OBrueIhueZuuOBruS4reW/g+WFie+8iVxuICAgICAgICBjb25zdCBmbGFzaE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmLCB0cmFuc3BhcmVudDogdHJ1ZSwgb3BhY2l0eTogMCB9KTtcbiAgICAgICAgY29uc3QgZmxhc2hTcGhlcmUgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC41LCAzMiwgMzIpLCBmbGFzaE1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoZmxhc2hTcGhlcmUpOyAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCt+ODvOODs+OBq+i/veWKoFxuXG4gICAgICAgIC8vIOODluODqeODg+OCr+ODm+ODvOODq+OBruOCsOODq+ODvOODl+S9nOaIkFxuICAgICAgICB0aGlzLmJsYWNrSG9sZUdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuYmxhY2tIb2xlR3JvdXApOyAgICAgICAgICAgICAgICAvLyDjgrfjg7zjg7Pjgavjg5bjg6njg4Pjgq/jg5vjg7zjg6vjga7jgrDjg6vjg7zjg5fjgpLov73liqBcblxuICAgICAgICAvLyDjg5bjg6njg4Pjgq/jg5vjg7zjg6vjga7kuK3lv4Ppg6jliIZcbiAgICAgICAgY29uc3QgY29yZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4MDAwMDAwLCB0cmFuc3BhcmVudDogdHJ1ZSB9KTtcbiAgICAgICAgY29uc3QgYmxhY2tIb2xlQ29yZSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgxLCAzMiwgMzIpLCBjb3JlTWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLmJsYWNrSG9sZUdyb3VwLmFkZChibGFja0hvbGVDb3JlKTtcblxuICAgICAgICAvLyDjg5bjg6njg4Pjgq/jg5vjg7zjg6vjga7lm57ou6LjgZnjgovlhYnjga7lhobnm6RcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVEaXNrVGV4dHVyZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gMjU2OyBjYW52YXMuaGVpZ2h0ID0gMjU2O1xuICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgY29uc3QgY2VudGVyWCA9IGNhbnZhcy53aWR0aCAvIDI7XG4gICAgICAgICAgICBjb25zdCBjZW50ZXJZID0gY2FudmFzLmhlaWdodCAvIDI7XG5cbiAgICAgICAgICAgIC8vIOaUvuWwhOeKtuOCsOODqeODh+ODvOOCt+ODp+ODs++8iOWGheWBtOOBr+eZveOAgeWkluWBtOOBr+mAj+aYju+8iVxuICAgICAgICAgICAgY29uc3QgZ3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGNlbnRlclgsIGNlbnRlclksIDIwLCBjZW50ZXJYLCBjZW50ZXJZLCBjZW50ZXJYKTtcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScpO1xuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMywgJ3JnYmEoMjU1LCAyMjAsIDEyMCwgMSknKTtcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjYsICdyZ2JhKDI1NSwgMTIwLCAwLCAwLjgpJyk7XG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMCwwLDAsMCknKTtcblxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgY29uc3QgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlKGNhbnZhcyk7XG4gICAgICAgICAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgICAgLy8g44OG44Kv44K544OB44Oj44Gu5pu05paw44KS6YCa55+lXG4gICAgICAgICAgICByZXR1cm4gdGV4dHVyZTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyDjg4bjgq/jgrnjg4Hjg6PjgpLjg57jg4bjg6rjgqLjg6vjgavoqK3lrppcbiAgICAgICAgY29uc3QgZGlza01hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgICAgIG1hcDogZ2VuZXJhdGVEaXNrVGV4dHVyZSgpLFxuICAgICAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g44OW44Op44OD44Kv44Ob44O844Or44Gu5Zue6Lui5YaG55uk44Oh44OD44K344OlXG4gICAgICAgIGNvbnN0IGhvcml6b250YWxEaXNrID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlJpbmdHZW9tZXRyeSgxLjIsIDQuNSwgNjQpLCBkaXNrTWF0ZXJpYWwpO1xuICAgICAgICBob3Jpem9udGFsRGlzay5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyOyAgICAgICAgICAgIC8vIOWbnui7ouOBl+OBpuawtOW5s+OBq+mFjee9rlxuICAgICAgICB0aGlzLmJsYWNrSG9sZUdyb3VwLmFkZChob3Jpem9udGFsRGlzayk7XG5cbiAgICAgICAgdGhpcy5ibGFja0hvbGVHcm91cC52aXNpYmxlID0gZmFsc2U7ICAgICAgICAgICAgICAgICAgLy8g5pyA5Yid44Gv6Z2e6KGo56S6XG5cbiAgICAgICAgLy8g5pif44CF44Gu5L2c5oiQXG4gICAgICAgIGNvbnN0IHBhcnRpY2xlTnVtID0gMzAwMDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaYn+OBruaVsFxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBhcnRpY2xlTnVtICogMyk7IC8vIOaYn+OBruS9jee9ruW6p+aomemFjeWIl1xuICAgICAgICBjb25zdCBjb2xvcnNBdHRyaWJ1dGUgPSBuZXcgRmxvYXQzMkFycmF5KHBhcnRpY2xlTnVtICogMyk7IC8vIOaYn+OBruiJsumFjeWIl1xuXG4gICAgICAgIGdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykpOyAgLy8g5L2N572u5bGe5oCn44KS44K444Kq44Oh44OI44Oq44Gr44K744OD44OIXG4gICAgICAgIGdlb21ldHJ5LnNldEF0dHJpYnV0ZSgnY29sb3InLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGNvbG9yc0F0dHJpYnV0ZSwgMykpOyAvLyDoibLlsZ7mgKfjgpLjgrvjg4Pjg4hcblxuICAgICAgICAvLyDmmJ/jga7mj4/nlLvnlKjjg57jg4bjg6rjgqLjg6tcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgc2l6ZTogMC4wOCxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgICAgIHZlcnRleENvbG9yczogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyDmmJ/nvqTjga7kvZzmiJBcbiAgICAgICAgdGhpcy5jbG91ZCA9IG5ldyBUSFJFRS5Qb2ludHMoZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5jbG91ZCk7XG5cbiAgICAgICAgLy8gQnVmZmVyR2VvbWV0cnnjga7lsZ7mgKfjga7lj4LnhafjgpLlj5blvpdcbiAgICAgICAgY29uc3QgZ2VvbWV0cnlBdHRyaWJ1dGUgPSB0aGlzLmNsb3VkLmdlb21ldHJ5LmdldEF0dHJpYnV0ZSgncG9zaXRpb24nKSBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gICAgICAgIGNvbnN0IGNvbG9yQXR0cmlidXRlID0gdGhpcy5jbG91ZC5nZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ2NvbG9yJykgYXMgVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gICAgICAgIC8vIOaYn+OBruiJsuOBruODkeOCv+ODvOODs+OCkuikh+aVsOeUqOaEj1xuICAgICAgICBjb25zdCBzdGFyQ29sb3JzID0gW1xuICAgICAgICAgICAgbmV3IFRIUkVFLkNvbG9yKDB4ZmZmNWM0KSwgbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5Db2xvcigweGZmZjVjNCksIG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZiksXG4gICAgICAgICAgICBuZXcgVEhSRUUuQ29sb3IoMHhmZmY1YzQpLCBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLkNvbG9yKDB4YTdjN2ZmKSwgbmV3IFRIUkVFLkNvbG9yKDB4ZmZhNmE2KVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIOaYn+OBruacgOe1gueahOOBquaLoeaVo+S9jee9ruOCkuODqeODs+ODgOODoOOBq+ioiOeul+OBl+mFjeWIl+OBq+S/neWtmFxuICAgICAgICBjb25zdCBzcGhlcmVQb3NpdGlvbnM6IFRIUkVFLlZlY3RvcjNbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlTnVtOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNwaGVyZVJhZGl1cyA9IDEyICsgTWF0aC5yYW5kb20oKSAqIDY7ICAgICAgICAgICAvLyDmi6HmlaPjga7ljYrlvoTjg6njg7Pjg4Djg6BcbiAgICAgICAgICAgIGNvbnN0IHBoaSA9IE1hdGguYWNvcygyICogTWF0aC5yYW5kb20oKSAtIDEpOyAgICAgICAgICAvLyDnkIPpnaLluqfmqJnjga7op5LluqZwaGlcbiAgICAgICAgICAgIGNvbnN0IHRoZXRhID0gTWF0aC5yYW5kb20oKSAqIDIgKiBNYXRoLlBJOyAgICAgICAgICAgICAvLyDnkIPpnaLluqfmqJnjga7op5LluqZ0aGV0YVxuICAgICAgICAgICAgc3BoZXJlUG9zaXRpb25zLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoXG4gICAgICAgICAgICAgICAgc3BoZXJlUmFkaXVzICogTWF0aC5zaW4ocGhpKSAqIE1hdGguY29zKHRoZXRhKSxcbiAgICAgICAgICAgICAgICBzcGhlcmVSYWRpdXMgKiBNYXRoLnNpbihwaGkpICogTWF0aC5zaW4odGhldGEpLFxuICAgICAgICAgICAgICAgIHNwaGVyZVJhZGl1cyAqIE1hdGguY29zKHBoaSlcbiAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgLy8g5pif44Gu6Imy44KS44Op44Oz44OA44Og44Gr5Ymy44KK5b2T44Gm44KLXG4gICAgICAgICAgICBjb25zdCBjb2xvciA9IHN0YXJDb2xvcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc3RhckNvbG9ycy5sZW5ndGgpXTtcbiAgICAgICAgICAgIGNvbG9yQXR0cmlidXRlLnNldFhZWihpLCBjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+WQhOODleOCp+ODvOOCuuOBruWumue+qVxuICAgICAgICBjb25zdCBtYXN0ZXJUd2VlbkluZm8gPSB7IHQ6IDAsIG9wYWNpdHk6IDAgfTsgICAgICAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7PpgLLooYzluqbjg7vpgI/mmI7luqbnrqHnkIbnlKjjgqrjg5bjgrjjgqfjgq/jg4hcbiAgICAgICAgY29uc3Qgcm90YXRpb25BeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4zLCAxLCAwKS5ub3JtYWxpemUoKTsgLy8g44OW44Op44OD44Kv44Ob44O844Or5Zue6Lui6Lu4XG4gICAgICAgIGNvbnN0IG9yaWdpbiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApOyAgICAgICAgIC8vIOWOn+eCueODmeOCr+ODiOODq++8iOS4reW/g++8iVxuXG4gICAgICAgIC8vIOODluODqeODg+OCr+ODm+ODvOODq+OBjOaYn+OCkuWQuOOBhOi+vOOCgOOCouODi+ODoeODvOOCt+ODp+ODs1xuICAgICAgICBjb25zdCBhbmltYXRlQ29sbGFwc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJsYWNrSG9sZUdyb3VwLnNjYWxlLnNldCgwLjAxLCAwLjAxLCAwLjAxKTsgICAvLyDjgrnjgrHjg7zjg6vliJ3mnJ/ljJbvvIjlsI/jgZXjgY/vvIlcbiAgICAgICAgICAgIHRoaXMuYmxhY2tIb2xlR3JvdXAudmlzaWJsZSA9IHRydWU7ICAgICAgICAgICAgICAgICAvLyDjg5bjg6njg4Pjgq/jg5vjg7zjg6vooajnpLpcbiAgICAgICAgICAgIG1hc3RlclR3ZWVuSW5mby50ID0gMDtcbiAgICAgICAgICAgIG1hc3RlclR3ZWVuSW5mby5vcGFjaXR5ID0gMDtcblxuICAgICAgICAgICAgLy8g44OW44Op44OD44Kv44Ob44O844Or44Gu6buS55CD44Go5YaG55uk44KS5b6Q44CF44Gr5LiN6YCP5piO44GrXG4gICAgICAgICAgICBuZXcgVFdFRU4uVHdlZW4obWFzdGVyVHdlZW5JbmZvKS50byh7IG9wYWNpdHk6IDEgfSwgMTUwMClcbiAgICAgICAgICAgICAgICAub25VcGRhdGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAoY29yZU1hdGVyaWFsIGFzIGFueSkub3BhY2l0eSA9IG1hc3RlclR3ZWVuSW5mby5vcGFjaXR5O1xuICAgICAgICAgICAgICAgICAgICAoZGlza01hdGVyaWFsIGFzIGFueSkub3BhY2l0eSA9IG1hc3RlclR3ZWVuSW5mby5vcGFjaXR5O1xuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG5cbiAgICAgICAgICAgIC8vIOODluODqeODg+OCr+ODm+ODvOODq+acrOS9k+OBruOCueOCseODvOODq+OCkuWkp+OBjeOBj+OBl+OBpuePvuOBmVxuICAgICAgICAgICAgbmV3IFRXRUVOLlR3ZWVuKHRoaXMuYmxhY2tIb2xlR3JvdXAuc2NhbGUpXG4gICAgICAgICAgICAgICAgLnRvKHsgeDogMSwgeTogMSwgejogMSB9LCAxNTAwKVxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLkV4cG9uZW50aWFsLk91dClcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcblxuICAgICAgICAgICAgLy8g44OW44Op44OD44Kv44Ob44O844Or44Gu5ZC444GE6L6844G/XG4gICAgICAgICAgICBuZXcgVFdFRU4uVHdlZW4obWFzdGVyVHdlZW5JbmZvKS50byh7IHQ6IDEgfSwgNTAwMClcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWludGljLkluT3V0KVxuICAgICAgICAgICAgICAgIC8vIOaYn+OBruWbnui7ouOBqOWPjue4ruOCkuWQjOaZguOBq+mAsuihjFxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRBbmdsZSA9IG1hc3RlclR3ZWVuSW5mby50ICogMTA7IC8vIOWbnui7ouinkuW6plxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlTnVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0UG9zID0gc3BoZXJlUG9zaXRpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm90YXRlZFN0YXJ0UG9zID0gc3RhcnRQb3MuY2xvbmUoKS5hcHBseUF4aXNBbmdsZShyb3RhdGlvbkF4aXMsIGN1cnJlbnRBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygpLmxlcnBWZWN0b3JzKHJvdGF0ZWRTdGFydFBvcywgb3JpZ2luLCBtYXN0ZXJUd2VlbkluZm8udCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeUF0dHJpYnV0ZS5zZXRYWVooaSwgbmV3UG9zLngsIG5ld1Bvcy55LCBuZXdQb3Mueik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlBdHRyaWJ1dGUubmVlZHNVcGRhdGUgPSB0cnVlOyAvLyDmm7TmlrDpgJrnn6VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbkNvbXBsZXRlKGFuaW1hdGVTaHJpbmspLnN0YXJ0KCk7IC8vIOWPjue4ruWujOS6huW+jOOAgeasoeOBruOCouODi+ODoeODvOOCt+ODp+ODs+OBuFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIOODluODqeODg+OCr+ODm+ODvOODq+e4ruWwj+OCouODi+ODoeODvOOCt+ODp+ODs1xuICAgICAgICBjb25zdCBhbmltYXRlU2hyaW5rID0gKCkgPT4ge1xuICAgICAgICAgICAgbWFzdGVyVHdlZW5JbmZvLm9wYWNpdHkgPSAxO1xuXG4gICAgICAgICAgICAvLyDjg5bjg6njg4Pjgq/jg5vjg7zjg6vjga7pu5LnkIPjg7vlhobnm6TjgpLlvpDjgIXjgavpgI/mmI7ljJZcbiAgICAgICAgICAgIG5ldyBUV0VFTi5Ud2VlbihtYXN0ZXJUd2VlbkluZm8pLnRvKHsgb3BhY2l0eTogMCB9LCAxNTAwKVxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLkV4cG9uZW50aWFsLkluKVxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIChkaXNrTWF0ZXJpYWwgYXMgYW55KS5vcGFjaXR5ID0gbWFzdGVyVHdlZW5JbmZvLm9wYWNpdHk7XG4gICAgICAgICAgICAgICAgICAgIChjb3JlTWF0ZXJpYWwgYXMgYW55KS5vcGFjaXR5ID0gbWFzdGVyVHdlZW5JbmZvLm9wYWNpdHk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub25Db21wbGV0ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmxhY2tIb2xlR3JvdXAudmlzaWJsZSA9IGZhbHNlOyAgIC8vIOmdnuihqOekuuOBq+OBmeOCi1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgICAgICAgICAgICAgICAgICAgICAvLyAy56eS5b6F44Gj44Gm44GL44KJ44OT44OD44Kw44OQ44Oz6ZaL5aeLXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlQmlnQmFuZygpO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xuXG4gICAgICAgICAgICAvLyDjg5bjg6njg4Pjgq/jg5vjg7zjg6vjga7jgrnjgrHjg7zjg6vjgpLlsI/jgZXjgY/nuK7jgoHjgotcbiAgICAgICAgICAgIG5ldyBUV0VFTi5Ud2Vlbih0aGlzLmJsYWNrSG9sZUdyb3VwLnNjYWxlKVxuICAgICAgICAgICAgICAgIC50byh7IHg6IDAuMDEsIHk6IDAuMDEsIHo6IDAuMDEgfSwgMTUwMClcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5FeHBvbmVudGlhbC5JbilcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyDjg5Pjg4PjgrDjg5Djg7Pjga7ploPlhYnvvIbmmJ/jgIXjga7mi6HmlaPjgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICAgICAgY29uc3QgYW5pbWF0ZUJpZ0JhbmcgPSAoKSA9PiB7XG4gICAgICAgICAgICBtYXN0ZXJUd2VlbkluZm8udCA9IDA7XG5cbiAgICAgICAgICAgIC8vIOeZveOBhOmWg+WFieWHuuePvlxuICAgICAgICAgICAgZmxhc2hTcGhlcmUuc2NhbGUuc2V0KDAuMDEsIDAuMDEsIDAuMDEpOyAgLy8g5pyA5Yid44Gv5bCP44GV44GPXG4gICAgICAgICAgICBmbGFzaE1hdGVyaWFsLm9wYWNpdHkgPSAxOyAgICAgICAgICAgICAgICAvLyDkuI3pgI/mmI7jgatcbiAgICAgICAgICAgIGZsYXNoU3BoZXJlLnZpc2libGUgPSB0cnVlOyAgICAgICAgICAgICAgICAvLyDooajnpLrjgZnjgotcblxuICAgICAgICAgICAgLy8g6ZaD5YWJ44KS5aSn44GN44GPXG4gICAgICAgICAgICBuZXcgVFdFRU4uVHdlZW4oZmxhc2hTcGhlcmUuc2NhbGUpXG4gICAgICAgICAgICAgICAgLnRvKHsgeDogNSwgeTogNSwgejogNSB9LCAzMDApICAgICAgIC8vIDMwMG1z44Gn5ouh5aSnXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcblxuICAgICAgICAgICAgLy8g6ZaD5YWJ44KS5raI44GZXG4gICAgICAgICAgICBuZXcgVFdFRU4uVHdlZW4oZmxhc2hNYXRlcmlhbClcbiAgICAgICAgICAgICAgICAudG8oeyBvcGFjaXR5OiAwIH0sIDMwMCkgICAgICAgICAgICAgLy8gMzAwbXPjgafjg5Xjgqfjg7zjg4njgqLjgqbjg4hcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuSW4pXG4gICAgICAgICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmbGFzaFNwaGVyZS52aXNpYmxlID0gZmFsc2U7ICAgICAvLyDploPlhYnjgpLpnZ7ooajnpLrjgatcblxuICAgICAgICAgICAgICAgICAgICAvLyAx56eS5b6F44Gj44Gm44GL44KJ5pif44Gu5ouh5pWj44Ki44OL44Oh44O844K344On44Oz44KS6ZaL5aeLXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pif44KS5Y6f54K544GL44KJ5pyA57WC5L2N572u44G+44Gn5bqD44GS44KLXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgVFdFRU4uVHdlZW4obWFzdGVyVHdlZW5JbmZvKS50byh7IHQ6IDEgfSwgNDAwMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5FeHBvbmVudGlhbC5PdXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uVXBkYXRlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZU51bTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRQb3MgPSBzcGhlcmVQb3NpdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygpLmxlcnBWZWN0b3JzKG9yaWdpbiwgdGFyZ2V0UG9zLCBtYXN0ZXJUd2VlbkluZm8udCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeUF0dHJpYnV0ZS5zZXRYWVooaSwgbmV3UG9zLngsIG5ld1Bvcy55LCBuZXdQb3Mueik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlBdHRyaWJ1dGUubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uQ29tcGxldGUoYW5pbWF0ZUNvbGxhcHNlKSAvLyDmi6HmlaPlvozjgavlj47nuK7jgbjjg6vjg7zjg5dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTsgLy8gNTAwbXPjga7lvoXmqZ9cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIOacgOWIneOBq+ODk+ODg+OCsOODkOODs+mWi+Wni1xuICAgICAgICBhbmltYXRlQmlnQmFuZygpO1xuXG4gICAgICAgIC8vIC8vIOeSsOWig+WFieOBrui/veWKoO+8iOOCt+ODvOODs+WFqOS9k+OCkuWdh+S4gOOBq+aYjuOCi+OBj+OBmeOCi++8iVxuICAgICAgICAvLyB0aGlzLmxpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweGZmZmZmZiwgMC41KTtcbiAgICAgICAgLy8gdGhpcy5zY2VuZS5hZGQodGhpcy5saWdodCk7XG5cbiAgICAgICAgLy/jg6njgqTjg4jjga7oqK3lrppcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmKTtcbiAgICAgICAgY29uc3QgbHZlYyA9IG5ldyBUSFJFRS5WZWN0b3IzKDEsIDEsIDEpLm5vcm1hbGl6ZSgpO1xuICAgICAgICB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldChsdmVjLngsIGx2ZWMueSwgbHZlYy56KTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5saWdodCk7XG4gICAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBUaHJlZUpTQ29udGFpbmVyKCk7XG4gICAgbGV0IHZpZXdwb3J0ID0gY29udGFpbmVyLmNyZWF0ZVJlbmRlcmVyRE9NKDY0MCwgNDgwLCBuZXcgVEhSRUUuVmVjdG9yMygwLCA4LCAxOCkpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190d2VlbmpzX3R3ZWVuX2pzX2Rpc3RfdHdlZW5fZXNtX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHItNzhkMzkyXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9