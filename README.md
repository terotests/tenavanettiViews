# Tenavanetti - käyttöliittymämallit

Käyttöliittymän näkymät testaus- ja tuotantokäyttöön.

# Yksinkertaisia demoja

http://codepen.io/teroktolonen/pen/bVwgWQ

# Perusnäkymien alustaminen

```javascript
var body = _e(document.body),
    main = body.div();

tenavanettiViews({
  views_to: main,
  ajaxEndpoint: "ajax",
  test: true,
  lang: "fi",
  ajaxEmulation : true
});

tenavanettiModels({
  models_to: main,
  ajaxEndpoint: "ajax",
  test: true
});

content.layout("top 100% | container 100%");
content.pushTo("top", "oletusYlanavi");
content.model("ilmoitustaulu").then(function(m) {
  content.pushTo("container", "ilmoitustaulu", m);
});

```

# Lokalisaatio

Lang moduulissa voidaan määritellä käännöksiä joillekin teksteille

## _t

```javascript
// "You have $1 unread emails!"
_t("uusia.viesteja", 10);

// -> You have 10 unread emails!
```




# Testaus ja kehitystyö

## View factoryn luominen

```javascript
content.viewFactory("oletusYlanavi", function(id) {
    var o = _e();
    
    // optionally: get model
    var model = _data(id);
    
    o.h1().text("Hello world");
    o.input().bind(model, "name");
    
    return o;
});
```

## Yksinkertainen AJAX-hook

```javascript
_e().ajaxHook("ajax", function(data) {
   if(data.cmd=="ilmoitustaulu") {
        return { ... };
   }});
```
## Palvelimen AJAX -kutsujen emulointi

Serverikutsuja voidaan emuloida, `this` variable voi tallettaa kutsuihin liittyvää dataa.

```javascript
serverAjaxEmu()._addHandler("login", function(data) {

  if(this.userid) {
     // already logged in
  }

  this.userid = 1234;
  return {
    success : true,
    userid : this.userid
  }
})
```

















   

 


   
#### Class tenavanettiViews





   
    
##### trait util_fns

- [guid](README.md#util_fns_guid)
- [isArray](README.md#util_fns_isArray)
- [isFunction](README.md#util_fns_isFunction)
- [isObject](README.md#util_fns_isObject)


    
    
    
    
    
    
    
    
    
    


   
      
    
      
            
#### Class viewFactories


- [_setAjax](README.md#viewFactories__setAjax)
- [gardenModel](README.md#viewFactories_gardenModel)
- [testView](README.md#viewFactories_testView)



   


   



      
    
      
            
#### Class testViewFactories


- [_setAjax](README.md#testViewFactories__setAjax)
- [ilmoitustaulu](README.md#testViewFactories_ilmoitustaulu)
- [kirjautuminen](README.md#testViewFactories_kirjautuminen)
- [muokkaaIlmoitusta](README.md#testViewFactories_muokkaaIlmoitusta)
- [oletusYlanavi](README.md#testViewFactories_oletusYlanavi)
- [opettajaRyhmatLapset](README.md#testViewFactories_opettajaRyhmatLapset)
- [testView](README.md#testViewFactories_testView)
- [uusiIlmoitustauluviesti](README.md#testViewFactories_uusiIlmoitustauluviesti)
- [valitsePkJaRyhma](README.md#testViewFactories_valitsePkJaRyhma)
- [vanhempiEtusivu](README.md#testViewFactories_vanhempiEtusivu)
- [vanhempiYlanavi](README.md#testViewFactories_vanhempiYlanavi)



   


   



      
    
      
            
#### Class lang


- [get](README.md#lang_get)
- [lang_en](README.md#lang_lang_en)
- [lang_fi](README.md#lang_lang_fi)



   


   



      
    
      
            
#### Class serverAjaxEmu


- [_addHandler](README.md#serverAjaxEmu__addHandler)
- [_getHandler](README.md#serverAjaxEmu__getHandler)
- [gardenModel](README.md#serverAjaxEmu_gardenModel)
- [ilmoitustaulu](README.md#serverAjaxEmu_ilmoitustaulu)
- [login](README.md#serverAjaxEmu_login)
- [logout](README.md#serverAjaxEmu_logout)
- [test](README.md#serverAjaxEmu_test)



   


   



      
    





   
# Class tenavanettiViews


The class has following internal singleton variables:
        
* ajaxEndpoint
        
        
### tenavanettiViews::constructor( options )

```javascript

if(options.views_to) {
    if(options.test) {
       var m = new testViewFactories_prototype();
       var realM = testViewFactories(options);
    } else {
       var m = new viewFactories_prototype(); 
       var realM = viewFactories(options);
    }
    
    // default target for AJAX calls
    if(options.ajaxEndpoint) {
        ajaxEndpoint = options.ajaxEndpoint;
        realM._setAjax( ajaxEndpoint );
    }
    
    for( var name in m ) {
        if(m.hasOwnProperty(name)) {
            var f = m[name];
            if(this.isFunction(f)) {
                options.views_to.viewFactory( name, realM[name] );
            }
        }
    }
    
    // if there is emulation, call hanlder hooks
    if(options.ajaxEmulation && options.ajaxEndpoint) {
        var emu_p = new serverAjaxEmu_prototype();
        var emu = serverAjaxEmu();
        options.views_to.ajaxHook( options.ajaxEndpoint, function(data) {
            var fn = emu._getHandler(data.cmd);
            if(fn) {
                return fn.apply(emu, [data]);
            }
            if(emu_p.hasOwnProperty(data.cmd)) {
                return emu[data.cmd](data);
            }
        });
       
    }
}
```
        


   
    
## trait util_fns

The class has following internal singleton variables:
        
        
### <a name="util_fns_guid"></a>util_fns::guid(t)


```javascript
return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
```

### <a name="util_fns_isArray"></a>util_fns::isArray(arrToTest)


```javascript
return Object.prototype.toString.call( arrToTest ) === '[object Array]';
```

### <a name="util_fns_isFunction"></a>util_fns::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="util_fns_isObject"></a>util_fns::isObject(obj)


```javascript
return obj === Object(obj);
```


    
    
    
    
    
    
    
    
    
    


   
      
    
      
            
# Class viewFactories


The class has following internal singleton variables:
        
* ajaxEndpoint
        
        
### <a name="viewFactories__setAjax"></a>viewFactories::_setAjax(url)


```javascript
ajaxEndpoint = url;
```

### <a name="viewFactories_gardenModel"></a>viewFactories::gardenModel(t)


```javascript

```

### <a name="viewFactories_testView"></a>viewFactories::testView(id)


```javascript

var o = _e().addClass("container");

o.text("Hello from testView");

return o;

```



   


   



      
    
      
            
# Class testViewFactories


The class has following internal singleton variables:
        
* _uuid
        
* ajaxEndpoint
        
* _t
        
        
### <a name="testViewFactories__setAjax"></a>testViewFactories::_setAjax(url)


```javascript
ajaxEndpoint = url;
```

### <a name="testViewFactories_ilmoitustaulu"></a>testViewFactories::ilmoitustaulu(id)


```javascript
var o = _e().addClass("container");

o.h1().text("Ilmoitustaulu "+_t("uusia.viesteja", 10));

var mData = _data(id);
mData.then( function() {

    o.button("btn btn-success").text("+ uusi viesti").on("click", function() {
        // uusiIlmoitustauluviesti
        o.pushTo("container", "uusiIlmoitustauluviesti", mData);
    });

    o.div().mvc( mData.list, function(item) {
         var o = _e();
         o.h2().bind(item, "heading");
         o.p().bind(item, "text", true);
         
         var tools = o.div();
         tools.button("btn btn-default").text("Muokkaa").on("click", function() {
             o.pushTo("container", "muokkaaIlmoitusta", item);
         })
         tools.button("btn btn-default").text("Poista").on("click", function() {
             item.remove();
         })         
         
         o.mvc(item.files, function(file) {
            var o = _e();
            o.div().text(file.tiedosto())
            return o;
         });
         
         return o;
    });
});
return o;

```

### testViewFactories::constructor( options )

```javascript
if(!_uuid) {
    _uuid = function() {
        return Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
    }
    var langs = lang(options.lang);
    _t = function(text) {
        var args = Array.prototype.slice.call(arguments);
        return langs.get.apply( langs, args);
    }

    if(window && !window["_t"]) {
        window["_t"] = _t;
    }    
}
```
        
### <a name="testViewFactories_kirjautuminen"></a>testViewFactories::kirjautuminen(t)


```javascript
var o = _e().addClass("container");

var info = o.div();

o.button("btn btn-default").text("<- palaa takaisin").on("click", function() {
    o.popView(); 
});

o.div().text(_t("Käyttäjätunnus"));
var uname = o.input("form-control");
o.div().text(_t("Salasana"));
var pw = o.input("form-control", { type : "password"});

o.button("btn btn-primary").text(_t("login")).on("click", function() {
    o.postJSON(ajaxEndpoint, {
        cmd : "login",
        p : pw.val(),
        un : uname.val(),
        id : 21111
    }, function(data) {
        if(data.success) {
            o.pushTo("top", "vanhempiYlanavi");
            o.pushTo("container", "vanhempiEtusivu");
        } else {
            info.addClass("alert alert-danger");
            info.text(_t("Kirjautuminen epäonnistui"));
        }
    })
});

return o;

```

### <a name="testViewFactories_muokkaaIlmoitusta"></a>testViewFactories::muokkaaIlmoitusta(id)


```javascript
var o = _e().addClass("container");

o.button("btn btn-default").text("<- palaa takaisin").on("click", function() {
    o.popView(); 
});

o.div().text("Muokataan ilmoitustauluviestiä");

var item = _data(id);
item.then( function() {
     o.input("form-control").bind(item, "heading");
     o.textarea("form-control").bind(item, "text").height(300);
});

return o;
```

### <a name="testViewFactories_oletusYlanavi"></a>testViewFactories::oletusYlanavi(t)


```javascript
var o = _e().addClass("navi-top");

o.div().text("Default topnavi is here");

return o;
```

### <a name="testViewFactories_opettajaRyhmatLapset"></a>testViewFactories::opettajaRyhmatLapset(id)


```javascript
var o = _e().addClass("container");

o.h1().text("Lapset ja ryhmät");

var mData = _data(id);
mData.then( function() {
    
    o.div().mvc( mData.gardens, function(item) {
        
         var o = _e();
         o.h2().bind(item, "name");
         
         o.div().mvc( item.groups, function(gr) {
             var o = _e();
             o.div().bind(gr, "name");
             return o;
         });
         
         return o;
    });
});
return o;
```

### <a name="testViewFactories_testView"></a>testViewFactories::testView(id)


```javascript

var o = _e().addClass("container");

o.text("Hello from testView");

return o;

```

### <a name="testViewFactories_uusiIlmoitustauluviesti"></a>testViewFactories::uusiIlmoitustauluviesti(id)


```javascript
var o = _e().addClass("container");

o.button("btn btn-default").text("<- palaa takaisin").on("click", function() {
    o.popView(); 
});

o.div().text("Lisätään uusi ilmoitustauluviesti");

var messages = o.div();

var item = _data({
            id : ("new_item_"+ _uuid()),
            heading : "",
            text : ""
        });
var ilmModel = _data(id);        
item.then( function() {
     o.input("form-control").bind(item, "heading");
     o.textarea("form-control").bind(item, "text").height(300);
     o.button("btn btn-success").text("Lisätään uusi viesti").on("click", function() {
         if(ajaxEndpoint) {
             
             o.postJSON(ajaxEndpoint, {
                cmd : "test"
             }, function(resObj) {
                 if(resObj.success) {
                     ilmModel.list.push(item.toPlainData(), 0);
                     o.popView();        
                 } else {
                     messages.text(_t( "Viestin lisäys ei onnistunut") ) ;
                 }
             }, function() {
                 messages.text("Sending the file failed");
             });
         }

     });
});

o.on("mount", function() {
    item.text("").heading(""); 
});

return o;
```

### <a name="testViewFactories_valitsePkJaRyhma"></a>testViewFactories::valitsePkJaRyhma(id)


```javascript

var gardenInfo = _data(id);

var leftRow = _e();

var gDiv = leftRow.div(),
	didAll = false;

gDiv.button().text("Valitse kaikki").on("click", function() {
    var cnt = 0, total = 0;
    gardenInfo.gardens.forEach( function(g) {
        g.groups.forEach( function(g) {
            if(g.get("selected")) cnt++;
            total++;
        });
    });
    if(cnt==0) didAll = false;
	if( didAll ) {
        gardenInfo.gardens.forEach( function(g) {
            g.set("selected", false);
            g.groups.forEach( function(g) {
                g.set("selected", false);
            });
        })
        didAll = false;
	} else {
        gardenInfo.gardens.forEach( function(g) {
            g.set("selected", true);
            g.groups.forEach( function(g) {
                g.set("selected", true);
            });            
        })
        didAll = true;	    
	}
});	
gDiv.button().text("Peruuta valinnat").on("click", function() {
    gardenInfo.undoStep();
});
gDiv.button().text("Peruuta valinnat2").on("click", function() {
    debugger;
    gardenInfo.undoStep();
});

gDiv.button().text("valmis").on("click", function() {
    console.log(gardenInfo.toPlainData());
});	

leftRow.ul("list-group").tree( gardenInfo.gardens, function(item, level) {
    var o = _e("li");
    o.addClass("list-group-item");
    if(!item.get("selected")) {
        item.set("selected", false);
    }
    var inp = o.input({type:"checkbox"});
    inp.bind(item,"selected");
    o.span().text(" ");
    var name = o.span("dragLabel").bind(item, "name");
    
    o.on("click", function() {
        item.set("selected", !item.get("selected"));
    });
    this.subTree(item.groups, o.ul() );
    return o;
});


return leftRow;
```

### <a name="testViewFactories_vanhempiEtusivu"></a>testViewFactories::vanhempiEtusivu(t)


```javascript
var o = _e().addClass("container");

o.h1().text("Vanhempien etusivu tulee tähän kohtaan");


return o;
```

### <a name="testViewFactories_vanhempiYlanavi"></a>testViewFactories::vanhempiYlanavi(t)


```javascript
var o = _e().addClass("navi-top");

o.button("btn btn-defaul").text(_t("logout")).on("click", function() {
    
});

return o;
```



   


   



      
    
      
            
# Class lang


The class has following internal singleton variables:
        
* _uuid
        
* ajaxEndpoint
        
        
### <a name="lang_get"></a>lang::get(text)


```javascript

var a = [], i=0;
var token = this._translations[text];
if(token) {
    for(var i=1; i<arguments.length; i++) {
        token = token.replace("$"+i, arguments[i]);
    }
    text = token;
}

return text;
```

### lang::constructor( langName )

```javascript

this._translations = {
    test : "You have $1 unread emails!"
};

if(langName && this["lang_"+langName]) {
    this["lang_"+langName]();
}
```
        
### <a name="lang_lang_en"></a>lang::lang_en(t)


```javascript
this._translations = {
    "uusia.viesteja"  : "You have $1 unread emails!"
};
```

### <a name="lang_lang_fi"></a>lang::lang_fi(t)


```javascript
this._translations = {
    "uusia.viesteja" : "Olet saanut $1 uutta viestiä!",
    "login" : "Kirjaudu"
};
```



   


   



      
    
      
            
# Class serverAjaxEmu


The class has following internal singleton variables:
        
* _uuid
        
* ajaxEndpoint
        
* _t
        
* _currentId
        
* _makeId
        
* _handlers
        
        
### <a name="serverAjaxEmu__addHandler"></a>serverAjaxEmu::_addHandler(cmdName, handlerFn)


```javascript
if(!_handlers) _handlers = {};
_handlers[cmdName] = handlerFn;

```

### <a name="serverAjaxEmu__getHandler"></a>serverAjaxEmu::_getHandler(cmdName)


```javascript
if(_handlers) {
    return _handlers[cmdName];
}
```

### <a name="serverAjaxEmu_gardenModel"></a>serverAjaxEmu::gardenModel(data)

Default test JSON to be used when initializing the system data...
```javascript
return {
    gardens : [
        {
            id : _makeId(),
            name : "Agoran päiväkoti",
            settings : {
                
            },
            groups : [
                { id : _makeId(), name : "Pörriäiset",
                    children : [
                        {   id : _makeId(),  
                            name : "Esko Antero"
                        }, 
                        { id : _makeId(),  name : "Alma Nikula"}, 
                        { id : _makeId(),  name : "Juuso Nettinen"}, 
                        { id : _makeId(),  name : "Pirjo Lahtinen"} 
                    ]
                }
            ]
        },
        {
            id : _makeId(),
            name : "Kummilan kummikoti",
            settings : {
                
            },
            groups : [
                { id : _makeId(), name : "Herhiläiset",
                    children : [
                        {   id : _makeId(),  
                            name : "Esko Antero"
                        }, 
                        { id : _makeId(),  name : "Armo Nikula"}, 
                        { id : _makeId(),  name : "Jukka Mänttäri"}, 
                        { id : _makeId(),  name : "Arttu Viskari"} 
                    ]
                }
            ]
        }        
    ]
};
```

### <a name="serverAjaxEmu_ilmoitustaulu"></a>serverAjaxEmu::ilmoitustaulu(t)

Muodosta näkymä, jossa on käyttäjälle tarkoitetun ilmoitustaulun sisältö
```javascript

return {
    list : [
        {
            id : _makeId(),
            heading : "Ilmoituksen otsikko - from AJAX emulator",
            text : "Ilmoituksen sisältöteksti\n\n rivi 2\n rivi 3",
            files : [
                {
                    id : _makeId(),
                    nimi : "Testipäiväkoti",
                    tiedosto : "ilmoitus.pdf"
                }
            ],
            linkit : [
                {  
                    url : "http://www.yle.fi",
                    text : "Linkki YLE:n sivustolle tulee tähän kohtaan"
                }
            ]
        },
        {
            id : _makeId(),
            heading : "Toinen ilmoitustauluviesti",
            text : "Ilmoitustauluviestin sisältöteksti\n\n rivi 2\n rivi 3",
            files : [
                {
                    id : _makeId(),
                    nimi : "Testipäiväkoti",
                    tiedosto : "ilmoitus2.pdf"
                }
            ],
            linkit : []
        } 
    ]

};
```

### serverAjaxEmu::constructor( options )

```javascript
if(!_uuid) {
    _uuid = function() {
        return Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
    }
    _makeId = function() {
        if(!_currentId) _currentId = 1;
        return _currentId++;
    }    
}
```
        
### <a name="serverAjaxEmu_login"></a>serverAjaxEmu::login(data)


```javascript
if(this.userid) {
    return {
       userid : this.userid,
       success : true
    }     
}

if(data.un=="ope") {
    this.userid = 100;
    this.role = "opettaja";
    return {
       userid : 100,
       success : true
    }      
} 
if(data.un=="vanh") {
    this.userid = 101;
    this.role = "vanhempi";
    return {
       userid : 101,
       success : true
    }      
} 

return {
   success : false
}     
```

### <a name="serverAjaxEmu_logout"></a>serverAjaxEmu::logout(t)


```javascript
this.userid = null;
return {
   userid : this.userid,
   success : true
}     
```

### <a name="serverAjaxEmu_test"></a>serverAjaxEmu::test(data)


```javascript
return {
 text : "Hello form test function",
 success : true
};
```



   


   



      
    




