export const TAXES = .16

export function price_with_tax(amount, tax = TAXES){
    return ( amount + (amount * tax) ).toFixed(2)
}