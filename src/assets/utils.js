const Utils = {

    objUndef: (_var, _notEmpty = true) => {
        return Utils.checkUndef(_var, 'object', _notEmpty);
    },

    strUndef: (_var, _notEmpty = true) => {
        return Utils.checkUndef(_var + '', 'string', _notEmpty);
    },

    checkUndef: (_var, _type = '', _notEmpty = true) => {
        switch (_type) {
            case 'object':
                return (_var !== undefined && _var !== null && typeof _var === 'object' && (!_notEmpty || (_notEmpty && Object.entries(_var).length > 0)))
            case 'string':
                return (_var !== undefined && _var !== null && typeof _var === 'string' && (!_notEmpty || (_notEmpty && _var + '' !== '')));
            case 'number':
                return (_var !== undefined && _var !== null && typeof _var === 'number');
            default:
                return (_var !== undefined && _var !== null);
        }
    },

}

export default Utils;