(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ManageResources.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/ManageResources.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var _components_CreateEditPdfResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/CreateEditPdfResource */ "./resources/js/components/CreateEditPdfResource.vue");
/* harmony import */ var _components_Resources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Resources */ "./resources/js/components/Resources.vue");
/* harmony import */ var _components_CreateEditHtmlSnippet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/CreateEditHtmlSnippet */ "./resources/js/components/CreateEditHtmlSnippet.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_CreateEditLinkResource__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/CreateEditLinkResource */ "./resources/js/components/CreateEditLinkResource.vue");
/* harmony import */ var _components_Banner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Banner */ "./resources/js/components/Banner.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







var uiElements = {
  BDropdown: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BDropdown"],
  BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BRow"],
  BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BCol"],
  BDropdownItem: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BDropdownItem"],
  BIcon: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BIcon"],
  BIconPlusCircle: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BIconPlusCircle"],
  BIconCodeSlash: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BIconCodeSlash"],
  BIconFileEarmarkMedical: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BIconFileEarmarkMedical"],
  BIconLink45deg: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BIconLink45deg"],
  BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BCard"],
  BContainer: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BContainer"],
  BImg: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BImg"]
};
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ManageResources",
  components: _objectSpread(_objectSpread({
    CreateEditLinkResource: _components_CreateEditLinkResource__WEBPACK_IMPORTED_MODULE_5__["default"],
    CreateHtmlSnippet: _components_CreateEditHtmlSnippet__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, uiElements), {}, {
    CreatePdfResource: _components_CreateEditPdfResource__WEBPACK_IMPORTED_MODULE_1__["default"],
    Resources: _components_Resources__WEBPACK_IMPORTED_MODULE_2__["default"],
    Banner: _components_Banner__WEBPACK_IMPORTED_MODULE_6__["default"]
  }),
  data: function data() {
    return {
      enableCreatePdf: false,
      enableCreateHtmlSnippet: false,
      enableCreateLink: false,
      resources: [],
      loading: false
    };
  },
  methods: {
    fetchResources: function fetchResources() {
      var _this = this;

      this.loading = true;
      axios__WEBPACK_IMPORTED_MODULE_4___default.a.get('api/fetch-resources').then(function (res) {
        return res.data.resources;
      }).then(function (res) {
        _this.loading = false;
        _this.resources = res;
      });
    },
    handleModal: function handleModal(id) {
      switch (id) {
        case "create-pdf-resource":
          this.enableCreatePdf = !this.enableCreatePdf;
          this.toggleModal("create-pdf-resource", this.enableCreatePdf);
          break;

        case "create-html-snippet":
          this.enableCreateHtmlSnippet = !this.enableCreateHtmlSnippet;
          this.toggleModal("create-html-snippet", this.enableCreateHtmlSnippet);
          break;

        case "create-link-resource":
          this.enableCreateLink = !this.enableCreateLink;
          this.toggleModal("create-link-resource", this.enableCreateLink);
          break;
      }
    },
    toggleModal: function toggleModal(id, state) {
      var _this2 = this;

      if (state) {
        this.$nextTick(function () {
          _this2.$bvModal.show(id);
        });
      } else {
        this.$nextTick(function () {
          _this2.$bvModal.hide(id);
        });
      }
    },
    onChangeResource: function onChangeResource(resource, operation) {
      var vm = this;
      var index = this.resources.findIndex(function (i) {
        return i.id === resource.id;
      });
      if (operation === "create") this.resources.unshift(resource);else if (operation === "edit") {
        vm.resources.splice(index, 1, resource);
      } else if (operation === "delete") {
        vm.resources.splice(index, 1);
      }
    }
  },
  mounted: function mounted() {
    this.fetchResources();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ManageResources.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/ManageResources.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn:focus {\n  box-shadow: none !important;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ManageResources.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/ManageResources.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/vue-loader/lib??vue-loader-options!./ManageResources.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ManageResources.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ManageResources.vue?vue&type=template&id=68824d71&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/ManageResources.vue?vue&type=template&id=68824d71& ***!
  \*************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("Banner", {
        attrs: { "banner-sub": "Manage & Browse resources from here !" }
      }),
      _vm._v(" "),
      _c(
        "b-container",
        [
          _c(
            "b-row",
            { staticClass: "justify-content-center mt-5" },
            [
              _c(
                "b-col",
                { attrs: { sm: "12", lg: "10" } },
                [
                  _c(
                    "b-card",
                    {
                      attrs: {
                        "body-class":
                          "d-flex justify-content-between align-items-between"
                      }
                    },
                    [
                      _c("h4", [_vm._v("Create Resources")]),
                      _vm._v(" "),
                      _c(
                        "b-dropdown",
                        {
                          attrs: {
                            variant: "link",
                            "toggle-class": "text-decoration-none m-0",
                            "no-caret": "",
                            right: ""
                          },
                          scopedSlots: _vm._u([
                            {
                              key: "button-content",
                              fn: function() {
                                return [
                                  _c("b-icon", {
                                    attrs: {
                                      icon: "plus-circle",
                                      variant: "dark",
                                      "font-scale": "2"
                                    }
                                  })
                                ]
                              },
                              proxy: true
                            }
                          ])
                        },
                        [
                          _vm._v(" "),
                          _c(
                            "b-dropdown-item",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.handleModal("create-pdf-resource")
                                }
                              }
                            },
                            [
                              _c("b-icon", {
                                attrs: {
                                  icon: "file-earmark-medical",
                                  variant: "dark"
                                }
                              }),
                              _vm._v(" "),
                              _c("span", { staticClass: "ml-1" }, [
                                _vm._v("PDF Attachment")
                              ])
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-dropdown-item",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.handleModal("create-html-snippet")
                                }
                              }
                            },
                            [
                              _c("b-icon", {
                                attrs: { icon: "code-slash", variant: "dark" }
                              }),
                              _vm._v(" "),
                              _c("span", { staticClass: "ml-1" }, [
                                _vm._v("HTML Snippet")
                              ])
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-dropdown-item",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.handleModal("create-link-resource")
                                }
                              }
                            },
                            [
                              _c("b-icon", {
                                attrs: { icon: "link45deg", variant: "dark" }
                              }),
                              _vm._v(" "),
                              _c("span", { staticClass: "ml-1" }, [
                                _vm._v("Link")
                              ])
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.enableCreatePdf
                    ? [
                        _c("create-pdf-resource", {
                          attrs: { operation: "create" },
                          on: {
                            "toggle-modal": _vm.handleModal,
                            "on-change-resource": _vm.onChangeResource
                          }
                        })
                      ]
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.enableCreateHtmlSnippet
                    ? [
                        _c("create-html-snippet", {
                          attrs: { operation: "create" },
                          on: {
                            "toggle-modal": _vm.handleModal,
                            "on-change-resource": _vm.onChangeResource
                          }
                        })
                      ]
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.enableCreateLink
                    ? [
                        _c("create-edit-link-resource", {
                          attrs: { operation: "create" },
                          on: {
                            "toggle-modal": _vm.handleModal,
                            "on-change-resource": _vm.onChangeResource
                          }
                        })
                      ]
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c("Resources", {
                        attrs: {
                          resources: _vm.resources,
                          "can-manage": true,
                          loading: _vm.loading
                        },
                        on: { "on-change-resource": _vm.onChangeResource }
                      })
                    ],
                    1
                  )
                ],
                2
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/ManageResources.vue":
/*!************************************************!*\
  !*** ./resources/js/views/ManageResources.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ManageResources_vue_vue_type_template_id_68824d71___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ManageResources.vue?vue&type=template&id=68824d71& */ "./resources/js/views/ManageResources.vue?vue&type=template&id=68824d71&");
/* harmony import */ var _ManageResources_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ManageResources.vue?vue&type=script&lang=js& */ "./resources/js/views/ManageResources.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ManageResources_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ManageResources.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/views/ManageResources.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ManageResources_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ManageResources_vue_vue_type_template_id_68824d71___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ManageResources_vue_vue_type_template_id_68824d71___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/ManageResources.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/ManageResources.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/ManageResources.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageResources_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ManageResources.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ManageResources.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageResources_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/ManageResources.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/ManageResources.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageResources_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/vue-loader/lib??vue-loader-options!./ManageResources.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ManageResources.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageResources_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageResources_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageResources_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageResources_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/ManageResources.vue?vue&type=template&id=68824d71&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/ManageResources.vue?vue&type=template&id=68824d71& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageResources_vue_vue_type_template_id_68824d71___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ManageResources.vue?vue&type=template&id=68824d71& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ManageResources.vue?vue&type=template&id=68824d71&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageResources_vue_vue_type_template_id_68824d71___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageResources_vue_vue_type_template_id_68824d71___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);