
require("dotenv").config();

async function testStudent() {
  try {
    // Student login
    const loginResult = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "student@example.com",
          password: "Student123!",
        }),
      }
    );

    const loginData = await loginResult.json();

    console.log("\n--- STUDENT LOGIN ---");
    console.log("Status:", loginResult.status);
    console.log("Message:", loginData.message);

    if (!loginResult.ok) return;

    // Retrieve student profile
    const profileResult = await fetch(
      "http://localhost:5000/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      }
    );

    const profileData = await profileResult.json();

    console.log("\n--- STUDENT PROFILE ---");
    console.log("Status:", profileResult.status);
    console.log(JSON.stringify(profileData, null, 2));

  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testStudent();
