let total = 100;

module.exports = class Subscribe {
    constructor(name, action, invokeOnce, id) {
        let raw = `${total+=10}` + (new Date() - 0);
        let rev = raw.split('').reverse().join('');
        this.name = name;
        this.action = action;
        this.invokeOnce = invokeOnce;
        this.id = id || `${Number(rev).toString(36)}${Number(raw).toString(36)}`;
    }

    invoke(data) {
        this.action && this.action(data);
    }
}