const loc = window.location.href;
const protocol = window.location.protocol;
const hostname = window.location.hostname;
let absolute_path = loc.substr(0, loc.lastIndexOf('/') + 1);
let config_live_site = protocol + "//" + hostname;	
const pathScript = {
	absolute : absolute_path,
	site : config_live_site
}