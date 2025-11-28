//Copyright Ram Senthil github @ramenoodles

$(document).ready(function () { 
//Make sure page is loaded before running script

const $form = $("#multTable");
//Make form variable

minCV = 0;
maxCV = 0;
minRV = 0;
maxRV = 0;
numCol = 0;
numRow = 0;
//Variable initialization

$.validator.addMethod("lessThanOrEqual", function(value, element, param) {
    if (value === "" || $(param).val() === "") { //https://www.geeksforgeeks.org/jquery/difference-between-html-text-and-val-methods-in-jquery/
        return true;
    }//Used link above to understand val() vs text()
    return parseInt(value) <= parseInt($(param).val());
}, "Minimum value must be less than or equal to maximum value.");

$("#multTable").validate({
    rules: {
        minColumnValue: {
            required: true,
            number: true,
            min: -50,
            max: 50,
            lessThanOrEqual: "#maxColumnValue"
        },
        maxColumnValue: {
            required: true,
            number: true,
            min: -50,
            max: 50
        },
        minRowValue: {
            required: true,
            number: true,
            min: -50,
            max: 50,
            lessThanOrEqual: "#maxRowValue"
        },
        maxRowValue: {
            required: true,
            number: true,
            min: -50,
            max: 50
        }
    },//Validation rules, including custom lessThanOrEqual method
    messages: {
        minColumnValue: {
            required: "Please enter a minimum column value.",
            number: "Please enter a valid number.",
            min: "Value must be at least -50.",
            max: "Value must be at most 50.",
            lessThanOrEqual: "Minimum column value must be less than or equal to maximum column value."
        },
        maxColumnValue: {
            required: "Please enter a maximum column value.",
            number: "Please enter a valid number.",
            min: "Value must be at least -50.",
            max: "Value must be at most 50."
        },
        minRowValue: {
            required: "Please enter a minimum row value.",
            number: "Please enter a valid number.",
            min: "Value must be at least -50.",
            max: "Value must be at most 50.",
            lessThanOrEqual: "Minimum row value must be less than or equal to maximum row value."
        },
        maxRowValue: {
            required: "Please enter a maximum row value.",
            number: "Please enter a valid number.",
            min: "Value must be at least -50.",
            max: "Value must be at most 50."
        }
    },//Custom error messages

    errorPlacement: function(error, element) {
        error.insertAfter(element);
        console.log("Error shown:", error.text());
    },//Custom error placement to log errors to console and display errors after input fields

    submitHandler: function(form) {
        generateTable();
        return false; 
    },// Prevent actual form submission
});



function generateTable() { 
    //Once submit button is clicked
    
    $("#multiplicationTable").empty();
    //Clear previous table and error messages
    
    const $table = $("<table></table>");
    //Create table element
    
    minCV = parseInt($("#minColumnValue").val());
    maxCV = parseInt($("#maxColumnValue").val());
    minRV = parseInt($("#minRowValue").val());
    maxRV = parseInt($("#maxRowValue").val());
    //Pull input values from form
    
    if (minCV > maxCV || minRV > maxRV) {
        alert("Minimum values must be less than maximum values");
        return;
    }
    //Check that min is less than max

    
    numCol = maxCV - minCV + 1;
    numRow = maxRV - minRV + 1;
    
    const $headerRow = $("<tr></tr>");
    $headerRow.append("<th></th>");
    for (let c = minCV; c <= maxCV; c++) {
        $headerRow.append(`<th>${c}</th>`);
    }
    $table.append($headerRow);
    //Make header row
    
    for (let r = minRV; r <= maxRV; r++) {
        const $row = $("<tr></tr>");
        $row.append(`<th>${r}</th>`);
        for (let c = minCV; c <= maxCV; c++) {
            $row.append(`<td>${r * c}</td>`);
        }
        $table.append($row);
    }
    // Create table rows

    
    $("#multiplicationTable").html($table);
    // Append table to the page
}
});


