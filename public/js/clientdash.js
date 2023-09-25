
const showFormButton = document.getElementById("showForm");
const formContainer = document.getElementById("formContainer");
const exitButton = document.getElementById("exitButton");
// const actualFormContainer = document.getElementById('actualFormContainer');

document.getElementById("showForm").addEventListener("click", function () {
  document.getElementById("formContainer").classList.remove("hidden");
});

document.getElementById("exitButton").addEventListener("click", function () {
  document.getElementById("formContainer").classList.add("hidden");
});

//declarations
const editting1 = document.querySelectorAll(".EditBtn");
const deleting = document.querySelectorAll(".DeleteButton");

const formContainer1 = document.querySelector(".hidden1");


//editting
editting1.forEach((user) => {
  user.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(e.currentTarget.dataset.id);
    const id = e.currentTarget.dataset.id;

    // const id = button.dataset.id;
const username = e.currentTarget.dataset.name;
const email = e.currentTarget.dataset.email;
const password = e.currentTarget.dataset.password;
const age = e.currentTarget.dataset.age;
const salary = e.currentTarget.dataset.salary;
const role = e.currentTarget.dataset.role;
const active = e.currentTarget.dataset.active;
const image = e.currentTarget.dataset.image;



    // Populate the form fields with the data
    document.getElementById("email_field2").value = email;
    document.getElementById("password_field").value = password;
    document.getElementById("name_field").value = username;
    document.getElementById("age_field2").value = age;
    document.getElementById("salary_field2").value = salary;
    // document.getElementById("role_field2").value = role;
    // Assuming 'role' contains the role value (e.g., "admin")
document.getElementById("role_field2").value = role;

    // document.getElementById("active_field2").value = active;
    document.getElementById("active_field2").value = active;

    // Assuming 'image' variable contains the URL of the image
const imageElement = document.getElementById('image_field'); // Assuming the ID of your img element is 'image_field'
// Construct the full URL
const imageUrl = `/uploads/${image}`;

imageElement.src = imageUrl;
    // Add similar lines for other form fields
    // try {
    //     // const response = await
    //     fetch(`http://localhost:4001/editbtn/${id}`);

    formContainer1.classList.remove("hidden1");
    
    // } catch (error) {
    //     console.error('Error fetching data:', error);
    // }
  });
});

//delete button
deleting.forEach((user) => {
  user.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(e.currentTarget.dataset.id);
    const id = e.currentTarget.dataset.id;
    await fetch(`http://localhost:4001/deleteUser/${id}`
    , {
        method: 'DELETE'
    }
    );
    window.location.href = '/dashboard';
    window.location.reload();
  });
});

const exitButton1 = document.getElementById("exitButton1");

exitButton1.addEventListener("click", function () {
  formContainer1.classList.add("hidden1");
});
console.log("exitButton1:", exitButton1);
