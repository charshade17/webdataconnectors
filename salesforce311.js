(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "OBJECTID",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "SERVICE_REQUEST_ID",
            alias: "SERVICE_REQUEST_ID",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "STATUS",
            alias: "STATUS",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "STATUS_NOTES",
            alias: "STATUS_NOTES",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "SERVICE_NAME",
            alias: "SERVICE_NAME",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "SERVICE_CODE",
            alias: "SERVICE_CODE",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "DESCRIPTION",
            alias: "DESCRIPTION",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "AGENCY_RESPONSIBLE",
            alias: "AGENCY_RESPONSIBLE",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "SERVICE_NOTICE",
            alias: "SERVICE_NOTICE",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ADDRESS",
            alias: "ADDRESS",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ZIPCODE",
            alias: "ZIPCODE",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "MEDIA_URL",
            alias: "MEDIA_URL",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "PRIVATE_CASE",
            alias: "PRIVATE_CASE",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "DESCRIPTION_FULL",
            alias: "DESCRIPTION_FULL",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "SUBJECT",
            alias: "SUBJECT",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "TYPE_",
            alias: "TYPE_",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "REQUESTED_DATETIME",
            alias: "REQUESTED_DATETIME",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "UPDATED_DATETIME",
            alias: "UPDATED_DATETIME",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "EXPECTED_DATETIME",
            alias: "EXPECTED_DATETIME",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "CLOSED_DATETIME",
            alias: "CLOSED_DATETIME",
            dataType: tableau.dataTypeEnum.datetime
        }];

        var tableSchema = {
            id: "salesforce311",
            alias: "Salesforce 311",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
                    "mag": feat[i].properties.mag,
                    "title": feat[i].properties.title,
                    "location": feat[i].geometry
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "USGS Earthquake Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
