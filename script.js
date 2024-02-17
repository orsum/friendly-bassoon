// Function to generate QR code
function generateQR(text) {
    var qr = new QRious({
        value: text,
        size: 100
    });
    return qr.toDataURL();
}

// Function to generate PDF with QR codes and names
function generatePDF(data) {
    var doc = new jsPDF();
    var xPos = 10;
    var yPos = 10;
    var qrSize = 50;
    var qrSpacing = 20;

    // Loop through data and generate QR codes and names
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var fullName = item.FirstName + ' ' + item.LastName;
        var qrCodeDataURL = generateQR(fullName);

        // Add QR code image
        document.addImage(qrCodeDataURL, 'PNG', xPos, yPos, qrSize, qrSize);

        // Add name text
        document.text(fullName, xPos, yPos + qrSize + 10);

        // Move to next position
        xPos += qrSize + qrSpacing;
        if ((i + 1) % 4 === 0) {
            xPos = 10;
            yPos += qrSize + 60;
        }
        if ((i + 1) % 16 === 0 && i !== data.length - 1) {
            document.addPage();
            xPos = 10;
            yPos = 10;
        }
    }

    // Save PDF
    document.save('qr_codes.pdf');
}

// Read CSV file
function readCSV(file) {
    Papa.parse(file, {
        header: true,
        complete: function(results) {
            generatePDF(results.data);
        }
    });
}

// Handle file input change
document.getElementById('file-input').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (file) {
        readCSV(file);
    }
});

// Handle preview button click
document.getElementById('preview-btn').addEventListener('click', function() {
    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            complete: function(results) {
                var data = results.data;
                var previewDiv = document.getElementById('print-preview');
                previewDiv.innerHTML = '';
                data.forEach(function(item) {
                    var fullName = item.FirstName + ' ' + item.LastName;
                    var qrCodeDataURL = generateQR(fullName);
                    var qrImage = new Image();
                    qrImage.src = qrCodeDataURL;
                    var qrContainer = document.createElement('div');
                    qrContainer.classList.add('qr-container');
                    qrContainer.innerHTML = `
                        <img src="${qrCodeDataURL}" alt="QR Code">
                        <p>${fullName}</p>
                    `;
                    previewDiv.appendChild(qrContainer);
                });
                document.querySelector('.print-preview').style.display = 'block';
                document.getElementById('save-pdf-btn').style.display = 'inline-block';
            }
        });
    }
});

// Handle save PDF button click
document.getElementById('save-pdf-btn').addEventListener('click', function() {
    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];
    if (file) {
        readCSV(file);
    }
});
