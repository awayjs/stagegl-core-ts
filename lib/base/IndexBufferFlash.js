var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var OpCodes = require("awayjs-stagegl/lib/base/OpCodes");
var ResourceBaseFlash = require("awayjs-stagegl/lib/base/ResourceBaseFlash");
var IndexBufferFlash = (function (_super) {
    __extends(IndexBufferFlash, _super);
    function IndexBufferFlash(context, numIndices) {
        _super.call(this);
        this._context = context;
        this._numIndices = numIndices;
        this._context.addStream(String.fromCharCode(OpCodes.initIndexBuffer, numIndices + OpCodes.intMask));
        this._pId = this._context.execute();
        this._context._iAddResource(this);
    }
    IndexBufferFlash.prototype.uploadFromArray = function (data, startOffset, count) {
        this._context.addStream(String.fromCharCode(OpCodes.uploadArrayIndexBuffer, this._pId + OpCodes.intMask) + data.join() + "#" + startOffset + "," + count + ",");
        this._context.execute();
    };
    IndexBufferFlash.prototype.dispose = function () {
        this._context.addStream(String.fromCharCode(OpCodes.disposeIndexBuffer, this._pId + OpCodes.intMask));
        this._context.execute();
        this._context._iRemoveResource(this);
        this._context = null;
    };
    Object.defineProperty(IndexBufferFlash.prototype, "numIndices", {
        get: function () {
            return this._numIndices;
        },
        enumerable: true,
        configurable: true
    });
    return IndexBufferFlash;
})(ResourceBaseFlash);
module.exports = IndexBufferFlash;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1zdGFnZWdsL2xpYi9iYXNlL2luZGV4YnVmZmVyZmxhc2gudHMiXSwibmFtZXMiOlsiSW5kZXhCdWZmZXJGbGFzaCIsIkluZGV4QnVmZmVyRmxhc2guY29uc3RydWN0b3IiLCJJbmRleEJ1ZmZlckZsYXNoLnVwbG9hZEZyb21BcnJheSIsIkluZGV4QnVmZmVyRmxhc2guZGlzcG9zZSIsIkluZGV4QnVmZmVyRmxhc2gubnVtSW5kaWNlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsSUFBTyxPQUFPLFdBQWdCLGlDQUFpQyxDQUFDLENBQUM7QUFDakUsSUFBTyxpQkFBaUIsV0FBYSwyQ0FBMkMsQ0FBQyxDQUFDO0FBRWxGLElBQU0sZ0JBQWdCO0lBQVNBLFVBQXpCQSxnQkFBZ0JBLFVBQTBCQTtJQUsvQ0EsU0FMS0EsZ0JBQWdCQSxDQUtUQSxPQUFzQkEsRUFBRUEsVUFBaUJBO1FBRXBEQyxpQkFBT0EsQ0FBQ0E7UUFFUkEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsT0FBT0EsQ0FBQ0E7UUFDeEJBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFVBQVVBLENBQUNBO1FBQzlCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxlQUFlQSxFQUFFQSxVQUFVQSxHQUFHQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNwR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7UUFDcENBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ25DQSxDQUFDQTtJQUVNRCwwQ0FBZUEsR0FBdEJBLFVBQXVCQSxJQUFhQSxFQUFFQSxXQUFrQkEsRUFBRUEsS0FBWUE7UUFFckVFLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLHNCQUFzQkEsRUFBRUEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsV0FBV0EsR0FBR0EsR0FBR0EsR0FBR0EsS0FBS0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDaEtBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO0lBQ3pCQSxDQUFDQTtJQUVNRixrQ0FBT0EsR0FBZEE7UUFFQ0csSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN0R0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7UUFDeEJBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFckNBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO0lBQ3RCQSxDQUFDQTtJQUVESCxzQkFBV0Esd0NBQVVBO2FBQXJCQTtZQUVDSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUN6QkEsQ0FBQ0E7OztPQUFBSjtJQUNGQSx1QkFBQ0E7QUFBREEsQ0FuQ0EsQUFtQ0NBLEVBbkM4QixpQkFBaUIsRUFtQy9DO0FBRUQsQUFBMEIsaUJBQWpCLGdCQUFnQixDQUFDIiwiZmlsZSI6ImJhc2UvSW5kZXhCdWZmZXJGbGFzaC5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udGV4dFN0YWdlM0RcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1zdGFnZWdsL2xpYi9iYXNlL0NvbnRleHRTdGFnZTNEXCIpO1xuaW1wb3J0IElJbmRleEJ1ZmZlclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtc3RhZ2VnbC9saWIvYmFzZS9JSW5kZXhCdWZmZXJcIik7XG5pbXBvcnQgT3BDb2Rlc1x0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1zdGFnZWdsL2xpYi9iYXNlL09wQ29kZXNcIik7XG5pbXBvcnQgUmVzb3VyY2VCYXNlRmxhc2hcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtc3RhZ2VnbC9saWIvYmFzZS9SZXNvdXJjZUJhc2VGbGFzaFwiKTtcblxuY2xhc3MgSW5kZXhCdWZmZXJGbGFzaCBleHRlbmRzIFJlc291cmNlQmFzZUZsYXNoIGltcGxlbWVudHMgSUluZGV4QnVmZmVyXG57XG5cdHByaXZhdGUgX2NvbnRleHQ6Q29udGV4dFN0YWdlM0Q7XG5cdHByaXZhdGUgX251bUluZGljZXM6bnVtYmVyO1xuXG5cdGNvbnN0cnVjdG9yKGNvbnRleHQ6Q29udGV4dFN0YWdlM0QsIG51bUluZGljZXM6bnVtYmVyKVxuXHR7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuXHRcdHRoaXMuX251bUluZGljZXMgPSBudW1JbmRpY2VzO1xuXHRcdHRoaXMuX2NvbnRleHQuYWRkU3RyZWFtKFN0cmluZy5mcm9tQ2hhckNvZGUoT3BDb2Rlcy5pbml0SW5kZXhCdWZmZXIsIG51bUluZGljZXMgKyBPcENvZGVzLmludE1hc2spKTtcblx0XHR0aGlzLl9wSWQgPSB0aGlzLl9jb250ZXh0LmV4ZWN1dGUoKTtcblx0XHR0aGlzLl9jb250ZXh0Ll9pQWRkUmVzb3VyY2UodGhpcyk7XG5cdH1cblxuXHRwdWJsaWMgdXBsb2FkRnJvbUFycmF5KGRhdGE6bnVtYmVyW10sIHN0YXJ0T2Zmc2V0Om51bWJlciwgY291bnQ6bnVtYmVyKTp2b2lkXG5cdHtcblx0XHR0aGlzLl9jb250ZXh0LmFkZFN0cmVhbShTdHJpbmcuZnJvbUNoYXJDb2RlKE9wQ29kZXMudXBsb2FkQXJyYXlJbmRleEJ1ZmZlciwgdGhpcy5fcElkICsgT3BDb2Rlcy5pbnRNYXNrKSArIGRhdGEuam9pbigpICsgXCIjXCIgKyBzdGFydE9mZnNldCArIFwiLFwiICsgY291bnQgKyBcIixcIik7XG5cdFx0dGhpcy5fY29udGV4dC5leGVjdXRlKCk7XG5cdH1cblxuXHRwdWJsaWMgZGlzcG9zZSgpOnZvaWRcblx0e1xuXHRcdHRoaXMuX2NvbnRleHQuYWRkU3RyZWFtKFN0cmluZy5mcm9tQ2hhckNvZGUoT3BDb2Rlcy5kaXNwb3NlSW5kZXhCdWZmZXIsIHRoaXMuX3BJZCArIE9wQ29kZXMuaW50TWFzaykpO1xuXHRcdHRoaXMuX2NvbnRleHQuZXhlY3V0ZSgpO1xuXHRcdHRoaXMuX2NvbnRleHQuX2lSZW1vdmVSZXNvdXJjZSh0aGlzKTtcblxuXHRcdHRoaXMuX2NvbnRleHQgPSBudWxsO1xuXHR9XG5cblx0cHVibGljIGdldCBudW1JbmRpY2VzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fbnVtSW5kaWNlcztcblx0fVxufVxuXG5leHBvcnQgPSBJbmRleEJ1ZmZlckZsYXNoOyJdfQ==