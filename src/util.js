export default function formatCurrency(num) {
    return Number(num.toFixed(1)).toLocaleString('en-US',{style:'currency',currency: 'USD'}) + " ";
}

