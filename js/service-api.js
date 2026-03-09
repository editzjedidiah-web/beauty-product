/**
 * Real API call for User Registration
 * Replaces the mock simulation with a real fetch() POST 
 */
async function submitRegistration(formData) {
    const submitBtn = document.getElementById('submitBtn');
    const originalBtnText = submitBtn.innerHTML;
    
    // 1. Handle Large Upload Delays: UI feedback 
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Uploading...`;

    try {
        // 2. Connect the Submission Endpoint 
        // Note: FormData automatically sets the correct Content-Type for files 
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            body: formData 
        });

        const result = await response.json();

        // 3. Handle Server-Side Validation Rejections (e.g., HTTP 400) [cite: 12]
        if (!response.ok) {
            // Display specific error messages like "Aadhar Verification Failed" via showToast [cite: 13]
            showToast(result.message || "Registration failed", "error");
            throw new Error(result.message);
        }

        // 4. Handle Success
        showToast("Registration Successful! Redirecting...", "success");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);

    } catch (error) {
        console.error("API Error:", error);
    } finally {
        // Reset UI state regardless of outcome 
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}
