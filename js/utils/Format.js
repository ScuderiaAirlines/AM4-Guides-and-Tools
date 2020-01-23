class Format {
    static toCamelCase(text) {
        let div = document.createElement('div');
        div.innerHTML = `<div data-${text}="id"></div>`;

        return Object.keys(div.firstChild.dataset)[0];
    };
    static toCurrency(value) {
        return value.toLocaleString('en-us', { style: 'currency', currency: 'USD' });
    };
}