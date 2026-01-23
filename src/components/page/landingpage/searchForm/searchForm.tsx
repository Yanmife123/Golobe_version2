import Image from "next/image";
import { FormBtn } from "../../../utility/button";

export function SearchFlightForm() {
  return (
    <div>
      <form action="" className="flex flex-col gap-[32px]">
        <div className="flex md:flex-row flex-col  gap-5">
          <div className="relative flex-2 flex items-center search_input_container gap-3">
            <label htmlFor="FromTo" className="search_label">
              From - To
            </label>
            <input
              type="text"
              id="FromTo"
              placeholder="Lahore - Karachis"
              className=" w-[80%] w search_input"
            />
            <Image
              src={"/ion_swap-horizontal.svg"}
              alt="jd"
              width={24}
              height={24}
            />
          </div>
          <div className="relative flex-1 search_input_container">
            <label htmlFor="Trip" className="search_label">
              Trip
            </label>
            <select
              name="Trip"
              id="Trip"
              className="py-2 px-2 w-[90%] outline-none"
            >
              <option value="return">Return</option>
              <option value="no-return">No-return</option>
            </select>
          </div>
          <div className="relative flex-2 search_input_container">
            <label htmlFor="depart-return" className="search_label">
              Depart - Return
            </label>
            <input
              type="text"
              id="depart-return"
              placeholder="07 Nov 22 - 13 Nov 22"
              className="search_input w-full"
            />
          </div>
          <div className="relative flex-2 search_input_container">
            <label htmlFor="passenger-class" className="search_label">
              Passenger - Class
            </label>
            <input
              type="text"
              id="passenger-class"
              placeholder="1 Passenger, Economy"
              className="search_input w-full"
            />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div>
            <FormBtn className="flex gap-2 items-center">
              <div>
                <Image
                  src={"/mail-plane.svg"}
                  alt="searchIcon"
                  width={16}
                  height={16}
                />
              </div>
              <div>Show Flights</div>
            </FormBtn>
          </div>
        </div>
      </form>
    </div>
  );
}

export function SearchStayForm() {
  return (
    <div>
      <form action="" className="flex flex-col gap-[32px]">
        <div className="flex md:flex-row flex-col gap-5">
          <div className="relative flex-2 search_input_container gap-2">
            <label htmlFor="Destination" className="search_label">
              Enter Destination
            </label>
            <div>
              <Image
                src={"/hostel.svg"}
                alt="hostelIcon"
                width={20}
                height={20}
                className="ml-3"
              />
            </div>
            <input
              type="text"
              id="FromTo"
              placeholder="Istanbul, Turkey"
              className=" width-[80%] search_input"
            />
          </div>
          <div className="relative flex-1 search_input_container">
            <label htmlFor="checkIn" className="search_label">
              Check In
            </label>
            <input
              type="date"
              id="checkIn"
              placeholder=""
              className="search_input w-[90%]"
            />
          </div>
          <div className="relative flex-1 search_input_container">
            <label htmlFor="checkOut" className="search_label">
              Check Out
            </label>
            <input
              type="date"
              id="checkOut"
              placeholder="fri 12/2"
              className="search_input w-[90%]"
            />
          </div>
          <div className="relative flex-1 search_input_container">
            <label htmlFor="room-guest" className="search_label">
              Trip
            </label>
            <select
              name="room-guest"
              id="room-guest"
              className="py-2 px-2 w-[90%] outline-none"
            >
              <option value="1 room, 1 guest">1 room, 1 guest</option>
              <option value="1 room, 2 guests">1 room, 2 guests</option>
              <option value="2 room, 2 guests">2 room, 2 guests</option>
              <option value="multiple room, muliple guests">
                multiple room, multipe guests
              </option>
            </select>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div>
            <FormBtn className="flex gap-2 items-center">
              <div>
                <Image
                  src={"/building.svg"}
                  alt="searchIcon"
                  width={16}
                  height={16}
                />
              </div>
              <div>Show Stays</div>
            </FormBtn>
          </div>
        </div>
      </form>
    </div>
  );
}
