if (!window.jdatepicker) {
    window.jdatepicker = {};
}

if (!window.jdatepicker.theme) {
    window.jdatepicker.theme = {};
}

window.jdatepicker.theme.bs5 = {
    header: ['card-header', 'd-flex', 'justify-content-center'],
    container: ['card', 'shadow', 'position-absolute'],
    footer: ['card-footer', 'd-flex', 'justify-content-center'],
    body: ['card-body', 'p-0'],
    today: ['bg-success', 'text-white'],
    next: ['btn', 'btn-outline-secondary', 'flex-grow-1'],
    prev: ['btn', 'btn-outline-secondary', 'flex-grow-1'],
    day: ['btn', 'btn-outline-secondary', 'flex-grow-1'],
    selected: ['bg-info', 'text-white'],
    number: ['d-flex', 'justify-content-center', 'align-items-center'],
    select: ['form-select flex-grow-1'],
    table: ['table', 'm-0'],
    tableHead: [],
    tableHeadCell: ['text-center', 'fw-bold', 'v-middle'],
    weekend: ['bg-danger', 'text-white'],
    headerWrap: ['input-group', 'd-flex'],
    footerWrap: ['btn-group', ' d-flex', 'w-100']
}