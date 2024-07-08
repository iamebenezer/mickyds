const passportCanvas = document.createElement("canvas");
const initPassportCanvas = document.createElement("canvas");
const passportUploadProfile = async (ctx, file) => {
  if (file) {
    const reader = new FileReader();

    // Step 3: Wait for the file to be loaded
    await new Promise((resolve) => {
      reader.addEventListener("load", () => {
        resolve();
      });
      reader.readAsDataURL(file);
    });

    // Step 4: Create a new image and set its source to the loaded file data
    const profileImage = new Image();
    profileImage.onload = function () {
      // Step 5: Draw the image on the canvas at a specific position
      const posX = 95; // X-coordinate
      const posY = 580; // Y-coordinate
      const width = 150; // Optional: Width of the drawn image
      const height = 220; // Optional: Height of the drawn image

      ctx.drawImage(profileImage, posX, posY, width, height);
    };

    profileImage.src = reader.result;
  }
};

const passportUpdateText = (ctx, text, posX, posY) => {
  ctx.font = "24px Poppins";

  // Step 5: Set the fill color
  ctx.fillStyle = "black";

  // Step 6: Draw the text on the canvas at a specific position

  ctx.fillText(text?.toUpperCase(), posX, posY);
};

const passportDownload = () => {
  // Step 1: Get the canvas element

  // Step 2: Convert the canvas to a data URL
  const dataURL = passportCanvas.toDataURL("image/png");

  // Step 3: Create a temporary anchor element
  const link = document.createElement("a");

  // Step 4: Set the anchor's href to the data URL
  link.href = dataURL;

  // Step 5: Set the anchor's download attribute with desired filename
  link.download = "mickyds_passport.png";

  // Step 6: Simulate a click on the anchor element to trigger the download
  link.click();
};

// const toggleAlert = (display) => {
//   document.querySelector(".alert-passport").style.display = display;
// };

const clearCanvas = () => {
  var passportContext = passportCanvas.getContext("2d");

  var passportContext = passportCanvas.getContext("2d");
  var initPassportContext = initPassportCanvas.getContext("2d");

  // Clear the destination canvas
  passportContext.clearRect(0, 0, passportCanvas.width, passportCanvas.height);

  // Get the image data from the source canvas
  var imageData = initPassportContext.getImageData(
    0,
    0,
    initPassportCanvas.width,
    initPassportCanvas.height
  );

  // Draw the image data onto the destination canvas
  passportContext.putImageData(imageData, 0, 0);
};
const generatePassport = async () => {
  // toggleAlert("none");

  const ctx = passportCanvas.getContext("2d");

  const passportModal = document.querySelector("#passportModal");

  const name = passportModal.querySelector("#name").value;
  const dob = passportModal.querySelector("#datepicker").value;
  const sex = passportModal.querySelector("#gender").value;
  const citizenship = passportModal.querySelector("#title").value;
  const profileimage = passportModal.querySelector("#avatar-2")?.files[0];

  if (!name || !dob || !sex || !citizenship || !profileimage) {
    // toggleAlert("block");
    return;
  }
  await passportUploadProfile(ctx, profileimage);

  await passportUpdateText(ctx, name, 350, 600);
  await passportUpdateText(ctx, dob, 400, 630);
  await passportUpdateText(ctx, sex, 400, 660);
  await passportUpdateText(ctx, citizenship, 400, 690);

  setTimeout(() => {
    passportDownload();
    document.querySelector("#closeModal").click();
  }, 1000);
};

const init = () => {
  const passportImage = new Image();

  // Step 2: Wait for the image to load
  passportImage.onload = function () {
    // Step 3: Create a canvas element

    // Step 4: Set the canvas dimensions
    passportCanvas.width = 733;
    passportCanvas.height = 923;
    initPassportCanvas.width = 733;
    initPassportCanvas.height = 923;

    // Step 5: Get the 2D rendering context
    const ctx = passportCanvas.getContext("2d");
    const ctx2 = passportCanvas.getContext("2d");

    // Step 6: Draw the image on the canvas
    ctx.drawImage(passportImage, 0, 0);
    ctx2.drawImage(initPassportCanvas, 0, 0);

    // Step 7: Append the canvas to the document
    // document.body.appendChild(passportCanvas);
  };

  // Set the source of the image
  passportImage.src = "new-template.jpg";
};

init();

// Function to handle the file input change event
function handleFileInputChange(event) {
  const file = event.target.files[0]; // Get the selected file

  // Check if a file is selected
  if (file) {
    const reader = new FileReader();

    // Read the file as a data URL
    reader.readAsDataURL(file);

    // Define the onload callback function
    reader.onload = function (e) {
      const imageSrc = e.target.result;

      // Create an image element
      const imageElement = document.createElement("img");
      imageElement.src = imageSrc;

      // Append the image element to the preview container
      const previewContainer = document.getElementById("previewContainer");
      previewContainer.innerHTML = ""; // Clear the container
      previewContainer.appendChild(imageElement);
    };
  }
}

const previewImageHandler = () => {
  // Get the file input element
  const imageInput = document.getElementById("avatar-2");

  // Add an event listener for the change event
  imageInput.addEventListener("change", handleFileInputChange);
};

previewImageHandler();
