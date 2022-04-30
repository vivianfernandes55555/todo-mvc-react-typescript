import { isEmpty} from './utils-helpers'

describe('Utils Helper', () => {
    it('should render isEmptyFn',() => {
        let isEmptyFn: any;
        isEmptyFn =  isEmpty('');
        expect(isEmptyFn).toBe(true);
        isEmptyFn = isEmpty('hc')
        expect(isEmptyFn).toBe(false);
        isEmptyFn = isEmpty({})
        expect(isEmptyFn).toBe(true);
        isEmptyFn = isEmpty([])
        expect(isEmptyFn).toBe(true);
        isEmptyFn = isEmpty(1)
        expect(isEmptyFn).toBe(false);
        isEmptyFn = isEmpty(undefined)
        expect(isEmptyFn).toBe(true);
        isEmptyFn = isEmpty(null)
        expect(isEmptyFn).toBe(true);
    });
})