import { useQuery } from "@tanstack/react-query";
import useCommonAxios from "../hooks/useCommonAxios";
import { useState } from "react";
import LoadingSpiner from "../components/LoadingSpiner ";
import { toast } from "react-toastify";

const Events = () => {
  const commonAxios = useCommonAxios();
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [date, setdate] = useState("");
  const [attendeeCount, setattendeeCount] = useState("");

  const {
    data: eventsdata = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["event", date, search, attendeeCount],
    queryFn: async () => {
      const { data } = await commonAxios(
        `/events?search=${search}&date=${date}&attendeeCount=${attendeeCount}`
      );
      return data;
    },
  });
  // console.log(eventsdata, "pailam event");
  const handleJoinBtn = async (id) => {
    console.log(id, attendeeCount);
    try {
      const res = await commonAxios.patch(`/event/attendeecount/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success("You successfully joined this event.");
        refetch(); // Optional: update UI with latest data
      } else {
        toast.info("You have already joined or nothing changed.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Three is issue!");
    }
  };
  const handleSearchbtn = (e) => {
    e.preventDefault();
    // console.log('search ok click', searchText)
    setSearch(searchText);
  };

  if (isLoading || eventsdata.length < 1) return <LoadingSpiner />;
  return (
    <div>
      <div>
        <h2 className=" text-5xl font-semibold text-center mb-2 mt-2">
          {" "}
          All Events
        </h2>
        <div className=" flex flex-col md:flex-row md:justify-center items-center md:mb-10 gap-5 lg:gap-14">
          <div>
            <form onSubmit={handleSearchbtn}>
              <div className="flex p-1 overflow-hidden border border-gray-500 rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                <input
                  className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                  type="text"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  name="search"
                  placeholder="Event title,location,etc "
                  aria-label="Enter Event Name"
                />

                <button className="px-1 md:px-4 py-3 text-sm font-medium uppercase  btn bg-orange-300 hover:btn-info rounded-md">
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className=" flex items-center ">
            <div>
              <select
                onChange={(e) => {
                  setattendeeCount(e.target.value);
                }}
                value={attendeeCount}
                name="attendeeCount"
                id="attendeeCount"
                className="border border-gray-100 bg-gray-600 p-4 rounded-md"
              >
                <option value="">Sort By Most Registered</option>
                <option value="dsc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
          <div className=" flex  items-center ">
            <div>
              <select
                onChange={(e) => {
                  setdate(e.target.value);
                  // setCurrentPage(1)
                }}
                value={date}
                name="date"
                id="date"
                className="border border-gray-100 bg-gray-600 p-4 rounded-md"
              >
                <option value="">Sort By Event Date</option>
                <option value="dsc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {eventsdata?.map((event) => (
          <div
            key={event._id}
            className="hero rounded-md border border-amber-300 bg-base-200 "
          >
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div>
                <h1 className="text-3xl font-bold">{event?.eventName}</h1>
                <h1 className="text-2xl ">{event?.name}</h1>
                <p className="py-6">{event?.description}</p>
                <div className="">
                  <p>Location : {event?.location}</p>
                  <p>Time : {event?.dateTime}</p>
                  <p>AttendeeCount : {event?.attendeeCount}</p>
                </div>
                <button
                  onClick={() => handleJoinBtn(event?._id)}
                  className="btn btn-primary"
                >
                  Join Event
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
