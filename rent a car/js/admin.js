$(document).ready(function() {
    const addRowBtn = $("#addRowBtn");
    const saveBtn = $("#saveBtn");
    const tableBody = $("#tableBody");
    let bikesDetails = [];

    // Load existing data from local storage if any
    const storedBikes = localStorage.getItem("bikesDetails");
    if (storedBikes) {
        bikesDetails = JSON.parse(storedBikes);
        renderRows();
    }

    addRowBtn.on("click", function() {
        const newRow = createEmptyRow(); // Create a new empty row
        tableBody.append(newRow); // Append the new row
        attachEventListenersForNewRow(newRow); // Attach event listeners for the new row
    });

    saveBtn.on("click", function() {
        saveData();
    });

    function createEmptyRow() {
        const newRow = $("<tr>");
        newRow.html(`
            <td>${tableBody.children().length + 1}</td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td><input type="file" accept="image/*"></td>
            <td><center><button class="normalbikeDeleteBtn"><i class="fas fa-trash-alt" style="color: red;"></i></button></center></td>
        `);
        return newRow;
    }

    function saveData() {
        let allDataFilled = true; // Flag to track if all row data is filled
        bikesDetails = [];
        tableBody.children().each(function() {
            const cells = $(this).find("td");
            const bike = {
                name: cells.eq(1).text().trim(),
                price: cells.eq(2).text().trim(),
                model: cells.eq(3).text().trim(),
                mileage: cells.eq(4).text().trim(),
                image: ""
            };
    
            const imageFileInput = cells.eq(5).find("input[type=file]");
            const imageFileName = imageFileInput.val().split('\\').pop(); // Get only the file name
            let imageFilePath = '';
            let imageFile = null; // Define imageFile variable here
    
            // Check if an image file is selected
            if (imageFileName) {
                const storedImages = JSON.parse(localStorage.getItem("storedImages") || '{}');
                if (storedImages.hasOwnProperty(imageFileName)) {
                    // Image file with the same name exists in local storage
                    imageFilePath = storedImages[imageFileName];
                    alert("Image already exists in local storage!");
                } else {
                    // Image file is not stored in local storage
                    imageFile = imageFileInput.prop("files")[0];
                    if (imageFile) {
                        // Read the image file and handle it accordingly
                        const reader = new FileReader();
                        reader.onload = function(event) {
                            bike.image = event.target.result; // Save image data as a data URL
                            saveBikeDetails(bike);
                        };
                        reader.readAsDataURL(imageFile);
                    }
                }
            }
    
            // Validate if all fields are filled
            if (!bike.name || !bike.price || !bike.model || !bike.mileage || !imageFile) {
                allDataFilled = false;
                return false; // Exit loop if any field is empty
            }
        });
    
        if (allDataFilled) {
            alert("Data saved successfully!");
        } else {
            alert("Please fill in all details for each row before saving.");
        }
    }
    
    function saveBikeDetails(bike) {
        bikesDetails.push(bike);
        localStorage.setItem("bikesDetails", JSON.stringify(bikesDetails));
    }

    function renderRows() {
        $.each(bikesDetails, function(index, bike) {
            const newRow = createEmptyRow();
            newRow.find("td").eq(1).text(bike.name);
            newRow.find("td").eq(2).text(bike.price);
            newRow.find("td").eq(3).text(bike.model);
            newRow.find("td").eq(4).text(bike.mileage);
            // Set the image if available
            if (bike.image) {
                const img = $("<img>");
                img.attr("src", bike.image);
                img.attr("alt", "Bike Image");
                img.css("max-width", "100px");
                newRow.find("td").eq(5).append(img);
            }
            tableBody.append(newRow);
            attachEventListenersForNewRow(newRow);
        });
    }

    function attachEventListenersForNewRow(row) {
        const editBtn = row.find(".normalbikeEditBtn");
        const deleteBtn = row.find(".normalbikeDeleteBtn");

        // Enable content editing for all cells in the clicked row except the first and last
        const cells = row.find("td");
        for (let i = 1; i < cells.length - 1; i++) {
            cells.eq(i).attr("contenteditable", true);
        }

        // Change edit button to save button
        editBtn.html('<i class="fas fa-save" style="color: blue;"></i>');
        editBtn.removeClass("normalbikeEditBtn").addClass("normalbikeSaveBtn");

        deleteBtn.on("click", function() {
            const index = row.index();
            row.remove();
            bikesDetails.splice(index, 1); // Remove the corresponding bike details from the array
            localStorage.setItem("bikesDetails", JSON.stringify(bikesDetails)); // Update local storage
            alert("Row deleted successfully!");
        });
    }
});



/*-------------------normal bike-------------------------------------------------------------------------------*/

$(document).ready(function() {
    const addRowBtn = $("#normalbikeAddRowBtn");
    const saveBtn = $("#normalbikeSaveBtn");
    const tableBody = $("#normalbikeTableBody");
    let bikesDetails = [];

    // Load existing data from local storage if any
    const storedBikes = localStorage.getItem("normalBikesDetails");
    if (storedBikes) {
        bikesDetails = JSON.parse(storedBikes);
        renderRows();
    }

    addRowBtn.on("click", function() {
        const newRow = createEmptyRow(); // Create a new empty row
        tableBody.append(newRow); // Append the new row
        attachEventListenersForNewRow(newRow); // Attach event listeners for the new row
    });

    saveBtn.on("click", function() {
        saveData();
    });

    function createEmptyRow() {
        const newRow = $("<tr>");
        newRow.html(`
            <td>${tableBody.children().length + 1}</td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td><input type="file" accept="image/*"></td>
            <td><center><button class="normalbikeDeleteBtn"><i class="fas fa-trash-alt" style="color: red;"></i></button></center></td>
        `);
        return newRow;
    }

    function saveData() {
        let allDataFilled = true; // Flag to track if all row data is filled
        bikesDetails = [];
        tableBody.children().each(function() {
            const cells = $(this).find("td");
            const bike = {
                name: cells.eq(1).text().trim(),
                price: cells.eq(2).text().trim(),
                model: cells.eq(3).text().trim(),
                mileage: cells.eq(4).text().trim(),
                image: ""
            };
    
            const imageFileInput = cells.eq(5).find("input[type=file]");
            const imageFile = imageFileInput.prop("files")[0]; // Get the selected image file

            // Check if an image file is selected
            if (imageFile) {
                // Read the image file and handle it accordingly
                const reader = new FileReader();
                reader.onload = function(event) {
                    bike.image = event.target.result; // Save image data as a data URL
                    saveBikeDetails(bike);
                };
                reader.readAsDataURL(imageFile);
            }

            // Validate if all fields are filled
            if (!bike.name || !bike.price || !bike.model || !bike.mileage || !imageFile) {
                allDataFilled = false;
                return false; // Exit loop if any field is empty
            }
        });

        if (allDataFilled) {
            alert("Data saved successfully!");
        } else {
            alert("Please fill in all details for each row before saving.");
        }
    }
    
    function saveBikeDetails(bike) {
        bikesDetails.push(bike);
        localStorage.setItem("normalBikesDetails", JSON.stringify(bikesDetails));
    }

    function renderRows() {
        $.each(bikesDetails, function(index, bike) {
            const newRow = createEmptyRow();
            newRow.find("td").eq(1).text(bike.name);
            newRow.find("td").eq(2).text(bike.price);
            newRow.find("td").eq(3).text(bike.model);
            newRow.find("td").eq(4).text(bike.mileage);
            // Set the image if available
            if (bike.image) {
                const img = $("<img>");
                img.attr("src", bike.image);
                img.attr("alt", "Bike Image");
                img.css("max-width", "100px");
                newRow.find("td").eq(5).append(img);
            }
            tableBody.append(newRow);
            attachEventListenersForNewRow(newRow);
        });
    }

    function attachEventListenersForNewRow(row) {
        const deleteBtn = row.find(".normalbikeDeleteBtn");

        deleteBtn.on("click", function() {
            const index = row.index();
            row.remove();
            bikesDetails.splice(index, 1); // Remove the corresponding bike details from the array
            localStorage.setItem("normalBikesDetails", JSON.stringify(bikesDetails)); // Update local storage
            alert("Row deleted successfully!");
        });
    }
});


/*---------------------------normal car----------------------------------------------------------------*/

$(document).ready(function() {
    const addRowBtn = $("#normalcarAddRowBtn");
    const saveBtn = $("#normalcarSaveBtn");
    const tableBody = $("#normalcarTableBody");
    let carsDetails = [];

    // Load existing data from local storage if any
    const storedCars = localStorage.getItem("carsDetails");
    if (storedCars) {
        carsDetails = JSON.parse(storedCars);
        renderRows();
    }

    addRowBtn.on("click", function() {
        const newRow = createEmptyRow(); // Create a new empty row
        tableBody.append(newRow); // Append the new row
        attachEventListenersForNewRow(newRow); // Attach event listeners for the new row
    });

    saveBtn.on("click", function() {
        saveData();
    });

    function createEmptyRow() {
        const newRow = $("<tr>");
        newRow.html(`
            <td>${tableBody.children().length + 1}</td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td><input type="file" accept="image/*"></td>
            <td><center><button class="normalcarDeleteBtn"><i class="fas fa-trash-alt" style="color: red;"></i></button></center></td>
        `);
        return newRow;
    }

    function saveData() {
        let allDataFilled = true; // Flag to track if all row data is filled
        carsDetails = [];
        tableBody.children().each(function() {
            const cells = $(this).find("td");
            const car = {
                name: cells.eq(1).text().trim(),
                price: cells.eq(2).text().trim(),
                model: cells.eq(3).text().trim(),
                seat: cells.eq(4).text().trim(),
                transmission: cells.eq(5).text().trim(),
                engine: cells.eq(6).text().trim(),
                mileage: cells.eq(7).text().trim(),
                image: ""
            };
    
            const imageFileInput = cells.eq(8).find("input[type=file]");
            const imageFileName = imageFileInput.val().split('\\').pop(); // Get only the file name
            let imageFilePath = '';
            let imageFile = null; // Define imageFile variable here
    
            // Check if an image file is selected
            if (imageFileName) {
                const storedImages = JSON.parse(localStorage.getItem("storedImages") || '{}');
                if (storedImages.hasOwnProperty(imageFileName)) {
                    // Image file with the same name exists in local storage
                    imageFilePath = storedImages[imageFileName];
                    alert("Image already exists in local storage!");
                } else {
                    // Image file is not stored in local storage
                    imageFile = imageFileInput.prop("files")[0];
                    if (imageFile) {
                        // Read the image file and handle it accordingly
                        const reader = new FileReader();
                        reader.onload = function(event) {
                            car.image = event.target.result; // Save image data as a data URL
                            saveCarDetails(car);
                        };
                        reader.readAsDataURL(imageFile);
                    }
                }
            }
    
            // Validate if all fields are filled
            if (!car.name || !car.price || !car.model || !car.seat || !car.transmission || !car.mileage || !car.engine || !imageFile) {
                allDataFilled = false;
                return false; // Exit loop if any field is empty
            }
        });
    
        if (allDataFilled) {
            alert("Data saved successfully!");
        } else {
            alert("Please fill in all details for each row before saving.");
        }
    }
    
    function saveCarDetails(car) {
        carsDetails.push(car);
        localStorage.setItem("carsDetails", JSON.stringify(carsDetails));
    }

    function renderRows() {
        $.each(carsDetails, function(index, car) {
            const newRow = createEmptyRow();
            newRow.find("td").eq(1).text(car.name);
            newRow.find("td").eq(2).text(car.price);
            newRow.find("td").eq(3).text(car.model);
            newRow.find("td").eq(4).text(car.seat);
            newRow.find("td").eq(5).text(car.transmission);
            newRow.find("td").eq(6).text(car.mileage);
            newRow.find("td").eq(7).text(car.engine);
            // Set the image if available
            if (car.image) {
                const img = $("<img>");
                img.attr("src", car.image);
                img.attr("alt", "Car Image");
                img.css("max-width", "100px");
                newRow.find("td").eq(8).append(img);
            }
            tableBody.append(newRow);
            attachEventListenersForNewRow(newRow);
        });
    }

    function attachEventListenersForNewRow(row) {
        const deleteBtn = row.find(".normalcarDeleteBtn");

        deleteBtn.on("click", function() {
            const index = row.index();
            row.remove();
            carsDetails.splice(index, 1); // Remove the corresponding car details from the array
            localStorage.setItem("carsDetails", JSON.stringify(carsDetails)); // Update local storage
            alert("Row deleted successfully!");
        });
    }
});




//----------------------------lexury cars--------------------------------------------------------------

$(document).ready(function() {
    const addRowBtn = $("#luxurycarAddRowBtn");
    const saveBtn = $("#luxurycarSaveBtn");
    const tableBody = $("#luxurycarTableBody");
    let carsDetails = [];

    // Load existing data from local storage if any
    const storedCars = localStorage.getItem("luxuryCarsDetails");
    if (storedCars) {
        carsDetails = JSON.parse(storedCars);
        renderRows();
    }

    addRowBtn.on("click", function() {
        const newRow = createEmptyRow(); // Create a new empty row
        tableBody.append(newRow); // Append the new row
        attachEventListenersForNewRow(newRow); // Attach event listeners for the new row
    });

    saveBtn.on("click", function() {
        saveData();
    });

    function createEmptyRow() {
        const newRow = $("<tr>");
        newRow.html(`
            <td>${tableBody.children().length + 1}</td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td><input type="file" accept="image/*"></td>
            <td><center><button class="luxurycarDeleteBtn"><i class="fas fa-trash-alt" style="color: red;"></i></button></center></td>
        `);
        return newRow;
    }

    function saveData() {
        let allDataFilled = true; // Flag to track if all row data is filled
        alert("please fill");
        carsDetails = [];
        tableBody.children().each(function() {
            const cells = $(this).find("td");
            const car = {
                name: cells.eq(1).text().trim(),
                price: cells.eq(2).text().trim(),
                model: cells.eq(3).text().trim(),
                seat: cells.eq(4).text().trim(),
                transmission: cells.eq(5).text().trim(),
                engine: cells.eq(6).text().trim(),
                mileage: cells.eq(7).text().trim(),
                image: ""
            };
    
            const imageFileInput = cells.eq(8).find("input[type=file]");
            const imageFileName = imageFileInput.val().split('\\').pop(); // Get only the file name
            let imageFilePath = '';
            let imageFile = null; // Define imageFile variable here
    
            // Check if an image file is selected
            if (imageFileName) {
                const storedImages = JSON.parse(localStorage.getItem("luxuryStoredImages") || '{}');
                if (storedImages.hasOwnProperty(imageFileName)) {
                    // Image file with the same name exists in local storage
                    imageFilePath = storedImages[imageFileName];
                    alert("Image already exists in local storage!");
                } else {
                    // Image file is not stored in local storage
                    imageFile = imageFileInput.prop("files")[0];
                    if (imageFile) {
                        // Read the image file and handle it accordingly
                        const reader = new FileReader();
                        reader.onload = function(event) {
                            car.image = event.target.result; // Save image data as a data URL
                            saveCarDetails(car);
                        };
                        reader.readAsDataURL(imageFile);
                    }
                }
            }
    
            // Validate if all fields are filled
            if (!car.name || !car.price || !car.model || !car.seat || !car.transmission || !car.mileage  || !car.engine|| !imageFile) {
                allDataFilled = false;
                return false; // Exit loop if any field is empty
            }
        });
    
        if (allDataFilled) {
            alert("Data saved successfully!");
        } else {
            alert("Please fill in all details for each row before saving.");
        }
    }
    
    function saveCarDetails(car) {
        carsDetails.push(car);
        localStorage.setItem("luxuryCarsDetails", JSON.stringify(carsDetails));
    }

    function renderRows() {
        $.each(carsDetails, function(index, car) {
            const newRow = createEmptyRow();
            newRow.find("td").eq(1).text(car.name);
            newRow.find("td").eq(2).text(car.price);
            newRow.find("td").eq(3).text(car.model);
            newRow.find("td").eq(4).text(car.seat);
            newRow.find("td").eq(5).text(car.transmission);
            newRow.find("td").eq(6).text(car.mileage);
            newRow.find("td").eq(7).text(car.engine);
            // Set the image if available
            if (car.image) {
                const img = $("<img>");
                img.attr("src", car.image);
                img.attr("alt", "Car Image");
                img.css("max-width", "100px");
                newRow.find("td").eq(8).append(img);
            }
            tableBody.append(newRow);
            attachEventListenersForNewRow(newRow);
        });
    }

    function attachEventListenersForNewRow(row) {
        const deleteBtn = row.find(".luxurycarDeleteBtn");

        deleteBtn.on("click", function() {
            const index = row.index();
            row.remove();
            carsDetails.splice(index, 1); // Remove the corresponding car details from the array
            localStorage.setItem("luxuryCarsDetails", JSON.stringify(carsDetails)); // Update local storage
            alert("Row deleted successfully!");
        });
    }
});
