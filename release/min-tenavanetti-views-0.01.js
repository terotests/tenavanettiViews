(function(){var t={},n=function(){!function(t){var n;t._setAjax=function(t){n=t},t.gardenModel=function(){},t.testView=function(){var t=_e().addClass("container");return t.text("Hello from testView"),t}}(this)},i=function(t,n,e,a,o,u,r,s){var l,c=this;if(!(c instanceof i))return new i(t,n,e,a,o,u,r,s);var f=[t,n,e,a,o,u,r,s];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){l=t.apply(c,f)}),"function"==typeof l){if(l._classInfo.name!=i._classInfo.name)return new l(t,n,e,a,o,u,r,s)}else if(l)return l;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,f)}):"function"==typeof c.init&&c.init.apply(c,f)};i._classInfo={name:"viewFactories"},i.prototype=new n,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.viewFactories=i,this.viewFactories=i):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.viewFactories=i:this.viewFactories=i}.call(new Function("return this")());var e=function(){!function(t){var n,i,e;t._setAjax=function(t){i=t},t.ilmoitustaulu=function(t){var n=_e().addClass("container");n.h1().text("Ilmoitustaulu "+e("uusia.viesteja",10));var i=_data(t);return i.then(function(){n.button("btn btn-success").text("+ uusi viesti").on("click",function(){n.pushTo("container","uusiIlmoitustauluviesti",i)}),n.div().mvc(i.list,function(t){var n=_e();n.h2().bind(t,"heading"),n.p().bind(t,"text",!0);var i=n.div();return i.button("btn btn-default").text("Muokkaa").on("click",function(){n.pushTo("container","muokkaaIlmoitusta",t)}),i.button("btn btn-default").text("Poista").on("click",function(){t.remove()}),n.mvc(t.files,function(t){var n=_e();return n.div().text(t.tiedosto()),n}),n})}),n},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){if(!n){n=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)};var i=u(t.lang);e=function(){var t=Array.prototype.slice.call(arguments);return i.get.apply(i,t)},window&&!window._t&&(window._t=e)}}),t.kirjautuminen=function(){var t=_e().addClass("container"),n=t.div();t.button("btn btn-default").text("<- palaa takaisin").on("click",function(){t.popView()}),t.div().text(e("Käyttäjätunnus"));var a=t.input("form-control");t.div().text(e("Salasana"));var o=t.input("form-control",{type:"password"});return t.button("btn btn-primary").text(e("login")).on("click",function(){t.postJSON(i,{cmd:"login",p:o.val(),un:a.val(),id:21111},function(i){i.success?(t.pushTo("top","vanhempiYlanavi"),t.pushTo("container","vanhempiEtusivu")):(n.addClass("alert alert-danger"),n.text(e("Kirjautuminen epäonnistui")))})}),t},t.muokkaaIlmoitusta=function(t){var n=_e().addClass("container");n.button("btn btn-default").text("<- palaa takaisin").on("click",function(){n.popView()}),n.div().text("Muokataan ilmoitustauluviestiä");var i=_data(t);return i.then(function(){n.input("form-control").bind(i,"heading"),n.textarea("form-control").bind(i,"text").height(300)}),n},t.oletusYlanavi=function(){var t=_e().addClass("navi-top");return t.div().text("Default topnavi is here"),t},t.opettajaRyhmatLapset=function(t){var n=_e().addClass("container");n.h1().text("Lapset ja ryhmät");var i=_data(t);return i.then(function(){n.div().mvc(i.gardens,function(t){var n=_e();return n.h2().bind(t,"name"),n.div().mvc(t.groups,function(t){var n=_e();return n.div().bind(t,"name"),n}),n})}),n},t.testView=function(){var t=_e().addClass("container");return t.text("Hello from testView"),t},t.uusiIlmoitustauluviesti=function(t){var a=_e().addClass("container");a.button("btn btn-default").text("<- palaa takaisin").on("click",function(){a.popView()}),a.div().text("Lisätään uusi ilmoitustauluviesti");var o=a.div(),u=_data({id:"new_item_"+n(),heading:"",text:""}),r=_data(t);return u.then(function(){a.input("form-control").bind(u,"heading"),a.textarea("form-control").bind(u,"text").height(300),a.button("btn btn-success").text("Lisätään uusi viesti").on("click",function(){i&&a.postJSON(i,{cmd:"test"},function(t){t.success?(r.list.push(u.toPlainData(),0),a.popView()):o.text(e("Viestin lisäys ei onnistunut"))},function(){o.text("Sending the file failed")})})}),a.on("mount",function(){u.text("").heading("")}),a},t.valitsePkJaRyhma=function(t){var n=_data(t),i=_e(),e=i.div(),a=!1;return e.button().text("Valitse kaikki").on("click",function(){var t=0,i=0;n.gardens.forEach(function(n){n.groups.forEach(function(n){n.get("selected")&&t++,i++})}),0==t&&(a=!1),a?(n.gardens.forEach(function(t){t.set("selected",!1),t.groups.forEach(function(t){t.set("selected",!1)})}),a=!1):(n.gardens.forEach(function(t){t.set("selected",!0),t.groups.forEach(function(t){t.set("selected",!0)})}),a=!0)}),e.button().text("Peruuta valinnat").on("click",function(){n.undoStep()}),e.button().text("Peruuta valinnat2").on("click",function(){n.undoStep()}),e.button().text("valmis").on("click",function(){console.log(n.toPlainData())}),i.ul("list-group").tree(n.gardens,function(t){var n=_e("li");n.addClass("list-group-item"),t.get("selected")||t.set("selected",!1);var i=n.input({type:"checkbox"});i.bind(t,"selected"),n.span().text(" ");n.span("dragLabel").bind(t,"name");return n.on("click",function(){t.set("selected",!t.get("selected"))}),this.subTree(t.groups,n.ul()),n}),i},t.vanhempiEtusivu=function(){var t=_e().addClass("container");return t.h1().text("Vanhempien etusivu tulee tähän kohtaan"),t},t.vanhempiYlanavi=function(){var t=_e().addClass("navi-top");return t.button("btn btn-defaul").text(e("logout")).on("click",function(){}),t}}(this)},a=function(t,n,i,e,o,u,r,s){var l,c=this;if(!(c instanceof a))return new a(t,n,i,e,o,u,r,s);var f=[t,n,i,e,o,u,r,s];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){l=t.apply(c,f)}),"function"==typeof l){if(l._classInfo.name!=a._classInfo.name)return new l(t,n,i,e,o,u,r,s)}else if(l)return l;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,f)}):"function"==typeof c.init&&c.init.apply(c,f)};a._classInfo={name:"testViewFactories"},a.prototype=new e,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.testViewFactories=a,this.testViewFactories=a):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.testViewFactories=a:this.testViewFactories=a}.call(new Function("return this")());var o=function(){!function(t){t.get=function(t){var n=0,i=this._translations[t];if(i){for(var n=1;n<arguments.length;n++)i=i.replace("$"+n,arguments[n]);t=i}return t},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){this._translations={test:"You have $1 unread emails!"},t&&this["lang_"+t]&&this["lang_"+t]()}),t.lang_en=function(){this._translations={"uusia.viesteja":"You have $1 unread emails!"}},t.lang_fi=function(){this._translations={"uusia.viesteja":"Olet saanut $1 uutta viestiä!",login:"Kirjaudu"}}}(this)},u=function(t,n,i,e,a,o,r,s){var l,c=this;if(!(c instanceof u))return new u(t,n,i,e,a,o,r,s);var f=[t,n,i,e,a,o,r,s];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){l=t.apply(c,f)}),"function"==typeof l){if(l._classInfo.name!=u._classInfo.name)return new l(t,n,i,e,a,o,r,s)}else if(l)return l;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,f)}):"function"==typeof c.init&&c.init.apply(c,f)};u._classInfo={name:"lang"},u.prototype=new o,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.lang=u,this.lang=u):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.lang=u:this.lang=u}.call(new Function("return this")());var r=function(){!function(t){var n,i,e,a;t._addHandler=function(t,n){a||(a={}),a[t]=n},t._getHandler=function(t){return a?a[t]:void 0},t.gardenModel=function(){return{gardens:[{id:e(),name:"Agoran päiväkoti",settings:{},groups:[{id:e(),name:"Pörriäiset",children:[{id:e(),name:"Esko Antero"},{id:e(),name:"Alma Nikula"},{id:e(),name:"Juuso Nettinen"},{id:e(),name:"Pirjo Lahtinen"}]}]},{id:e(),name:"Kummilan kummikoti",settings:{},groups:[{id:e(),name:"Herhiläiset",children:[{id:e(),name:"Esko Antero"},{id:e(),name:"Armo Nikula"},{id:e(),name:"Jukka Mänttäri"},{id:e(),name:"Arttu Viskari"}]}]}]}},t.ilmoitustaulu=function(){return{list:[{id:e(),heading:"Ilmoituksen otsikko - from AJAX emulator",text:"Ilmoituksen sisältöteksti\n\n rivi 2\n rivi 3",files:[{id:e(),nimi:"Testipäiväkoti",tiedosto:"ilmoitus.pdf"}],linkit:[{url:"http://www.yle.fi",text:"Linkki YLE:n sivustolle tulee tähän kohtaan"}]},{id:e(),heading:"Toinen ilmoitustauluviesti",text:"Ilmoitustauluviestin sisältöteksti\n\n rivi 2\n rivi 3",files:[{id:e(),nimi:"Testipäiväkoti",tiedosto:"ilmoitus2.pdf"}],linkit:[]}]}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){n||(n=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},e=function(){return i||(i=1),i++})}),t.login=function(t){return this.userid?{userid:this.userid,success:!0}:"ope"==t.un?(this.userid=100,this.role="opettaja",{userid:100,success:!0}):"vanh"==t.un?(this.userid=101,this.role="vanhempi",{userid:101,success:!0}):{success:!1}},t.logout=function(){return this.userid=null,{userid:this.userid,success:!0}},t.test=function(){return{text:"Hello form test function",success:!0}}}(this)},s=function(t,n,i,e,a,o,u,r){var l,c=this;if(!(c instanceof s))return new s(t,n,i,e,a,o,u,r);var f=[t,n,i,e,a,o,u,r];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){l=t.apply(c,f)}),"function"==typeof l){if(l._classInfo.name!=s._classInfo.name)return new l(t,n,i,e,a,o,u,r)}else if(l)return l;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,f)}):"function"==typeof c.init&&c.init.apply(c,f)};s._classInfo={name:"serverAjaxEmu"},s.prototype=new r,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.serverAjaxEmu=s,this.serverAjaxEmu=s):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.serverAjaxEmu=s:this.serverAjaxEmu=s}.call(new Function("return this")());var l=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){var o;t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){if(t.views_to){if(t.test)var u=new e,l=a(t);else var u=new n,l=i(t);t.ajaxEndpoint&&(o=t.ajaxEndpoint,l._setAjax(o));for(var c in u)if(u.hasOwnProperty(c)){var f=u[c];this.isFunction(f)&&t.views_to.viewFactory(c,l[c])}if(t.ajaxEmulation&&t.ajaxEndpoint){var d=new r,p=s();t.views_to.ajaxHook(t.ajaxEndpoint,function(t){var n=p._getHandler(t.cmd);return n?n.apply(p,[t]):d.hasOwnProperty(t.cmd)?p[t.cmd](t):void 0})}}})}(this)},c=function(t,n,i,e,a,o,u,r){var s,l=this;if(!(l instanceof c))return new c(t,n,i,e,a,o,u,r);var f=[t,n,i,e,a,o,u,r];if(l.__factoryClass)if(l.__factoryClass.forEach(function(t){s=t.apply(l,f)}),"function"==typeof s){if(s._classInfo.name!=c._classInfo.name)return new s(t,n,i,e,a,o,u,r)}else if(s)return s;l.__traitInit?l.__traitInit.forEach(function(t){t.apply(l,f)}):"function"==typeof l.init&&l.init.apply(l,f)};c._classInfo={name:"tenavanettiViews"},c.prototype=new l,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.tenavanettiViews=c,this.tenavanettiViews=c):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.tenavanettiViews=c:this.tenavanettiViews=c}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());