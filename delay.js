/* 
Delay Function / Command by Kastion the Scriptomancer 
Profile: https://app.roll20.net/users/3173313/kastion
Syntax: !delay [seconds] \\ [speaker] -- [command]
*/

function processInlinerolls(msg) {
	if(_.has(msg,'inlinerolls')){
		return _.chain(msg.inlinerolls)
		.reduce(function(m,v,k){
			var ti=_.reduce(v.results.rolls,function(m2,v2){
				if(_.has(v2,'table')){
					m2.push(_.reduce(v2.results,function(m3,v3){
						m3.push(v3.tableItem.name);
						return m3;
					},[]).join(', '));
				}
				return m2;
			},[]).join(', ');
			m['$[['+k+']]']= (ti.length && ti) || v.results.total || 0;
			return m;
		},{})
		.reduce(function(m,v,k){
			return m.replace(k,v);
		},msg.content)
		.value();
	} else {
		return msg.content;
	}
}

function delayFunction(speaker, output, pid) {
    return function() {  
        if (speaker.length > 0)
        {
            var token = findObjs({                              
                _pageid: Campaign().get("playerpageid"),                              
                _type: "graphic",
                _name: speaker.trim()});
            var char = "";
        } else
            var token = "";
        
        if (token.length)
        {
        _.each(token, function(obj) {
            var char = getObj("character", obj.get("represents"));
        
            if (char)
                sendChat("character|" + char.id, output.trim());
            else 
                sendChat(speaker, output.trim());
            });
        } else
           sendChat(speaker, output.trim());
        
    }
}
    
on("chat:message", function(msg) {
    if('api' !== msg.type ) {
        return;
    }

    var cmdName = "!delay";
    var msgTxt = msg.content;

    if(msg.type == "api" && msgTxt.indexOf(cmdName) !== -1){
        var inline_rolls = processInlinerolls(msg);
        var seconds = msg.content.split(' ')[1];
        var speaking = msg.content.split('\\\\')[1];
        var command = inline_rolls.substring(inline_rolls.indexOf('--')+2);
        var pid = msg.playerid;
        
        if (speaking)
            speaking = speaking.split('--')[0];
        else
            speaking = "";
    
        if (!isNaN(seconds) && command)
           var delay_length = seconds * 1000;
        else
           return;
          
        setTimeout(delayFunction(speaking, command, pid), delay_length);
    };
});

on('ready',function(){
    log("-=> Delay command loaded (!delay) <=-");
});
