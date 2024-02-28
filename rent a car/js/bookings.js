
//----------------------------details table ------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    displayBookingDetails();
});

function displayBookingDetails () {
    // Retrieve data from local storage
    var bookings = JSON.parse(localStorage.getItem('bookingsNew')) || [];
    var totalPrices = JSON.parse(localStorage.getItem('totalPrices')) || [];

    var tbody = $('#detailsTable tbody');

    // Function to populate table rows with data for vehicle booking details
    function populateDetailsTable() {
        tbody.empty(); // Clear existing rows

        // Loop through bookings array and populate table rows
        bookings.forEach(function (booking, index) {
            var row = $('<tr>');
            row.append('<td>' + (index + 1) + '</td>');
            row.append('<td>' + booking.bikeId + '</td>');
            row.append('<td>' + booking.bikeName + '</td>');
            row.append('<td>' + booking.pickupDate + '</td>');
            row.append('<td>' + booking.returnDate + '</td>');
            row.append('<td>' + booking.numberOfDays + '</td>');
            row.append('<td>' + totalPrices[index] + '</td>');
            row.append('<td><button class="edit-button"><i class="fas fa-edit"></i></button></td>');
            row.append('<td><button class="delete-button"><i class="fas fa-trash"></i></button></td>');
            tbody.append(row);
        });
    }

    // Call the function to populate table for vehicle booking details initially
    populateDetailsTable();

    // Add event listener for edit buttons
    tbody.on('click', '.edit-button', function () {
        var row = $(this).closest('tr');
        enableEditRow(row);
    });

    // Add event listener for delete buttons
    tbody.on('click', '.delete-button', function () {
        var row = $(this).closest('tr');
        deleteRow(row);
    });

    // Function to enable editing mode for a row
    function enableEditRow(row) {
        var cells = row.find('td');
        for (var i = 1; i <= 6; i++) { // Assuming columns 1 to 7 are editable
            var input = $('<input>').val(cells.eq(i).text());
            cells.eq(i).empty().append(input);
        }
        var saveButton = $('<button>').addClass('save-button').html('<i class="fas fa-check-circle" style="color: green;"></i>');
        saveButton.on('click', function () {
            saveRow(row);
        });
        row.find('td:eq(7)').empty().append(saveButton);
    }

    // Function to save edited row data
    function saveRow(row) {
        var cells = row.find('td');
        var index = row.index();
        bookings[index].bikeId = cells.eq(1).find('input').val();
        bookings[index].bikeNameName = cells.eq(2).find('input').val();
        bookings[index].pickupDate = cells.eq(3).find('input').val();
        bookings[index].returnDate = cells.eq(4).find('input').val();
        bookings[index].numberOfDays = cells.eq(5).find('input').val();
        totalPrices[index] = cells.eq(6).find('input').val();

        // Update data in localStorage
        localStorage.setItem('bookingsNew', JSON.stringify(bookings));
        localStorage.setItem('totalPrices', JSON.stringify(totalPrices));

        // Update the row in the table with the new data
        cells.each(function (i) {
            if (i > 0 && i <= 6) {
                var newValue = $(this).find('input').val();
                $(this).empty().text(newValue);
            }
        });

        // Hide save icon and show edit icon
        var editButton = $('<button>').addClass('edit-button').html('<i class="fas fa-edit"></i>');
        row.find('td:eq(7)').empty().append(editButton);

        // Show alert with edited values
        var editedValues = [];
        cells.slice(1, 7).each(function() {
            editedValues.push($(this).text());
        });
        alert('Data saved successfully!');
    }

    // Function to delete a row
    function deleteRow(row) {
        var index = row.index();
        row.remove(); // Remove row from the table

        // Remove corresponding data from arrays
        bookings.splice(index, 1);
        totalPrices.splice(index, 1);

        // Update localStorage with the modified data
        localStorage.setItem('bookingsNew', JSON.stringify(bookings));
        localStorage.setItem('totalPrices', JSON.stringify(totalPrices));
        alert('Deleted successfully!');
    }
}



//------------------------contact details table -----------------------------------------------------------------------------


$(document).ready(function () {
    // Retrieve data from local storage
    const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
    const placesArray = JSON.parse(localStorage.getItem('placesArray')) || [];
    const bookingsNew2 = JSON.parse(localStorage.getItem('bookingsNew')) || [];

    // Reference to the table body
    const tbody2 = $('#contactdetailsTable tbody');

    // Function to populate table rows with data for customer details
    function populateContactDetailsTable() {
        tbody2.empty(); // Clear existing rows

        // Loop through formDataArray and populate table rows
        formDataArray.forEach((formData, index) => {
            const row = $('<tr>');
            row.append('<td>' + (index + 1) + '</td>');
            row.append('<td>' + bookingsNew2[index].bikeId + '</td>');
            row.append('<td>' + formData.name + '</td>');
            row.append('<td>' + formData.members + '</td>');
            row.append('<td>' + formData.email + '</td>');
            row.append('<td>' + formData.licence + '</td>');
            row.append('<td>' + formData.address + '</td>');
            row.append('<td>' + placesArray[index] + '</td>');
            row.append('<td><button class="edit-button"><i class="fas fa-edit"></i></button></td>');
            row.append('<td><button class="delete-button"><i class="fas fa-trash"></i></button></td>');
            tbody2.append(row);
        });
    }

    // Call the function to populate table for customer details initially
    populateContactDetailsTable();

    // Add event listener for edit buttons
    tbody2.on('click', '.edit-button', function () {
        var row = $(this).closest('tr');
        enableEditRow(row);
    });

    // Add event listener for delete buttons
    tbody2.on('click', '.delete-button', function () {
        var row = $(this).closest('tr');
        deleteRow1(row);
    });

    // Function to enable editing mode for a row
    function enableEditRow(row) {
        var cells = row.find('td').slice(2, -2); // Exclude index and ID columns
        cells.each(function () {
            var input = $('<input>').val($(this).text());
            $(this).empty().append(input);
        });
        var saveButton = $('<button>').addClass('save-button').html('<i class="fas fa-check"></i>');
        saveButton.on('click', function () {
            saveRow1(row);
        });
        row.find('td:eq(-2)').empty().append(saveButton); // Add save button before last delete button
    }

    
 // Function to save edited row data
function saveRow1(row) {
    var cells = row.find('td').slice(2, -2); // Exclude index and ID columns
    var index = row.index();

    // Update formDataArray with edited values
    formDataArray[index].name = cells.eq(0).find('input').val();
    formDataArray[index].members = cells.eq(1).find('input').val();
    formDataArray[index].email = cells.eq(2).find('input').val();
    formDataArray[index].licence = cells.eq(3).find('input').val();
    formDataArray[index].address = cells.eq(4).find('input').val();

    // Update data in localStorage
    localStorage.setItem('formDataArray', JSON.stringify(formDataArray));

    // Update the row in the table with the new data
    cells.each(function () {
        var newValue = $(this).find('input').val();
        $(this).empty().text(newValue);
    });

    // Change the save button to edit button
    var editButton = $('<button>').addClass('edit-button').html('<i class="fas fa-edit"></i>');
    row.find('td:eq(-2)').empty().append(editButton);

    // Show success message
    alert('Changes saved successfully!');
}

    

    // Function to delete a row
    function deleteRow1(row) {
        var index = row.index();
        row.remove(); // Remove row from the table

        // Remove corresponding data from arrays
        formDataArray.splice(index, 1);
        placesArray.splice(index, 1);
        bookingsNew2.splice(index, 1);

        // Update localStorage with the modified data
        localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
        localStorage.setItem('placesArray', JSON.stringify(placesArray));
        localStorage.setItem('bookingsNew', JSON.stringify(bookingsNew2));

        // Notify the user
        alert('Row deleted successfully!');
    }

    // Function to exit edit mode
    function exitEditMode1(row) {
        var cells = row.find('td').slice(2, -2); // Exclude index and ID columns
        cells.each(function () {
            var textValue = $(this).find('input').val();
            $(this).empty().text(textValue);
        });
        var editButton = $('<button>').addClass('edit-button').html('<i class="fas fa-edit"></i>');
        row.find('td:eq(-2)').empty().append(editButton); // Add edit button before last delete button
    }
});







