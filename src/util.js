export default function formatCurrency(num) {
    return Number(num).toLocaleString('en-IN',{style:'currency',currency: 'USD'}) + " ";
}