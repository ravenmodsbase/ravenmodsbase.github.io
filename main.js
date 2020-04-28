var gridOptions = {
  columnDefs: [
    { field: 'name'},
    { field: 'type'},
    { field: 'size'},

  ],
  defaultColDef: {
    filter: true,
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    filter: 'agSetColumnFilter',
    // TODO remove the comment to get it working "as intended"
    /*
    filterValueGetter: params => params.data[params.colDef.showRowGroup],
    valueFormatter: (params) => {
      const originColumnName = params.colDef.showRowGroup;
      const column = params.columnApi.getColumn(originColumnName).getColDef();
      return typeof column.valueFormatter === 'function' ? column.valueFormatter(params) : column.valueFormatter;
    },
    // */
    floatingFilter: true,
    minWidth: 200,
  },
  groupMultiAutoColumn: true,
  enableRangeSelection: true,
  floatingFilter: true,
  sideBar: true,
  animateRows: true,
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  // do http request to get our sample data - not using any framework to keep the example self contained.
  // you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
  var httpRequest = new XMLHttpRequest();
  httpRequest.open(
    'GET',
    'https://raw.githubusercontent.com/ravenmodsbase/ravenmodsbase.github.io/master/mods.json'
  );
  httpRequest.send();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      var httpResult = JSON.parse(httpRequest.responseText);
      gridOptions.api.setRowData(httpResult);
    }
  };
});
