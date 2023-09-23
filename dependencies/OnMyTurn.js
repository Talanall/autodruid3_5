on('ready', () => {

    const resolver = (token,character) => (text) => {
        const attrRegExp = /@{(?:([^|}]*)|(?:(selected)|(target)(?:\|([^|}]*))?)\|([^|}]*))(?:\|(max|current))?}/gm;
    
        const attrResolver = (full, name, selected, target, label, name2, type) => {
            let simpleToken = JSON.parse(JSON.stringify(token));
            let charName = character.get('name');

            type = ['current','max'].includes(type) ? type : 'current';

            const getAttr = (n, t) => (
                    findObjs({type: 'attribute', name:n, characterid: character.id})[0]
                    || {get:()=>getAttrByName(character.id,n,t)}
                ).get(t);

            const getFromChar = (n,t) => {
                if('name'===n){
                    return charName;
                }
                return getAttr(n,t);
            };

            const getProp = (n, t) => {
                switch(n){
                    case 'token_name':
                        return simpleToken.name;
                    case 'character_name':
                        return charName;
                    case 'bar1':
                    case 'bar2':
                    case 'bar3':
                            return simpleToken[`${n}_${'max'===t ? 'max' : 'value'}`];
                }
                return getFromChar(n,t);
            };

            if(name){
                return getFromChar(name,type);
            }
            return getProp(name2,type);
        };
        return text.replace(attrRegExp, attrResolver);
    };

    const checkOnMyTurn = (obj,prev) => {
        let to=JSON.parse(obj.get('turnorder')||'[]');
        let toPrev=JSON.parse(prev.turnorder||'[]');
        if(to.length && to[0].id!=='-1' && to[0].id !== (toPrev[0]||{}).id){
            let token = getObj('graphic',to[0].id);
            if(token && token.get('represents')){
                let character = getObj('character',token.get('represents'));
                let ability = findObjs({
                    name: 'OnMyTurn',
                    characterid: character.id
                }, {caseinsensitive: true})[0];
                if(ability){
                    let content = resolver(token,character)(ability.get('action')).replace(/\[\[\s+/g,'[[');
                    try {
                        sendChat(character.get('name'),content);
                    } catch(e){
                        log(`OnMyTurn: ERROR PARSING: ${content}`);
                        log(`OnMyTurn: ERROR: ${e}`);
                    }
                }
            }
        }
    };

    on(
        'change:campaign:turnorder',
        (obj,prev)=>setTimeout(()=>checkOnMyTurn(Campaign(),prev),1000)
    );

    on('chat:message', (msg) => {
        if('api'===msg.type && /^!eot\b/.test(msg.content)){
            setTimeout(()=>checkOnMyTurn(Campaign(),{turnorder:JSON.stringify([{id:-1}])}),1000);
        }
    });
});
