package com.example.mobile

import android.app.Activity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.example.mobile.api.RegisterRequest
import com.example.mobile.api.RetrofitClient
import com.example.mobile.api.User
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class Register : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val etUsername = findViewById<EditText>(R.id.etRegUsername)
        val etEmail = findViewById<EditText>(R.id.etRegEmail)
        val etPassword = findViewById<EditText>(R.id.etRegPassword)
        val btnRegister = findViewById<Button>(R.id.btnRegister)
        val btnBackToLogin = findViewById<Button>(R.id.btnBackToLogin)

        btnRegister.setOnClickListener {
            val username = etUsername.text.toString().trim()
            val email = etEmail.text.toString().trim()
            val password = etPassword.text.toString().trim()

            if (username.isEmpty() || email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val request = RegisterRequest(username, email, password)
            btnRegister.isEnabled = false

            RetrofitClient.instance.register(request).enqueue(object : Callback<User> {
                override fun onResponse(call: Call<User>, response: Response<User>) {
                    btnRegister.isEnabled = true // Re-enable button

                    if (response.isSuccessful) {
                        Toast.makeText(applicationContext, "Registration Successful!", Toast.LENGTH_SHORT).show()
                        finish()
                    } else {
                        // READ THE ERROR FROM BACKEND
                        val errorMsg = response.errorBody()?.string() ?: "Registration Failed"
                        Toast.makeText(applicationContext, "Server Error: $errorMsg", Toast.LENGTH_LONG).show()
                    }
                }

                override fun onFailure(call: Call<User>, t: Throwable) {
                    btnRegister.isEnabled = true
                    Toast.makeText(applicationContext, "Network Error: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }

        btnBackToLogin.setOnClickListener {
            finish()
        }
    }
}