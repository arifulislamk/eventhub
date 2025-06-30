import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddForm = ({
  handleSubmit,
  handlebtn,
  register,
  startDate,
  setStartDate,
  loading,
}) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit(handlebtn)}
        className="font-open-sans card-body space-y-4 mb-6 border rounded-lg border-gray-400 md:w-5/6 mx-auto"
      >
        <h2 className="font-poppins font-medium  text-2xl lg:text-5xl text-center ">
          Add Event
        </h2>
        <div className=" flex flex-col md:flex-row justify-between">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-medium">
                Event Name :
              </span>
            </label>
            <input
              {...register("eventName")}
              type="text"
              name="eventName"
              placeholder="eventName"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-medium">
                Name (who posted the Event) :
              </span>
            </label>
            <input
              {...register("name")}
              type="text"
              name="name"
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
        </div>
        <div className=" flex flex-col md:flex-row lg:gap-93">
          <div className=" flex flex-col md:flex-row gap-2 ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text text-xl font-medium">
                  Date and Time :
                </span>
              </label>
              <DatePicker
                dateFormat="dd/MM/YYYY"
                className=" border w-[90%] light:border-gray-500 p-2 text-xl rounded-lg"
                name="expiredDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-medium">Location :</span>
            </label>
            <input
              {...register("location")}
              type="text"
              name="location"
              placeholder="location"
              className="input input-bordered"
              required
            />
          </div>
        </div>
        <div className=" flex flex-col md:flex-row justify-between">
          <div className="form-control flex flex-col md:flex-row md:items-center">
            <label className="label">
              <span className="label-text text-xl font-medium">
                Description :
              </span>
            </label>

            <textarea
              {...register("description")}
              cols={15}
              rows={2}
              name="description"
              placeholder="description"
              type="text"
              className=" outline-none border light:border-gray-500 rounded-lg"
            ></textarea>
          </div>
          <div className=" flex flex-col md:flex-row gap-5 ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text text-xl font-medium">
                  Atend count :{" "}
                </span>
              </label>
              <input
                // {...register('participantCount')}
                readOnly
                defaultValue={0}
                id="number"
                type="number"
                name="participantCount"
                className="input input-bordered"
                required
              />
            </div>
          </div>
        </div>
        <div className="form-control mt-6">
          <button disabled={loading} className="btn bg-orange-400  ">
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
