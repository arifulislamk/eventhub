import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photourl = form.photourl.value;
    console.log( name, password, email,photourl );
   
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen min-w-fit">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-extrabold  ">Registration Now</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text   font-bold text-base">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text   font-bold text-base">Email</span>
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
                  <span className="label-text   font-bold text-base">Password</span>
                </label>
                <input
                  type="pin"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text   font-bold text-base">PhotoURL</span>
                </label>
                <input
                  type="text"
                  name="photourl"
                  placeholder="img url"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-2">
                <button className="btn text-base hover:bg-cyan-300s rounded-b-2xl font-extrabold">Register</button>
              </div>
              <p>
                Already have an account?{" "}
                <Link className=" text-blue-800 font-bold" to="/login">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;