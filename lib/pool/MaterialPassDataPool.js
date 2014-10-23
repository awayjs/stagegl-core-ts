var MaterialPassData = require("awayjs-stagegl/lib/pool/MaterialPassData");
/**
 * @class away.pool.MaterialPassDataPool
 */
var MaterialPassDataPool = (function () {
    /**
     * //TODO
     *
     * @param textureDataClass
     */
    function MaterialPassDataPool(material) {
        this._pool = new Object();
        this._material = material;
    }
    /**
     * //TODO
     *
     * @param materialOwner
     * @returns ITexture
     */
    MaterialPassDataPool.prototype.getItem = function (materialPass) {
        return (this._pool[materialPass.id] || (this._pool[materialPass.id] = this._material._iAddMaterialPassData(materialPass._iAddMaterialPassData(new MaterialPassData(this, this._material, materialPass)))));
    };
    /**
     * //TODO
     *
     * @param materialOwner
     */
    MaterialPassDataPool.prototype.disposeItem = function (materialPass) {
        materialPass._iRemoveMaterialPassData(this._pool[materialPass.id]);
        delete this._pool[materialPass.id];
    };
    MaterialPassDataPool.prototype.disposePool = function () {
        for (var id in this._pool)
            this._pool[id].materialPass._iRemoveMaterialPassData(this._pool[id]);
        delete this._pool;
    };
    return MaterialPassDataPool;
})();
module.exports = MaterialPassDataPool;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1zdGFnZWdsL2xpYi9wb29sL21hdGVyaWFscGFzc2RhdGFwb29sLnRzIl0sIm5hbWVzIjpbIk1hdGVyaWFsUGFzc0RhdGFQb29sIiwiTWF0ZXJpYWxQYXNzRGF0YVBvb2wuY29uc3RydWN0b3IiLCJNYXRlcmlhbFBhc3NEYXRhUG9vbC5nZXRJdGVtIiwiTWF0ZXJpYWxQYXNzRGF0YVBvb2wuZGlzcG9zZUl0ZW0iLCJNYXRlcmlhbFBhc3NEYXRhUG9vbC5kaXNwb3NlUG9vbCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTyxnQkFBZ0IsV0FBYywwQ0FBMEMsQ0FBQyxDQUFDO0FBSWpGLEFBR0E7O0dBREc7SUFDRyxvQkFBb0I7SUFLekJBOzs7O09BSUdBO0lBQ0hBLFNBVktBLG9CQUFvQkEsQ0FVYkEsUUFBNEJBO1FBUmhDQyxVQUFLQSxHQUFVQSxJQUFJQSxNQUFNQSxFQUFFQSxDQUFDQTtRQVVuQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsUUFBUUEsQ0FBQ0E7SUFDM0JBLENBQUNBO0lBRUREOzs7OztPQUtHQTtJQUNJQSxzQ0FBT0EsR0FBZEEsVUFBZUEsWUFBNkJBO1FBRTNDRSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxxQkFBcUJBLENBQUNBLFlBQVlBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsSUFBSUEsZ0JBQWdCQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM1TUEsQ0FBQ0E7SUFFREY7Ozs7T0FJR0E7SUFDSUEsMENBQVdBLEdBQWxCQSxVQUFtQkEsWUFBNkJBO1FBRS9DRyxZQUFZQSxDQUFDQSx3QkFBd0JBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBRW5FQSxPQUFPQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtJQUNwQ0EsQ0FBQ0E7SUFFTUgsMENBQVdBLEdBQWxCQTtRQUVDSSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxJQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNMQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxDQUFFQSxDQUFDQSxZQUFZQSxDQUFDQSx3QkFBd0JBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBRTNGQSxPQUFPQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUNuQkEsQ0FBQ0E7SUFDRkosMkJBQUNBO0FBQURBLENBN0NBLEFBNkNDQSxJQUFBO0FBRUQsQUFBOEIsaUJBQXJCLG9CQUFvQixDQUFDIiwiZmlsZSI6InBvb2wvTWF0ZXJpYWxQYXNzRGF0YVBvb2wuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdGVyaWFsUGFzc0RhdGFcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1zdGFnZWdsL2xpYi9wb29sL01hdGVyaWFsUGFzc0RhdGFcIik7XG5pbXBvcnQgU3RhZ2VHTE1hdGVyaWFsQmFzZVx0XHRcdD0gcmVxdWlyZShcIm1hdGVyaWFscy9TdGFnZUdMTWF0ZXJpYWxCYXNlXCIpO1xuaW1wb3J0IE1hdGVyaWFsUGFzc0Jhc2VcdFx0XHRcdD0gcmVxdWlyZShcIm1hdGVyaWFscy9wYXNzZXMvTWF0ZXJpYWxQYXNzQmFzZVwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5wb29sLk1hdGVyaWFsUGFzc0RhdGFQb29sXG4gKi9cbmNsYXNzIE1hdGVyaWFsUGFzc0RhdGFQb29sXG57XG5cdHByaXZhdGUgX3Bvb2w6T2JqZWN0ID0gbmV3IE9iamVjdCgpO1xuXHRwcml2YXRlIF9tYXRlcmlhbDpTdGFnZUdMTWF0ZXJpYWxCYXNlO1xuXG5cdC8qKlxuXHQgKiAvL1RPRE9cblx0ICpcblx0ICogQHBhcmFtIHRleHR1cmVEYXRhQ2xhc3Ncblx0ICovXG5cdGNvbnN0cnVjdG9yKG1hdGVyaWFsOlN0YWdlR0xNYXRlcmlhbEJhc2UpXG5cdHtcblx0XHR0aGlzLl9tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIC8vVE9ET1xuXHQgKlxuXHQgKiBAcGFyYW0gbWF0ZXJpYWxPd25lclxuXHQgKiBAcmV0dXJucyBJVGV4dHVyZVxuXHQgKi9cblx0cHVibGljIGdldEl0ZW0obWF0ZXJpYWxQYXNzOk1hdGVyaWFsUGFzc0Jhc2UpOk1hdGVyaWFsUGFzc0RhdGFcblx0e1xuXHRcdHJldHVybiAodGhpcy5fcG9vbFttYXRlcmlhbFBhc3MuaWRdIHx8ICh0aGlzLl9wb29sW21hdGVyaWFsUGFzcy5pZF0gPSB0aGlzLl9tYXRlcmlhbC5faUFkZE1hdGVyaWFsUGFzc0RhdGEobWF0ZXJpYWxQYXNzLl9pQWRkTWF0ZXJpYWxQYXNzRGF0YShuZXcgTWF0ZXJpYWxQYXNzRGF0YSh0aGlzLCB0aGlzLl9tYXRlcmlhbCwgbWF0ZXJpYWxQYXNzKSkpKSk7XG5cdH1cblxuXHQvKipcblx0ICogLy9UT0RPXG5cdCAqXG5cdCAqIEBwYXJhbSBtYXRlcmlhbE93bmVyXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZUl0ZW0obWF0ZXJpYWxQYXNzOk1hdGVyaWFsUGFzc0Jhc2UpXG5cdHtcblx0XHRtYXRlcmlhbFBhc3MuX2lSZW1vdmVNYXRlcmlhbFBhc3NEYXRhKHRoaXMuX3Bvb2xbbWF0ZXJpYWxQYXNzLmlkXSk7XG5cblx0XHRkZWxldGUgdGhpcy5fcG9vbFttYXRlcmlhbFBhc3MuaWRdO1xuXHR9XG5cblx0cHVibGljIGRpc3Bvc2VQb29sKClcblx0e1xuXHRcdGZvciAodmFyIGlkIGluIHRoaXMuX3Bvb2wpXG5cdFx0XHQoPE1hdGVyaWFsUGFzc0RhdGE+IHRoaXMuX3Bvb2xbaWRdKS5tYXRlcmlhbFBhc3MuX2lSZW1vdmVNYXRlcmlhbFBhc3NEYXRhKHRoaXMuX3Bvb2xbaWRdKTtcblxuXHRcdGRlbGV0ZSB0aGlzLl9wb29sO1xuXHR9XG59XG5cbmV4cG9ydCA9IE1hdGVyaWFsUGFzc0RhdGFQb29sOyJdfQ==