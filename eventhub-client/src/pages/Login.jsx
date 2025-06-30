import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCommonAxios from "../hooks/useCommonAxios";

const Login = () => {
  const commonAxios = useCommonAxios();
  const navigate = useNavigate();
    const reloadPage = () => {
    window.location.reload();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(password, email);
    const userinfo = { email, password };

    try {
      const { data } = await commonAxios.post("/login", userinfo);
      console.log(data,"paisi");
      if (data?.token) {
        localStorage.setItem("token", data?.token);
        localStorage.setItem("email", data?.email);
        // alert("Login successful");
        navigate("/");
        reloadPage();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen min-w-fit">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-extrabold  ">Login Now</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text   font-bold text-base">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text   font-bold text-base">
                    Password
                  </span>
                </label>
                <input
                  type="pin"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-2">
                <button className="btn text-base hover:bg-cyan-300s rounded-b-2xl font-extrabold">
                  Login
                </button>
              </div>
              <p>
                Are You New? PLease{" "}
                <Link className=" text-blue-800 font-bold" to="/register">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
