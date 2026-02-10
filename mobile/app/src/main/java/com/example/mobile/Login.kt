package com.example.mobile

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.example.mobile.api.LoginRequest
import com.example.mobile.api.RetrofitClient
import com.example.mobile.api.User
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class Login : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        // Check if already logged in
        val sharedPref = getSharedPreferences("AppSession", Context.MODE_PRIVATE)
        if (sharedPref.getBoolean("isLoggedIn", false)) {
            startActivity(Intent(this, Dashboard::class.java))
            finish()
        }

        val etInput = findViewById<EditText>(R.id.etInput)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val btnLogin = findViewById<Button>(R.id.btnLogin)
        val btnGoRegister = findViewById<Button>(R.id.btnGoRegister)

        btnLogin.setOnClickListener {
            val identifier = etInput.text.toString().trim()
            val password = etPassword.text.toString().trim()

            if (identifier.isNotEmpty() && password.isNotEmpty()) {
                loginUser(identifier, password)
            } else {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show()
            }
        }

        btnGoRegister.setOnClickListener {
            startActivity(Intent(this, Register::class.java))
        }
    }

    private fun loginUser(identifier: String, pass: String) {
        val request = LoginRequest(identifier, pass)

        RetrofitClient.instance.login(request).enqueue(object : Callback<User> {
            override fun onResponse(call: Call<User>, response: Response<User>) {
                if (response.isSuccessful && response.body() != null) {
                    val sharedPref = getSharedPreferences("AppSession", Context.MODE_PRIVATE)
                    with(sharedPref.edit()) {
                        putBoolean("isLoggedIn", true)
                        putString("username", response.body()?.username)
                        apply()
                    }

                    Toast.makeText(applicationContext, "Login Success!", Toast.LENGTH_SHORT).show()
                    startActivity(Intent(this@Login, Dashboard::class.java))
                    finish()
                } else {
                    Toast.makeText(applicationContext, "Invalid Credentials", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<User>, t: Throwable) {
                Toast.makeText(applicationContext, "Network Error: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }
}