const inputTypeSelect=document.getElementById("inputType");
const fileInput = document.getElementById('fileInput');
const textInput = document.getElementById('textInput');
const languageSelected = document.getElementById('chosenLanguage');
const outputText = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");

async function postData(event) {
    event.preventDefault(); // Prevent default form submission behavior
    let inputLanguage = languageSelected.value;
    let inputText;
    let url ;

    
 
   

    console.log("Selected input type:", inputTypeSelect.value);

    if (textInput.value) {
        inputText = textInput.value;
        url = "http://localhost:8080/api/translate";
        console.log("Input text:", inputText);

    } else if (fileInput.files.length > 0) {

        const file = fileInput.files[0];

        if (file.type === 'application/pdf') {

            inputText = file;
            url = "http://localhost:8080/api/extract/pdf";
            console.log("Selected PDF file:", file.name);

        } else if (file.type.startsWith('image/')) {

            inputText = fileInput.value.trim();
            url = "http://localhost:8080/api/extract/image";
            console.log("Selected image file:", file.name);
        }

    } else {
        // File or text not selected or invalid file format
        console.log("No file or text selected.");
        return;
    }

    

    console.log("Request URL:", url);
    console.log("Request data:", inputText);

    const formData = new FormData();

    formData.append("file", inputText); // Add text input to FormData
    formData.append("targetLanguage", inputLanguage);
    

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        console.log("response : ->",response);

        // Handle response here
        if (response.ok) {
            // const responseData = await response.json(); // Assuming the response is JSON
            const responseData = await response.text(); // Get response text
            console.log("translated text :  ",responseData);
            outputText.innerText = responseData; // Display response data in the output text area
        } else {
            console.error("Error:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

translateBtn.addEventListener("click", postData);

// Add event listener to input type select
inputTypeSelect.addEventListener('change', function () {
    // Check the selected input type
    const selectedInputType = this.value;

    // Hide/show file input or text input based on selection
    if (selectedInputType === 'image' || selectedInputType === 'pdf') {
        fileInput.style.display = 'block';
        textInput.style.display = 'none';
    } else if (selectedInputType === 'text') {
        fileInput.style.display = 'none';
        textInput.style.display = 'block';
    }
    // Clear input and output areas
    textInput.value = '';
    outputText.innerText='';
    console.log("hello");
    
});

