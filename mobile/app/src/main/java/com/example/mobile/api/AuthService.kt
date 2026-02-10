import com.example.mobile.api.LoginRequest
import com.example.mobile.api.RegisterRequest
import com.example.mobile.api.User
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthService {
    @POST("api/auth/login")
    fun login(@Body request: LoginRequest): Call<User>

    @POST("api/auth/register")
    fun register(@Body user: User): Call<User>

    @POST("api/auth/register")
    fun register(@Body request: RegisterRequest): Call<User>
}