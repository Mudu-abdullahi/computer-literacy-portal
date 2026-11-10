
require("dotenv").config();

async function testAdmin() {
  try {
    // 1. Login as administrator
    const loginResult = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        }),
      }
    );

    const loginData = await loginResult.json();

    console.log("\n--- ADMIN LOGIN ---");
    console.log("Status:", loginResult.status);
    console.log("Message:", loginData.message);

    if (!loginResult.ok) return;

    // 2. Retrieve registered students
    const studentsResult = await fetch(
      "http://localhost:5000/api/admin/students",
      {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      }
    );

    const studentsData = await studentsResult.json();

    console.log("\n--- STUDENT LIST ---");
    console.log("Status:", studentsResult.status);
    console.log(JSON.stringify(studentsData, null, 2));

    if (!studentsResult.ok) return;

    // 3. Find the first pending student
    const pendingStudent = studentsData.students.find(
      (student) => student.status === "pending"
    );

    if (!pendingStudent) {
      console.log("\nNo pending students available.");
      return;
    }

    // 4. Approve the student
    const approvalResult = await fetch(
      `http://localhost:5000/api/admin/students/${pendingStudent._id}/approve`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      }
    );

    const approvalData = await approvalResult.json();

    console.log("\n--- STUDENT APPROVAL ---");
    console.log("Status:", approvalResult.status);
    console.log("Message:", approvalData.message);
    console.log(
      "Student status:",
      approvalData.student?.status
    );

  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testAdmin();
