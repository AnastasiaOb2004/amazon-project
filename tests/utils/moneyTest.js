import {formatCurrency} from '../../scripts/utils/money.js';

describe('Test suite: formatCurrency', ()=> {
    it('Basic test: converts cents into dollars', ()=> {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('Works with 0', ()=> {
    expect(formatCurrency(0)).toEqual('0.00');
    })

    it('rounds up to the nearest cent (to bigger)', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })

    it('rounds up to the earest cent (to smaller)', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    })

    it('modify negative values', () => {
        expect(formatCurrency(-50)).toEqual('0.50');
    })
});
