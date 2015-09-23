"use strict";

(function () {

  var __amdDefs__ = {};

  var viewFactories_prototype = function viewFactories_prototype() {

    (function (_myTrait_) {
      var ajaxEndpoint;

      /**
       * @param float url
       */
      _myTrait_._setAjax = function (url) {
        ajaxEndpoint = url;
      };

      /**
       * @param float t
       */
      _myTrait_.gardenModel = function (t) {};

      /**
       * @param String id
       */
      _myTrait_.testView = function (id) {

        var o = _e().addClass("container");

        o.text("Hello from testView");

        return o;
      };
    })(this);
  };

  var viewFactories = function viewFactories(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof viewFactories) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != viewFactories._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new viewFactories(a, b, c, d, e, f, g, h);
  };

  viewFactories._classInfo = {
    name: "viewFactories"
  };
  viewFactories.prototype = new viewFactories_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["viewFactories"] = viewFactories;
      this.viewFactories = viewFactories;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["viewFactories"] = viewFactories;
    } else {
      this.viewFactories = viewFactories;
    }
  }).call(new Function("return this")());

  var testViewFactories_prototype = function testViewFactories_prototype() {

    (function (_myTrait_) {
      var _uuid;
      var ajaxEndpoint;
      var _t;

      /**
       * @param float url
       */
      _myTrait_._setAjax = function (url) {
        ajaxEndpoint = url;
      };

      /**
       * @param String id
       */
      _myTrait_.ilmoitustaulu = function (id) {
        var o = _e().addClass("container");

        o.h1().text("Ilmoitustaulu " + _t("uusia.viesteja", 10));

        var mData = _data(id);
        mData.then(function () {

          o.button("btn btn-success").text("+ uusi viesti").on("click", function () {
            // uusiIlmoitustauluviesti
            o.pushTo("container", "uusiIlmoitustauluviesti", mData);
          });

          o.div().mvc(mData.list, function (item) {
            var o = _e();
            o.h2().bind(item, "heading");
            o.p().bind(item, "text", true);

            var tools = o.div();
            tools.button("btn btn-default").text("Muokkaa").on("click", function () {
              o.pushTo("container", "muokkaaIlmoitusta", item);
            });
            tools.button("btn btn-default").text("Poista").on("click", function () {
              item.remove();
            });

            o.mvc(item.files, function (file) {
              var o = _e();
              o.div().text(file.tiedosto());
              return o;
            });

            return o;
          });
        });
        return o;
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (options) {
        if (!_uuid) {
          _uuid = function () {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          };
          var langs = lang(options.lang);
          _t = function (text) {
            var args = Array.prototype.slice.call(arguments);
            return langs.get.apply(langs, args);
          };

          if (window && !window["_t"]) {
            window["_t"] = _t;
          }
        }
      });

      /**
       * @param float t
       */
      _myTrait_.kirjautuminen = function (t) {
        var o = _e().addClass("container");

        var info = o.div();

        o.button("btn btn-default").text("<- palaa takaisin").on("click", function () {
          o.popView();
        });

        o.div().text(_t("Käyttäjätunnus"));
        var uname = o.input("form-control");
        o.div().text(_t("Salasana"));
        var pw = o.input("form-control", {
          type: "password"
        });

        o.button("btn btn-primary").text(_t("login")).on("click", function () {
          o.postJSON(ajaxEndpoint, {
            cmd: "login",
            p: pw.val(),
            un: uname.val(),
            id: 21111
          }, function (data) {
            if (data.success) {
              o.pushTo("top", "vanhempiYlanavi");
              o.pushTo("container", "vanhempiEtusivu");
            } else {
              info.addClass("alert alert-danger");
              info.text(_t("Kirjautuminen epäonnistui"));
            }
          });
        });

        return o;
      };

      /**
       * @param float id
       */
      _myTrait_.muokkaaIlmoitusta = function (id) {
        var o = _e().addClass("container");

        o.button("btn btn-default").text("<- palaa takaisin").on("click", function () {
          o.popView();
        });

        o.div().text("Muokataan ilmoitustauluviestiä");

        var item = _data(id);
        item.then(function () {
          o.input("form-control").bind(item, "heading");
          o.textarea("form-control").bind(item, "text").height(300);
        });

        return o;
      };

      /**
       * @param float t
       */
      _myTrait_.oletusYlanavi = function (t) {
        var o = _e().addClass("navi-top");

        o.div().text("Default topnavi is here");

        return o;
      };

      /**
       * @param String id
       */
      _myTrait_.opettajaRyhmatLapset = function (id) {
        var o = _e().addClass("container");

        o.h1().text("Lapset ja ryhmät");

        var mData = _data(id);
        mData.then(function () {

          o.div().mvc(mData.gardens, function (item) {

            var o = _e();
            o.h2().bind(item, "name");

            o.div().mvc(item.groups, function (gr) {
              var o = _e();
              o.div().bind(gr, "name");
              return o;
            });

            return o;
          });
        });
        return o;
      };

      /**
       * @param String id
       */
      _myTrait_.testView = function (id) {

        var o = _e().addClass("container");

        o.text("Hello from testView");

        return o;
      };

      /**
       * @param String id
       */
      _myTrait_.uusiIlmoitustauluviesti = function (id) {
        var o = _e().addClass("container");

        o.button("btn btn-default").text("<- palaa takaisin").on("click", function () {
          o.popView();
        });

        o.div().text("Lisätään uusi ilmoitustauluviesti");

        var messages = o.div();

        var item = _data({
          id: "new_item_" + _uuid(),
          heading: "",
          text: ""
        });
        var ilmModel = _data(id);
        item.then(function () {
          o.input("form-control").bind(item, "heading");
          o.textarea("form-control").bind(item, "text").height(300);
          o.button("btn btn-success").text("Lisätään uusi viesti").on("click", function () {
            if (ajaxEndpoint) {

              o.postJSON(ajaxEndpoint, {
                cmd: "test"
              }, function (resObj) {
                if (resObj.success) {
                  ilmModel.list.push(item.toPlainData(), 0);
                  o.popView();
                } else {
                  messages.text(_t("Viestin lisäys ei onnistunut"));
                }
              }, function () {
                messages.text("Sending the file failed");
              });
            }
          });
        });

        o.on("mount", function () {
          item.text("").heading("");
        });

        return o;
      };

      /**
       * @param float t
       */
      _myTrait_.vanhempiEtusivu = function (t) {
        var o = _e().addClass("container");

        o.h1().text("Vanhempien etusivu tulee tähän kohtaan");

        return o;
      };

      /**
       * @param float t
       */
      _myTrait_.vanhempiYlanavi = function (t) {
        var o = _e().addClass("navi-top");

        o.button("btn btn-defaul").text(_t("logout")).on("click", function () {});

        return o;
      };
    })(this);
  };

  var testViewFactories = function testViewFactories(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof testViewFactories) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != testViewFactories._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new testViewFactories(a, b, c, d, e, f, g, h);
  };

  testViewFactories._classInfo = {
    name: "testViewFactories"
  };
  testViewFactories.prototype = new testViewFactories_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["testViewFactories"] = testViewFactories;
      this.testViewFactories = testViewFactories;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["testViewFactories"] = testViewFactories;
    } else {
      this.testViewFactories = testViewFactories;
    }
  }).call(new Function("return this")());

  var lang_prototype = function lang_prototype() {

    (function (_myTrait_) {
      var _uuid;
      var ajaxEndpoint;

      /**
       * @param String text
       */
      _myTrait_.get = function (text) {

        var a = [],
            i = 0;
        var token = this._translations[text];
        if (token) {
          for (var i = 1; i < arguments.length; i++) {
            token = token.replace("$" + i, arguments[i]);
          }
          text = token;
        }

        return text;
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (langName) {

        this._translations = {
          test: "You have $1 unread emails!"
        };

        if (langName && this["lang_" + langName]) {
          this["lang_" + langName]();
        }
      });

      /**
       * @param float t
       */
      _myTrait_.lang_en = function (t) {
        this._translations = {
          "uusia.viesteja": "You have $1 unread emails!"
        };
      };

      /**
       * @param float t
       */
      _myTrait_.lang_fi = function (t) {
        this._translations = {
          "uusia.viesteja": "Olet saanut $1 uutta viestiä!",
          "login": "Kirjaudu"
        };
      };
    })(this);
  };

  var lang = function lang(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof lang) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != lang._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new lang(a, b, c, d, e, f, g, h);
  };

  lang._classInfo = {
    name: "lang"
  };
  lang.prototype = new lang_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["lang"] = lang;
      this.lang = lang;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["lang"] = lang;
    } else {
      this.lang = lang;
    }
  }).call(new Function("return this")());

  var serverAjaxEmu_prototype = function serverAjaxEmu_prototype() {

    (function (_myTrait_) {
      var _uuid;
      var ajaxEndpoint;
      var _t;
      var _currentId;
      var _makeId;
      var _handlers;

      /**
       * @param String cmdName
       * @param float handlerFn
       */
      _myTrait_._addHandler = function (cmdName, handlerFn) {
        if (!_handlers) _handlers = {};
        _handlers[cmdName] = handlerFn;
      };

      /**
       * @param String cmdName
       */
      _myTrait_._getHandler = function (cmdName) {
        if (_handlers) {
          return _handlers[cmdName];
        }
      };

      /**
       * Default test JSON to be used when initializing the system data...
       * @param Object data
       */
      _myTrait_.gardenModel = function (data) {
        return {
          gardens: [{
            id: _makeId(),
            name: "Agoran päiväkoti",
            settings: {},
            groups: [{
              id: _makeId(),
              name: "Pörriäiset",
              children: [{
                id: _makeId(),
                name: "Esko Antero"
              }, {
                id: _makeId(),
                name: "Alma Nikula"
              }, {
                id: _makeId(),
                name: "Juuso Nettinen"
              }, {
                id: _makeId(),
                name: "Pirjo Lahtinen"
              }]
            }]
          }, {
            id: _makeId(),
            name: "Kummilan kummikoti",
            settings: {},
            groups: [{
              id: _makeId(),
              name: "Herhiläiset",
              children: [{
                id: _makeId(),
                name: "Esko Antero"
              }, {
                id: _makeId(),
                name: "Armo Nikula"
              }, {
                id: _makeId(),
                name: "Jukka Mänttäri"
              }, {
                id: _makeId(),
                name: "Arttu Viskari"
              }]
            }]
          }]
        };
      };

      /**
       * @param float t
       */
      _myTrait_.ilmoitustaulu = function (t) {

        return {
          list: [{
            id: _makeId(),
            heading: "Ilmoituksen otsikko - from AJAX emulator",
            text: "Ilmoituksen sisältöteksti\n\n rivi 2\n rivi 3",
            files: [{
              id: _makeId(),
              nimi: "Testipäiväkoti",
              tiedosto: "ilmoitus.pdf"
            }],
            linkit: [{
              url: "http://www.yle.fi",
              text: "Linkki YLE:n sivustolle tulee tähän kohtaan"
            }]
          }, {
            id: _makeId(),
            heading: "Toinen ilmoitustauluviesti",
            text: "Ilmoitustauluviestin sisältöteksti\n\n rivi 2\n rivi 3",
            files: [{
              id: _makeId(),
              nimi: "Testipäiväkoti",
              tiedosto: "ilmoitus2.pdf"
            }],
            linkit: []
          }]

        };
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (options) {
        if (!_uuid) {
          _uuid = function () {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          };
          _makeId = function () {
            if (!_currentId) _currentId = 1;
            return _currentId++;
          };
        }
      });

      /**
       * @param float data
       */
      _myTrait_.login = function (data) {
        if (this.userid) {
          return {
            userid: this.userid,
            success: true
          };
        }

        if (data.un == "my") {
          this.userid = 100;
          return {
            userid: 100,
            success: true
          };
        } else {
          return {
            success: false
          };
        }
      };

      /**
       * @param float t
       */
      _myTrait_.logout = function (t) {
        this.userid = null;
        return {
          userid: this.userid,
          success: true
        };
      };

      /**
       * @param Object data
       */
      _myTrait_.test = function (data) {
        return {
          text: "Hello form test function",
          success: true
        };
      };
    })(this);
  };

  var serverAjaxEmu = function serverAjaxEmu(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof serverAjaxEmu) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != serverAjaxEmu._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new serverAjaxEmu(a, b, c, d, e, f, g, h);
  };

  serverAjaxEmu._classInfo = {
    name: "serverAjaxEmu"
  };
  serverAjaxEmu.prototype = new serverAjaxEmu_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["serverAjaxEmu"] = serverAjaxEmu;
      this.serverAjaxEmu = serverAjaxEmu;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["serverAjaxEmu"] = serverAjaxEmu;
    } else {
      this.serverAjaxEmu = serverAjaxEmu;
    }
  }).call(new Function("return this")());

  var tenavanettiViews_prototype = function tenavanettiViews_prototype() {

    (function (_myTrait_) {

      /**
       * @param float t
       */
      _myTrait_.guid = function (t) {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      };

      /**
       * @param Array arrToTest
       */
      _myTrait_.isArray = function (arrToTest) {
        return Object.prototype.toString.call(arrToTest) === "[object Array]";
      };

      /**
       * @param Function fn
       */
      _myTrait_.isFunction = function (fn) {
        return Object.prototype.toString.call(fn) == "[object Function]";
      };

      /**
       * @param Object obj
       */
      _myTrait_.isObject = function (obj) {
        return obj === Object(obj);
      };
    })(this);

    (function (_myTrait_) {
      var ajaxEndpoint;

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (options) {

        if (options.views_to) {
          if (options.test) {
            var m = new testViewFactories_prototype();
            var realM = testViewFactories(options);
          } else {
            var m = new viewFactories_prototype();
            var realM = viewFactories(options);
          }

          // default target for AJAX calls
          if (options.ajaxEndpoint) {
            ajaxEndpoint = options.ajaxEndpoint;
            realM._setAjax(ajaxEndpoint);
          }

          for (var name in m) {
            if (m.hasOwnProperty(name)) {
              var f = m[name];
              if (this.isFunction(f)) {
                options.views_to.viewFactory(name, realM[name]);
              }
            }
          }

          // if there is emulation, call hanlder hooks
          if (options.ajaxEmulation && options.ajaxEndpoint) {
            var emu_p = new serverAjaxEmu_prototype();
            var emu = serverAjaxEmu();
            options.views_to.ajaxHook(options.ajaxEndpoint, function (data) {
              var fn = emu._getHandler(data.cmd);
              if (fn) {
                return fn.apply(emu, [data]);
              }
              if (emu_p.hasOwnProperty(data.cmd)) {
                return emu[data.cmd](data);
              }
            });
          }
        }
      });
    })(this);
  };

  var tenavanettiViews = function tenavanettiViews(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof tenavanettiViews) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != tenavanettiViews._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new tenavanettiViews(a, b, c, d, e, f, g, h);
  };

  tenavanettiViews._classInfo = {
    name: "tenavanettiViews"
  };
  tenavanettiViews.prototype = new tenavanettiViews_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["tenavanettiViews"] = tenavanettiViews;
      this.tenavanettiViews = tenavanettiViews;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["tenavanettiViews"] = tenavanettiViews;
    } else {
      this.tenavanettiViews = tenavanettiViews;
    }
  }).call(new Function("return this")());

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function("return this")());