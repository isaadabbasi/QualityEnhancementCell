export function AutoUnsubscribe(blackList:Array<any> = []) {
    
    return constructor => {
        const original = constructor.prototype.ngOnDestroy;

        constructor.prototype.ngOnDestroy = function() {
            for (const prop in this) {
                const property = this[prop];
                if(!(blackList as any).includes(prop))
                    if(property && (typeof property.unsubscribe === "function"))
                        property.unsubscribe();
            }
            original && typeof original === "function" && original.apply(this, arguments);
        };
    }
}