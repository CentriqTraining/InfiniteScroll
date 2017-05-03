function addScrollHandler(containerSelector, tableSelector) {
    containerSelector.scroll(function () {
        var scrollPosition = containerSelector.scrollTop() +
                            containerSelector.outerHeight();
        var totalHeight = containerSelector[0].scrollHeight +
                            parseInt(containerSelector.css('padding-top'), 10) +
                            parseInt(containerSelector.css('padding-bottom'), 10) +
                            parseInt(containerSelector.css('border-top-width'), 10) +
                            parseInt(containerSelector.css('border-bottom-width'), 10);
        if (scrollPosition >= (totalHeight-1)) {
            getData(tableSelector);
        }
    })
}

function getData(tableSelector) {
    var offset = document.getElementById('offset');
    var url = 'http://localhost:61228/api/jsondata/' + offset.value;
    $.getJSON(url, function (data) {
        for (var i = 0; i < data.length; i++) {
            tableSelector.append('<tr>' +
                                 '<td>' + data[i].Studio + '</td>' +
                                 '<td>' + data[i].Character + '</td>' +
                                 '<td>' + data[i].Show + '</td></tr>');
        }
        offset.value = parseInt(offset.value) + 1;
    }).error(function () {
        alert('getJSON failed.');
    });
}