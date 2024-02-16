function generateQR() {
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var fullName = firstName + ' ' + lastName;
    var qrCodeDiv = document.getElementById('qr-code');
    
    if (fullName !== '') {
        qrCodeDiv.innerHTML = '';
        new QRCode(qrCodeDiv, fullName);
    } else {
        alert('Please enter both first name and last name.');
    }
}
