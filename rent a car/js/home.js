
    // Toggle between showing and hiding the sidebar when clicking the menu icon
    var mySidebar = document.getElementById("mySidebar");
    
    function w3_open() {
        if (mySidebar.style.display === 'block') {
            mySidebar.style.display = 'none';
        } else {
            mySidebar.style.display = 'block';
        }
    }
    
    // Close the sidebar with the close button
    function w3_close() {
        mySidebar.style.display = "none";
    }

    function goBack() {
        window.history.back();
    }




    
    
    $(document).ready(function() {
        // Automatically display the car rental form when the page loads
        showCarForm();

        // Function to show car form and hide bike form
        function showCarForm() {
            $("#carForm").show();
            $("#bikeForm").hide();
        }

        // Function to show bike form and hide car form
        function showBikeForm() {
            $("#carForm").hide();
            $("#bikeForm").show();
        }

        // Event listener for car button click
        $(".car-button").click(showCarForm);

        // Event listener for bike button click
        $(".bike-button").click(showBikeForm);
    });


    
//------------------------------HOME PAGE FORM--------------------------------------


function redirectToCarPage() {
    var carType = document.getElementById("carType").value;
    if (carType === "normal") {
        window.location.href = "normalcar.html";
    } else if (carType === "luxury") {
        window.location.href = "luxurycar.html";
    }
}

function redirectToBikePage() {
    var bikeType = document.getElementById("bikeType").value;
    if (bikeType === "normal") {
        window.location.href = "normalbike.html";
    } else if (bikeType === "super") {
        window.location.href = "superbike.html";
    }
}
