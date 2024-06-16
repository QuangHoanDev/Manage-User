document.addEventListener('DOMContentLoaded', function() {
    // Link File Json
    const jsonUrl = 'https://jsonplaceholder.org/users';

    // Fetch data of file json
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => populateTable(data))
        .catch(error => console.error('There was a problem with the fetch operation:', error));

    // Function get data json -> table of html
    function populateTable(data) {
        const tableBody = document.querySelector('#table_main tbody');
        data.forEach(item => addRowToTable(item, tableBody));
    }

    // Hàm để thêm hàng vào bảng
    function addRowToTable(item, tableBody, insertAtStart = false) {
        const row = document.createElement('tr');
        
        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = item.firstname;
        firstNameCell.style.cursor = 'pointer';
        firstNameCell.style.fontWeight = 'bold';
        firstNameCell.addEventListener('click', () => showInfor(item));
        row.appendChild(firstNameCell);


        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = item.lastname;
        row.appendChild(lastNameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = item.email;
        row.appendChild(emailCell);

        const companyCell = document.createElement('td');
        companyCell.textContent = item.company.name;
        row.appendChild(companyCell);
        
        // Add column contain button
        const actionCell = document.createElement('td');
        const detailButton = document.createElement('button');
        detailButton.textContent = 'show';
        detailButton.addEventListener('click', () => showDetails(item));
        actionCell.appendChild(detailButton);
        row.appendChild(actionCell);

        if (insertAtStart) {
            tableBody.insertBefore(row, tableBody.firstChild);
        } else {
            tableBody.appendChild(row);
        }
    }

    // Function Display popup when click "show"
    function showDetails(item) {
        const overlay = document.getElementById('overlay');
        const popup = document.getElementById('popup');
        const details = document.getElementById('details');

        details.textContent = `Username:${item.login.username}, Password: ${item.login.password}, Email: ${item.email}`;
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }

    // Function Display popup when click "FirstName"
    function showInfor(item) {
        const popup = document.getElementById('popup');
        const details = document.getElementById('details');

        details.textContent = `Username:${item.login.username}, BirthDate: ${item.birthDate}, Phone: ${item.phone}`;
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }

     // Close Popup and overlay
    document.getElementById('close-btn').addEventListener('click', () => {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('popup').style.display = 'none';
        document.getElementById('popup_input').style.display = 'none';
    });

    //Close Popup1 and overlay1
    document.getElementById('close-btn1').addEventListener('click', () => {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('popup').style.display = 'none';
        document.getElementById('popup_input').style.display = 'none';
    });
    // Close Popup and overlay when click overlay
    document.getElementById('overlay').addEventListener('click', () => {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('popup').style.display = 'none';
        document.getElementById('popup_input').style.display = 'none';
    });

    // Event when click add person
    document.getElementById('button_add').addEventListener('click', () => {
        showFormPopup();
    });

    // Display popup to write infor
    function showFormPopup() {
        const overlay = document.getElementById('overlay');
        const popup = document.getElementById('popup_input');
        const form = document.getElementById('person-form');
        
        form.reset(); // Reset form về trạng thái ban đầu
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }

    // Xử lý sự kiện submit form
    document.getElementById('person-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const firstname = document.getElementById('person-firstname').value;
        const lastname = document.getElementById('person-lastname').value;
        const email = document.getElementById('person-email').value;
        const companyName = document.getElementById('person-company').value;

        if (firstname && lastname && email && companyName) {
            const newPerson = { firstname, lastname, email, company: {name: companyName}};
            const tableBody = document.querySelector('#table_main tbody');
            addRowToTable(newPerson, tableBody, true); // Thêm hàng mới vào đầu bảng
            
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('popup_input').style.display = 'none';
        } else {
            alert('Please fill out all fields.');
        }
    });
});
