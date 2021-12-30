"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function request(options) {
  options = FormatOptions(options);
  var service = _axios2.default.create({
    // baseURL: 'https://api.example.com'
  });
  // request拦截器
  service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    var userInfo = JSON.parse(window.localStorage.getItem("user")) || {};
    config.headers.token = userInfo && userInfo.token || "";
    return config;
  }, function (error) {
    // 对请求错误做些什么
    Promise.reject(error);
  });
  // 添加响应拦截器
  service.interceptors.response.use(function (response) {
    return (
      // 对响应数据做点什么
      response
    );
  }, function (error) {
    // 对响应错误做点什么
    return error.response;
  });
  var response = void 0;
  try {
    response = await service(options);
    return response;
  } catch (err) {
    return response;
  }
};

// 格式化参数


var FormatOptions = function FormatOptions(options) {
  var _options$method = options.method,
      method = _options$method === undefined ? "get" : _options$method,
      url = options.url,
      _options$params = options.params,
      params = _options$params === undefined ? {} : _options$params;
  // let

  if (method.toLowerCase() === "get") {
    return { method: "get", url: url, params: params };
  }
  if (method.toLowerCase() === "post") {
    return { method: "post", url: url, data: params };
  }
};