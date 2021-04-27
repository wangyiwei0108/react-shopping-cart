export default function formatCurrency(num) {
    return Number(num.toFixed(2)).toLocaleString('en-US',{style:'currency',currency: 'USD'}) + " ";
}