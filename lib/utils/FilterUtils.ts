import { Point } from '@awayjs/core';

export class FilterUtils {

	private static blurFilterStepWidths: number[] = [
		0.5, 1.05, 1.35, 1.55, 1.75, 1.9, 2, 2.1, 2.2, 2.3, 2.5, 3, 3, 3.5, 3.5
	];

	public static meashureBlurPad (
		blurX: number,
		blurY: number,
		quality: ui8,
		isBlurFilter: boolean = false,
		target?: Point
	): Point {
		const stepWidth = this.blurFilterStepWidths[quality - 1];

		if (isBlurFilter) {
			// BlurFilter behaves slightly different from other blur based filters:
			// Given ascending blurX/blurY values, generateFilterRect with BlurFilter
			// expands the source rect later than with i.e. GlowFilter. The difference
			// appears to be stepWidth / 4 for all quality values.
			const stepWidth4 = stepWidth / 4;
			blurX -= stepWidth4;
			blurY -= stepWidth4;
		}

		// Calculate horizontal and vertical borders:
		// blurX/blurY values <= 1 are always rounded up to 1,
		// which means that generateFilterRect always expands the source rect,
		// even when blurX/blurY is 0.
		const bh = Math.ceil((blurX < 1 ? 1 : blurX) * stepWidth);
		const bv = Math.ceil((blurY < 1 ? 1 : blurY) * stepWidth);

		target = target || new Point();
		target.setTo(bh, bv);

		return target;
	}

	public static colorToArray(color: ui32, alpha: number, target?: Array<number> | Float32Array) {
		target = target || [];

		target[0] = ((color >> 16) & 0xff) / 0xff;
		target[1] = ((color >> 8) & 0xff) / 0xff;
		target[2] = ((color >> 0) & 0xff) / 0xff;
		target[3] = alpha;
		return target;
	}

	public static colorToU8(
		color: ui32,
		alpha: number,
		target: Uint8Array | number[],
		offset = 0
	): Uint8Array | number[] {
		target[0 + offset] = (color >> 16) & 0xff;
		target[1 + offset] = (color >> 8) & 0xff;
		target[2 + offset] = (color >> 0) & 0xff;
		target[3 + offset] = alpha * 0xff | 0;
		return target;
	}
}

/**
 * Decorator that allow proxify field get/set to another
 * for ex: obj.name => obj.target.name
 * @param fieldName target field name wich will be proxed
 * @param subFieldName target object destination field name, can ovveride source field name
 */
export function proxyTo(fieldName: string, subFieldName?: string): any {
	return function (
		target: any,
		propertyKey: string,
		_descriptor: TypedPropertyDescriptor<any>
	) {
		subFieldName = propertyKey;

		Object.defineProperty(target, propertyKey, {
			set: function (v: any) {
				this[fieldName][subFieldName] = v;
			},
			get: function () {
				return this[fieldName][subFieldName];
			}
		});
	};
}