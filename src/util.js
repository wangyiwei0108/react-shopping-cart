export default function formatCurrency(num) {
    return Number(num.toFixed(1)).toLocaleString('en-IN',{style:'currency',currency: 'USD'}) + " ";
}