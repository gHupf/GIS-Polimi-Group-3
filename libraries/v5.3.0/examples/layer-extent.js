(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{294:function(n,e,o){"use strict";o.r(e);var a=o(3),t=o(2),r=o(6),i=o(5),s=o(62);function c(n){return Object(i.n)(n,"EPSG:4326","EPSG:3857")}var w={India:c([68.17665,7.96553,97.40256,35.49401]),Argentina:c([-73.41544,-55.25,-53.62835,-21.83231]),Nigeria:c([2.6917,4.24059,14.57718,13.86592]),Sweden:c([11.02737,55.36174,23.90338,69.10625])},u=new r.a({source:new s.a({url:"https://api.tiles.mapbox.com/v3/mapbox.world-light.json?secure",crossOrigin:"anonymous"})}),p=new r.a({extent:w.India,source:new s.a({url:"https://api.tiles.mapbox.com/v3/mapbox.world-black.json?secure",crossOrigin:"anonymous"})});new a.a({layers:[u,p],target:"map",view:new t.a({center:[0,0],zoom:1})});for(var m in w)document.getElementById(m).onclick=function(n){p.setExtent(w[n.target.id])}}},[[294,0]]]);
//# sourceMappingURL=layer-extent.js.map